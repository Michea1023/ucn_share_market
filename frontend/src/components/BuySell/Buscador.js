import React,{Component} from "react";
import styled from "styled-components";

const GridBuscador = styled.div`
    width: 35vw;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
    "area1 area1"
    "area2 area3"
    
`;
const T1 = styled.div`
    grid-area: area1;
    align-self:center;
    
    
`;
const T2 = styled.div`
    grid-area: area2;
    align-self:center;
`;

const T3 = styled.div`
    grid-area: area3;
    align-self:center;
    
`;

export default class Buscador extends Component{
    constructor (props){
        super(props);
    }

    render(){
        return(
            <GridBuscador>

                <T1>
                    <h2>Buscardor de acciones</h2>
                </T1>
                <T2>
                    <p>Seleccione una accion</p>
                </T2>
                <T3>
                    <datalist id = "acciones">
                        <option>LTM</option>
                        <option>CGE</option>
                    </datalist>
                    <input type= "text" list = "acciones"/>
                </T3>


            </GridBuscador>
        )
    }
}