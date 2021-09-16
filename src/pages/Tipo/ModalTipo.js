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

const ModalTipo = ({ modal, toggle, tipo, saveTipo }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      codigo: tipo.codigo,
      nombre: tipo.nombre,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    saveTipo(data);
  };
  return (
    <Modal isOpen={modal} toggle={toggle} size="md" centered>
      <ModalHeader
        style={{ background: "#02a499", color: "#fff" }}
        toggle={toggle}
      >
        {tipo.id !== "" ? "Editar Tipo" : "Tipo de Inst."}
      </ModalHeader>
      <ModalBody>
        <Form
          className="needs-validation"
          noValidate=""
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-row">
            <Col md="12 mb-6">
              <Label htmlFor="validationDefault01">Código:</Label>
              <Input
                className="form-control"
                type="text"
                name="codigo"
                innerRef={register({ required: true })}
              />
              <span className="validacion">
                {errors.codigo && "El código es requerido"}
              </span>
            </Col>
          </div>
          <br />
          <div className="form-row">
            <Col md="12 mb-6">
              <Label htmlFor="validationDefault01">Nombre:</Label>
              <Input
                className="form-control"
                type="text"
                name="nombre"
                innerRef={register({ required: true })}
              />
              <span className="validacion">
                {errors.nombre && "El nombre es requerido"}
              </span>
            </Col>
          </div>
          <br />
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

export default ModalTipo;
