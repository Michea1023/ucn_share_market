import React from "react";
import CompAccionesPrecios from "./CompAccionesPrecios";

export default function AccionesPrecios(){
    return(
        <div className="acciones-precios">
            <h3 className="title-acciones">Acciones y precios</h3>
            <div className="parametro-acciones-precios">
                <p>Nombre</p>
                <p>Precio</p>
                <p>Rentabilidad diaria</p>
                <p>Rentabilidad anual</p>
            </div>
            <div className="space-orden acciones-p">
                <CompAccionesPrecios />
                <CompAccionesPrecios />
                <CompAccionesPrecios />
                <CompAccionesPrecios />
            </div>
        </div>
    )
}