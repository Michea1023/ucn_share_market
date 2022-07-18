import React from "react";
import styled from "styled-components";

const H4 = styled.h4`
    display:table-cell;
    margin: 10px;
    text-align:center;
`;
export default function CompAccionesPrecios(props){



    return(
        <>
            <H4>{props.name}</H4>
            <H4>{props.market_val}</H4>
            <H4>{props.diary_rent}</H4>
        </>
    )


}