import React, {Component} from "react";
import styled from "styled-components";
import {Button} from "../Styled";

const H4 = styled.h4`
    display:table-cell;
    margin: 10px;
    text-indent: 13px;
`;

const ButtonRojo = styled(Button)`
    background-color:#FF0000;
`;




export default function OrdenState(){
    return(
             <>
            <H4>3</H4>
            <H4>LTM</H4>
            <H4>1000</H4>
             <H4>$130</H4>
             <H4>Compra</H4>
                 <H4>
                     <ButtonRojo>Cancelar</ButtonRojo>
                 </H4>


             </>

        )
}