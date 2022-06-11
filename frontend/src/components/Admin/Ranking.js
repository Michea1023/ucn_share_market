import React,{Component} from "react";
import styled from "styled-components";

const GridRanking = styled.div`
  background-color: #E1F1F9;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
    border-radius: 20px;
    width: 60vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    
`;
const Titulo = styled.h1`
 margin: 50px;
 text-align: center;
    
`;

const GridRanking2 = styled.br`
  background-color: blue;
  border: 3px solid black;
    
  width: 250px;
  
 
  
    
`;


const Coordinado = styled.div`
    margin: 0 10%;
`;



export default class  Ranking extends Component{
    constructor (props){
        super(props);
    }

    render(){
        return(
                <Titulo>Ranking
                    <GridRanking>
                        <Coordinado>
                            <h4>Nombre</h4>

                            <p>Alberto milla</p>
                        </Coordinado>
                        <GridRanking2></GridRanking2>
                        <Coordinado>
                            <h4>Rut</h4>

                            <p>20.555.555-6</p>
                        </Coordinado>
                        <GridRanking2></GridRanking2>
                        <Coordinado >
                            <p>Rentabilidad acumulada</p>

                            <p>50,6%</p>
                        </Coordinado>


                    </GridRanking>


                </Titulo>



            )




    }



}