import React, {Component} from "react";
import BarraPrincipal from "../components/NavBar/BarraPrincipal";

import styled from "styled-components";

const Gridregister = styled.div`
  width: 380px;
  height: 490px;
  background:#E1F1F9 ;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%,-50%);
  padding: 70px 30px ;
  border-radius: 20px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
  a:hover{
  color:white;
  text-decoration: none;

}

`;

const H4 = styled.h4`
  font-size: 22px;
  margin-bottom: 22px;
   
`;

const Controls = styled.input`
  width: 100%;
  background: #E1F1F9 ;
  padding: 10px;
  border-radius: 4;
  margin-bottom: 16px;
  border: 1px solid rgb(51, 145, 192);
  font-family: "calibri";
  font-size: 18px;
`;

const P1 = styled.p`
  height: 40px;
  text-align: center;
  font-size: 18px;
  line-height: 40px;

`;

const Submit1 = styled.input`
  width: 100%;
  margin-bottom: 50px;
  border: none;
  outline: none;
  height: 40px;
  
  background: blue;
  color: white;
  font-size: 18px;
  border-radius: 20px;
`;


export default class Register extends Component{
    constructor(props) {
        super(props);
    }


     render() {

        return(

        <div className="grid-register">

            <div>
                <BarraPrincipal></BarraPrincipal>

            </div>

            <Gridregister>
                <H4>Formulario Registro</H4>
                <Controls type="text" name="nombres" id="nombres" placeholder="Ingrese el nombre"></Controls>
                <Controls type="text" name="apellidos" id="apellidos" placeholder="Ingrese el apellido"></Controls>
                <Controls type="email" name="correo" id="nombres" placeholder="Ingrese el correo"></Controls>
                <Controls type="password" name="correo" id="nombres" placeholder="Ingrese la contraseña"></Controls>
                <Submit1 type ="submit" value ="Registrarse"></Submit1>
                <P1><a href ="#">¿Ya tengo cuenta?</a></P1>


            </Gridregister>



         </div>



    )

    }




}