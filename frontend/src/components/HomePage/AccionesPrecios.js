import React,{Component} from "react";
import CompAccionesPrecios from "./CompAccionesPrecios";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {getRequest} from "../../context/Request";
import {Titulo} from "../Styled";

 const B = styled.li`
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
    width: 50vw;
    border-radius: 20px;
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.252);
    display:grid;
    padding:10px;
    
    justify-content:center;
   
   @media(max-width: 500px){
    width: 70vw;
  }
   
    @media(max-width: 420px){
        width: 87vw;
        margin-button:10px;
    }
    
    
    
`;

const Tabla= styled.div`
    display:table;
    padding: 10px;
    height: 200px;
    width:48vw;
    background-color: #E1F1F9;
    border-radius:20px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
    @media(max-width: 500px){
        width: 65vw;
    }
    @media(max-width: 420px){
        width: 82vw;
    }
    
`;

const H4 = styled.h4`
    display:table-cell;
    margin: 20px;
    text-align:center;
    border: none;
`;

const Content = styled.div`
     display: table-row;
`;


export default function AccionesPrecios() {

    const [arrShare, setArrShare] = useState([]);

    useEffect(() => {

        async function request(){
            setArrShare(await getRequest("http://127.0.0.1:8000/api/transaction-table"))
        }
        request()

        },[])

    console.log(arrShare)

    return(
        <GridActivos>
            <Titulo>Acciones y precios</Titulo>
            <Content>
                <Tabla>
                    <B>


                        <H4>Nombre</H4>
                        <H4>Precio</H4>
                        <H4>Rentabilidad diaria</H4>
                        <H4></H4>
                    </B>



                    {


                        arrShare.map(x=> (
                            <B>
                           <CompAccionesPrecios name ={x.name}   market_val={x.market_val}   diary_rent = {x.diary_rent}/>
                            </B>
                        ))
                    }



                </Tabla>
            </Content>

        </GridActivos>
    )

}