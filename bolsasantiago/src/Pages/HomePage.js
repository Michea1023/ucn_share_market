import React from "react";
import AccionesPrecios from "../Components/HomePage/AccionesPrecios";
import ResumenUsuario from "../Components/HomePage/ResumenUsuario";
import BarraPrincipal from "../Components/NavBar/BarraPrincipal";
import BarraSecundaria from "../Components/NavBar/BarraSecundaria";

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