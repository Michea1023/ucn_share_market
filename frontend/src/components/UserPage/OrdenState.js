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
            <H4>{props.share_buy}</H4>
            <H4>1000</H4>
             <H4>{props.market_val}</H4>
             <H4>Compra</H4>
                 <H4>
                     <ButtonRojo>Cancelar</ButtonRojo>
                 </H4>


             </>

        )
}