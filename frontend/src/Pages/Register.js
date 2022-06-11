import React, {Component} from "react";
import BarraPrincipal from "../components/NavBar/BarraPrincipal";

import styled from "styled-components";
const GridPrincipal = styled.div`
    display:grid;
    grid-template-columns: 100vw;
    grid-template-rows:60px 80vh;
    grid-template-areas: 
    "nav"
    "registro";
`;


const Gridregister = styled.div`
  width: 40vw;
  height: 65vh;
  background:#E1F1F9 ;
  grid-area: registro;
  justify-self: center;
  margin-top: 30px;
  border-radius: 20px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
  a:hover{
  color:white;
  text-decoration: none;
  display:flex;
  flex-direction: column;
}

`;

const H4 = styled.h4`
  display:flex;
  font-size: 22px;
  margin-bottom: 22px;
  justify-content: center;
   
`;

const Controls = styled.input`
  width: 80%;
  background: #E1F1F9 ;
  padding: 10px;
  border-radius: 4;
  margin-bottom: 16px;
  border: 1px solid rgb(51, 145, 192);
  border-radius: 20px;
  font-family: "calibri";
  font-size: 18px;
  align-self: center;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);

`;

const P1 = styled.p`
  height: 40px;
  text-align: center;
  font-size: 18px;
  align-self: center;
  

`;

const Submit1 = styled.input`
  width: 80%;
  margin-bottom: 50px;
  border: none;
  outline: none;
  height: 40px;
  align-self: center;
  background: blue;
  color: white;
  font-size: 18px;
  border-radius: 20px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);

`;

const Form = styled.form`
    display: flex;
    flex-direction: column; 
`;



export default class Register extends Component{
    constructor(props) {
        super(props);
    }
     render() {
        return(
        <GridPrincipal>
            <div>
                <BarraPrincipal></BarraPrincipal>
            </div>
            <Gridregister>
                <H4>Formulario Registro</H4>
                <Form>
                    <Controls type="text" name="nombres" id="nombres" placeholder="Ingrese el nombre"></Controls>
                    <Controls type="text" name="apellidos" id="apellidos" placeholder="Ingrese el apellido"></Controls>
                    <Controls type="email" name="correo" id="nombres" placeholder="Ingrese el correo"></Controls>
                    <Controls type="password" name="correo" id="nombres" placeholder="Ingrese la contraseña"></Controls>
                    <Submit1 type ="submit" value ="Registrarse"></Submit1>
                </Form>
                <P1><a href ="#">¿Ya tengo cuenta?</a></P1>
            </Gridregister>



         </GridPrincipal>



    )

    }




}