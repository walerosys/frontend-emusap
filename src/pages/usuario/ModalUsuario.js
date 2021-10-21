import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Col,
  Button,
  Input,
  Row,
  Control,
} from "reactstrap";
import { useForm } from "react-hook-form";
import "../../assets/css/Validacion.css";
import Password from "antd/lib/input/Password";

const ModalUsuario = ({ modal, toggle, usuario, saveUsuario }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      name: usuario.name,
      last_name: usuario.last_name,
      dni: usuario.dni,
      celular: usuario.celular,
      tipo_usuario: usuario.tipo_usuario,
      email: usuario.email,
      password: usuario.password,
      password_confirmation: usuario.password_confirmation,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    saveUsuario(data);
  };
  return (
    <Modal isOpen={modal} toggle={toggle} size="md" centered>
      <ModalHeader
        style={{ background: "#02a499", color: "#fff" }}
        toggle={toggle}
      >
        {usuario.id !== "" ? "Editar Tipo" : "Tipo de Inst."}
      </ModalHeader>
      <ModalBody>
        <Form
          className="needs-validation"
          noValidate=""
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-row">
            <Col md="12 mb-6">
              <Label htmlFor="validationDefault01">nombre:</Label>
              <Input
                className="form-control"
                type="text"
                name="name"
                innerRef={register({ required: true })}
              />
              <span className="validacion">
                {errors.name && "El nombre es requerido"}
              </span>
            </Col>
          </div>
          <br />
          <div className="form-row">
            <Col md="12 mb-6">
              <Label htmlFor="validationDefault01">Apellidos:</Label>
              <Input
                className="form-control"
                type="text"
                name="last_name"
                innerRef={register({ required: true })}
              />
              <span className="validacion">
                {errors.last_name && "Los apellidos son requeridos"}
              </span>
            </Col>
          </div>
          <br />
          <div className="form-row">
            <Col md="12 mb-6">
              <Label htmlFor="validationDefault01">Dni:</Label>
              <Input
                className="form-control"
                type="text"
                name="dni"
                innerRef={register({ required: true })}
              />
              <span className="validacion">
                {errors.dni && "El dni es requerido"}
              </span>
            </Col>
          </div>
          <br />
          <div className="form-row">
            <Col md="12 mb-6">
              <Label htmlFor="validationDefault01">Celular:</Label>
              <Input
                className="form-control"
                type="text"
                name="celular"
                innerRef={register({ required: true })}
              />
              <span className="validacion">
                {errors.celular && "El num. de celular es requerido"}
              </span>
            </Col>
          </div>
          <br />
          <div className="form-row">
            <Col md="12 mb-6">
              <Label htmlFor="validationDefault01">Rol:</Label>
              <Input
                className="form-control"
                type="select"
                name="tipo_usuario"
                innerRef={register({ required: true })}
              >
                {usuario.id !== "" ? (
                  usuario.tipo_usuario == "admin" ? (
                    <>
                      <option value={usuario.tipo_usuario}>
                        Administrador
                      </option>
                      <option value="user">Usuario</option>
                    </>
                  ) : (
                    <>
                      <option value={usuario.tipo_usuario}>Usuario</option>
                      <option value="admin">Administrador</option>
                    </>
                  )
                ) : (
                  <>
                    <option value="admin">Administrador</option>
                    <option value="user">Usuario</option>
                  </>
                )}
              </Input>
              <span className="validacion">
                {errors.tipo_usuario && "El rol de usuario es requerido"}
              </span>
            </Col>
          </div>
          <br />
          {usuario.id !== "" ? (
            <></>
          ) : (
            <>
              <div className="form-row">
                <Col md="12 mb-6">
                  <Label htmlFor="validationDefault01">Email:</Label>
                  <Input
                    className="form-control"
                    type="text"
                    name="email"
                    innerRef={register({ required: true })}
                  />
                  <span className="validacion">
                    {errors.email && "El correo es requerido"}
                  </span>
                </Col>
              </div>
              <br />
              <div className="form-row">
                <Col md="12 mb-6">
                  <Label htmlFor="validationDefault01">Password:</Label>
                  <Input
                    className="form-control"
                    type="text"
                    name="password"
                    innerRef={register({ required: true })}
                  />
                  <span className="validacion">
                    {errors.password && "La contraseña es requerido"}
                  </span>
                </Col>
              </div>
              <br />
              <div className="form-row">
                <Col md="12 mb-6">
                  <Label htmlFor="validationDefault01">
                    Password Confirmation:
                  </Label>
                  <Input
                    className="form-control"
                    type="text"
                    name="password_confirmation"
                    innerRef={register({ required: true })}
                  />
                  <span className="validacion">
                    {errors.password_confirmation &&
                      "La confirmacion de contraseña es requerido"}
                  </span>
                </Col>
              </div>
              <br />
            </>
          )}

          <Row>
            <Col className="text-right">
              <Button color="success">Guardar</Button>
              &nbsp; &nbsp;
              <Button color="danger" onClick={() => toggle()}>
                Cancelar
              </Button>
            </Col>
          </Row>
        </Form>
        <br />
      </ModalBody>
    </Modal>
  );
};

export default ModalUsuario;
