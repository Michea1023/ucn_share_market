import React, {Component, useEffect, useState} from "react";
import styled from "styled-components";
import {A, Button, Input, Label} from "../Styled";
import {getRequest} from "../../context/Request";

const GridPrincipal = styled.div`
    width: 60vw;   
`;

const Separacion = styled.div`
    height:90px; 
    text-indent: 150px;
`;
const ButtonVerde = styled(Button)`
    background-color:#27E709;
`;

export default function Settings(){

    const [maxValueTrans, setMaxValueTrans] = useState()
    const [maxInitValue, setMaxInitValue] = useState()
    const [variableComission, setVariableComission] = useState()
    const [fixedCom, setFixedCom] = useState()

    useEffect(()=>{

        async function setting(){
            const com = await getRequest("http://127.0.0.1:8000/api/setting?query=all")
            setMaxValueTrans(com.maximum_value_transfer)
            setMaxInitValue(com.maximum_init_value)
            setVariableComission(com.variable_commission)
            setFixedCom(com.fixed_commission)
        }
        setting()


    },[])


    return(
             <GridPrincipal>
            <Separacion>
                <h2>Buscador</h2>
            </Separacion>
            <A>
                <Label>Monto inicial</Label>
                <Input value={maxInitValue}/>
            </A>
                 <A>
                <Label>Monto maximo por transaccion</Label>
                <Input value={maxValueTrans}/>
            </A>
            <A>
                <Label>Comision fija</Label>
                <Input value={fixedCom}/>
            </A>
            <A>
                <Label>Comision variable</Label>
                <Input value={variableComission}/>
                <ButtonVerde>Actualizar</ButtonVerde>

            </A>
            </GridPrincipal>

            )
}
