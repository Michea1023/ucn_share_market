import React, {Component, useEffect, useState} from "react";
import styled from "styled-components";
import {A,Titulo} from "../Styled"

import ActivoAccion from "./ActivoAccion";
import {getRequest} from "../../context/Request";

const GridActivos = styled.div`
    background-color: #A7CDD9;
    width: 90%;
    border-radius: 20px;
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.252);
    display:grid;
    
`;

const Tabla= styled.div`
    display:table;
    padding: 10px;
    
`;

const Fondo= styled.div`
    
`;

const H4 = styled.h4`
    display:table-cell;
    margin: 20px;
    text-indent: 13px;
`;

 const B = styled.li`
  
    display: table-row;
    margin: 10px;
    background-color: #E1F1F9;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
    border-top-right-radius: 80px;
    padding-left: 10px;
    padding-right: 10px;
    height: 50px;
    width: 22vw;
    

`;

export default function Activos (){

    const [arrShare, setArrShare] = useState([]);

    useEffect( ()=>{
        async function request(){
           setArrShare(await getRequest("http://127.0.0.1:8000/api/transaction-table"))
        }
        request()

    },[])

    const user = JSON.parse(sessionStorage.getItem("user"))


    return(
        <GridActivos>
            <Titulo>Activos</Titulo>
            <Tabla>
                <B>
                    <H4>Accion</H4>
                    <H4>Cantidad</H4>
                    <H4>Monto</H4>
                </B>

                {
                  user.share.map(x=>(
                     <B>

                        <ActivoAccion share={x.code} amount={x.amount} price={x.price}/>
                     </B>
                  ))
                }



            </Tabla>



        </GridActivos>
    )


}