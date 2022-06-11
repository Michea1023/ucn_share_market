import React,{Component} from "react";
import styled from "styled-components";
import buscar from "../../../static/images/1086933.png"

const GridBuscador = styled.div`
    width: 35vw;   
`;
const T1 = styled.div`
    height:35px;  
`;
const T2 = styled.div`   
    display:table-row;
`;
const B = styled.div`
    display:table-cell;   
`;
const Input = styled.input`
    display: table-cell;
    margin: 10px;
    border-radius:10px;
    padding-top:10px;
    padding-left:30px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
    border:0;
    background-image: url(../../../static/images/1086933.png)  scroll 7px 7px;
`;
const Option = styled.option`
    width: 50px;
`;
const Datalist = styled.datalist`
    width:50px;
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
                    <B>
                        <p>Seleccione una acción</p>
                    </B>
                    <B>
                       <datalist id = "acciones">
                            <Option>LTM</Option>
                            <Option>CGE</Option>
                        </datalist>
                        <Input type= "text" list = "acciones"/>
                    </B>

                </T2>
            </GridBuscador>
        )
    }
}