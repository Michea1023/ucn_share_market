import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {getRequest} from "../../context/Request";
import User from "./User";


const GridUsuarios = styled.div`
    background-color: #A7CDD9;
    width: 60vw;
    border-radius: 20px;
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.252);
    display:grid;
    padding:10px;
    overflow-x: scroll;
    @media(max-width:950px){
        width:95vw;
    }
    
`;

const Tabla= styled.div`
    display:table;
    padding: 10px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
    border-radius:20px;
    background-color: #E1F1F9;
    width:58vw;
    
    justify-self:center;
    
    @media(max-width:950px){
        width:94vw;
        padding:1px;
    }
    
`;

const H2 = styled.h2`
    justify-self: center;
`;


 const B = styled.li`
  
    display: table-row;
    margin: 10px;
    
    border-top-right-radius: 80px;
    padding-left: 10px;
    padding-right: 10px;
    height: 50px;
    width: 22vw;
    

`;
 const H4 = styled.h4`
    display:table-cell;
    margin: 20px;
    text-align:center;
    padding: 5px;
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
                        <H4>Correo</H4>
                        <H4>Estado</H4>

                    </B>
                   {
                       listUser.map(x=>(
                           <B>
                                <User full_name={x.full_name} rut={x.rut} career={x.career} email={x.email} active={x.active}/>
                           </B>
                       ))
                   }

               </Tabla>

               </GridUsuarios>

            )
}