import React, { Fragment, useState, useEffect } from "react";
import {
  Table,
  Container,
  Row,
  Col,
  CardBody,
  Card,
  DropdownMenu,
  Label,
  DropdownItem,
  Form,
  FormGroup,
  DropdownToggle,
  Button,
  UncontrolledDropdown,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

//import Paginator from "../../components/Paginator";
import DatePicker from "react-datepicker";
import BreadCrumb from "../../layout/Breadcrumb";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/css/Search.css";
//import url from "../../config/Url";
import { useSelector } from "react-redux";
import axios from "axios";
import ExcelExport from "react-export-excel";
//import ModalDetalle from "../ModalDetalle";
//import SweetAlert from "sweetalert2";
//import withReactContent from "sweetalert2-react-content";
//import Ticket from "../Formato/Ticket";
import moment from "moment";
import Pagination from "react-js-pagination";

//const MySwal = withReactContent(SweetAlert);
const ExcelFile = ExcelExport.ExcelFile;
const ExcelSheet = ExcelExport.ExcelSheet;
const ExcelColumn = ExcelExport.ExcelColumn;

const Reporte = () => {
  const token = useSelector((state) => state.Auth.token);

  const [modal, setModal] = useState(false);
  //const toggle = () => setModal(!modal);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [search, setSearch] = useState("");
  const [endDate, setEndDate] = useState("");
  const [formato, setFormato] = useState({
    fila: 10,
  });
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vacio, setVacio] = useState(false);

  const getTickets = async () => {
    console.log(formato.fila);
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Token ${token}` },
      };
      let res = await axios.get(/*
        `http://localhost:8000/api/reporte/?start=2021/02/04&end=2021/02/23&amount=${formato.fila}&page=${page}`,
        config
      */);
      let response = await res.data;
      console.log(response);
      if (response.status === 200) {
        if (response.data.length !== 0) {
          setTickets(response.data);
          setTotal(response.data.count);
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

  useEffect(() => {
    getTickets();
    setStartDate("");
    setEndDate("");
  }, [search, formato, page]);

  const handleChange = (e) => {
    if (e.target.name === "fila") {
      setFormato({
        fila: e.target.value,
      });
    } else {
      setSearch(e.target.value);
    }
  };
  useEffect(() => {
    if (startDate !== "" && endDate !== "") {
      getDateTicket();
    }
  }, [startDate, endDate]);

  const getDateTicket = async () => {
    setLoading(true);
    try {
      /* const config = {
        headers: { Authorization: `Token ${token}` },
      };*/
      let res = await axios.get(/*
        `http://localhost:8000/api/reporte/?start=${moment(startDate).format(
          "YYYY-MM-DD"
        )}&end=${moment(endDate).format("YYYY-MM-DD")}&amount=${
          formato.fila
        }&page=${page}`
      */);
      let response = await res.data;
      console.log(response);
      if (response.status === 200) {
        if (response.data.length !== 0) {
          setTickets(response.data);
          setTotal(response.data.count);
          console.log(response.data.count);
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

  return (
    <Fragment>
      <Container>
        <Row>
          <BreadCrumb
            parent="Instalaciones"
            subparent="Informe"
            title="General"
          />
        </Row>
        <Row className="d-flex justify-content-center">
          <Col className="text-center">
            <Card>
              <CardBody>
                <Row>
                  <Col sm="3" className="text-left">
                    <Label htmlFor="validationCustom01">Busqueda:</Label>

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
                  <Col sm="3" className="text-left">
                    <Label htmlFor="validationCustom01">Fecha de Inicio:</Label>
                    <DatePicker
                      className="form-control"
                      dateFormat="dd/MM/yyyy"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                    />
                  </Col>

                  <Col sm="3" className="text-left">
                    <Label htmlFor="validationCustom01">
                      Fecha de Término:
                    </Label>
                    <DatePicker
                      className="form-control"
                      dateFormat="dd/MM/yyyy"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                    />
                  </Col>

                  <Col sm="2" className="text-left">
                    <Label htmlFor="validationCustom01">Fila por Página:</Label>
                    <Input
                      className="form-control"
                      type="select"
                      name="fila"
                      onChange={handleChange}
                      value={formato.fila}
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </Input>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col sm="10" className="text-right"></Col>
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
                        colSpan="9"
                      >
                        Lista de Instalaciones
                      </th>
                    </tr>
                    <tr>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        #
                      </th>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        N°
                      </th>

                      <th style={{ background: "#02a499", color: "#fff" }}>
                        Estado
                      </th>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        At. Por
                      </th>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        Ssss
                      </th>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        Sttt
                      </th>
                      <th style={{ background: "#02a499", color: "#fff" }}>
                        costo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr className="text-center">
                        <td colSpan="9">
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
                        <td colSpan="9">No hay ningun registro</td>
                      </tr>
                    ) : (
                      tickets.map((item, index) => {
                        return (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.ticket_nro}</td>
                            <td>{item.estado}</td>
                            <td>{item.atendido_por}</td>
                            <td>{item.subgerencia}</td>
                            <td>{item.servicio}</td>
                            <td>{item.ventanilla}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </Table>
                <Row>
                  <Col className="d-flex justify-content-center">
                    {total !== 0 ? (
                      <Pagination
                        activePage={page}
                        itemsCountPerPage={formato.fila}
                        totalItemsCount={total}
                        pageRangeDisplayed={1}
                        onChange={(pageNumber) => setPage(pageNumber)}
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="active"
                      />
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

export default Reporte;
