import React,{Component} from "react";
import styled from "styled-components";

const Compaccionesprecios1= styled.div`
  display: grid;
  grid-template-columns: 20% 20% 40% 30%;
  grid-template-rows: 30px;
  height: 50px;

`;
export default class CompAccionesPrecios extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
        <Compaccionesprecios1>
            <p>LTM</p>
            <p>$127</p>
            <p>10%</p>
            <p>-150%</p>
        </Compaccionesprecios1>
    )
    }


}