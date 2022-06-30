import React, {Component} from "react";
import styled from "styled-components";
import {A} from "../Styled";


const H4 = styled.h4`
    display:table-cell;
    margin: 10px;
    text-indent: 13px;
`;


export default function ActivoAccion(){

    return(
        <>
            <H4>LTM</H4>
            <H4>1000</H4>
            <H4>$127.000.000</H4>
        </>
    )


}