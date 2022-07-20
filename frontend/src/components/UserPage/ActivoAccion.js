import React from "react";
import styled from "styled-components";



const H4 = styled.p`
    display:table-cell;
    margin: 10px;
    text-align:center;
`;


export default function ActivoAccion(props){

    return(
        <>
            <H4>{props.share}</H4>
            <H4>{props.amount}</H4>
            <H4>${props.price}</H4>
        </>
    )


}