import React,{Component} from "react";
import CompAccionesPrecios from "./CompAccionesPrecios";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {getRequest} from "../../context/Request";


const Accionesprecios1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #A7CDD9;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
  margin:30px;
  width: 100%; 
  padding-top: 20px ;
  border-radius: 20px;
    
`;
const Parametrosaccionesprecio = styled.div`
  display: grid;
  grid-template-columns: 20% 20% 40% 30%;
  grid-template-rows: 30px;
  background-color: #E1F1F9;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
  border-radius: 20px;
  padding-left: 10px;
  padding-right: 10px;
  height: 50px;
  width: 44vw;
    
`;
const Titleacciones = styled.h3`
 margin: 15px;
    
`;


const Spaceordenaccionesp = styled.div`
  grid-row: 3/auto;
  grid-column: 1/6;
  background-color: #E1F1F9;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
  width: 32vw;
  min-height: 50px;
  border-radius: 20px;
  margin: 5px;
  justify-content: center;
  /*overflow-y: auto;*/
  
  a{
      width: 44vw;
      margin-top: 10px;
      padding-left: 10px;
      padding-right: 10px;
  }
  

`;

export default function AccionesPrecios() {

    const [arrShare, setArrShare] = useState([]);

    useEffect(() => {
        async function shares(){
            setArrShare(await getRequest("http://127.0.0.1:8000/api/share"))
        }
        shares()
    },[])

    console.log(arrShare)


    return(
        <Accionesprecios1>
            <Titleacciones>Acciones y precios</Titleacciones>
            <Parametrosaccionesprecio>
                <p>Nombre</p>
                <p>Precio</p>
                <p>Rentabilidad diaria</p>
                <p>Rentabilidad anual</p>
            </Parametrosaccionesprecio>



            <Spaceordenaccionesp>
                {
                arrShare.map( x => (<CompAccionesPrecios code={x.code} />))

            }

            </Spaceordenaccionesp>
        </Accionesprecios1>
    )

}