import React, { Fragment, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

import BreadCrumb from "../../layout/Breadcrumb";
import ModalActividad from "./ModalActividad";
import moment from "moment";
import axios from "axios";
import { useSelector } from "react-redux";
import url from "../../config/Url";
import SweetAlert from "sweetalert2";
//import ReactExport from "react-data-export";
import ExcelExport from "react-export-excel";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
toast.configure();
const MySwal = withReactContent(SweetAlert);
const ExcelFile = ExcelExport.ExcelFile;
const ExcelSheet = ExcelExport.ExcelSheet;
const ExcelColumn = ExcelExport.ExcelColumn;

const Actividades = () => {
  const token = useSelector((state) => state.Auth.token);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [actividad, setActividad] = useState({
    id: "",
    nombre: "",
    actividad: "",
    unidad_de_medida: "",
    especificacion: "",
    costo: "",
  });

  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vacio, setVacio] = useState(false);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    searchVentanilla();
  }, [search]);

  const searchVentanilla = async () => {
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Token ${token}` },
      };
      let res = await axios
        .get /*
        `${url}appticket/ventanillas/?search=${search}`,
        config*/
        ();
      let response = await res.data;
      console.log(response);
      if (response.success) {
        if (response.data.length !== 0) {
          setActividades(response.data);
          setVacio(false);
        } else {
          setVacio(true);
        }
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getActividades = async () => {
    setLoading(true);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log("config");
    console.log(config);
    console.log("config");
    try {
      let res = await axios.get(`${url}auth/allactividad`, config);
      let response = res.data;
      console.log(response);
      if (response.success) {
        setActividades(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getActividades();
  }, []);

  const selectActividad = (item) => {
    setActividad({
      id: item.id,
      nombre: item.nombre,
      actividad: item.actividad,
      unidad_de_medida: item.unidad_de_medida,
      especificacion: item.especificacion,
      costo: item.costo,
    });
    toggle();
  };

  const clearActividad = () => {
    setActividad({
      id: "",
      nombre: "",
      actividad: "",
      unidad_de_medida: "",
      especificacion: "",
      costo: "",
    });
  };

  const saveActividad = async (data) => {
    if (actividad.id !== "") {
      MySwal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        title: "Guardando Cambios...",
        onOpen: async () => {
          MySwal.showLoading();
          try {
            const config = {
              headers: { Authorization: `Bearer ${token}` },
            };
            let res = await axios.post(
              `${url}auth/updateactividad`,
              {
                id: actividad.id,
                nombre: data.nombre,
                actividad: data.actividad,
                unidad_de_medida: data.unidad_de_medida,
                especificacion: data.especificacion,
                costo: data.costo,
              },
              config
            );
            let response = await res.data;
            console.log(response);
            if (response.success) {
              MySwal.close();
              MySwal.fire({
                icon: "success",
                title: "Genial",
                text: "Los cambios han sido guardados exitosamente",
              });
              toggle();
              //getVentanillas();
              getActividades();
            }
          } catch (e) {
            MySwal.close();
            JSON.parse(e.request.response).mensaje.serie &&
              toast.error(
                "Error " +
                  JSON.parse(e.request.response).codigo +
                  ": " +
                  JSON.parse(e.request.response).mensaje.serie[0],
                {
                  position: toast.POSITION.BOTTOM_CENTER,
                }
              );

            JSON.parse(e.request.response).mensaje.nombre &&
              toast.error(
                "Error " +
                  JSON.parse(e.request.response).codigo +
                  ": " +
                  JSON.parse(e.request.response).mensaje.nombre[0],
                {
                  position: toast.POSITION.BOTTOM_CENTER,
                }
              );
          }
        },
      });
    } else {
      MySwal.fire({
        allowOutsideClick: false,
        allowEscapeKey: false,
        title: "Creando Actividad...",
        onOpen: async () => {
          MySwal.showLoading();
          try {
            const config = {
              headers: { Authorization: `Bearer ${token}` },
            };
            let res = await axios.post(
              `${url}auth/registeractividad`,
              {
                nombre: data.nombre,
                actividad: data.actividad,
                unidad_de_medida: data.unidad_de_medida,
                especificacion: data.especificacion,
                costo: data.costo,
              },
              config
            );
            let response = await res.data;
            console.log(response);
            if (response.success) {
              MySwal.close();
              MySwal.fire({
                icon: "success",
                title: "Genial",
                text: "La actividad ha sido creado exitosamente",
              });
              toggle();
              getActividades();
            }
          } catch (e) {
            MySwal.close();
            if (JSON.parse(e.request.response).mensaje.nombre.length !== 0) {
              toast.info("EJEMPLO", {
                position: toast.POSITION.BOTTOM_CENTER,
              });
            }

            console.log(e.request);
            console.log(JSON.parse(e.request.response));
            console.log(JSON.parse(e.request.response).mensaje);
          }
        },
      });
    }
  };

  useEffect(() => {
    if (!modal) {
      clearActividad();
    }
  }, [modal]);
  const formato = (fecha) => {
    return moment(fecha).format("DD/MM/YYYY hh:mm a");
  };
  const updateEstadoVentanilla = async (item, estado) => {
    SweetAlert.fire({
      title: "Esta seguro(a)?",
      text: (!estado ? "Inhabilitar " : "Habilitar ") + item.nombre,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro(a).",
    }).then(async (result) => {
      if (result.value) {
        setLoading(true);
        try {
          const config = {
            headers: { Authorization: `Token ${token}` },
          };
          let res = await axios
            .patch /*
            `${url}appticket/ventanillas/${item.id}/`,
            {
              estado: estado,
            },
            config*/
            ();
          let response = await res.data;
          console.log(response);
          if (response.success) {
            setLoading(false);
            MySwal.fire({
              icon: "success",
              title: "Genial",
              text:
                "La " +
                item.nombre +
                " ha sido " +
                (!estado ? "inhabilitado" : "habilitado") +
                " exitosamente.",
            });
            //getVentanillas();
            getActividades();
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  };
  const dataSet2 = [
    actividades.map((data) => ({
      id: data.id,
      nombre: data.nombre,
      actividad: data.actividad,
      unidad_de_medida: data.unidad_de_medida,
      costo: data.costo,
      // creado_en: moment(data.created_at).format("DD/MM/YYYY hh:mm a"),
    })),
  ];

  return (
    <Fragment>
      <Container>
        {modal ? (
          <ModalActividad
            modal={modal}
            toggle={toggle}
            actividad={actividad}
            setActividad={setActividad}
            saveActividad={saveActividad}
          />
        ) : null}
        <Row>
          <BreadCrumb parent="Actividades" subparent="Lista" title="General" />
        </Row>
        <Row className="d-flex justify-content-center">
          <Col className="text-center">
            <Card>
              <CardBody>
                <Row>
                  <Col sm="3" className="text-left">
                    <FormGroup className=" m-form__group">
                      <InputGroup>
                        <Input
                          type="search"
                          className="form-control"
                          name="search"
                          placeholder="Buscar..."
                          onChange={handleChange}
                          value={search}
                        />
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText
                            style={{ background: "#FFF", color: "#636363" }}
                          >
                            <i className="fa fa-search"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col sm="5" className="text-right">
                    <Button
                      className="btn btn-primary waves-effect waves-light"
                      onClick={() => toggle()}
                    >
                      <i className="fa fa-plus"></i>
                      &nbsp;Nuevo
                    </Button>
                  </Col>
                  <Col sm="2" className="text-right">
                    {actividades.length !== 0 ? (
                      <ExcelFile
                        element={
                          <Button className="btn btn-success waves-effect waves-light">
                            <i className="icofont icofont-file-excel"></i>
                            &nbsp;Excel
                          </Button>
                        }
                      >
                        <ExcelSheet data={dataSet2[0]} name="hoja 1">
                          <ExcelColumn label="N°" value="id" />
                          <ExcelColumn label="NOMBRE" value="nombre" />
                          <ExcelColumn label="ACTIVIDAD" value="actividad" />
                          <ExcelColumn
                            label="UNIDAD"
                            value="unidad_de_medida"
                          />
                          <ExcelColumn label="COSTO" value="costo" />
                        </ExcelSheet>
                      </ExcelFile>
                    ) : null}
                  </Col>
                  <Col sm="2">
                    <Button className="btn btn-danger waves-effect waves-light">
                      <i className="fa fa-file-pdf-o"></i>
                      &nbsp; PDF
                    </Button>
                  </Col>
                </Row>
                <br />
                <Table hover>
                  <thead>
                    <tr>
                      <th
                        style={{ background: "#02a499", color: "#fff" }}
                        colSpan="7"
                      >
                        Lista de Actividades
                      </th>
                    </tr>
                    <tr>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        #
                      </th>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        Nombre
                      </th>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        Actividad
                      </th>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        Und
                      </th>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        Costo
                      </th>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        Acción
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr className="text-center">
                        <td colSpan="7">
                          <div
                            className="spinner-border text-primary m-1"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    ) : vacio ? (
                      <tr className="text-center">
                        <td colSpan="7">No hay ningun registro</td>
                      </tr>
                    ) : (
                      actividades.map((item, index) => {
                        return (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.nombre}</td>
                            <td>{item.actividad}</td>
                            <td>{item.unidad_de_medida}</td>
                            <td>{item.costo}</td>
                            <td>
                              <UncontrolledDropdown direction="left">
                                <DropdownToggle
                                  color="primary"
                                  style={{ paddingLeft: 15, paddingRight: 15 }}
                                >
                                  <i className="fa fa-ellipsis-v"></i>
                                </DropdownToggle>
                                <DropdownMenu style={{ padding: 0 }}>
                                  <DropdownItem
                                    style={{
                                      background: "#f8b425 ",
                                      color: "#fff",
                                    }}
                                    onClick={() => selectActividad(item)}
                                  >
                                    <i className="fa fa-edit"></i>
                                    &nbsp; Editar
                                  </DropdownItem>
                                  {item.estado ? (
                                    <DropdownItem
                                      style={{
                                        background: "#ec4561",
                                        color: "#fff",
                                      }}
                                      onClick={() =>
                                        updateEstadoVentanilla(item, false)
                                      }
                                    >
                                      <i className="fa fa-ban"></i>
                                      &nbsp; Inhabilitar
                                    </DropdownItem>
                                  ) : (
                                    <DropdownItem
                                      style={{
                                        background: "#02a499",
                                        color: "#fff",
                                      }}
                                      onClick={() =>
                                        updateEstadoVentanilla(item, true)
                                      }
                                    >
                                      <i className="fa fa-unlock-alt"></i>
                                      &nbsp; Habilitar
                                    </DropdownItem>
                                  )}
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Actividades;
