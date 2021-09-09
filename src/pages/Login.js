import React, { useState } from "react";
import Axios from "axios";
import {
  Container,
  Row,
  Col,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import url from "../config/Url";
import "../assets/css/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { MENU } from "../config/Roles";
import SweetAlert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(SweetAlert);

const Login = (props) => {
  //const role = useSelector((state) => state.Auth.data.role);
  //const dataArea = useSelector((state) => state.Auth.data.modules);
  const AuthStatus = useSelector((state) => state.Auth.AuthStatus);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    user: "",
    pass: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch({ type: "LOADING_AUTH", payload: true });
    try {
      let res = await Axios.post(`${url}auth/login/`, {
        email: credentials.user,
        password: credentials.pass,
      });
      let response = res.data;
      console.log(response.usuario[0].tipo_de_usuario);
      //if (response.success) {
      setLoading(false);
      dispatch({ type: "LOADING_AUTH", payload: false });
      if (response.usuario[0].tipo_de_usuario === "user") {
        dispatch({ type: "SIGNIN", payload: response });
      } else {
        MySwal.fire({
          icon: "error",
          title: "Error",
          text: "Este perfil, no esta permitido el ingreso a este sistema",
        });
      }
      // } else {
      //   setLoading(false);
      //   dispatch({ type: "LOADING_AUTH", payload: false });
      //   SweetAlert.fire({
      //     title: "¡usuario o contraseña incorrectos!",
      //     text: "¡Revise que haya escrito correctamente...!",
      //     icon: "error",
      //   });
      // }
    } catch (error) {
      setLoading(false);
      dispatch({ type: "LOADING_AUTH", payload: false });
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const alreadyLogin = () => {
    return <Redirect to={MENU().page} />;
  };

  if (AuthStatus) {
    return alreadyLogin();
  }

  return (
    <div className="page-wrapper">
      <Container fluid={true} className="p-0">
        <div className="authentication-main m-0">
          <Row>
            <Col md="12">
              <div className="auth-innerright shadow-lg">
                <div className="authentication-box">
                  <CardBody className="h-100-d-center">
                    <div className="cont text-center b-light">
                      <h1 style={{ fontFamily: "fantasy", marginBottom: 30 }}>
                        SISTEMA DE COTIZACION
                      </h1>
                      <div>
                        <Form
                          onSubmit={handleSubmit}
                          className="theme-form"
                          style={{ paddingRight: 50 }}
                        >
                          <h4>Iniciar sesión</h4>
                          <h6>Ingrese su usuario y contraseña</h6>
                          <FormGroup>
                            <Label className="col-form-label pt-0">
                              Tu usuario:
                            </Label>
                            <Input
                              className="form-control"
                              type="email"
                              name="user"
                              onChange={handleChange}
                              defaultValue={credentials.user}
                              required=""
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label className="col-form-label">
                              Contraseña:
                            </Label>
                            <Input
                              className="form-control"
                              type="password"
                              name="pass"
                              onChange={handleChange}
                              defaultValue={credentials.pass}
                              required=""
                            />
                          </FormGroup>
                          <FormGroup className="form-row mt-3 mb-0">
                            {loading ? (
                              <Button
                                color="primary btn-block"
                                disabled={loading}
                              >
                                LOADING...
                              </Button>
                            ) : (
                              <Button color="primary btn-block">Acceder</Button>
                            )}
                          </FormGroup>
                        </Form>
                      </div>
                      <div className="sub-cont" style={{ marginTop: 90 }}>
                        <div className="img"></div>
                      </div>
                    </div>
                  </CardBody>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Login;
