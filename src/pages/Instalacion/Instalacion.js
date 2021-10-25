import React, { Fragment, useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Table,
  Alert,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import axios from "axios";
import BreadCrumb from "../../layout/Breadcrumb";
import { useSelector } from "react-redux";
import SweetAlert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import url from "../../config/Url";
//import "./assets/css/Validacion.css";
import "antd/dist/antd.css";
import { Select } from "antd";
const MySwal = withReactContent(SweetAlert);

const Instalacion = () => {
  const token = useSelector((state) => state.Auth.token);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [tipos, setTipos] = useState([]);
  const [elementos, setElementos] = useState([]);
  const [actividades, setActividades] = useState([]);
  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const [costeo, setCosteo] = useState({
    longitud: 1,
    costo: 0,
  });
  const [actividad, setActividad] = useState({
    id: "",
    nombre: "",
    actividad: "",
    unidad_de_medida: "",
    especificacion: "",
    costo: "",
    costo_total: "",
  });
  const [form, setForm] = useState({
    id: "",
    tipo_id: "",
    uservicio_id: "",
    user_id: "",
    fecha: "",
    sub_total: "",
    utilidad: "",
    igv: "",
    monto_total: "",
    deinstalacion: [],
  });
  const handleChange = (e) => {
    if (!isDisabled) {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    } else if (isDisabled) {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
    if (e.target.name === "longitud") {
      setCosteo({
        ...costeo,
        longitud: e.target.value,
      });
      setActividad({
        ...actividad,
        costo_total: costeo.costo * e.target.value,
      });
    }
  };
  const add = () => {
    setVisible(false);
    let val = false;
    let array = localStorage.getItem("myArray");
    array = JSON.parse(array);
    for (let i = 0; i < array.length; i++) {
      if (array[i].actividad_id == actividad.id) {
        val = true;
      }
    }
    if (val == true || actividad.id == "") {
      MySwal.fire({
        didOpen: () => {
          MySwal.clickConfirm();
        },
      }).then(() => {
        return MySwal.fire({
          title: "Aviso",
          text: "Elija una actividad diferente!",
        });
      });
    } else {
      array.push({
        actividad_id: actividad.id,
        nombre: actividad.nombre,
        acti: actividad.actividad,
        cost: actividad.costo,
        cantidad: costeo.longitud,
        costo_de_instalacion: actividad.costo_total,
      });
    }
    localStorage.setItem("myArray", JSON.stringify(array));
    /*array = localStorage.getItem("myArray");
    array = JSON.parse(array);*/
    setElementos(array);
    /*console.log(array);
    console.log("array1");
    console.log(elementos);
    console.log("array2");*/
    operaciones(array);
    setCosteo({
      ...costeo,
      longitud: 1,
    });
  };

  const onChange = (val) => {
    console.log(`selected ${val}`);
    getActividadesId(val);
  };
  const onChange2 = (val) => {
    console.log(`tipo ${val}`);
    setForm({
      ...form,
      tipo_id: val,
    });
  };
  const operaciones = (ope) => {
    let sub = 0;
    let util = 0;
    let ig = 0;
    let mtotal = 0;
    /* console.log("ope1");
    console.log(ope[0].costo_de_instalacion);
    console.log(ope.length);
    console.log("ope2");*/
    if (ope.length !== 0) {
      for (let i = 0; i < ope.length; i++) {
        sub = sub + ope[i].costo_de_instalacion;
      }
      util = sub * 0.15;
      sub = sub + util;
      ig = sub * 0.18;
      mtotal = sub + ig;
      setForm({
        ...form,
        sub_total: sub,
        utilidad: util,
        igv: ig,
        monto_total: mtotal,
      });
    }
  };

  const eliminar = (array, index) => {
    MySwal.fire({
      title: "Estas seguro(a)?",
      text: "Estas a punto de eliminar la actividad de la tabla!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, seguro!",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        array.splice(index, 1);
        localStorage.setItem("myArray", JSON.stringify(array));
        setElementos(array);
        operaciones(array);
        MySwal.fire(
          "Eliminado!",
          "Acaba de eliminar una actividad de la tabla.",
          "success"
        );
        setVisible(true);
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire("Cancelado", "Acaba de cancelar", "error");
      }
    });
  };

  const cancelar = () => {
    const array = [];
    localStorage.setItem("myArray", JSON.stringify(array));
    setForm({
      ...form,
      id: "",
      uservicio_id: "",
      user_id: "",
      fecha: "",
      sub_total: "",
      utilidad: "",
      igv: "",
      monto_total: "",
      deinstalacion: [],
    });
  };

  const getTipos = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
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
  const getActividadesId = async (val) => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      let res = await axios.get(`${url}auth/showactividadid?id=${val}`, config);
      let response = res.data;
      console.log(response.data.costo);
      if (response.success) {
        setCosteo({
          costo: response.data.costo,
        });
        setActividad({
          // ...actividad,
          id: response.data.id,
          nombre: response.data.nombre,
          actividad: response.data.actividad,
          unidad_de_medida: response.data.unidad_de_medida,
          especificacion: response.data.especificacion,
          costo: response.data.costo,
          costo_total: response.data.costo,
        });
        //console.log(costeo.costo);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getActividades = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      let res = await axios.get(`${url}auth/allactividad?per_page=500`, config);
      let response = res.data;
      console.log(response);
      if (response.success) {
        setActividades(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let userid = JSON.parse(localStorage.getItem("usuario"));
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      let res = await axios.post(
        `${url}auth/registerinstalacion`,
        {
          tipo_id: form.tipo_id,
          uservicio_id: 1,
          user_id: userid.id,
          fecha: "2021-08-13 19:07:45",
          sub_total: form.sub_total,
          utilidad: form.utilidad,
          igv: form.igv,
          monto_total: form.monto_total,
          deinstalacion: elementos,
          /* [
            { actividad_id: 6, cantidad: 2, costo_de_instalacion: 21.6 },
            { actividad_id: 5, cantidad: 2, costo_de_instalacion: 22.7 },
          ],*/
        },
        config
      );
      let response = res.data;
      console.log(response);
      cancelar();
      if (response.success) {
        MySwal.fire(
          "Registrado!",
          "Registro completado exitosamente",
          "success"
        );
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getTipos();
    getActividades();
  }, []);
  return (
    <Fragment>
      <Container>
        <Row>
          <BreadCrumb
            parent="Instalación"
            subparent="cotización"
            title="total"
          />
        </Row>
        <Row className="d-flex justify-content-center">
          <Col className="text-center">
            <Card>
              <CardBody>
                <Form
                  className="needs-validation"
                  noValidate=""
                  onSubmit={handleSubmit}
                >
                  <Row md={12}>
                    <Col md={3}></Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label htmlFor="validationDefault01">
                          Seleccione el Tipo de Instalación:
                        </Label>
                        <Select
                          showSearch
                          style={{ width: 200 }}
                          placeholder="Tipo de Instalación"
                          optionFilterProp="children"
                          onChange={onChange2}
                          // onFocus={onFocus}
                          // onBlur={onBlur}
                          // onSearch={onSearch}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {tipos.map((item) => {
                            return (
                              <Option key={item.id} value={item.id}>
                                {item.nombre}
                              </Option>
                            );
                          })}
                        </Select>
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label htmlFor="validationDefault01">
                          Seleccione la actividad:
                        </Label>
                        <Select
                          showSearch
                          style={{ width: 200 }}
                          placeholder="Seleccione una Actividad"
                          optionFilterProp="children"
                          onChange={onChange}
                          // onFocus={onFocus}
                          // onBlur={onBlur}
                          // onSearch={onSearch}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {actividades.map((item) => {
                            return (
                              <Option key={item.id} value={item.id}>
                                {item.nombre}
                              </Option>
                            );
                          })}
                        </Select>
                      </FormGroup>
                    </Col>
                    <Col md={3}></Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="validationDefault01">Actividad:</Label>
                        <Input
                          className="form-control"
                          type="text"
                          name="actividad"
                          onChange={handleChange}
                          defaultValue={actividad.nombre}
                          readOnly
                          // innerRef={register({ required: true })}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="validationDefault01">Costo:</Label>
                        <Input
                          className="form-control"
                          type="number"
                          name="costo"
                          onChange={handleChange}
                          defaultValue={actividad.costo}
                          readOnly
                          // innerRef={register({ required: true })}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="validationDefault01">Long:</Label>
                        <Input
                          className="form-control"
                          type="number"
                          name="longitud"
                          onChange={handleChange}
                          defaultValue={costeo.longitud}
                          // innerRef={register({ required: true })}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="validationDefault01">Total:</Label>
                        <Input
                          className="form-control"
                          type="number"
                          name="costo_total"
                          onChange={handleChange}
                          defaultValue={actividad.costo_total}
                          readOnly
                          // innerRef={register({ required: true })}
                        />
                      </FormGroup>
                    </Col>
                    <Col style={{ paddingTop: 30 }}>
                      <Button color="success" onClick={() => add()}>
                        Agregar
                      </Button>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <div>
                      <Alert color="info" isOpen={visible}>
                        Aviso{" "}
                        <a href="#" className="alert-link">
                          acabas de eliminar una actividad de la lista
                        </a>
                        . Gracias.
                      </Alert>
                    </div>
                  </Row>
                  <Row>
                    <Table hover>
                      <thead>
                        <tr>
                          <th
                            style={{ background: "#02a499", color: "#fff" }}
                            colSpan="7"
                          >
                            Actividades
                          </th>
                        </tr>
                        <tr>
                          <th style={{ background: "#02a499", color: "#fff" }}>
                            #
                          </th>
                          <th style={{ background: "#02a499", color: "#fff" }}>
                            Name
                          </th>
                          <th style={{ background: "#02a499", color: "#fff" }}>
                            Actividad
                          </th>
                          <th style={{ background: "#02a499", color: "#fff" }}>
                            Costo
                          </th>
                          <th style={{ background: "#02a499", color: "#fff" }}>
                            Cantidad
                          </th>
                          <th style={{ background: "#02a499", color: "#fff" }}>
                            Total
                          </th>
                          <th style={{ background: "#02a499", color: "#fff" }}>
                            Acción
                          </th>
                        </tr>
                      </thead>
                      {elementos.length === 0 ? (
                        <tbody>
                          <tr className="text-center">
                            <td colSpan="7">No hay actividades agregadas</td>
                          </tr>
                        </tbody>
                      ) : (
                        <tbody>
                          {elementos.map((item, index) => {
                            return (
                              <tr key={item.actividad_id}>
                                <td>{index + 1}</td>
                                <td>{item.nombre}</td>
                                <td>{item.acti}</td>
                                <td>{item.cost}</td>
                                <td>{item.cantidad}</td>
                                <td>{item.costo_de_instalacion}</td>
                                <td>
                                  <UncontrolledDropdown direction="left">
                                    <DropdownToggle
                                      color="primary"
                                      style={{
                                        paddingLeft: 15,
                                        paddingRight: 15,
                                      }}
                                    >
                                      <i className="fa fa-ellipsis-v"></i>
                                    </DropdownToggle>
                                    <DropdownMenu style={{ padding: 0 }}>
                                      <DropdownItem
                                        style={{
                                          background: "#f8b425 ",
                                          color: "#fff",
                                        }} /*
                                    onClick={() => selectActividad(item)}*/
                                      >
                                        <i className="fa fa-edit"></i>
                                        &nbsp; Editar
                                      </DropdownItem>
                                      <DropdownItem
                                        style={{
                                          background: "#ec4561",
                                          color: "#fff",
                                        }}
                                        onClick={() =>
                                          eliminar(elementos, index)
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
                          })}
                        </tbody>
                      )}
                    </Table>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="validationDefault01">SubTotal:</Label>
                        <Input
                          className="form-control"
                          type="text"
                          name="sub_total"
                          disabled={isDisabled}
                          onChange={handleChange}
                          defaultValue={form.sub_total}
                          // innerRef={register({ required: true })}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="validationDefault01">Utilidad:</Label>
                        <Input
                          className="form-control"
                          type="text"
                          name="utilidad"
                          disabled={isDisabled}
                          onChange={handleChange}
                          defaultValue={form.utilidad}
                          // innerRef={register({ required: true })}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="validationDefault01">IGV:</Label>
                        <Input
                          className="form-control"
                          type="text"
                          name="igv"
                          disabled={isDisabled}
                          onChange={handleChange}
                          defaultValue={form.igv}
                          // innerRef={register({ required: true })}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label htmlFor="validationDefault01">
                          Monto Total:
                        </Label>
                        <Input
                          className="form-control"
                          type="text"
                          name="monto_total"
                          disabled={isDisabled}
                          onChange={handleChange}
                          defaultValue={form.monto_total}
                          // innerRef={register({ required: true })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col md={4}></Col>
                    <Col md={4} className="text-center">
                      <Button color="success">Guardar</Button>
                      &nbsp; &nbsp;
                      <Button color="danger" onClick={() => cancelar()}>
                        Cancelar
                      </Button>
                    </Col>
                    <Col md={4}></Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default Instalacion;
