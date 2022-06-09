import React, {Component} from "react";
import styled from "styled-components";


const GridRentabilidad = styled.div`
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

export default class Rentabilidad extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <GridRentabilidad>

                <A>
                    <h4>30 días</h4>
                    <p>10%</p>
                </A>
                <A>
                    <h4>90 días:</h4>
                    <p>50%</p>
                </A>
                <A>
                    <h4>365 días</h4>
                    <p>-100%</p>
                </A>



            </GridRentabilidad>
        )
    }
}