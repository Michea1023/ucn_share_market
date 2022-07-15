import React,{Component} from "react";
import styled from "styled-components";
import BarraPrincipal from "../components/NavBar/BarraPrincipal";
import BarraSecundaria from "../components/NavBar/BarraSecundaria";
import Ranking from "../components/Admin/Ranking";
import BarraAdmin from "../components/Admin/BarraAdmin";
import Users from "../components/Admin/Users";
import Settings from "../components/Admin/Settings";

const GridPrincipal = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 60px 60vh;
    grid-template-areas: 
    "nav nav"
    "Barra Contenido"
    
`;
const Grid1 = styled.div`
    grid-area: nav;
`;
const Grid2 = styled.div`
    grid-area: Barra;
`;
const Grid3 = styled.div`
    grid-area: Contenido;   
    justify-self:center;
    align-self:center;
`;


export default function Admin(){

    return(
            <GridPrincipal>
                <Grid1>
                    <BarraPrincipal/>
                </Grid1>
                <Grid2>
                    <BarraAdmin/>

                </Grid2>
                <Grid3>
                    <Users/>
                </Grid3>


            </GridPrincipal>
        )

}

