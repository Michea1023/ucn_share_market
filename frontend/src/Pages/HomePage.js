
import React from "react";
import AccionesPrecios from "../components/HomePage/AccionesPrecios";
import ResumenUsuario from "../components/HomePage/ResumenUsuario";
import BarraPrincipal from "../components/NavBar/BarraPrincipal";
import BarraSecundaria from "../components/NavBar/BarraSecundaria";
import styled from "styled-components";
import PageNotFound from "./PageNotFound";

const GridPrincipal = styled.div`
    @media(min-width: 420px){
        display: grid;
        grid-template-columns: 45vw 55vw;
        grid-template-rows: 60px 60px 80vh;
        grid-template-areas: 
        "nav nav"
        "nav2 nav2"
        "Resumen2 Acciones1"
    }
    
    @media(max-width: 650px){
        display: flex;
        flex-direction:column;
    }
    
`;
const Grid1 = styled.div`
    @media(min-width: 650px){
        grid-area: nav;
    }
    @media(max-width: 650px){
        order:1;
    }
    
    
`;
const Grid2 = styled.div`
    @media(min-width: 650px){
        grid-area: nav2;
    }
    @media(max-width: 650px){
        order:2;
    }
`;
const Grid3 = styled.div`
    padding: 20px 0;
    
        margin-top:30px;

    
    @media(min-width: 650px){
        grid-area: Acciones1;   
        justify-self:center;
    }
    @media(max-width: 650px){
        order:4;
        align-self:center;
        
    }
    
`;
const Grid4 = styled.div`
    
    padding: 20px 0;
    margin-top:30px;
    
    @media(min-width: 650px){
        grid-area: Resumen2;
        justify-self:center;
        
    }
    @media(max-width: 650px){
        order:3;
        align-self:center;
    }
    
    
   
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