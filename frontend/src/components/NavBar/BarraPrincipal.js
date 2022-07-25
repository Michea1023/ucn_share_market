import React, {useContext} from "react";
import logo from "../../../static/images/logo.png";
import cierre_sesion from "../../../static/images/logo-cierre-sesion.png"

import styled from "styled-components";
import AuthContext from "../../context/AuthContext";

const Gridcontainer = styled.header`
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
      grid-template-rows: 60px;
      background-color: #A7CDD9;
      height: 60px;
      box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.252);
      width: 100vw;
    @media(max-width: 700px){
      display: flex;
      justify-content: space-between;
      background-color: #A7CDD9;
      height: 60px;
      box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.252);
      width: 100vw;
    }

`;

 const Griditem1 = styled.header`
    @media(min-width: 420px){
      grid-row: 1;
    }
    @media(max-width: 700px){
      align-content:center;
    }
    
  


`;
 const Griditem2 = styled.div`
 @media(min-width:420px){
        grid-row: 1;
      grid-column: 2;
      display: flex;
      justify-content:center;
      align-items:center;
 }
  
  
  @media(max-width: 700px){
      display: none;
  }

`;

 const Navbartitle = styled.h2`
  justify-content: center;


`;

 const Griditem3 = styled.div`
  grid-row: 1;
  grid-column: 3;
  display:flex;
  flex-direction:reverse-row;
  justify-content:end;
  align-items:center;
  
 


`;
 const Img = styled.img`
    height: 90%;
    width: auto;
    margin-left: 20px;
    margin-right: 10px;
    
    @media(max-width: 420px){
      height: 80%;
      margin-left: 10px;
      margin-top: 5px;
    }
 `;
 const Img2 = styled.img`
    height: 70%;
    width: auto;
    margin-left: 20px;
    margin-right: 10px;
    @media(max-width: 420px){
      margin-left: 0;
      margin-right: 0;
    }
 `;
 const ButtonNav = styled.button`
    height: 70%;
    width: auto;
    margin-left: 20px;
    margin-right: 10px;
    background-color: transparent;
    border-color: transparent;
    cursor: pointer; 
    
    @media(max-width: 420px){
      margin-left: 0;
      margin-right: 0;
    }
 `;

export default function BarraPrincipal() {

    const {logOut} = useContext(AuthContext);
    const user = JSON.parse(sessionStorage.getItem("user"))
    return (
        <Gridcontainer>
            <Griditem1>
                    <Img src={logo}/>
            </Griditem1>
            <Griditem2>
                <Navbartitle>Simulador Mercado de Acciones</Navbartitle>
            </Griditem2>
                {
                  user ? (
                      <Griditem3>
                          <p>{user.full_name}</p>
                          <ButtonNav onClick={logOut}>
                              <Img2 src={cierre_sesion}/>
                          </ButtonNav>

                      </Griditem3>
                  ) : (<div></div>)

                }

        </Gridcontainer>
    )

}
    


