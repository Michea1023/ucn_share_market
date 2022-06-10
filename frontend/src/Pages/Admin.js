import React,{Component} from "react";
import styled from "styled-components";
import BarraPrincipal from "../components/NavBar/BarraPrincipal";
import BarraSecundaria from "../components/NavBar/BarraSecundaria";
import Ranking from "../components/Admin/Ranking";

const GridPrincipal = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 60px 60px 60vh 60vh;
    grid-template-areas: 
    "nav nav"
    "nav2 nav2"
    "Acciones1 Resumen2"
    
`;
const Grid1 = styled.div`
    grid-area: nav;
`;
const Grid2 = styled.div`
    grid-area: nav2;
`;
const Grid3 = styled.div`
    grid-area: Acciones1;   
    justify-self:center;
    align-self:center;
`;
const Grid4 = styled.div`
    grid-area: Resumen2;
    justify-self:center;
    align-self:center;
`;


export default class Admin extends Component{

    constructor(props) {
        super(props);
    }

    render(){

        return(
            <GridPrincipal>
                <Grid1>
                    <BarraPrincipal/>
                </Grid1>
                <Grid2>
                    <BarraSecundaria/>
                </Grid2>
                <Grid3>

                </Grid3>
                <Grid4>
                    <Ranking>

                    </Ranking>
                </Grid4>


            </GridPrincipal>
        )
    }

}

