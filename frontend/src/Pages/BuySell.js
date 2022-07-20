import React, {Component, useContext, useState,useEffect} from "react";
import BarraPrincipal from "../components/NavBar/BarraPrincipal";
import styled from "styled-components";
import BarraSecundaria from "../components/NavBar/BarraSecundaria";
import Saldos from "../components/BuySell/Saldo";
import Rentabilidad from "../components/BuySell/Rentabilidad";
import Compra from "../components/BuySell/Compra"
import Venta from "../components/BuySell/Venta"
import {useParams} from "react-router-dom";
import PageNotFound from "./PageNotFound";

import {getRequest} from "../context/Request";

const GridPrincipal = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 60px 60px 20vh 60vh;
    grid-template-areas: 
    "nav nav"
    "nav2 nav2"
    "Area1 Area2"
    "Area3 Area4";
    
    @media(max-width: 900px){
        display: flex;
        flex-direction: column;
    }
    
    
`;
const Grid1 = styled.div`

    grid-area: nav;
    
    @media(max-width: 900px){
        order:1;
    }
`;
const Grid2 = styled.div`

    grid-area: nav2;
    
    @media(max-width: 900px){
        order:2;
    }
`;
const Grid3 = styled.div`

    padding: 20px 0;

    grid-area: Area1;   
    justify-self:center;
    align-self:center;
    
    @media(max-width: 900px){
        order:3;
        align-self:center;
    }
    
`;
const Grid4 = styled.div`

    padding: 20px 0;

    grid-area: Area2;
    justify-self:center;
    align-self:center;
    
    @media(max-width: 900px){
        order:4;
        align-self:center;
    }
    
`;
const Grid5 = styled.div`

    padding: 20px 0;

    grid-area: Area3;
    justify-self:center;
    
    @media(max-width: 900px){
        order:5;
        align-self:center;
    }
    
    
`;
const Grid6 = styled.div`

    padding: 20px 0;

    grid-area: Area4;
    justify-self:center;
    
    @media(max-width: 900px){
        order:6;
        align-self:center;
    }
    
`;


//Buscador
const GridBuscador = styled.div`
    width: 35vw;   
    
    @media(max-width: 900px){
        width:60vw;
    }
    
    @media(max-width: 420px){
        width:87vw;
        
    }
`;
const T1 = styled.div`
    height:35px;  
    @media(max-width: 420px){
        align-content:center;
    }
`;
const T2 = styled.div`   
    display:table-row;
`;
const B = styled.div`
    display:table-cell;   
`;
const Input = styled.input`
    display: table-cell;
    margin: 10px;
    border-radius:10px;
    padding-top:10px;
    padding-left:30px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
    border:0;
    background-image: url(../../../static/images/1086933.png)  scroll 7px 7px;
    @media(max-width: 900px){
        padding-left:0px;

    }
`;
const Option = styled.option`
    width: 50px;
`;
const Datalist = styled.datalist`
    width:50px;
`;



//export const [buscardor, setBuscador] = useState();

export default function BuySell() {

    let {type} = useParams()
    //setBuscador("ltm")
    //console.log(buscardor);


    //buscardor
    const [share, setShare] = useState([]); // variables de almacenamiento de la futura request
    const [select, setSelect] = useState()
    const [loading, setLoading] =useState(true); //estado de carga para evitar variables vacias



    const headers = {'Content-Type': 'application/json'} // heaader para la request (opcional)

    useEffect( () => { // el useEffect va asi ya que el getRequest es una promesa con su respectivo await

        async function shares(){
            setShare(await getRequest("http://127.0.0.1:8000/api/share",{headers}))
            setLoading(false) // para terminar la carga
        }
        shares()
    }, []);

    function handleChangeShare(event) {
        let va = event.target.value
        setSelect(va)
    }


    return(
        <GridPrincipal>
                <Grid1>
                    <BarraPrincipal />
                </Grid1>
                <Grid2>
                     <BarraSecundaria/>
                </Grid2>
                <Grid3>
                            <GridBuscador>
                                <T1>
                                    <h2>Buscador de acciones</h2>
                                </T1>
                                <T2>
                                    <B>
                                        <p>Seleccione una acción:</p>
                                    </B>
                                    <B>
                                        {
                                            loading ?
                                                (<p>Cargando</p>) :
                                                (<datalist id = "acciones">
                                                   {
                                                       share.map(elem => elem.code != "CLP"?(<Option>{elem.code}</Option>):null)  // No se muestra como accion la moneda CLP ya que solo usaremos esta como la principal
                                                   }
                                                </datalist>
                                                )
                                        }
                                        <Input type= "text" list = "acciones" name="share" onChange={handleChangeShare} />
                                    </B>

                                </T2>
                    </GridBuscador>
                </Grid3>
                <Grid4>
                    <Saldos share={select}/>
                </Grid4>
                <Grid5>
                    <h3>Rentabilidad</h3>
                    <Rentabilidad share={select}/>
                </Grid5>

                <Grid6>
                    {
                      type === "buy" ? <Compra share={select}/> : (type === "sell" ? <Venta share={select}/> : <PageNotFound/>)
                    }
                </Grid6>
            </GridPrincipal>
    );
}