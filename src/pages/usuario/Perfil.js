import React, { Fragment } from "react";
import BreadCrumb from "../../layout/Breadcrumb";
import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import { Media, FormGroup, Label, Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { MENU } from '../../config/Roles';

const Perfil = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.Auth.data);
  console.log(dataUser);

  const updateRol = () => {
    let newArr = {
      ...dataUser,
      role: "desarrollador",
    };
    dispatch({ type: "CHANGE_ROLE", payload: newArr });
    history.push(MENU(newArr.role, newArr.modules).page);
  }

  const checkRol = () => {
    let newArr = {
      ...dataUser,
      role: "recursos.humanos",
    };
    dispatch({ type: "CHANGE_ROLE", payload: newArr });
    history.push(MENU(newArr.role, newArr.modules).page);
  }

	return (
		<div>
			<Fragment>
				<BreadCrumb parent="Inicio" subparent="Perfil" title="Editar perfil" />
				<Container fluid={true}>
					<div className="edit-profile">
						<Row>
							<Col lg="4">
								<Card>
									<CardHeader>
										<h4 className="card-title mb-0">Mi perfil</h4>
										<div className="card-options">
											<a className="card-options-collapse" href="#javascript">
												<i className="fe fe-chevron-up"></i>
											</a>
											<a className="card-options-remove" href="#javascript">
												<i className="fe fe-x"></i>
											</a>
										</div>
									</CardHeader>
									<CardBody>
										<div>
											<Row className="mb-2">
												<div className="col-auto">
													<Media
														className="img-70 rounded-circle"
														alt=""
														src={require("../../assets/images/user/7.jpg")}
													/>
												</div>
												<Col>
													<h3 className="mb-1">{dataUser.full_name.toUpperCase()}</h3>
													<p className="mb-4">{dataUser.role.toUpperCase()}</p>
												</Col>
											</Row>
											<FormGroup>
												<Label className="form-label">Usuario</Label>
												<Input disabled className="form-control" value={dataUser.username} />
											</FormGroup>
											<FormGroup>
												<Label className="form-label">Nueva contraseña</Label>
												<Input className="form-control" type="password" />
											</FormGroup>
											<FormGroup>
												<Label className="form-label">Repetir nueva contraseña</Label>
												<Input className="form-control" type="password" />
											</FormGroup>
											<div className="form-footer">
												<button onClick={() => checkRol()}className="btn btn-success btn-block">Save</button>
											</div>
										</div>
									</CardBody>
								</Card>
							</Col>
							<Col lg="8">
								<div className="card">
									<CardHeader>
										<h4 className="card-title mb-0">Edit Profile</h4>
										<div className="card-options">
											<a className="card-options-collapse" href="#javascript">
												<i className="fe fe-chevron-up"></i>
											</a>
											<a className="card-options-remove" href="#javascript">
												<i className="fe fe-x"></i>
											</a>
										</div>
									</CardHeader>
									<CardBody>
										<Row>
											<Col lg="4">
												<FormGroup>
													<Label className="form-label">Company</Label>
													<Input className="form-control" type="text" placeholder="Company" />
												</FormGroup>
											</Col>
											<div className="col-sm-6 col-md-3">
												<FormGroup>
													<Label className="form-label">Username</Label>
													<Input className="form-control" type="text" placeholder="Username" />
												</FormGroup>
											</div>
											<div className="col-sm-6 col-md-4">
												<FormGroup>
													<Label className="form-label">Email address</Label>
													<Input className="form-control" type="email" placeholder="Email" />
												</FormGroup>
											</div>
											<div className="col-sm-6 col-md-6">
												<FormGroup>
													<Label className="form-label">First Name</Label>
													<Input className="form-control" type="text" placeholder="Company" />
												</FormGroup>
											</div>
											<div className="col-sm-6 col-md-6">
												<FormGroup>
													<Label className="form-label">Last Name</Label>
													<Input className="form-control" type="text" placeholder="Last Name" />
												</FormGroup>
											</div>
											<div className="col-md-12">
												<FormGroup>
													<Label className="form-label">Address</Label>
													<Input className="form-control" type="text" placeholder="Home Address" />
												</FormGroup>
											</div>
											<div className="col-sm-6 col-md-4">
												<FormGroup>
													<Label className="form-label">City</Label>
													<Input className="form-control" type="text" placeholder="City" />
												</FormGroup>
											</div>
											<div className="col-sm-6 col-md-3">
												<FormGroup>
													<Label className="form-label">Postal Code</Label>
													<Input className="form-control" type="number" placeholder="ZIP Code" />
												</FormGroup>
											</div>
											<div className="col-md-5">
												<FormGroup>
													<Label className="form-label">Country</Label>
													<Input type="select" name="select" className="form-control btn-square">
														<option value="0">--Select--</option>
														<option value="1">Germany</option>
														<option value="2">Canada</option>
														<option value="3">Usa</option>
														<option value="4">Aus</option>
													</Input>
												</FormGroup>
											</div>
											<div className="col-md-12">
												<div className="form-group mb-0">
													<Label className="form-label">About Me</Label>
													<Input
														type="textarea"
														className="form-control"
														rows="5"
														placeholder="Enter About your description"
													/>
												</div>
											</div>
										</Row>
									</CardBody>
									<CardFooter className="text-right">
										<button onClick={() => updateRol()} className="btn btn-primary" type="submit">
											Update Profile
										</button>
									</CardFooter>
								</div>
							</Col>
						</Row>
					</div>
				</Container>
			</Fragment>
		</div>
	);
};

export default Perfil;
