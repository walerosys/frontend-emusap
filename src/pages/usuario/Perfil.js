import React, { Fragment, useState } from "react";
import BreadCrumb from "../../layout/Breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Button,
} from "reactstrap";
import { Media, FormGroup, Label, Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import url from "../../config/Url";
import axios from "axios";

const Perfil = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const datos = useSelector((state) => state.Auth.usuario);
  const token = useSelector((state) => state.Auth.token);
  const dataUser = JSON.parse(datos);
  const [usuario, setUsuario] = useState({
    id: dataUser.id,
    name: dataUser.name,
    last_name: dataUser.last_name,
    dni: dataUser.dni,
    celular: dataUser.celular,
    email: dataUser.email,
  });
  console.log(dataUser.id);

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      let res = await axios.post(
        `${url}auth/update`,
        {
          id: usuario.id,
          name: usuario.name,
          last_name: usuario.last_name,
          dni: usuario.dni,
          celular: usuario.celular,
          email: usuario.email,
        },
        config
      );
      let response = res.data;
      if (response.success) {
        console.log(response.message);
      }
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  /*
  const updateRol = () => {
    let newArr = {
      ...dataUser,
      role: "desarrollador",
    };
    dispatch({ type: "CHANGE_ROLE", payload: newArr });
    history.push(MENU(newArr.role, newArr.modules).page);
  };

  const checkRol = () => {
    let newArr = {
      ...dataUser,
      role: "recursos.humanos",
    };
    dispatch({ type: "CHANGE_ROLE", payload: newArr });
    history.push(MENU(newArr.role, newArr.modules).page);
  };*/

  return (
    <div>
      <Fragment>
        <BreadCrumb parent="Inicio" subparent="Perfil" title="Editar perfil" />
        <Container fluid={true}>
          <div className="edit-profile">
            <Form
              className="needs-validation"
              noValidate=""
              onSubmit={handleSubmit}
            >
              <Row>
                <Col lg="4">
                  <Card>
                    <CardHeader>
                      <h4 className="card-title mb-0">Mi perfil</h4>
                      <div className="card-options">
                        <a className="card-options-collapse" href="#javascript">
                          <i className="fe fe-chevron-up"></i>
                        </a>
                        <a className="card-options-remove" href="#javascript">
                          <i className="fe fe-x"></i>
                        </a>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <div>
                        <Row className="mb-2">
                          <div className="col-auto">
                            <Media
                              className="img-70 rounded-circle"
                              alt=""
                              src={require("../../assets/images/user/7.jpg")}
                            />
                          </div>
                          <Col>
                            <h3 className="mb-1">
                              {dataUser.name.toUpperCase()}
                            </h3>
                            <p className="mb-4">
                              {dataUser.tipo_de_usuario.toUpperCase()}
                            </p>
                          </Col>
                        </Row>
                        {/*
                        <FormGroup>
                          <Label className="form-label">Usuario</Label>
                          <Input
                            disabled
                            className="form-control"
                            value={dataUser.email}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-label">Nueva contraseña</Label>
                          <Input className="form-control" type="password" />
                        </FormGroup>
                        <FormGroup>
                          <Label className="form-label">
                            Repetir nueva contraseña
                          </Label>
                          <Input className="form-control" type="password" />
                        </FormGroup>
                        <div className="form-footer">
                          <button
                            
                            className="btn btn-success btn-block"
                          >
                            Save
                          </button>
                        </div>
                      */}
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="8">
                  <div className="card">
                    <CardHeader>
                      <h4 className="card-title mb-0">Edit Profile</h4>
                      <div className="card-options">
                        <a className="card-options-collapse" href="#javascript">
                          <i className="fe fe-chevron-up"></i>
                        </a>
                        <a className="card-options-remove" href="#javascript">
                          <i className="fe fe-x"></i>
                        </a>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <Label className="form-label">Nombre</Label>
                            <Input
                              className="form-control"
                              type="text"
                              name="name"
                              onChange={handleChange}
                              value={usuario.name}
                              placeholder="Nombre"
                            />
                          </FormGroup>
                        </Col>
                        <div className="col-sm-6 col-md-6">
                          <FormGroup>
                            <Label className="form-label">Apellidos</Label>
                            <Input
                              className="form-control"
                              type="text"
                              name="last_name"
                              onChange={handleChange}
                              value={usuario.last_name}
                              placeholder="Apellidos"
                            />
                          </FormGroup>
                        </div>
                        <div className="col-sm-6 col-md-4">
                          <FormGroup>
                            <Label className="form-label">Dni</Label>
                            <Input
                              className="form-control"
                              type="text"
                              name="dni"
                              onChange={handleChange}
                              value={usuario.dni}
                              placeholder="Dni"
                            />
                          </FormGroup>
                        </div>
                        <div className="col-sm-6 col-md-4">
                          <FormGroup>
                            <Label className="form-label">Email address</Label>
                            <Input
                              className="form-control"
                              type="email"
                              name="email"
                              onChange={handleChange}
                              value={usuario.email}
                              placeholder="Email"
                            />
                          </FormGroup>
                        </div>
                        <div className="col-sm-6 col-md-6"></div>
                        <div className="col-md-12"></div>
                        <div className="col-sm-6 col-md-4">
                          <FormGroup>
                            <Label className="form-label">Celular</Label>
                            <Input
                              className="form-control"
                              type="number"
                              name="celular"
                              onChange={handleChange}
                              value={usuario.celular}
                              placeholder="Celular"
                            />
                          </FormGroup>
                        </div>
                        <div className="col-sm-6 col-md-3"></div>
                        <div className="col-md-5"></div>
                        <div className="col-md-12"></div>
                      </Row>
                    </CardBody>
                    <br />
                    <br />
                    <br />
                    <CardFooter className="text-right">
                      <Button className="btn btn-primary">
                        Update Profile
                      </Button>
                    </CardFooter>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </Container>
      </Fragment>
    </div>
  );
};

export default Perfil;
