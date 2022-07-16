import React, {Component} from "react";
import OrdenState from "./OrdenState";
import styled from "styled-components";
import {A,Titulo} from "../Styled"
import {useEffect, useState} from "react";
import {getRequest} from "../../context/Request";


const GridActivos = styled.div`
    background-color: #A7CDD9;
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
 const B = styled.li`
  
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


//<B>
//
//                         </B>

export default function OrdenesActivas(){
    const [arrShare, setArrShare] = useState([]);

    useEffect( ()=>{

        async function request(){
            setArrShare(await getRequest("http://127.0.0.1:8000/api/transaction"))
        }
        request()

    },[])

    return(

            <GridActivos>
            <Titulo>Ordenes activas</Titulo>
            <Tabla>
                <B>
                    <H4>ID</H4>
                    <H4>Accion</H4>
                    <H4>Cantidad</H4>
                    <H4>Precio</H4>
                    <H4>Tipo</H4>
                    <H4></H4>
                </B>


                {

                    arrShare.active ? (arrShare.active.length > 0) ? (arrShare.active.map(
                        x=> (
                            <B>
                                <OrdenState id ={x.id} share = {x.share}  price={x.price} amount={x.amount} type_order={x.type_order}></OrdenState>
                            </B>
                        )
                    )) : (
                        <B>
                            <h3>Sin ordenes activas</h3>
                        </B>
                    ) : null

                }
            </Tabla>
        </GridActivos>

    )
}

