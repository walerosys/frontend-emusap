import React, { Fragment } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import Content from "../layout/Content";
import ThemeCustomize from "../components/common/ThemeCustomize";

import { MENU } from "../config/Roles";


const Home = ({ anim }) => {




	return (
		<Fragment>
			<div className="page-wrapper">
				<div className="page-body-wrapper">
					<Header />
					<Sidebar content={MENU().cleanArray} />
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
