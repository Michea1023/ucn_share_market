import React, {Component} from "react";
import styled from "styled-components";

const H4 = styled.h4`
    display:table-cell;
    margin: 10px;
    text-indent: 13px;
`;

export default function HistorialState(props){

    return(
             <>
            <H4>{props.id}</H4>
            <H4>{props.share_buy}</H4>
            <H4>100</H4>
             <H4>{props.market_val}</H4>
             <H4>Venta</H4>

             </>


    )

}