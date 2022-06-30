import React, {Component, useEffect, useState} from "react";
import styled from "styled-components";
import buscar from "../../../static/images/1086933.png"
import {getRequest} from "../../context/Request";

const GridBuscador = styled.div`
    width: 35vw;   
`;
const T1 = styled.div`
    height:35px;  
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
`;
const Option = styled.option`
    width: 50px;
`;
const Datalist = styled.datalist`
    width:50px;
`;



export default function Buscador(){

    const [share, setShare] = useState([]); // variables de almacenamiento de la futura request

    const [loading, setLoading] =useState(true); //estado de carga para evitar variables vacias

    const headers = {'Content-Type': 'application/json'} // heaader para la request (opcional)

    useEffect(async () => { // el useEffect va asi ya que el getRequest es una promesa con su respectivo await
        setShare(await getRequest("http://127.0.0.1:8000/api/share",{headers}))
        setLoading(false) // para terminar la carga
    }, []);





    return(
            <GridBuscador>
                <T1>
                    <h2>Buscardor de acciones</h2>
                </T1>
                <T2>
                    <B>
                        <p>Seleccione una acción</p>
                    </B>
                    <B>
                        {
                            loading ?
                                (<p>Cargando</p>) :
                                (<datalist id = "acciones">
                                   {
                                       share.map(elem => (<Option>{elem.code}</Option>))
                                   }
                                </datalist>
                                )
                        }
                        <Input type= "text" list = "acciones"/>
                    </B>

                </T2>
            </GridBuscador>
        )
}