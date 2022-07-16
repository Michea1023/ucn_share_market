import React from "react";
import styled from "styled-components";
import BarraPrincipal from "../components/NavBar/BarraPrincipal";
// todo esto es por mientras
import BarraSecundaria from '../components/NavBar/BarraSecundaria';
import OrdenesActivas from '../components/UserPage/OrdenesActivas';
import HistorialTransac from '../components/UserPage/HistorialTransac';
import Activos from '../components/UserPage/Activos';

import PageNotFound from "./PageNotFound";

const GridUsuario = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 60px 60px 60px 70vh;
    grid-template-areas:
    "nav nav nav"
    "nav2 nav2 nav2"
    "titulo titulo titulo"
    "area1 area2 area3";
`;
const GridNav = styled.div`
    grid-area: nav;
`;
const GridNavS = styled.div`
    grid-area: nav2;
`;
const GridTitulo = styled.h3`
    grid-area: titulo;
    justify-self:center;
`;
const GridArea1 = styled.div`
    grid-area: area1;
    
`;
const GridArea2 = styled.div`
    grid-area: area2;
`;
const GridArea3 = styled.div`
    grid-area: area3;
`;

export default function UserProfile(){

    const user = sessionStorage.getItem('user');

    return(
        <>
        {user ? (
            <GridUsuario>
            <GridNav>
                <BarraPrincipal />
            </GridNav>
            <GridNavS>
                <BarraSecundaria />
            </GridNavS>
            <GridTitulo>Perfil Usuario</GridTitulo>
            <GridArea1>
                <Activos/>
            </GridArea1>
            <GridArea2>
                <HistorialTransac></HistorialTransac>
            </GridArea2>
            <GridArea3>
                <OrdenesActivas></OrdenesActivas>
            </GridArea3>
        </GridUsuario>
            ) : (
                <PageNotFound/>
            )

        }
        </>

    )

}