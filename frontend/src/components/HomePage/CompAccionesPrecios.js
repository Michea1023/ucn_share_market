import React,{Component} from "react";
import styled from "styled-components";

const Compaccionesprecios1= styled.div`
  display: grid;
  grid-template-columns: 20% 20% 40% 30%;
  grid-template-rows: 30px;
  height: 50px;

`;

const H4 = styled.h4`
    display:table-cell;
    margin: 10px;
    text-indent: 13px;
`;
export default function CompAccionesPrecios(props){



    return(
        <>
            <H4>{props.code}</H4>
            <H4>$127</H4>
            <H4>10%</H4>
            <H4>-150%</H4>
        </>
    )


}