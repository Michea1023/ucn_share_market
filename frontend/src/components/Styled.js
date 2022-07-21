import styled from "styled-components";


export const Titulo = styled.h3`
    justify-self: center;
`;


export const Form = styled.form`
    display: table;
`;

export const A = styled.li`
    display: table-row;
    margin: 10px;
`;

export const Label = styled.label`
    display: table-cell;
    margin: 10px;
    font-weight: bold;
    text-align:right;
    
`;
export const Input = styled.input`
    display: table-cell;
    margin: 10px;
    border-radius:10px;
    padding-top:10px;
    padding-left:5px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
    border:0;
    
`;

export const Button = styled.button`
    background-color: #E1F1F9;
    border-radius: 20px;
    justify-items:center;
    border:0;
    padding:10px 20px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
    margin:10px;
`;

export const Submit1 = styled.input`
  width: 80%;
  margin-bottom: 50px;
  border: none;
  outline: none;
  height: 40px;
  align-self: center;
  background: #A7CDD9;
  color: #000000;
  font-size: 18px;
  border-radius: 20px;
  text-align: center;
  justify-self: center;
  justify-items: center;
  align-content: center;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.252);
  &:hover{
    color: #4F5256;
    cursor: pointer;
  }
  &:active{
     box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.262);
  }
  @media(max-width: 420px){
        margin-bottom: 5px;
  }
`;