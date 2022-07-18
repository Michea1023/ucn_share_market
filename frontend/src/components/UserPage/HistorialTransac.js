import React from "react";
import HistorialState from "./HistorialState";

import styled from "styled-components";
import {Titulo} from "../Styled";
import {useEffect, useState} from "react";
import {getRequest} from "../../context/Request";

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
    
`;

const Tabla= styled.div`
    display:table;
    padding: 10px;
    width: 28vw;
    justify-self:center;
    background-color: #E1F1F9;
    border-radius:20px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
    
`;

const H4 = styled.h4`
    display:table-cell;
    margin: 20px;
    text-align:center;
`;


export default function HistorialTransac(){
    const [arrShare, setArrShare] = useState([]);

    useEffect(()=>{

        async function request(){
             setArrShare(await getRequest("http://127.0.0.1:8000/api/transaction"))
        }
        request()

    },[])

    return(

           <GridActivos>

                   <Titulo>Historial de transacciones</Titulo>


                <Tabla>

                    <B>
                        <H4>ID</H4>
                        <H4>Acción</H4>
                        <H4>Cantidad</H4>
                        <H4>Precio</H4>
                        <H4>Tipo</H4>
                    </B>

                        {

                            arrShare.inactive ? (arrShare.inactive.length > 0) ? (arrShare.inactive.map(
                                x=> (
                                    <B>
                                        <HistorialState id ={x.id} name = {x.share}  price={x.price} amount={x.amount} type={x.type_order}></HistorialState>
                                    </B>
                                )
                            )) : (
                                <H4>Sin historial de transacciones</H4>
                            ) : null


                        }




                </Tabla>



            </GridActivos>
    )

}