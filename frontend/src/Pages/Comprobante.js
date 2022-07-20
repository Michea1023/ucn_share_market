import React from "react";
import styled from "styled-components";
import {Button} from "../components/Styled";
import {updadeUser} from "../utils/Updade";


const GridComprobante = styled.div`
 
  display: flex;
  flex-direction: column;
  
  
  background-color: #E1F1F9;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
  width:40vw;
  margin:30px;
  padding-top: 20px;
  border-radius: 20px;
  a{
        width: 20vw;
  }
  p{
    margin:5px;
    margin-left:20px;
  }
  
  @media(max-width: 420px){
        width:87vw;
    }
  

`;

const ButtonRojo = styled(Button)`
    background-color:#30A1FF;
`;

const Titulo  = styled.h4`
    justify-content: center;
    align-self: center;
`;
export default function Comprobante(props){

    const repit = (e) =>{
        e.preventDefault()
        location.reload(true)
    }
    const share = props.share

    return(

            <GridComprobante>
                <Titulo>Comprobante transaccion</Titulo>
                <p>Nombre: {JSON.parse(sessionStorage.getItem("user")).full_name}</p>
                <p>Tipo de transaccion: {props.type}</p>
                <p>Nombre accion: {share}</p>
                <p>Vigencia: {props.vigencia}</p>
                <p>Cantidad: {props.cantidad}</p>
                <p>Precio: {props.precio}</p>
                <p>Comision: {parseFloat(props.comisionF) + props.comisionV*props.monto}</p>
                <p>Monto total: {props.monto + (parseFloat(props.comisionF) + props.comisionV*props.monto)}</p>
                <ButtonRojo onClick={repit}>Realizar otra {props.type}</ButtonRojo>
            </GridComprobante>

    )
}





