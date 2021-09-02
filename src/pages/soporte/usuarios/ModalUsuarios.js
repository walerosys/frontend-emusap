import React, { Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Container, Row, FormGroup, Input, Label } from 'reactstrap';

const ModalUsuarios = ({ modal, toggle, roles, userDetail, onChange, setUserDetail, saveUser, loadingModal }) => {

    const handleUserArea = (e, key) => {
        setUserDetail({
            ...userDetail,
            area: {
                ...userDetail.area,
                [e.target.id]: !userDetail.area[key]
            }
        })
    }

    const renderRole = () => {
        const find = roles.find((item) => item.id === parseInt(userDetail.rol));
        const collection = typeof find !== "undefined" ? find.description : {};
        const collection2 = collection === null ? {} : collection;
        return (
            Object.keys(collection2).length !== 0 ? 
            Object.keys(JSON.parse(collection)).map((key, index) => {
                return (
                    <div key={index} className="checkbox checkbox-dark">
                        <Input id={key} type="checkbox" checked={userDetail.area[key]} onChange={(e) => handleUserArea(e, key)}/>
                        <Label for={key}>{key}</Label>
                    </div>
                )
            }) : null
        )
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} size="lg">
                <ModalHeader toggle={toggle}>Informacion de usuario</ModalHeader>
                <ModalBody>
                    {
                        loadingModal ? 
                        <div className="loader-box">
                            <div className="loader-19"></div>
                        </div> : 
                        <Container>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="exampleEmail">Nombres</Label>
                                        <Input type="text" name="nombre" value={userDetail.nombre} onChange={onChange} placeholder="..." />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="exampleEmail">Telefono</Label>
                                        <Input type="number" name="telefono" value={userDetail.telefono} onChange={onChange} placeholder="..." />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="exampleEmail">Correo</Label>
                                        <Input type="email" name="correo" value={userDetail.correo} onChange={onChange} placeholder="..." />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="exampleEmail">Direccion</Label>
                                        <Input type="text" name="direccion" value={userDetail.direccion} onChange={onChange} placeholder="..." />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="exampleEmail">Usuario</Label>
                                        <Input type="text" name="usuario" value={userDetail.usuario} onChange={onChange} placeholder="..." />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for="exampleEmail">Contraseña</Label>
                                        <Input type="password" name="contrasena" value={userDetail.contrasena} onChange={onChange} placeholder="..." />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="exampleEmail">Rol</Label>
                                        {
                                            roles.length === 0 ? 
                                            null :
                                            <Fragment>
                                                <Input type="select" name="rol" value={userDetail.rol} onChange={onChange}>
                                                {
                                                    roles.map((item) => {
                                                        return (
                                                            <option key={item.id} value={item.id}>{item.name}</option>
                                                        )
                                                    })
                                                }
                                                </Input>
                                            </Fragment>
                                        }
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup className="m-t-15 m-checkbox-inline mb-0 custom-radio-ml">
                                        {renderRole()}
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Container>
                    }
                </ModalBody>
                <ModalFooter>
                <Button color="danger" outline onClick={toggle}>Cancelar</Button>{' '}
                <Button color="secondary" onClick={() => saveUser()}>Guardar</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalUsuarios;