import React, {Component} from "react";
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";

const Navbarsecundario = styled.div`
  height: 60px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color:#FDFDFD;

`;
const Navbarbutton = styled.div`
  margin: 5px 20px;
`;

const Buttonnavbar = styled(Link)`
  height: 40px;
  background-color: rgba(255, 255, 255, 0.156);
  border-color: #a7cdd900;
  font-size: 20px;
  color: black;
  text-decoration: none;
`;


export default function BarraSecundaria(){
    return(
            <Navbarsecundario>
                <Navbarbutton>
                    <Buttonnavbar to="/home">Inicio</Buttonnavbar>
                </Navbarbutton>
                <Navbarbutton>
                    <Buttonnavbar to={location => ({ ...location, pathname: "/profile" })}>Perfil</Buttonnavbar>
                </Navbarbutton>
                <Navbarbutton>
                    <Buttonnavbar to={'/buysell/buy'}>Compra</Buttonnavbar>
                </Navbarbutton>
                <Navbarbutton>
                    <Buttonnavbar to={'/buysell/sell'}>Venta</Buttonnavbar>
                </Navbarbutton>
            </Navbarsecundario>
        )



}