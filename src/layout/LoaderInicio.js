import React from 'react';
import '../assets/css/LoaderScreen.css';
import { useSelector } from "react-redux";

const Loader = () => {
    const loading = useSelector((state) => state.Auth.loading);

    return (
        <div className={`loader-wrapper-inicio ${loading ? '' : 'loderhide'}`} style={{ flexDirection: 'column' }}>
            <h4>
                <strong className="init-sesion">
                    Iniciando sesión...
                </strong>
            </h4>
            <div className="spinner" aria-busy="true">
                <span className="bubble1"></span>
                <span className="bubble2"></span>
                <span className="bubble3"></span>
            </div>
        </div>
    );
}

export default Loader;