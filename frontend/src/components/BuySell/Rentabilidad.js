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
`;
const A = styled.div`
    margin: 0 10%;
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
                                    <h4>Par Acción</h4>
                                    <p>{x.name}</p>
                                </A>
                                <A>
                                    <h4>Variación diaria</h4>
                                    <p>{x.diary_rent}</p>
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