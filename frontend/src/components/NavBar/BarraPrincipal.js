import React, {Component} from "react";
import {scryRenderedComponentsWithType} from "react-dom/test-utils";

//import logo from "../../../static/images/logo.png";
//import cierre_sesion from "../../../static/images/logo-cierre-sesion.png"
//este iba en el primer div linea 20
//<img className="navbar-img" src= {logo}></img>
//este iba en el div linea 28
//<img className="navbar-img cierre" src={cierre_sesion}></img>
//import {Gridcontainer, griditem1, griditem3 ,griditem2,navbarusuario,navbartitle} from "./PrincipalElements"


import styled from "styled-components";

const Gridcontainer = styled.header`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 60px;
  background-color: #A7CDD9;
  height: 60px;
  box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.252);

`;

 const Griditem1 = styled.header`
  grid-row: 1;


`;
 const Griditem2 = styled.div`
  grid-row: 1;
  grid-column: 2;
  display: flex;
  justify-content:center;
  align-items:center;

`;

 const Navbartitle = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 60px;


`;

 const Griditem3 = styled.div`
  grid-row: 1;
  grid-column: 3;
  display:flex;
  justify-content:flex-end;
  align-items:center;


`;

 const Navbarusuario = styled.div`
  display: flex;
   
  p{
    &:nth-child(1)={
        font-size: 1.5rem;
        font-weight: 500;
    }
  
  
  }

`;



export default class BarraPrincipal extends Component {
    constructor(props) {
        super(props);
    }

    render(){

        return (
        <Gridcontainer>
            <Griditem1>

            </Griditem1>
            <Griditem2>
                <Navbartitle>Bolsa de Santiago</Navbartitle>
            </Griditem2>
            <Griditem3>
                <Navbarusuario>
                    <p>NOMBRE DE USUARIO</p>


                </Navbarusuario>
            </Griditem3>

        </Gridcontainer>
    )

    }

}
    


