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



export default  class Saldos extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <GridSaldos>
                <A>
                    <h4>Saldo Total:</h4>
                    <p>$0</p>
                </A>
                <A>
                    <h4>Saldo Disponible:</h4>
                    <p>$0</p>
                </A>



            </GridSaldos>
        )
    }
}