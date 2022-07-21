import React from "react";
import styled from "styled-components";
import addCommas from "../../utils/util";

const Accionesprecios = styled.div`
 
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      align-content:center;
      background-color: #A7CDD9;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
      width:20vw;
      padding-top: 10px;
      border-radius: 20px;
      a{
            width: 20vw;
      }
      
  @media(max-width:1400px){
    width:30vw;
  }
  
  @media(max-width: 650px){
    width: 50vw;
  }
  
  @media(max-width: 500px){
    width: 70vw;
  }
  
  @media(max-width: 420px){
      width:87vw;
      margin:10px;
      justify-content:center;
      
      
  }
  
  
`;
const Resumemusuario1 = styled.div`
 
 
  padding-top:0;  

`;
const A = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
   
`;

const H4 = styled.h4`
    margin: 10px 5px;
`;
const P = styled.p`
    margin: 10px 5px;
    
`;

export default function ResumenUsuario(){

    const user = JSON.parse(sessionStorage.getItem('user'));

    return(
        <Accionesprecios>
            <h3>Resumen Usuario</h3>
            <Resumemusuario1>
                <A>
                    <H4>Rut:</H4>
                    <P>{user.rut}</P>
                </A>
                <A>
                    <H4>Nombre:</H4>
                    <P>{user.full_name}</P>
                </A>
                <A>
                    <H4>Monto disponible:</H4>
                    <P> ${user.share.map(e => e.code === 'CLP' ? addCommas(parseInt(e.amount)) : null)}</P>
                </A>

            </Resumemusuario1>

        </Accionesprecios>
        )

}