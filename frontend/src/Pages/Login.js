import React, {useContext} from "react";
import BarraPrincipal from "../components/NavBar/BarraPrincipal";
import styled from "styled-components";
import {Submit1} from "../components/Styled";
import AuthContext from "../context/AuthContext";

const Gridlogin = styled.div`
  display:grid;
  grid-template-columns: 1fr;
  grid-templates-rows: 60px auto;
  width: 100vw;

`;

const Gridlogin1 = styled.div`

    @media(min-width: 420px){
      grid-row: 2;
      width: 30vw;
      height: 50vh;
      background:#E1F1F9 ;
      
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 70px auto;
      grid-template-areas:
      "a1"
      "a2"
      "a3";
      
      
      justify-self: center;
      margin:40px;
      padding: 70px 30px ;
      border-radius: 20px;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
      
      a{
      text-decoration: none;
      font-size: 12px;
      line-height: 20px;
      color: blue;
      }
    }
    
    @media(max-width: 426px){
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 70px 300px;
      grid-template-areas:
      "a1"
      "a2"
      "a3";
      
      grid-row: 2;
      width: 85vw;
      max-height:400px;
      height: 60vh;
      background:#E1F1F9 ;
      
      justify-self: center;
      margin:40px 0;
      padding: 70px 10px ;
      border-radius: 20px;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
    }

  
  
  
`;

const H1 = styled.h1`
  margin: 0;
  padding:0 0 20px ;
  text-align: center;
  font-size: 22px;
  grid-area: a1;

`;

const Label1 = styled.label`
  margin: 0;
  padding: 0;
  font-weight: bold;
  display: block;

`;

const Text1 = styled.input`
  width: 100%;
  margin-bottom: 50px;
  border: none;
  border-bottom: 1px solid ;
  background: transparent;
  outline: none;
  height: 40px;
  color: black;
  font-size:16px ;
`;

const Password1= styled.input`
  width: 100%;
  margin-bottom: 50px;
  border: none;
  border-bottom: 1px solid ;
  background: transparent;
  outline: none;
  height: 40px;
  color: black;
  font-size:16px ;
`;

const A1 = styled.a`
  text-decoration: none;
  font-size: 12px;
  line-height: 20px;
  color: black;
  
  :hover{
  color: black;
}
`;

const  Form = styled.form`
    grid-area: a2;
    text-align: center;
`;

const B = styled.div`
    grid-area: a3;
`;

export default function Login(){

    const { loginUser } = useContext(AuthContext);

    const handleSubmit = e => {
        e.preventDefault();
        const rut = e.target.rut.value;
        const password = e.target.password.value;
        if(rut.length > 0){
            const login = loginUser(rut, password)

        }
    };




    return (
            <Gridlogin>
                <div >
                        <BarraPrincipal/>
                </div>

                <Gridlogin1>
                        {/* <h1>Bienvenido UCN-SHARE-MARKET</h1> */}


                        <H1>Inicio de sesión</H1>
                        <Form onSubmit={handleSubmit}>
                            <Label1>Rut de usuario</Label1>
                            <Text1 placeholder="Ingrese usuario" id="rut"></Text1>

                            <Label1>Contraseña</Label1>
                            <Password1 type ="password" placeholder="Ingrese contraseña" id="password"></Password1>

                            <Submit1 type ="submit" value ="Iniciar sesión"></Submit1>




                        </Form>
                        <B>
                            <A1 href="/forgot">¿Olvidastes tu contraseña?</A1><br>
                            </br>
                            <A1 href="/register">¿No tienes una cuenta?</A1>
                        </B>

                </Gridlogin1>


            </Gridlogin>
        )
}