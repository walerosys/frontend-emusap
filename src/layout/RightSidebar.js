import React, { Fragment } from "react";
import { Col, Container, UncontrolledTooltip } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { RightSidebarToggle } from "../redux/common/actions";
import Axios from "axios";
import Url from "../config/Url";

const RightSidebar = () => {
  const token = useSelector((state) => state.Auth.data.access_token);
  const userid = useSelector((state) => state.Auth.data.id);
  const dispatch = useDispatch();
  const rightSidebarToggle = useSelector(
    (state) => state.Common.rightSidebarToggle
  );
  const allMembers = useSelector((content) => content.ChatApp.allMembers);
  const loadingFab = useSelector((content) => content.ChatApp.loadingFab);
  const currentUserFab = useSelector(
    (content) => content.ChatApp.currentUserFab
  );
  var images = require.context("../assets/images", true);
  const dynamicImage = (image) => {
    return images(`./${image}`);
  };

  const LoadChats = async (item) => {
    dispatch({
      type: "SELECTED_USER",
      payload: { id: item.id, teamName: item.name },
    });
    dispatch({
      type: "LOADING_CHAT",
      payload: {
        loading: true,
        estado: false,
      },
    });
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      let pagina = 10;
      let receiver = item.id;
      let emit = userid;
      let res = await Axios.post(
        `${Url}chat/receptor/getMessages`,
        { emit, receiver, pagina },
        config
      );
      let response = await res.data;
      if (response.success) {
        let auxArr = response.chat.data;
        let newArr = [];
        auxArr.forEach((item) => {
          let author = userid === item.sender ? "me" : "them";
          if (item.tipo === 0 || item.tipo === "0") {
            newArr.push({
              id: item.sender,
              author: author,
              type: "text",
              data: {
                text: item.text,
              },
            });
          } else {
            newArr.push({
              id: item.sender,
              author: author,
              type: "file",
              data: {
                text: item.text,
                file: {
                  name: item.archivo_nombre,
                  url: item.archivo_url,
                },
              },
            });
          }
        });
        dispatch(RightSidebarToggle(rightSidebarToggle));
        dispatch({
          type: "LOADING_CHAT",
          payload: { loading: false, estado: true },
        });
        dispatch({ type: "SET_CHAT_FAB", payload: newArr });
      }
    } catch (e) {
      dispatch({
        type: "LOADING_CHAT",
        payload: { loading: false, estado: true },
      });
      dispatch({ type: "SET_CHAT_FAB", payload: [] });
      console.log(e);
    }
  };

  return (
    <div
      className={`right-sidebar ${rightSidebarToggle ? "show" : ""}`}
      id="right_side_bar"
    >
      <div>
        <Container className="themed-container p-0">
          <div className="modal-header p-l-20 p-r-20">
            <Col sm="8" className="p-0">
              <h6 className="modal-title font-weight-bold">
                Seleccione un usuario
              </h6>
            </Col>
          </div>
        </Container>
        <div className="p-l-30 p-r-30">
          <div className="chat-box">
            <div className="people-list friend-list custom-scrollbar">
              <ul className="list">
                {loadingFab ? (
                  <li className="clearfix">
                    <strong>CARGANDO CHAT DE {currentUserFab.teamName}</strong>
                    <div className="loader-box">
                      <div className="loader-19"></div>
                    </div>
                  </li>
                ) : allMembers.length === 0 ? (
                  <li className="clearfix">
                    <strong>No hay usuarios registrados :(</strong>
                  </li>
                ) : (
                  allMembers.map((member, index) => {
                    return (
                      <Fragment key={index}>
                        <li
                          onClick={() => LoadChats(member)}
                          className="clearfix"
                          id={`contacto_${member.id}`}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            className="rounded-small user-image"
                            src={dynamicImage("user/1.jpg")}
                            alt=""
                          />
                          <div className="status-circle online"></div>
                          {/* <div className="about">
														<div className="name">{member.name}</div>
														<div className="status">
															Rol: {member.role} <br />
															Celular: {member.phone} <br />
															Sucural: {member.suc_ciudad} - {member.suc_direccion}
														</div>
													</div> */}
                        </li>
                        {/* <UncontrolledTooltip placement="right" target={`contacto_${member.id}`}>
													Chat con {member.name}
												</UncontrolledTooltip> */}
                      </Fragment>
                    );
                  })
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
