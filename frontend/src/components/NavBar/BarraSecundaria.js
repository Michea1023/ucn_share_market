import React, {Component} from "react";
import styled from "styled-components";

const Navbarsecundario = styled.div`
  height: 60px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
  display: flex;
  justify-content: flex-start;
  align-items: center;

`;
const Navbarbutton = styled.div`
  margin: 5px 20px;
`;

const Buttonnavbar = styled.button`
  height: 40px;
  background-color: rgba(255, 255, 255, 0.156);
  border-color: #a7cdd900;
  font-size: 20px;
  color: black;
`;


export default class BarraSecundaria extends Component{
    constructor(props) {
        super(props);
    }
    render(){

        return(
        <Navbarsecundario>
            <Navbarbutton>
                <Buttonnavbar>Perfil</Buttonnavbar>
            </Navbarbutton>
            <Navbarbutton>
                <Buttonnavbar>Compra/Venta</Buttonnavbar>
            </Navbarbutton>v>
        </Navbarsecundario>
    )
    }



}