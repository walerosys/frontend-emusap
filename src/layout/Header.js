import React from "react";
import creativeLogo from "../assets/images/logo/isologo.svg";
import Rightbar from "./header/Rightbar";
import Leftbar from "./header/Leftbar";
import { MoreHorizontal } from "react-feather";
import { MobileRightToggle, SwitchToggle } from "../redux/common/actions";
import { Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

export const Header = () => {
	const dispatch = useDispatch();
	const mobileRightTog = useSelector((state) => state.Common.mobileRightToggle);
	const switchToggle = useSelector((state) => state.Common.switchToggle);

	return (
		<div className={`page-main-header ${switchToggle ? "open" : ""}`}>
			<div className="main-header-right row">
				<div className="main-header-left d-lg-none">
					<div className="logo-wrapper header-logo normal">
						<a href="#javascript">
							{/* <img className="normallogo" src={creativeLogo} alt="" />
							<img className="lightlogo" src={creativeLogo} alt="" /> */}
						</a>
					</div>
				</div>
				<div className="mobile-sidebar d-block">
					<div className="media-body text-right switch-sm">
						<Label
							style={{ cursor: "pointer" }}
							className="switch mt-3"
							onClick={() => dispatch(SwitchToggle(switchToggle))}
						>
							<i className="fa fa-align-left fa-2x"></i>
						</Label>
					</div>
				</div>
				<Leftbar />
				<Rightbar />
				<div className="d-lg-none mobile-toggle pull-right">
					<MoreHorizontal onClick={() => dispatch(MobileRightToggle(mobileRightTog))} />
				</div>
			</div>
		</div>
	);
};

export default Header;
