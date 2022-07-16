import React, {Component, useEffect, useState} from "react";
import styled from "styled-components";
import {Button} from "../Styled";
import {getRequest} from "../../context/Request";


const GridUsuarios = styled.div`
    background-color: #A7CDD9;
    width: 60vw;
    border-radius: 20px;
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.252);
    display:grid;
    
`;

const Tabla= styled.div`
    display:table;
    padding: 10px;
    
`;

const Fondo= styled.div`
    
`;

const H4 = styled.h4`
    display:table-cell;
    margin: 20px;
    text-indent: 13px;
`;


const H2 = styled.h2`
    justify-self: center;
`;


 const B = styled.li`
  
    display: table-row;
    margin: 10px;
    background-color: #E1F1F9;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
    border-top-right-radius: 80px;
    padding-left: 10px;
    padding-right: 10px;
    height: 50px;
    width: 22vw;
    

`;


const ButtonVerde = styled(Button)`
    background-color:#27E709;
`;

const ButtonRojo = styled(Button)`
    background-color:#FF0000;
`;
export default function Users(){

    const [listUser, setListUser] = useState([])

    useEffect(()=>{
        async function listaUsuarios(){
            setListUser(await getRequest("http://127.0.0.1:8000/api/control-users", {'Content-Type': 'application/json'}))
        }
        listaUsuarios();
        console.log(listUser)

    },[])




    return(

               <GridUsuarios>

               <H2>Usuarios</H2>
               <Tabla>
                    <B>



                        <H4>Nombre</H4>
                        <H4>Rut</H4>
                        <H4>Carrera</H4>
                        <H4>Estado</H4>

                    </B>
                   {
                       listUser.map(x=>(
                           <B>
                               <H4>{x.full_name}</H4>
                               <H4>{x.rut}</H4>
                               <H4>{x.career}</H4>
                               <ButtonVerde>Activo</ButtonVerde>
                           </B>
                       ))
                   }

               </Tabla>

               </GridUsuarios>

            )
}