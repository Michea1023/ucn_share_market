import React,{Component} from "react";
import styled from "styled-components";


const Grid = styled.div`
 
  display: flex;
  flex-direction: column;
  
  background-color: #E1F1F9;
  text-indent: 20px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
  width:20vw;
  
  padding-top: 60px;
  padding-bottom: 100vw;
  
  a{
        width: 20vw;
  }
  

`;




export default function BarraAdmin(){
    return(
             <Grid>
                 <h1>Configuracion</h1>
                 <h1>Usuarios</h1>
                 <h1>Ranking</h1>

             </Grid>
            )

}