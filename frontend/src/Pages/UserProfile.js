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
    grid-template-rows: 60px 60px 90px 70vh;
    grid-template-areas:
    "nav nav nav"
    "nav2 nav2 nav2"
    "titulo titulo titulo"
    "area1 area2 area3";
    @media(max-width: 1250px){
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 60px 60px 90px auto auto;
        grid-template-areas:
        "nav nav"
        "nav2 nav2"
        "titulo titulo"
        "area1 area2"
        "area3 vacio";
    }
    
    @media(max-width: 900px){
        display:flex;
        flex-direction:column;
    }
`;
const GridNav = styled.div`
    grid-area: nav;
    @media(max-width: 900px){
        order:1;
    }
`;
const GridNavS = styled.div`
    grid-area: nav2;
    @media(max-width: 900px){
        order:2;
    }
`;
const GridTitulo = styled.h2`
    grid-area: titulo;
    justify-self:center;
    margin: 30px;
    @media(max-width: 900px){
        order:3;
        align-self:center;
    }
`;
const GridArea1 = styled.div`

    padding: 20px 0;

    grid-area: area1;
    justify-self:center;
    @media(max-width: 900px){
        order:4;
        align-self:center;
    }
    
`;
const GridArea2 = styled.div`

    padding: 20px 0;

    grid-area: area2;
    justify-self:center;
    @media(max-width: 900px){
        order:6;
        align-self:center;
    }
`;
const GridArea3 = styled.div`

    padding: 20px 0;

    grid-area: area3;
    justify-self:center;
    @media(max-width: 900px){
        order:5;
        align-self:center;
    }
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