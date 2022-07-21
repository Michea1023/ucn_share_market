import React, {Component} from "react";
import styled from "styled-components";
import addCommas from "../../utils/util";

const H4 = styled.p`
    display:table-cell;
    margin: 10px;
    text-align:center;
`;

export default function HistorialState(props){

    return(
             <>
                 <H4>{props.id}</H4>
                 <H4>{props.name}</H4>
                 <H4>{addCommas(props.amount)}</H4>
                 <H4>${addCommas(props.price)}</H4>
                 <H4>{props.type == "B"? "Compra":"Venta"}</H4>


             </>


    )

}