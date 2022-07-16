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




export default function OrdenState(props){
    return(
             <>
            <H4>{props.id}</H4>
            <H4>{props.share}</H4>
            <H4>{props.amount}</H4>
                 <H4>{props.price}</H4>
             <H4>{props.type_order == "B"? "Compra":"Venta"}</H4>
                 <H4>
                     <ButtonRojo>Cancelar</ButtonRojo>
                 </H4>


             </>

        )
}