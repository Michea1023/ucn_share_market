import React, {Component} from "react";
import styled from "styled-components";
import {Button} from "../Styled";
import {deleteRequest} from "../../context/Request";
import {updateUser} from "../../utils/Updade";

const H4 = styled.p`
    display:table-cell;
    margin: 10px;
    text-align:center;
`;

const ButtonRojo = styled(Button)`
    background-color:#FF0000;
    padding:8px 16px;
    :hover{
        cursor: pointer;
    }
    :active{
     box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.262);
    }
    
    @media(max-width: 420px){
        padding:5px 9px;
        margin:2px;
    }
    
`;




export default function OrdenState(props){

    const deleteOrder = async (e) => {
        const id = props.id
        const resp = await deleteRequest("http://127.0.0.1:8000/api/transaction/"+id)
        if(resp.status == 200){
            await updateUser()
            location.reload(true)
        }else{
            alert("Problemas al eliminar la orden, error: " + resp.status)
        }
    }

    return(
            <>
                <H4>{props.id}</H4>
                <H4>{props.share}</H4>
                <H4>{props.amount}</H4>
                <H4>{props.price}</H4>
                <H4>{props.type_order == "B"? "Compra":"Venta"}</H4>
                <ButtonRojo onClick={deleteOrder}>Cancelar</ButtonRojo>



            </>

            )
}