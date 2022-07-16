import React from "react";
import styled from "styled-components";
import BarraPrincipal from "../components/NavBar/BarraPrincipal";
import Ranking from "../components/Admin/Ranking";
import BarraAdmin from "../components/Admin/BarraAdmin";
import Users from "../components/Admin/Users";
import Settings from "../components/Admin/Settings";

const GridPrincipal = styled.div`
    box-sizing: content-box;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 60px calc(100% - 60px);
    grid-template-areas: 
    "nav nav"
    "Barra Contenido";
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
    margin-top: 20px;
    
`;


export default function Admin(){

    const admin = JSON.parse(sessionStorage.getItem("user")).staff

    return(
        <>

        {
            admin == true ? (
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
            ) : ( alert("Problemas al iniciar como administrador"))

        }
        </>
        )

}

