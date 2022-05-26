import React from "react";
import AccionesPrecios from "../components/HomePage/AccionesPrecios";
import ResumenUsuario from "../components/HomePage/ResumenUsuario";
import BarraPrincipal from "../components/NavBar/BarraPrincipal";
import BarraSecundaria from "../components/NavBar/BarraSecundaria";

export default function HomePage(){
    return(
        <div className="grid-home-page">
            <div className="grid-home-page1">
                <BarraPrincipal />
            </div>
            <div className="grid-home-page2">
                <BarraSecundaria />
            </div>
            <div className="grid-home-page3">
                <AccionesPrecios />
            </div>
            <div className="grid-home-page4">
                <ResumenUsuario />
            </div>
            
        </div>
    )
}