import React, {Component, useEffect, useState} from "react";
import styled from "styled-components";
import {getRequest} from "../../context/Request";


const GridRentabilidad = styled.div`
    background-color: #E1F1F9;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
    border-radius: 20px;
    width: 35vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    
    @media(max-width: 1250px){
        width:45vw;
    }
    
    @media(max-width: 900px){
        width:60vw;
    }
    
    @media(max-width: 420px){
        width: 87vw;
    }
`;
const A = styled.div`
    margin: 0 10%;
    @media(max-width: 1250px){
        margin: 5px 5%;
    }
`;

export default function Rentabilidad(props){

    const [shareTable,setShareTable] = useState([])


    useEffect(()=>{
        async function rent() {
            setShareTable(await getRequest("http://127.0.0.1:8000/api/transaction-table"))
        }
        rent()
    },[])

    return(
        <GridRentabilidad>

            {
                props.share != undefined ? (
                    shareTable.map(x=>(
                        x.name === props.share+"/CLP" ? (
                            <>
                                <A>
                                    <h4>Par acción</h4>
                                    <p>{x.name}</p>
                                </A>
                                <A>
                                    <h4>Valor actual</h4>
                                    <p>${x.market_val}</p>
                                </A>
                                <A>
                                    <h4>Variación diaria</h4>
                                    <p>{x.diary_rent}%</p>
                                </A>
                            </>
                        ) :     null
                    ))
                ) : (
                    <A>
                        <h4>Seleccione una acción</h4>

                    </A>
                )
            }





            </GridRentabilidad>
    )
}