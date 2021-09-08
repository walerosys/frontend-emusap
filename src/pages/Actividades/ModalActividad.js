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

const ModalActividad = ({ modal, toggle, actividad, saveActividad }) => {
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      nombre: actividad.nombre,
      actividad: actividad.actividad,
      unidad_de_medida: actividad.unidad_de_medida,
      especificacion: actividad.especificacion,
      costo: actividad.costo,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    saveActividad(data);
  };
  return (
    <Modal isOpen={modal} toggle={toggle} size="md" centered>
      <ModalHeader
        style={{ background: "#02a499", color: "#fff" }}
        toggle={toggle}
      >
        {actividad.id !== "" ? "Editar Actividad" : "Nueva Actividad"}
      </ModalHeader>
      <ModalBody>
        <Form
          className="needs-validation"
          noValidate=""
          onSubmit={handleSubmit(onSubmit)}
        >
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
          <div className="form-row">
            <Col md="12 mb-6">
              <Label htmlFor="validationDefault01">Actividad:</Label>
              <Input
                className="form-control"
                type="text"
                name="actividad"
                innerRef={register({ required: true })}
              />
              <span className="validacion">
                {errors.actividad && "La actividad es requerido"}
              </span>
            </Col>
          </div>
          <br />
          <div className="form-row">
            <Col md="12 mb-6">
              <Label htmlFor="validationDefault01">Und:</Label>
              <Input
                className="form-control"
                type="text"
                name="unidad_de_medida"
                innerRef={register({ required: true })}
              />
              <span className="validacion">
                {errors.unidad_de_medida && "La und. es requerido"}
              </span>
            </Col>
          </div>
          <br />
          <div className="form-row">
            <Col md="12 mb-6">
              <Label htmlFor="validationDefault01">Especificacion:</Label>
              <Input
                className="form-control"
                type="text"
                name="especificacion"
                innerRef={register({ required: true })}
              />
              <span className="validacion">
                {errors.especificacion && "La especificacion es requerido"}
              </span>
            </Col>
          </div>
          <br />
          <div className="form-row">
            <Col md="12 mb-6">
              <Label htmlFor="validationDefault01">Costo:</Label>
              <Input
                className="form-control"
                type="number"
                name="costo"
                step="0.01"
                innerRef={register({ required: true })}
              />
              <span className="validacion">
                {errors.costo && "El cosoto es requerido"}
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

export default ModalActividad;
