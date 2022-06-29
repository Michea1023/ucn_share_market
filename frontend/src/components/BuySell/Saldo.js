import React, {Component} from "react";
import styled from "styled-components";

const GridSaldos = styled.div`
    background-color: #E1F1F9;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
    border-radius: 20px;
    width: 35vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const A = styled.div`
    margin: 0 10%;
`;



export default  function Saldos(){

    let share = "DOLAR"

    const user = JSON.parse(sessionStorage.getItem("user"))

    return(
            <GridSaldos>

                <A>
                    <h4>Saldo total:</h4>
                    <p>${user.share.map(elem => elem.code === "CLP" ? elem.amount : null)}</p>
                </A>
                <A>
                    <h4>Acciones disponible:</h4>
                    <p>{user.share.map(elem => elem.code === share ? elem.amount : 0)}</p>
                </A>



            </GridSaldos>
        )

}