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
import moment from "moment";
import axios from "axios";
import { useSelector } from "react-redux";
import url from "../../config/Url";
import SweetAlert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
toast.configure();
const MySwal = withReactContent(SweetAlert);

const Lista = () => {
  const token = useSelector((state) => state.Auth.token);
  const [instalaciones, setInstalaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vacio, setVacio] = useState(false);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [totalpage, setTotalpage] = useState(0);
  const [total, setTotal] = useState(0);
  const [formato, setFormato] = useState({
    fila: 5,
    page: 1,
  });

  const handleChange = (e) => {
    if (e.target.name === "fila") {
      setFormato({
        ...formato,
        fila: e.target.value,
        page: 1,
      });
    } else {
      setFormato({
        ...formato,
        page: 1,
      });
      setSearch(e.target.value);
    }
  };
  const increment = () => {
    if (formato.page < totalpage) {
      setFormato({
        ...formato,
        page: formato.page + 1,
      });
    }
  };
  const decrement = () => {
    if (formato.page > 1) {
      setFormato({
        ...formato,
        page: formato.page - 1,
      });
    }
  };
  useEffect(() => {
    searchInstalacion();
  }, [search, formato.fila, formato.page]);

  const searchInstalacion = async () => {
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      let res = await axios.get(
        `${url}auth/buscarinstal?per_page=${formato.fila}&page=${formato.page}&search=${search}`,
        config
      );
      let response = await res.data;
      console.log(response);
      if (response.success) {
        if (response.data.data.length !== 0) {
          setInstalaciones(response.data.data);
          setTotal(response.data.total);
          setTotalpage(response.data.last_page);
          setVacio(false);
        } else {
          setVacio(true);
        }
        setLoading(false);
      } else if (!response.success) {
        setMessage(response.message);
        setVacio(true);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getInstalaciones = async () => {
    setLoading(true);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      let res = await axios.get(
        `${url}auth/allinstalacion?per_page=${formato.fila}&page=${formato.page}`,
        config
      );
      let response = res.data;
      console.log(response.data.last_page);
      console.log(formato.page);
      if (response.success) {
        setInstalaciones(response.data.data);
        setTotal(response.data.total);
        setTotalpage(response.data.last_page);
        setLoading(false);
      } else if (!response.success) {
        setMessage(response.message);
        setVacio(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInstalaciones();
  }, []);
  const nuevo = () => {
    console.log("nuevo");
  };

  const selectInstalacion = (item) => {
    /* setActividad({
      id: item.id,
      nombre: item.nombre,
      actividad: item.actividad,
      unidad_de_medida: item.unidad_de_medida,
      especificacion: item.especificacion,
      costo: item.costo,
    });
    toggle();*/
  };

  /* const formato = (fecha) => {
    return moment(fecha).format("DD/MM/YYYY hh:mm a");
  };*/
  const eliminarInstalacion = async (item, estado) => {
    /*   SweetAlert.fire({
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
            `${url}auth/deleteactividad`,
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
                "La " + "actividad" + " ha sido eliminado" + " exitosamente.",
            });
            //getVentanillas();
            getActividades();
          }
        } catch (e) {
          console.log(e);
        }
      }
    });*/
  }; /*
  const dataSet2 = [
    actividades.map((data) => ({
      id: data.id,
      nombre: data.nombre,
      actividad: data.actividad,
      unidad_de_medida: data.unidad_de_medida,
      costo: data.costo,
      // creado_en: moment(data.created_at).format("DD/MM/YYYY hh:mm"),
    })),
  ];*/

  return (
    <Fragment>
      <Container>
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
                  <Col sm="1" className="text-left">
                    <label>Fila por Página:</label>
                  </Col>
                  <Col sm="2" className="text-left">
                    <Input
                      className="form-control"
                      type="select"
                      name="fila"
                      onChange={handleChange}
                      value={formato.fila}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </Input>
                  </Col>
                  <Col sm="4" className="text-right"></Col>
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
                        Lista de Instalaciones
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
                        Apellidos
                      </th>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        Fecha
                      </th>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        Monto
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
                        <td colSpan="7">{message}</td>
                      </tr>
                    ) : (
                      instalaciones.map((item, index) => {
                        return (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.nombre}</td>
                            <td>{item.apellidos}</td>
                            <td>
                              {moment(item.fecha).format("DD/MM/YYYY hh:mm")}
                            </td>
                            <td>{item.monto_total}</td>
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
                                    onClick={() => selectInstalacion(item)}
                                  >
                                    <i className="fa fa-edit"></i>
                                    &nbsp; Ver
                                  </DropdownItem>
                                  <DropdownItem
                                    style={{
                                      background: "#ec4561",
                                      color: "#fff",
                                    }}
                                    onClick={() =>
                                      eliminarInstalacion(item, false)
                                    }
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
                <Row>
                  <Col className="d-flex justify-content-center">
                    {total !== 0 ? (
                      <>
                        <Table hover>
                          <thead>
                            <tr>
                              <th
                                style={{ background: "#02a499", color: "#fff" }}
                                colSpan="7"
                              >
                                <Button
                                  className="btn btn-primary waves-effect waves-light"
                                  onClick={() => decrement()}
                                  disabled={formato.page == 1 ? true : false}
                                >
                                  <i className="fa fa-angle-double-left"></i>
                                  &nbsp;
                                </Button>
                                <Button
                                  className="btn btn-primary waves-effect waves-light"
                                  onClick={() => increment()}
                                  disabled={
                                    totalpage == formato.page ? true : false
                                  }
                                >
                                  <i className="fa fa-angle-double-right"></i>
                                  &nbsp;
                                </Button>
                                <label style={{ marginLeft: "0.8rem" }}>
                                  Página:{formato.page}
                                </label>
                              </th>
                            </tr>
                          </thead>
                        </Table>
                      </>
                    ) : null}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Lista;
