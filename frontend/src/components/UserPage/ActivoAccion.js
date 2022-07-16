import React, {Component} from "react";
import styled from "styled-components";
import {A} from "../Styled";


const H4 = styled.h4`
    display:table-cell;
    margin: 10px;
    text-indent: 13px;
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