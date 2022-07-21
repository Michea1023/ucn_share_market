import React from "react";
import styled from "styled-components";
import {Button} from "../Styled";
import { postRequestCer} from "../../context/Request";

export default function (props){

    const H4 = styled.h4`
    display:table-cell;
    margin: 20px;
    text-align:center;
`;
    const ButtonVerde = styled(Button)`
    background-color:#27E709;
    margin-left:30%;
    @media(max-width:950px){
        margin: 0;
        padding:8px 15px;
    }

`;

const ButtonRojo = styled(Button)`
    background-color:#FF0000;
    margin-left:30%;
    @media(max-width:950px){
        margin: 0;
        padding:8px 15px;
    }
    
`;

    const block = async () => {

        const rut = props.rut

        const data = {
            "rut": rut,
            "block": props.active == true ? true : false
        }


        const resp = await postRequestCer("http://127.0.0.1:8000/api/control-users", JSON.stringify(data))
        resp.status == 200 ? location.reload(true) : alert("Problemas al eliminar usuario http: " + resp.status)
    }

    return(
        <>

            <H4>{props.full_name}</H4>
            <H4>{props.rut}</H4>
            <H4>{props.career}</H4>
            <H4>{props.email}</H4>
            {
                props.active == true ? (<ButtonRojo onClick={block}>Bloquear</ButtonRojo>) : (<ButtonVerde onClick={block}>Desbloquear</ButtonVerde>)
            }
        </>
    )
}
