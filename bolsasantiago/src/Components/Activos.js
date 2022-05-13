import React from "react";
import ActivoAccion from "./ActivoAccion";

export default function Activos(){
    return(
        <div className="grid-activos">
            <div className="grid-parametros-activos">
                <h4 className="param-activos">Accion</h4>
                <h4 className="param-activos">Cantidad</h4>
                <h4 className="param-activos">Monto</h4>
            </div>
            <div className="space-orden activos">
                <ActivoAccion />
                <ActivoAccion />
                <ActivoAccion />
                <ActivoAccion />
            </div>
        </div>
    )
}