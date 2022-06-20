import React, {Component, useContext, useState} from "react";
import BarraPrincipal from "../components/NavBar/BarraPrincipal";
import styled from "styled-components";
import AuthContext from "../context/AuthContext";
import {Submit1} from "../components/Styled";

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
  color:black;
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



const Form = styled.form`
    display: flex;
    flex-direction: column; 
`

const P = styled.p`
    align-self: center;
    color: red;
    margin-top:0;
    margin-button:25px;
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
                <H4>Crear cuenta</H4>
                <Form onSubmit={handleSubmit}>
                    <Controls type="text" name="rut" id="rut" placeholder="Rut" onChange={e => setRut(e.target.value)} required></Controls>
                    <Controls type="text" name="nombres" id="nombres" placeholder="Nombre completo" onChange={e => setFull_name(e.target.value)} required></Controls>
                    <>
                        <datalist id="carreras">
                            <option value="ICCI">Ingenieria Civil en Computacion e Informatica</option>
                            <option value="ICI">Ingenieria Civil Industrial</option>
                        </datalist>
                        <Controls list="carreras"  type="text" name="carrera" id="career" placeholder="Carrera" onChange={e => setCareer(e.target.value)} required></Controls>
                    </>


                    <Controls type="email" name="correo" id="email" placeholder="Correo institucional" onChange={e => setEmail(e.target.value)} required></Controls>
                    <Controls type="password" name="contraseña" id="password" placeholder="Contraseña" onChange={e => setPassword(e.target.value)} required></Controls>
                    <>
                        <Controls type="password" name="contraseña" id="password2" placeholder="Repetir contraseña" onChange={e => setPassword2(e.target.value)} required></Controls>
                        <P>{password2 !== password ? "Las contraseñas no coinciden" : ""}</P>
                    </>


                    <Submit1 type ="submit" value ="Registrarse"></Submit1>
                </Form>
                <P1><a href ="/">¿Ya tengo cuenta?</a></P1>
            </Gridregister>



        </GridPrincipal>



        )
}