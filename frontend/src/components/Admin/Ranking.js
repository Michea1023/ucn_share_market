import React,{Component} from "react";
import styled from "styled-components";

const GridRanking = styled.div`
  background-color: #E1F1F9;
    width: 60vw;
    padding: 10px;
    border-radius: 20px;
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.252);
    display:grid;
    
`;

const GridRanking2 = styled.br`
  background-color: blue;
  border: 3px solid black;
  width: 250px;   
`;

const Tabla= styled.div`
    display:table;
    padding: 10px;
    
    
`;

const H3 = styled.h2`
    display:table-cell;

`;


const H4 = styled.h4`
    display:table-cell;

`;

const Coordinado = styled.div`
    margin: 0 10%;
`;

export const Espacio = styled.li`
    display: table-row;
`;

export const Titulo1 = styled.h4`
    justify-self: center;

`;


export default function Ranking(){

    return(
               <GridRanking>

               <Titulo1>Ranking</Titulo1>
               <Tabla>
                    <Espacio>



                        <H3>Nombre</H3>
                        <H3>Rut</H3>
                        <H3>Rentabilidad</H3>

                    </Espacio>
                    <Espacio>

                        <H4>Alberto Milla</H4>
                        <H4>12.222.222-2</H4>
                        <H4>%50</H4>


                    </Espacio>
                     <Espacio>

                       <H4>Alberto Milla</H4>
                        <H4>12.222.222-2</H4>
                        <H4>%50</H4>

                     </Espacio>

               </Tabla>
                   
               </GridRanking>

            )

}