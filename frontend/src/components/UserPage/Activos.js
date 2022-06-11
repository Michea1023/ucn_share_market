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
`;



export default class Activos extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
        <GridActivos>
            <Titulo>Ordenes activas</Titulo>
            <Tabla>
                <A>
                    <H4>Accion</H4>
                    <H4>Cantidad</H4>
                    <H4>Monto</H4>
                </A>
                <A>
                    <ActivoAccion />
                </A>
                <A>
                    <ActivoAccion />
                </A>
                <A>
                    <ActivoAccion />
                </A>
            </Tabla>



        </GridActivos>
    )
    }


}