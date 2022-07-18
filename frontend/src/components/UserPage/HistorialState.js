import React, {Component} from "react";
import styled from "styled-components";

const H4 = styled.h4`
    display:table-cell;
    margin: 10px;
    text-align:center;
`;

export default function HistorialState(props){

    return(
             <>
                 <H4>{props.id}</H4>
                 <H4>{props.name}</H4>
                 <H4>{props.amount}</H4>
                 <H4>{props.price}</H4>
                 <H4>{props.type == "B"? "Compra":"Venta"}</H4>


             </>


    )

}