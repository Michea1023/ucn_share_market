import React,{Component} from "react";
import styled from "styled-components";
import {Button} from "../Styled";


const GridUsuarios = styled.div`
  background-color: #E1F1F9;
    width: 60vw;
    padding: 10px;
    border-radius: 20px;
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.252);
    display:grid;
    
`;



const TablaUsuario= styled.div`
    display:table;
    padding: 10px;
    text-indent: 150px;
    
`;

const H3 = styled.h2`
    display:table-cell;
    margin: 60px;
    line-height: 5;
`;


const H4 = styled.h4`
    display:table-cell;
    margin: 60px;
    line-height: 5;
`;



export const Espacio = styled.li`
    display: table-row;
    margin: 100px;
`;

export const Titulo1 = styled.h4`
    justify-self: center;
    font-size: 190%
`;

const ButtonVerde = styled(Button)`
    background-color:#27E709;
`;

const ButtonRojo = styled(Button)`
    background-color:#FF0000;
`;
export default function Users(){

    return(
               <GridUsuarios>

               <Titulo1>Usuarios</Titulo1>
               <TablaUsuario>
                    <Espacio>



                        <H3>Nombre</H3>
                        <H3>Rut</H3>
                        <H3>Carrera</H3>
                        <H3>Estado</H3>

                    </Espacio>
                    <Espacio>

                        <H4>Alberto Milla</H4>
                        <H4>12.222.222-2</H4>
                        <H4>ICCI</H4>
                        <ButtonVerde>Activo</ButtonVerde>



                    </Espacio>
                     <Espacio>

                       <H4>Alberto Milla</H4>
                        <H4>12.222.222-2</H4>
                        <H4>ICCI</H4>
                         <ButtonRojo>Bloqueado</ButtonRojo>

                     </Espacio>

               </TablaUsuario>

               </GridUsuarios>

            )
}