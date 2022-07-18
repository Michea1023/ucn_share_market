
import React from "react";
import styled from "styled-components";
import BarraPrincipal from "../components/NavBar/BarraPrincipal";
import {Submit1} from "../components/Styled";


const Gridlogin1 = styled.div`
  grid-row: 2;
  width: 30vw;
  height: 65vh;
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
  
  a:hover{
  color: aquamarine;
  }
  
  
`;

const Gridlogin = styled.div`
  display:grid;
  grid-template-columns: 1fr;
  grid-templates-rows: 60px auto;
  width: 100%;

`;
const Form = styled.form`
    grid-area: a2;
    text-align: center;
`;
const B = styled.div`
    grid-area: a3;
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

const Label1 = styled.label`
  margin: 0;
  padding: 0;
  font-weight: bold;
  display: block;

`;

const H1 = styled.h1`
  margin: 0;
  padding:0 0 20px ;
  text-align: center;
  font-size: 22px;
  grid-area: a1;

`;
export default function ForgotRegister(){




    return(
        <Gridlogin>
            <div>
                <BarraPrincipal></BarraPrincipal>
            </div>

            <Gridlogin1>
                <H1>Recuperación de cuenta</H1>
                <Form>
                    <Label1>Rut de usuario </Label1>
                    <Text1 placeholder ="Ingrese rut usuario"></Text1>

                    <Label1>Ingrese la contraseña</Label1>
                    <Password1 type ="password" placeholder="Ingrese contraseña"></Password1>

                    <Label1>Repita la contraseña</Label1>
                    <Password1 type ="password" placeholder="Repita la contraseña"></Password1>

                    <Submit1 type ="submit" value ="Cambiar contraseña"></Submit1>

                </Form>
                <B>
                    <A1 href ="/">Volver al inicio</A1>
                </B>

            </Gridlogin1>

        </Gridlogin>


    )

}