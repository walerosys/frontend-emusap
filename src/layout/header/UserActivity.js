import React, { useState } from "react";
import man from "../../assets/images/dashboard/profile-image.png";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { LogOut, Users } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const UserActivity = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const perfil = useSelector((state) => state.Auth.perfil);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle>
        <span className="media user-header">
          <img
            className="mr-2 rounded-circle img-35"
            src={man}
            style={{ width: "35px", height: "35px" }}
            alt=""
          />
          <span className="media-body">
            <span className="f-12 f-w-600">Usuario de Prueba</span>
            <span className="d-block">{perfil === "SU" && "subgerente"}</span>
          </span>
        </span>
      </DropdownToggle>
      <DropdownMenu className="p-0">
        <ul className="profile-dropdown">
          <li className="gradient-primary-1">
            <h6 className="mb-0">Usuario de Prueba</h6>
            <span>administrador</span>
            {/* <h6 className="mb-0">Elana Saint</h6><span>Web Designer</span> */}
          </li>
          <li
            onClick={() => history.push("/perfil")}
            style={{ cursor: "pointer" }}
          >
            <Users />
            Perfil
          </li>
          {/* <li><MessageSquare/>Inbox</li>
            <li><FileText/>Taskboard</li>
            <li><Settings/>Settings</li> */}
          <li
            onClick={() => dispatch({ type: "SIGNOUT" })}
            style={{ cursor: "pointer" }}
          >
            <LogOut />
            Salir
          </li>
        </ul>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserActivity;
