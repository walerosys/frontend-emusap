import React, { useState, useEffect, Fragment } from 'react';
import BreadCrumb from '../../../layout/Breadcrumb';
import { Card, CardBody, Table, Button, CardHeader } from 'reactstrap';
import { useSelector } from 'react-redux';
import Url from '../../../config/Url';
import Axios from 'axios';
import ModalUsuarios from './ModalUsuarios';

const Usuarios = () => {
    const [loading, setLoading] = useState(true);
    const [loadingModal, setLoadingModal] = useState(true);
    const [roles, setRoles] = useState([]);
    const token = useSelector(state => state.Auth.data.access_token);
    const idUser = useSelector(state => state.Auth.data.id);
    const [data, setData] = useState([]);
    const [modal, setModal] = useState(false);
    const [userDetail, setUserDetail] = useState({
        id: '',
        nombre: '',
        telefono: '',
        correo: '',
        direccion: '',
        usuario: '',
        contrasena: '',
        rol: '1',
        area: {},
    });

    const clearDataUser = () => {
        setUserDetail({
            ...userDetail,
            id: '',
            nombre: '',
            telefono: '',
            correo: '',
            direccion: '',
            usuario: '',
            contrasena: '',
            rol: '1',
            area: {},
        });
    }

    const toggle = () => setModal(!modal);

    const getUsers = async () => {
        setLoading(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            let res = await Axios.post(`${Url}soporte/usuarios/getUsers`, { idUser }, config);
            let response = await res.data;
            setData(response.usuarios);
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e)
        }
    }

    const getRoles = async () => {
        setLoadingModal(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            let res = await Axios.post(`${Url}soporte/usuarios/getRoles`, { idUser }, config);
            let response = await res.data;
            console.log(response);
            if(response.success) {
                setRoles(response.roles);
                setLoadingModal(false);
            }
        } catch (e) {
            setLoadingModal(false);
            console.log(e)
        }
    }

    const openEditModal = (item) => {
        setUserDetail({
            id: item.id,
            nombre: item.full_name,
            telefono: item.phone,
            correo: item.email,
            direccion: item.address,
            usuario: item.username,
            contrasena: '',
            rol: item.role_user_id,
            area: JSON.parse(item.modules),
        });
    }

    const handleUser = (e) => {
        if(e.target.name === "rol") {
            const find = roles.find((item) => item.id === parseInt(e.target.value) );
            setUserDetail({
                ...userDetail,
                [e.target.name]: e.target.value,
                area: JSON.parse(find.description)
            });
        } else {
            setUserDetail({
                ...userDetail,
                [e.target.name]: e.target.value,
            });
        }
    }

    useEffect(() => {
        getUsers();
        getRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const saveUser = async () => {
        setLoadingModal(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            setUserDetail({
                ...userDetail,
                area: JSON.stringify(userDetail.area)
            })
            let res = await Axios.post(`${Url}soporte/usuarios/saveUser`, { userDetail }, config);
            let response = await res.data;
            console.log(response);
            getUsers();
            toggle();
            setLoadingModal(false);
        } catch (e) {
            setLoadingModal(false);
            console.log(e)
        }
    } 

    return (
        <div>
            <div>
                <BreadCrumb parent="Inicio" subparent="Usuarios" title="Usuarios"/>
            </div>
            <div>
                <Card>
                    <CardHeader>
                        <Button color="info" onClick={() => {
                            toggle();
                            clearDataUser();
                        }}>
                            Nuevo
                        </Button>
                    </CardHeader>
                    <CardBody>
                        <Table hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombres</th>
                                    <th>Usuario</th>
                                    <th>Telefono</th>
                                    <th>Rol</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? 
                                    <tr className="text-center">
                                        <td colSpan="6">
                                            <div className="loader-box">
                                                <div className="loader-19"></div>
                                            </div>
                                        </td>
                                    </tr>:
                                    <Fragment>
                                        {
                                            data.map((item) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <td>{item.id}</td>
                                                        <td>{item.full_name}</td>
                                                        <td>{item.username}</td>
                                                        <td>{item.phone}</td>
                                                        <td>{item.role}</td>
                                                        <td>
                                                            <Button color="info" onClick={() => {
                                                                toggle();
                                                                openEditModal(item);
                                                            }}>
                                                                <i className="fa fa-edit"></i>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </Fragment>
                                }
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
            <ModalUsuarios
                loadingModal={loadingModal}
                saveUser={saveUser}
                setUserDetail={setUserDetail}
                onChange={handleUser}
                userDetail={userDetail}
                roles={roles}
                modal={modal}
                toggle={toggle}
            />
        </div>
    );
}

export default Usuarios;