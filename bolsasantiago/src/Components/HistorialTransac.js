import React from "react";
import HistorialState from "./HistorialState";

export default function HistorialTransac(){
    return(
        
        <div className="grid-historial-transacciones">
            <h4 className="item-h1">Historial de transacciones</h4>
            <div className="grid-parametros-historial">
                <p className="param1h">ID</p>
                <p className="param1h">Accion</p>
                <p className="param1h">Cantidad</p>
                <p className="param1h">Precio</p>
                <p className="param1h">Tipo</p>
                <p className="param1h">Estado</p>
                <p className="param1h">Fecha</p>
            </div>
            <div className="space-orden historial">
                <HistorialState />
                <HistorialState />
                <HistorialState />
                <HistorialState />
                <HistorialState />
                <HistorialState />
                <HistorialState />
                
                
            </div>
        </div>
    )
}