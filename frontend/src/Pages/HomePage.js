
import React from "react";
import AccionesPrecios from "../components/HomePage/AccionesPrecios";
import ResumenUsuario from "../components/HomePage/ResumenUsuario";
import BarraPrincipal from "../components/NavBar/BarraPrincipal";
import BarraSecundaria from "../components/NavBar/BarraSecundaria";
import styled from "styled-components";
import PageNotFound from "./PageNotFound";

const GridPrincipal = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 60px 60px 80vh;
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

`;
const Grid4 = styled.div`
    grid-area: Resumen2;
    justify-self:center;
   
`;



export default function HomePage(){

    const user = sessionStorage.getItem('user');


    return(
        <div>
           {user ?
                (<GridPrincipal>
            <Grid1>
                <BarraPrincipal />
            </Grid1>
            <Grid2>
                <BarraSecundaria />
            </Grid2>
            <Grid3>
                <AccionesPrecios />
            </Grid3>
            <Grid4>
                <ResumenUsuario />
            </Grid4>

        </GridPrincipal>)
                    :
                (<PageNotFound/>)}
        </div>

    )


}