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
import ModalUsuario from "./ModalUsuario";
import moment from "moment";
import axios from "axios";
import { useSelector } from "react-redux";
import url from "../../config/Url";
import SweetAlert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
toast.configure();
const MySwal = withReactContent(SweetAlert);

const Usuario = () => {
  const token = useSelector((state) => state.Auth.token);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [usuario, setUsuario] = useState({
    id: "",
    name: "",
    last_name: "",
    dni: "",
    celular: "",
    tipo_usuario: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vacio, setVacio] = useState(false);
  const [search, setSearch] = useState("");
  /*
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    searchTipo();
  }, [search]);*/
  /*
  const searchTipo = async () => {
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      let res = await axios.get(
        `${url}auth/buscartipo?search=${search}`,
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
  };*/

  const getUsuarios = async () => {
    setLoading(true);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      let res = await axios.get(`${url}auth/allusuario`, config);
      let response = res.data;
      console.log(response);
      if (response.success) {
        setUsuarios(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  const selectUsuario = (item) => {
    setUsuario({
      id: item.id,
      name: item.name,
      last_name: item.last_name,
      dni: item.dni,
      celular: item.celular,
      tipo_usuario: item.tipo_de_usuario,
    });
    toggle();
  };

  const clearUsuario = () => {
    setUsuario({
      id: "",
      name: "",
      last_name: "",
      dni: "",
      celular: "",
      tipo_usuario: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
  };

  const saveUsuario = async (data) => {
    if (usuario.id !== "") {
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
              `${url}auth/update`,
              {
                id: usuario.id,
                name: data.name,
                last_name: data.last_name,
                dni: data.dni,
                celular: data.celular,
                tipo_usuario: data.tipo_usuario,
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
              getUsuarios();
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
        title: "Creando Usuario...",
        onOpen: async () => {
          MySwal.showLoading();
          try {
            const config = {
              headers: { Authorization: `Bearer ${token}` },
            };
            let res = await axios.post(
              `${url}auth/register`,
              {
                name: data.name,
                last_name: data.last_name,
                dni: data.dni,
                celular: data.celular,
                tipo_usuario: data.tipo_usuario,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation,
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
                text: "El usuario a sido creado exitosamente",
              });
              toggle();
              getUsuarios();
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
      clearUsuario();
    }
  }, [modal]);
  const formato = (fecha) => {
    return moment(fecha).format("DD/MM/YYYY hh:mm a");
  };
  const eliminarUsuario = async (item, estado) => {
    console.log("todavía");
  };
  /*
  const eliminarUsuario = async (item, estado) => {
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
  };*/
  /* const dataSet2 = [
    tipos.map((data) => ({
      id: data.id,
      codigo: data.codigo,
      nombre: data.nombre,
      // creado_en: moment(data.created_at).format("DD/MM/YYYY hh:mm a"),
    })),
  ];
*/
  return (
    <Fragment>
      <Container>
        {modal ? (
          <ModalUsuario
            modal={modal}
            toggle={toggle}
            usuario={usuario}
            setUsuario={setUsuario}
            saveUsuario={saveUsuario}
          />
        ) : null}
        <Row>
          <BreadCrumb parent="Usuarios" subparent="Lista" title="General" />
        </Row>
        <Row className="d-flex justify-content-center">
          <Col className="text-center">
            <Card>
              <CardBody>
                <Row>
                  <Col sm="3" className="text-left">
                    <FormGroup className=" m-form__group">
                      <InputGroup>
                        {/*<Input
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
                        */}
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
                        colSpan="8"
                      >
                        Lista de Usuarios del Sistema
                      </th>
                    </tr>
                    <tr>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        #
                      </th>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        nombre
                      </th>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        Apellidos
                      </th>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        Rol
                      </th>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        Dni
                      </th>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        Celular
                      </th>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        email
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
                      usuarios.map((item, index) => {
                        return (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.tipo_de_usuario}</td>
                            <td>{item.dni}</td>
                            <td>{item.celular}</td>
                            <td>{item.email}</td>
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
                                    onClick={() => selectUsuario(item)}
                                  >
                                    <i className="fa fa-edit"></i>
                                    &nbsp; Editar
                                  </DropdownItem>
                                  <DropdownItem
                                    style={{
                                      background: "#ec4561",
                                      color: "#fff",
                                    }}
                                    onClick={() => eliminarUsuario(item, false)}
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

export default Usuario;
