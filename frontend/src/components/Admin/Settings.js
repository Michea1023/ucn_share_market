import React,{Component} from "react";
import styled from "styled-components";
import {A, Button, Input, Label} from "../Styled";

const GridPrincipal = styled.div`
    width: 50vw;   
`;

const Separacion = styled.div`
    height:90px; 
    text-indent: 150px;
`;
const ButtonVerde = styled(Button)`
    background-color:#27E709;
`;

export default function Settings(){

    return(
             <GridPrincipal>
            <Separacion>
                <h2>Buscador</h2>
            </Separacion>
            <A>
                <Label>Monto Inicial</Label>
                <Input disabled/>
            </A>
            <A>
                <Label>Comision Fija</Label>
                <Input disabled/>
            </A>
            <A>
                <Label>Comision Variable</Label>
                <Input disabled/>
                <ButtonVerde>Actualizar</ButtonVerde>

            </A>
            </GridPrincipal>

            )
}
