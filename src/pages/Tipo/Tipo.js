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
import ModalTipo from "./ModalTipo";
import moment from "moment";
import axios from "axios";
import { useSelector } from "react-redux";
import url from "../../config/Url";
import SweetAlert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
toast.configure();
const MySwal = withReactContent(SweetAlert);

const Tipo = () => {
  const token = useSelector((state) => state.Auth.token);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [tipo, setTipo] = useState({
    id: "",
    codigo: "",
    nombre: "",
  });

  const [tipos, setTipos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vacio, setVacio] = useState(false);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    searchTipo();
  }, [search]);

  const searchTipo = async () => {
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      let res = await axios.get(
        `${url}auth/buscartipo/?search=${search}`,
        config
      );
      let response = await res.data;
      console.log(response);
      if (response.success) {
        if (response.data.data.length !== 0) {
          setTipos(response.data.data);
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

  const getTipos = async () => {
    setLoading(true);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log("config");
    console.log(config);
    console.log("config");
    try {
      let res = await axios.get(`${url}auth/alltipo`, config);
      let response = res.data;
      console.log(response);
      if (response.success) {
        setTipos(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTipos();
  }, []);

  const selectTipo = (item) => {
    setTipo({
      id: item.id,
      codigo: item.codigo,
      nombre: item.nombre,
    });
    toggle();
  };

  const clearTipo = () => {
    setTipo({
      id: "",
      codigo: "",
      nombre: "",
    });
  };

  const saveTipo = async (data) => {
    if (tipo.id !== "") {
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
              `${url}auth/updatetipo`,
              {
                id: tipo.id,
                codigo: data.codigo,
                nombre: data.nombre,
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
              getTipos();
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
        title: "Creando Tipo...",
        onOpen: async () => {
          MySwal.showLoading();
          try {
            const config = {
              headers: { Authorization: `Bearer ${token}` },
            };
            let res = await axios.post(
              `${url}auth/registertipo`,
              {
                codigo: data.codigo,
                nombre: data.nombre,
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
                text: "El tipo de Inst. ha sido creado exitosamente",
              });
              toggle();
              getTipos();
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
      clearTipo();
    }
  }, [modal]);
  const formato = (fecha) => {
    return moment(fecha).format("DD/MM/YYYY hh:mm a");
  };
  const eliminarTipo = async (item, estado) => {
    SweetAlert.fire({
      title: "Esta seguro(a)?",
      text: "Eliminar",
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
            headers: { Authorization: `Bearer ${token}` },
          };
          let res = await axios.post(
            `${url}auth/deletetipo`,
            {
              id: item.id,
            },
            config
          );
          let response = await res.data;
          console.log(response);
          if (response.success) {
            setLoading(false);
            MySwal.fire({
              icon: "success",
              title: "Genial",
              text:
                "El" +
                "tipo de Inst." +
                " ha sido eliminado" +
                " exitosamente.",
            });
            //getVentanillas();
            getTipos();
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  };
  const dataSet2 = [
    tipos.map((data) => ({
      id: data.id,
      codigo: data.codigo,
      nombre: data.nombre,
      // creado_en: moment(data.created_at).format("DD/MM/YYYY hh:mm a"),
    })),
  ];

  return (
    <Fragment>
      <Container>
        {modal ? (
          <ModalTipo
            modal={modal}
            toggle={toggle}
            tipo={tipo}
            setTipo={setTipo}
            saveTipo={saveTipo}
          />
        ) : null}
        <Row>
          <BreadCrumb
            parent="Tipos de instalación"
            subparent="Lista"
            title="General"
          />
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
                  <Col sm="2" className="text-right"></Col>
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
                        Lista de Tipos de Instalación
                      </th>
                    </tr>
                    <tr>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        #
                      </th>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        Código
                      </th>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        Nombre
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
                      tipos.map((item, index) => {
                        return (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.codigo}</td>
                            <td>{item.nombre}</td>
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
                                    onClick={() => selectTipo(item)}
                                  >
                                    <i className="fa fa-edit"></i>
                                    &nbsp; Editar
                                  </DropdownItem>
                                  <DropdownItem
                                    style={{
                                      background: "#ec4561",
                                      color: "#fff",
                                    }}
                                    onClick={() => eliminarTipo(item, false)}
                                  >
                                    <i className="fa fa-ban"></i>
                                    &nbsp; Eliminar
                                  </DropdownItem>
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

export default Tipo;
