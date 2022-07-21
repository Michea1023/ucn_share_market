import React from "react";
import styled from "styled-components";
import {Titulo} from "../Styled"

import ActivoAccion from "./ActivoAccion";


 const B = styled.div`
    display: table-row;
    margin: 10px;
    background-color: #E1F1F9;
    border-top-right-radius: 80px;
    padding-left: 10px;
    padding-right: 10px;
    height: 50px;
    width: 22vw;
    
`;


const GridActivos = styled.div`
    background-color: #A7CDD9;
    width: 30vw;
    border-radius: 20px;
    padding:10px;
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.252);
    display:grid;
    
    @media(max-width: 1250px){
        width:45vw;
    }
    
    @media(max-width: 426px){
        width:87vw;
    }
    
`;

const Tabla= styled.div`
    display:table;
    padding: 10px;
    width: 28vw;
    justify-self:center;
    background-color: #E1F1F9;
    border-radius:20px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
    
    @media(max-width: 1250px){
        width:42vw;
    }
    
    @media(max-width: 426px){
        width:82vw;
    }
    
`;

const H4 = styled.h4`
    display:table-cell;
    margin: 20px;
    text-align:center;
`;

export default function Activos (){


    const user = JSON.parse(sessionStorage.getItem("user"))
    console.log(user.share.length)

    return(
        <GridActivos>
            <Titulo>Activos</Titulo>
            <Tabla>
                <B>
                    <H4>Acción</H4>
                    <H4>Cantidad</H4>
                    <H4>Monto</H4>
                </B>

                {
                    user.share.length > 1 ? (
                          user.share.map(x=>(
                              x.code != "CLP" ? (
                                  <B>
                                    <ActivoAccion share={x.code} amount={x.amount} price={x.price}/>
                                  </B>
                              ) : null

                          ))
                    ) : (
                        <H4>Sin acciones en la cuenta</H4>
                    )
                }



            </Tabla>



        </GridActivos>
    )


}