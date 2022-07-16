import React from "react";

export default function Comprobante(props){

    const repit = (e) =>{
        e.preventDefault()
        location.reload(true)
    }
    const share = props.share

    return(
        <>
            <h1>Comprobante transaccion</h1>
            <h4>Nombre: {JSON.parse(sessionStorage.getItem("user")).full_name}</h4>
            <h4>Tipo de transaccion: {props.type}</h4>
            <h4>Nombre accion: {share}</h4>
            <h4>Vigencia: {props.vigencia}</h4>
            <h4>Cantidad: {props.cantidad}</h4>
            <h4>Precio: {props.precio}</h4>
            <h4>Comision: {parseFloat(props.comisionF) + props.comisionV*props.monto}</h4>
            <h4>Monto total: {props.monto + (parseFloat(props.comisionF) + props.comisionV*props.monto)}</h4>
            <button onClick={repit}>Realizar otra {props.type}</button>
        </>
    )
}