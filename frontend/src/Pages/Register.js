import React, {Component, useContext, useState} from "react";
import BarraPrincipal from "../components/NavBar/BarraPrincipal";
import styled from "styled-components";
import AuthContext from "../context/AuthContext";

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
  height: 70vh;
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
// Aca va las variables para el registro con la respectiva funcion

export default function Register(){

    const [rut, setRut] = useState();
    const [full_name, setFull_name] = useState();
    const [career, setCareer] = useState();
    const [email, setEmail] = useState();
    const [password,setPassword] = useState();
    const [password2, setPassword2] = useState();

    const {registerUser} = useContext(AuthContext);

    const handleSubmit = async e => {
        e.preventDefault();
        registerUser(rut, password, password2, email, full_name,career);
    };

    return(
        <GridPrincipal>
            <div>
                <BarraPrincipal></BarraPrincipal>
            </div>
            <Gridregister>
                <H4>Formulario Registro</H4>
                <Form onSubmit={handleSubmit}>
                    <Controls type="text" name="rut" id="rut" placeholder="Ingrese su rut" onChange={e => setRut(e.target.value)}></Controls>
                    <Controls type="text" name="nombres" id="nombres" placeholder="Ingrese el nombre completo" onChange={e => setFull_name(e.target.value)}></Controls>
                    <Controls type="text" name="carrera" id="career" placeholder="Ingrese su carrera" onChange={e => setCareer(e.target.value)}></Controls>
                    <Controls type="email" name="correo" id="email" placeholder="Ingrese el correo institucional" onChange={e => setEmail(e.target.value)}></Controls>
                    <Controls type="password" name="contraseña" id="password" placeholder="Ingrese su contraseña" onChange={e => setPassword(e.target.value)}></Controls>
                    <Controls type="password" name="contraseña" id="password2" placeholder="Reingrese su contraseña" onChange={e => setPassword2(e.target.value)}></Controls>


                    <Submit1 type ="submit" value ="Registrarse"></Submit1>
                </Form>
                <P1><a href ="#">¿Ya tengo cuenta?</a></P1>
            </Gridregister>



        </GridPrincipal>



        )
}