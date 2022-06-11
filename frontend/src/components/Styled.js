import styled from "styled-components";


export const Titulo = styled.h4`
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