import React, {Component, useContext} from "react";
import styled from "styled-components";

const Accionesprecios = styled.div`
 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #A7CDD9;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
  width:20vw;
  margin:50px;
  padding-top: 20px;
  border-radius: 20px;
  a{
        width: 20vw;
  }
  

`;
const Resumemusuario1 = styled.div`
 
  padding: 15px;  

`;

export default function ResumenUsuario(){

    const user = JSON.parse(sessionStorage.getItem('user'));

    return(
        <Accionesprecios>
            <h3>Resumen Usuario</h3>
            <Resumemusuario1>
                <p>Rut: {user.rut}</p>
                <p>Nombre: {user.full_name}</p>
                <p>Monto disponible: ${user.share.map(e => e.code === 'CLP' ? e.amount : null)}</p>
            </Resumemusuario1>

        </Accionesprecios>
        )

}