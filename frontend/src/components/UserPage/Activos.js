import React, {Component} from "react";
import styled from "styled-components";
import {A,Titulo} from "../Styled"

import ActivoAccion from "./ActivoAccion";

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

    return(
        <GridActivos>
            <Titulo>Ordenes activas</Titulo>
            <Tabla>
                <B>
                    <H4>Accion</H4>
                    <H4>Cantidad</H4>
                    <H4>Monto</H4>
                </B>
                <B>
                    <ActivoAccion />
                </B>
                <B>
                    <ActivoAccion />
                </B>
                <B>
                    <ActivoAccion />
                </B>
            </Tabla>



        </GridActivos>
    )


}