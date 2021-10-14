import React, { Fragment } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import Content from "../layout/Content";
import ThemeCustomize from "../components/common/ThemeCustomize";
import { useSelector } from "react-redux";
import { MENU } from "../config/Roles";
import { MENUADMIN, MENUUSUARIO } from "../layout/sidebar/menu";


const Home = ({ anim }) => {

	const perfil = useSelector((state) => state.Auth.perfil);
	let MENUITEMS = perfil === "admin" ? MENUADMIN: MENUUSUARIO

	return (
<Fragment>
			<div className="page-wrapper">
				<div className="page-body-wrapper">
					<Header />
					{
						perfil !== "" &&
						<Sidebar MENUITEMS={MENUITEMS} />
					} 
					<Content anim={anim} content={MENU().cleanArray} />
					
				</div>
			</div>
			<div className="d-none">
			<ThemeCustomize />
			</div>
		</Fragment>
	);
};

export default Home;
