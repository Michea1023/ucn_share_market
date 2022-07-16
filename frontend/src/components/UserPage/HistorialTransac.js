import React, {Component} from "react";
import HistorialState from "./HistorialState";

import styled from "styled-components";
import {A,Titulo} from "../Styled";
import {useEffect, useState} from "react";
import {getRequest} from "../../context/Request";



const Parametros = styled.div`
  display: grid;
  grid-template-columns: 20% 20% 40% 30%;
  grid-template-rows: 30px;
  background-color: #E1F1F9;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
  border-radius: 20px;
  padding-left: 10px;
  padding-right: 10px;
  height: 50px;
  width: 44vw;
    
`;



 const B = styled.div`
    display: table-row;
    margin: 10px;
    background-color: #E1F1F9;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
    border-top-right-radius: 80px;
    padding-left: 10px;
    padding-right: 10px;
    height: 50px;
    width: 22vw;
    
`;


const GridActivos = styled.div`
    background-color: #A7CDD9;
    width: 90%;
    border-radius: 20px;
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.252);
    display:grid;
    
`;

const GridActivos2 = styled.div`
    background-color: #E1F1F9;
    width: 90%;
    border-radius: 20px;
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.252);
    display:grid;
    
`;
const Tabla= styled.div`
    display:table;
    padding: 10px;
    
`;

const Fondo= styled.div`
    
`;

const H4 = styled.h4`
    display:table-cell;
    margin: 20px;
    text-indent: 13px;
`;


export default function HistorialTransac(){
    const [arrShare, setArrShare] = useState([]);

    useEffect(()=>{

        async function request(){
             setArrShare(await getRequest("http://127.0.0.1:8000/api/transaction-table"))
        }
        request()

    },[])

    return(

           <GridActivos>

                   <Titulo>Historial de transacciones</Titulo>


                <Tabla>

                    <B>
                        <H4>ID</H4>
                        <H4>Accion</H4>
                        <H4>Cantidad</H4>
                        <H4>Precio</H4>
                        <H4>Tipo</H4>
                    </B>

                        {

                            arrShare.map(x => (
                                <B>
                                    <HistorialState id ={x.id}  share_buy = {x.share_buy}  market_val={x.market_val}></HistorialState>)
                               </B>

                                ))
                        }




                </Tabla>



            </GridActivos>
    )

}