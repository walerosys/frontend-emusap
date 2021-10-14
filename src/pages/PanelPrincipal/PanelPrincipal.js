import React, { Fragment, useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Container,
  Button,
  Label,
  Input,
} from "reactstrap";
import moment from "moment";
import url from "../../config/Url";
import BreadCrumb from "../../layout/Breadcrumb";
import Chart from "react-apexcharts";
//import ApexCharts from "react-apexcharts";
import { useSelector } from "react-redux";
import axios from "axios";

const PanelPrincipal = () => {
  const token = useSelector((state) => state.Auth.token);
  const [tickets, setTickets] = useState([]);
  const [ticketsG1, setTicketsG1] = useState([]);
  const [ticketsG2, setTicketsG2] = useState([]);
  const [grafico1, setGrafico1] = useState({ x: [], y: [] });
  const [grafico2, setGrafico2] = useState({ x: [], y: [] });
  const [formato, setFormato] = useState({ fila: "1" });
  const [formato2, setFormato2] = useState({ fila2: "21" });
  const [formato3, setFormato3] = useState({ fila3: "31" });
  const [formato4, setFormato4] = useState({ fila4: "41" });
  const [loading, setLoading] = useState(false);
  const [valoresGrafico1, setValoresGrafico1] = useState({
    atendidos: [],
    cancelados: [],
    total: [],
  });
  const [valoresGrafico2, setValoresGrafico2] = useState({
    atendidos: [],
    cancelados: [],
  });

  const dia = (f, dias) => {
    f.setDate(f.getDate() + dias);
    return f;
  };
  const mes = (f, cant) => {
    f.setMonth(f.getMonth() + cant);
    return f;
  };

  const handleChange = async (e) => {
    if (e.target.name === "fila") {
      setFormato({ fila: e.target.value });
      /* let valorGraf2 = "";
      if (formato.fila === "1") {
        valorGraf2 = "dia";
      } else {
        valorGraf2 = "dia";
      }
      try {
        const config = {
          headers: { Authorization: `Token ${token}` },
        };
        let start = new Date();
        let end = new Date();
        let res = await axios.get(
          `http://api.prueba.pe/reportes/api/reporte/tickets/?start=${moment(
            dia(end, -7)
          ).format("YYYY-MM-DD")}&end=${moment(start).format(
            "YYYY-MM-DD"
          )}&type=${valorGraf2}`,
          config
        );
        let response = await res.data;
        console.log(response);
        if (response.status === 200) {
          setTicketsG2(response.data);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }*/
    } else if (e.target.name === "fila2") {
      setFormato2({ fila2: e.target.value });
      /* let valorGraf1 = "";
      if (formato2.fila2 === "21") {
        valorGraf1 = "dia";
      } else {
        valorGraf1 = "dia";
      }
      try {
        const config = {
          headers: { Authorization: `Token ${token}` },
        };
        let start = new Date();
        let end = new Date();
        let res = await axios.get(
          `http://api.devopsacademy.pe/reportes/api/reporte/tickets/?start=${moment(
            dia(end, -7)
          ).format("YYYY-MM-DD")}&end=${moment(start).format(
            "YYYY-MM-DD"
          )}&type=${valorGraf1}`,
          config
        );
        let response = await res.data;
        console.log(response);
        if (response.status === 200) {
          setTicketsG1(response.data);
          setLoading(false);
        }
        estados(ticketsG1);
      } catch (e) {
        console.log(e);
      }*/
    }
  };

  const getTickets = async () => {
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Token ${token}` },
      };
      let start = new Date();
      let end = new Date();
      let res = await axios.get(/*
        `http://api.prueba.pe/reportes/api/reporte/tickets/?start=${moment(
          dia(end, -7)
        ).format("YYYY-MM-DD")}&end=${moment(start).format(
          "YYYY-MM-DD"
        )}&type=meses`,
        config
      */);
      let response = await res.data;
      console.log(response);
      if (response.status === 200) {
        setTickets(response.data);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const estados = (valores, grafico) => {
    let ticktsTotal = [];
    let ticetsCancelados = [];
    let ticketsAtendidos = [];
    let i = 0;
    valores.map((data) => {
      ticketsAtendidos[i] = data.atendidos;
      ticetsCancelados[i] = data.no_atendidos;
      ticktsTotal[i] = ticketsAtendidos[i] + ticetsCancelados[i];
      i = i + 1;
    });
    /*console.log("atendidos1");
    console.log(ticketsAtendidos);
    console.log(ticetsCancelados);
    console.log("atendidos2");*/
    if (grafico === "default") {
      setValoresGrafico1({
        atendidos: ticketsAtendidos,
        cancelados: ticetsCancelados,
        total: ticktsTotal,
      });
      setValoresGrafico2({
        atendidos: ticketsAtendidos,
        cancelados: ticetsCancelados,
      });
    } else if (grafico === "G1") {
      setValoresGrafico1({
        atendidos: ticketsAtendidos,
        cancelados: ticetsCancelados,
        total: ticktsTotal,
      });
    } else if (grafico === "G2") {
      setValoresGrafico2({
        atendidos: ticketsAtendidos,
        cancelados: ticetsCancelados,
      });
    }
  };
  useEffect(() => {
    getTickets();
  }, []);

  useEffect(() => {
    estados(tickets, "default");
  }, [tickets]);

  useEffect(() => {
    console.log("por fin");
    valGrafico1();
    valGrafico2();
  }, [valoresGrafico2, valoresGrafico1]);

  const contratos = [
    {
      color: "success",
      text: "10 PRUEBA1",
      icon: "cubes",
    },
    {
      color: "info",
      text: "6 PRUEBA2",
      icon: "star",
    },
    {
      color: "primary",
      text: "6 PRUEBA3",
      icon: "users-alt-3",
    },
    {
      color: "secondary",
      text: "125 PRUEBA4",
      icon: "ticket",
    },
  ];

  const valGrafico1 = () => {
    let g = new Date();
    let fecha = moment(g).format("DD/MM/YYYY");
    const diasGrafico1 = [];
    const mesesGrafico1 = [];
    for (let i = 0; i <= 6; i++) {
      if (i === 0) {
        diasGrafico1[i] = moment(g).format("DD/MM/YYYY");
      } else {
        diasGrafico1[i] = moment(dia(g, -1)).format("DD/MM/YYYY");
      }
    }
    let j = new Date();
    for (let i = 0; i <= 11; i++) {
      if (i === 0) {
        mesesGrafico1[i] = moment(j).format("MMM YYYY");
      } else {
        mesesGrafico1[i] = moment(mes(j, -1)).format("MMM YYYY");
      }
    }
    if (formato2.fila2 === "21") {
      setGrafico1({
        x: [
          {
            name: "Atendidos",
            data: valoresGrafico1.atendidos, //[5, atendidos, 16, 14, 15, 8, 5, 6, 8, 6, 4, 6],
          },
          {
            name: "Cancelados",
            data: valoresGrafico1.cancelados, //[5, cancelados, 4, 6, 7, 8, 9, 10, 11, 4, 6, 4],
          },
          {
            name: "Total",
            data: valoresGrafico1.total,
          },
        ],
        y: [
          mesesGrafico1[11],
          mesesGrafico1[10],
          mesesGrafico1[9],
          mesesGrafico1[8],
          mesesGrafico1[7],
          mesesGrafico1[6],
          mesesGrafico1[5],
          mesesGrafico1[4],
          mesesGrafico1[3],
          mesesGrafico1[2],
          mesesGrafico1[1],
          mesesGrafico1[0],
        ],
      });
      /* const pecha = new Date();
      console.log(moment(pecha).format("DD/MM/YYYY"));
      console.log(moment(mes(pecha, -12)).format("DD/MM/YYYY"));*/
    } else if (formato2.fila2 === "22") {
      setGrafico1({
        x: [
          {
            name: "Atendidos",
            data: valoresGrafico1.atendidos, //[6, 5, atendidos, 16, 14, 15, 8],
          },
          {
            name: "Cancelados",
            data: valoresGrafico1.cancelados, //[5, 6, cancelados, 14, 16, 8, 10],
          },
          {
            name: "Total",
            data: valoresGrafico1.total, //[11, 11, totalTickets, 30, 30, 23, 18],
          },
        ],
        y: [
          diasGrafico1[6],
          diasGrafico1[5],
          diasGrafico1[4],
          diasGrafico1[3],
          diasGrafico1[2],
          diasGrafico1[1],
          diasGrafico1[0],
        ],
      });
    } else if (formato2.fila2 === "24") {
      setGrafico1({
        x: [
          {
            name: "Atendidos",
            data: valoresGrafico1.atendidos, //[atendidos],
          },
          {
            name: "Cancelados",
            data: valoresGrafico1.cancelados, //[cancelados],
          },
          {
            name: "Total",
            data: valoresGrafico1.total, //[totalTickets],
          },
        ],
        y: [fecha],
      });
    } else if (formato2.fila2 === "23") {
      let j = new Date();
      setGrafico1({
        x: [
          {
            name: "Atendidos",
            data: valoresGrafico1.atendidos, //[atendidos],
          },
          {
            name: "Cancelados",
            data: valoresGrafico1.cancelados, //[cancelados],
          },
          {
            name: "Total",
            data: valoresGrafico1.total, //[totalTickets],
          },
        ],
        y: [moment(dia(j, -1)).format("LLLL")],
      });
    }
  };

  useEffect(() => {
    // estados(ticketsG1, "G1");
    estados(tickets, "default");
    valGrafico1();
  }, [formato2, formato]);

  const valGrafico2 = () => {
    let f = new Date();
    let fecha = moment(f).format("DD/MM/YYYY");
    const dias = [];
    const meses = [];
    for (let i = 0; i <= 6; i++) {
      if (i === 0) {
        dias[i] = moment(f).format("DD/MM/YYYY");
      } else {
        dias[i] = moment(dia(f, -1)).format("DD/MM/YYYY");
      }
    }
    let j = new Date();
    for (let i = 0; i <= 11; i++) {
      if (i === 0) {
        meses[i] = moment(j).format("MMM YYYY");
      } else {
        meses[i] = moment(mes(j, -1)).format("MMM YYYY");
      }
    }

    if (formato.fila === "1") {
      setGrafico2({
        x: [
          {
            name: "Atendidos",
            data: valoresGrafico2.atendidos, //[5, atendidos, 16, 14, 15, 8, 5, 6, 8, 6, 4, 6],
          },
          {
            name: "Cancelados",
            data: valoresGrafico2.cancelados, //[5, cancelados, 4, 6, 7, 8, 9, 10, 11, 4, 6, 4],
          },
        ],
        y: [
          meses[11],
          meses[10],
          meses[9],
          meses[8],
          meses[7],
          meses[6],
          meses[5],
          meses[4],
          meses[3],
          meses[2],
          meses[1],
          meses[0],
        ],
      });
    } else if (formato.fila === "2") {
      setGrafico2({
        x: [
          {
            name: "Atendidos",
            data: valoresGrafico2.atendidos, //[6, 5, atendidos, 16, 14, 15, 8],
          },
          {
            name: "Cancelados",
            data: valoresGrafico2.cancelados, //[5, 6, cancelados, 14, 16, 8, 10],
          },
        ],
        y: [dias[6], dias[5], dias[4], dias[3], dias[2], dias[1], dias[0]],
      });
    } else if (formato.fila === "4") {
      setGrafico2({
        x: [
          {
            name: "Atendidos",
            data: valoresGrafico2.atendidos, //[atendidos],
          },
          {
            name: "Cancelados",
            data: valoresGrafico2.cancelados, // [cancelados],
          },
        ],
        y: [fecha],
      });
    } else if (formato.fila === "3") {
      let j = new Date();
      setGrafico2({
        x: [
          {
            name: "Atendidos",
            data: valoresGrafico2.atendidos, //[atendidos],
          },
          {
            name: "Cancelados",
            data: valoresGrafico2.cancelados, // [cancelados],
          },
        ],
        y: [moment(dia(j, -1)).format("LLLL")],
      });
    }
  };

  useEffect(() => {
    // estados(ticketsG2, "G2");
    // estados(tickets, "default");
    valGrafico2();
  }, [formato, formato2]);

  const areaSpaline = {
    series: grafico1.x,
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#38a4f8", "#f10542", "#f8b425"],
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "date",
        categories: grafico1.y,
      },
      tooltip: {
        x: {
          format: "dd/MM/yy",
        },
      },
    },
  };
  const apexColumnChartsone = {
    series: grafico2.x,
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "80%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#51bb25", "#f10542"],
      stroke: {
        show: true,
        width: 0,
        colors: ["transparent"],
      },

      xaxis: {
        categories: grafico2.y,
      },
      yaxis: {
        title: {
          text: "(TICKETS)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "Tickets";
          },
        },
      },
    },
  };

  const apexPieChart = {
    series: [45, 12],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Atendidos A", "Cancelados C"],
      colors: ["#51bb25", "#f10542"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  const apexBarChart = {
    series: [
      {
        name: "Total de tickets",
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      },
      {
        name: "Ticket Atendidos",
        data: [300, 420, 440, 460, 530, 550, 670, 1050, 1100, 1180],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#38a4f8", "#98a4f8"],
      xaxis: {
        categories: [
          "Pablo N.",
          "Camilo R.",
          "Jorge T.",
          "Fidel C.",
          "Marco P.",
          "Francis U.",
          "Eduardo Q.",
          "Michael N.",
          "Julio P.",
          "Katy J.",
        ],
      },
    },
  };

  return (
    <Fragment>
      <Container>
        <Row>
          <BreadCrumb
            parent="Comercial"
            subparent="Cotizaciones"
            title="Panel Principal"
          />
        </Row>
        <Row className="d-flex justify-content-center">
          {contratos.map((data, index) => (
            <Col key={index}>
              <div className="item">
                <div
                  className={`card crm-icon-box text-center crm-hover-${data.color}`}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body">
                    <i
                      className={`icofont icofont-${data.icon} crm-dashboard-icon-${data.color}`}
                    ></i>
                    <i
                      className={`icofont crm-overlay icofont-${data.icon}`}
                    ></i>
                    <h6>{data.text}</h6>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <br />
        <Row>
          <Col sm="12" xl="12">
            <Card>
              <CardBody>
                <Col sm="6" className="text-left">
                  <Label>Filtro:</Label>
                  <Input
                    className="form-control"
                    type="select"
                    name="fila2"
                    onChange={handleChange}
                    value={formato2.fila2}
                  >
                    <option value="21">Último año</option>
                    <option value="22">Último 7 días</option>
                    <option value="23">Ayer</option>
                    <option value="24">Hoy</option>
                  </Input>
                </Col>
                <Chart
                  options={areaSpaline.options}
                  series={areaSpaline.series}
                  height="350"
                  type="area"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm="12" xl="12">
            <Card>
              <CardBody>
                <div>
                  <Col sm="6" className="text-left">
                    <Label>Filtro:</Label>
                    <Input
                      className="form-control"
                      type="select"
                      name="fila"
                      onChange={handleChange}
                      value={formato.fila}
                    >
                      <option value="1">Último año</option>
                      <option value="2">Último 7 días</option>
                      <option value="3">Ayer</option>
                      <option value="4">Hoy</option>
                    </Input>
                  </Col>
                  <Chart
                    options={apexColumnChartsone.options}
                    series={apexColumnChartsone.series}
                    type="bar"
                    height={350}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm="12" xl="6">
            <Card>
              <CardBody className="apex-chart">
                <Col sm="6" className="text-left">
                  <Label>Filtro:</Label>
                  <Input
                    className="form-control"
                    type="select"
                    name="fila3"
                    onChange={handleChange}
                    value={formato3.fila3}
                  >
                    <option value="31">Último año</option>
                    <option value="32">Último 7 días</option>
                    <option value="33">Ayer</option>
                    <option value="34">Hoy</option>
                  </Input>
                </Col>
                <div id="piechart">
                  <Chart
                    options={apexPieChart.options}
                    series={apexPieChart.series}
                    type="pie"
                    width={380}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="6">
            <Card>
              <CardBody>
                <Col sm="6" className="text-left">
                  <Label>Filtro:</Label>
                  <Input
                    className="form-control"
                    type="select"
                    name="fila4"
                    onChange={handleChange}
                    value={formato4.fila4}
                  >
                    <option value="41">Último año</option>
                    <option value="42">Último 7 días</option>
                    <option value="43">Ayer</option>
                    <option value="44">Hoy</option>
                  </Input>
                </Col>
                <div id="basic-bar">
                  <Chart
                    options={apexBarChart.options}
                    series={apexBarChart.series}
                    type="bar"
                    height={350}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default PanelPrincipal;
