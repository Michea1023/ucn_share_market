import React, {Component, useEffect, useState} from "react";
import styled from "styled-components";
import {A, Button, Input, Label} from "../Styled";
import {getRequest, postRequestCer} from "../../context/Request";

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

    function handleChangeInicial(event) {
        let va = event.target.value
        setMaxInitValue(va)
    }
    function handleChangeMax(event) {
        let va = event.target.value
        setMaxValueTrans(va)
    }
    function handleChangeFix(event) {
        let va = event.target.value
        setFixedCom(va)
    }
    function handleChangeVa(event) {
        let va = event.target.value
        setVariableComission(va)
    }

    const handleSubmit = async (e) => {
        const data = {
            "variable_commission": variableComission,
            "fixed_commission": fixedCom,
            "maximum_init_value": maxInitValue,
            "maximum_value_transfer": maxValueTrans
        }
        const res = await postRequestCer("http://127.0.0.1:8000/api/setting", JSON.stringify(data))
        res == 201 ? (alert("Se actualizaron los datos correctamente")) : (alert("Problemas al actualizar los datos"))
    }

    return(
             <GridPrincipal>
                <Separacion>
                        <h2>Buscador</h2>
                </Separacion>
                 <form onSubmit={(e) => handleSubmit(e)}>
                     <A>
                        <Label>Monto inicial</Label>
                        <Input type="number" onChange={handleChangeInicial} value={maxInitValue}/>
                     </A>
                     <A>
                        <Label>Monto maximo por transaccion</Label>
                        <Input type="number" onChange={handleChangeMax} value={maxValueTrans}/>
                     </A>
                     <A>
                        <Label>Comision fija</Label>
                        <Input type="number" onChange={handleChangeFix} value={fixedCom}/>
                     </A>
                     <A>
                        <Label>Comision variable</Label>
                        <Input  onChange={handleChangeVa} value={variableComission}/>
                        <ButtonVerde type="submit">Actualizar</ButtonVerde>
                     </A>
                 </form>

            </GridPrincipal>

            )
}
