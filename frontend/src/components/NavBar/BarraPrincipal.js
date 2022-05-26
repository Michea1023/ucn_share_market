import React from "react";
import logo from "../../../static/images/logo.png";
import cierre_sesion from "../../../static/images/logo-cierre-sesion.png"

export default function BarraPrincipal() {
    return (
        <header className="grid-container">
            <div className="grid-item1">
                <img className="navbar-img" src= {logo}></img>
            </div>
            <div className="grid-item2">
                <h2 className="navbar-title">Bolsa de Santiago</h2>
            </div>
            <div className="grid-item3">
                <div className="navbar-usuario">
                    <p>NOMBRE DE USUARIO</p>
                    <img className="navbar-img cierre" src={cierre_sesion}></img>

                </div>
            </div>
            
        </header>
    )
}
    


