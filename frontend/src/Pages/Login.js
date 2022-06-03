import React, {Component} from "react";
import BarraPrincipal from "../components/NavBar/BarraPrincipal";
//import logoucn from "../../static/images/logo-ucn.png";
// iba en la linea 24
//<!--<img className="avatar" src={logoucn} /*src="/img/logo-ucn.png"*/ alt="Logo de ucn"/>-->
import styled from "styled-components";

const Gridlogin = styled.div`
  display:flex;
  flex-direction: column;
  
  
  width: 100vw;

`;

const avatar  = styled.div`
  display:flex;
  flex-direction: column;
  
  
  width: 100vw;

`;

const Gridlogin1 = styled.div`
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

const H1 = styled.h1`
  margin: 0;
  padding:0 0 20px ;
  text-align: center;
  font-size: 22px;

`;

const Label1 = styled.label`
  margin: 0;
  padding: 0;
  font-weight: bold;
  display: block;

`;

const Input1 = styled.input`
  width: 100%;
  margin-bottom: 50px;

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

const A1 = styled.a`
  text-decoration: none;
  font-size: 12px;
  line-height: 20px;
  color: blue;
  
  a:hover{
  color: aquamarine;
}
`;

export default class Login extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
        <Gridlogin>
            <div >
                    <BarraPrincipal/>


            </div>

            <Gridlogin1>
                    {/* <h1>Bienvenido UCN-SHARE-MARKET</h1> */}


                    <H1>Inicio de sesión</H1>
                    <form>
                        <Label1>Nombre de usuario</Label1>
                        <Text1 placeholder="Ingrese usuario"></Text1>

                        <Label1>Contraseña</Label1>
                        <Password1 type ="password" placeholder="Ingrese contraseña"></Password1>

                        <Submit1 type ="submit" value ="Iniciar sesión"></Submit1>

                        <A1 href="#">¿Olvidastes tu contraseña?</A1><br>
                        </br>
                        <A1 href="#">¿No tienes una cuenta?</A1>


                    </form>
            </Gridlogin1>


        </Gridlogin>
    )
    }


}