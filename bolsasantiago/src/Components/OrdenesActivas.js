import React from "react";
import OrdenState from "./OrdenState";

export default function OrdenesActivas() {
    return(
        <div className="grid-ordenes">
            <h4 className="item-o-1">Ordenes Activas</h4>
            <div className="ordenes-activas-parametro">
                <p className="param1">ID</p>
                <p className="param1">Accion</p>
                <p className="param1">Cantidad</p>
                <p className="param1">Precio</p>
                <p className="param1">Tipo</p>
                <p className="param1">Accion</p>
            </div>
            <div className="space-orden">
                <OrdenState />
                <OrdenState />
                <OrdenState />
                <OrdenState />
                <OrdenState />
            </div>
        </div>
    )
}