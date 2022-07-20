import React from "react";
import styled from "styled-components";

const GridSaldos = styled.div`
    background-color: #E1F1F9;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
    border-radius: 20px;
    width: 35vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content:center;
    
    @media(max-width: 1250px){
        width:45vw;
    }
    
    @media(max-width: 900px){
        width:60vw;
    }
    
    @media(max-width: 420px){
        width: 87vw;
    }
`;

const A = styled.div`
    margin: 10px 10%;
    
    @media(max-width: 1250px){
        margin: 5px 5%;

    }
`;



export default  function Saldos(props){



    const user = JSON.parse(sessionStorage.getItem("user"))

    return(
            <GridSaldos>

                <A>
                    <h4>Saldo total:</h4>
                    <p>${user.share.map(elem => elem.code === "CLP" ? elem.amount : null)}</p>
                </A>
                <A>
                    <h4>Acciones disponible:</h4>
                    <p>{props.share != undefined ? (user.share.map(elem => elem.code === props.share ? elem.amount : null)): "Seleccione una acción"}</p>
                </A>



            </GridSaldos>
        )

}