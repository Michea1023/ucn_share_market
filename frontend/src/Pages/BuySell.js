import React, {Component} from "react";
import BarraPrincipal from "../components/NavBar/BarraPrincipal";
import styled from "styled-components";
import BarraSecundaria from "../components/NavBar/BarraSecundaria";
import Buscador from "../components/BuySell/Buscador";
import Saldos from "../components/BuySell/Saldo";
import Rentabilidad from "../components/BuySell/Rentabilidad";

const GridPrincipal = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 60px 60px 20vh 60vh;
    grid-template-areas: 
    "nav nav"
    "nav2 nav2"
    "Area1 Area2"
    "Area3 Area4";
`;
const Grid1 = styled.div`
    grid-area: nav;
`;
const Grid2 = styled.div`
    grid-area: nav2;
`;
const Grid3 = styled.div`
    grid-area: Area1;   
    justify-self:center;
    align-self:center;
`;
const Grid4 = styled.div`
    grid-area: Area2;
    justify-self:center;
    align-self:center;
`;
const Grid5 = styled.div`
    grid-area: Area3;
    justify-self:center;
    
`;
const Grid6 = styled.div`
    grid-area: Area4;
`;

export default class BuySell extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
            <GridPrincipal>
                <Grid1>
                    <BarraPrincipal />
                </Grid1>
                <Grid2>
                     <BarraSecundaria/>
                </Grid2>
                <Grid3>
                    <Buscador />
                </Grid3>
                <Grid4>
                    <Saldos/>
                </Grid4>
                <Grid5>
                    <Rentabilidad />
                </Grid5>
                <Grid6>
                    <h3>Form</h3>
                </Grid6>



            </GridPrincipal>
        )
    }
}