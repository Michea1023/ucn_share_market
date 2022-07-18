import React, {useState} from "react";
import styled from "styled-components";
import BarraPrincipal from "../components/NavBar/BarraPrincipal";
import Ranking from "../components/Admin/Ranking";
import Users from "../components/Admin/Users";
import Settings from "../components/Admin/Settings";

const GridPrincipal = styled.div`
    box-sizing: content-box;
    display: grid;
    grid-template-columns: 1fr 3fr;
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
    
    display: flex;
    flex-direction: column;
    background-color: #E1F1F9;
    text-indent: 20px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
    width:20vw;
  
    padding-top: 60px;
    height: calc(100vh - 120px);
`;
const Grid3 = styled.div`
    grid-area: Contenido;   
    justify-self:center;
    margin-top: 20px;
    
`;
const H2 = styled.button`
    font-size: 25px;
    font-weight: bold;
    color: black;
    text-decoration: none;
    margin-top:10px;
    border:none;
    background-color:transparent;
    :hover{
        cursor:pointer;
    }
`;


export default function Admin(){

    const admin = JSON.parse(sessionStorage.getItem("user")).staff

    const [page, setPage] = useState(0)

    return(
        <>

        {
            admin == true ? (
                <GridPrincipal>
                    <Grid1>
                        <BarraPrincipal/>
                    </Grid1>
                    <Grid2>
                        <H2 onClick={()=>setPage(0)}>Usuarios</H2>
                        <br/>
                        <H2 onClick={()=>setPage(2)}>Configuración del sistema</H2>

                    </Grid2>
                    <Grid3>
                        {
                            page == 0 ? (<Users/>) : page == 1 ? (<Ranking/>) : page == 3 ? (alert("error")) : (<Settings/>)
                        }
                    </Grid3>


            </GridPrincipal>
            ) : ( alert("Problemas al iniciar como administrador"))

        }
        </>
        )

}

