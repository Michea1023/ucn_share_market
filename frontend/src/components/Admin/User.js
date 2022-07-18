import React from "react";
import styled from "styled-components";
import {Button} from "../Styled";
import {getCookie, postRequest, postRequestCer, postRequestCerForm} from "../../context/Request";

export default function (props){

    const H4 = styled.h4`
    display:table-cell;
    margin: 20px;
    text-indent: 13px;
`;
    const ButtonVerde = styled(Button)`
    background-color:#27E709;
`;

const ButtonRojo = styled(Button)`
    background-color:#FF0000;
`;

    const block = async () => {
        const headers = {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": getCookie("csrftoken")
        };

        let formData = new FormData()
        formData.append("rut", props.rut)
        formData.append("block", true)

        const rut = props.rut
        const block = props.active == true ? true : false
        console.log(formData)
        const data = {
            "rut": rut,
            "block": true
        }


        const resp = await postRequestCer("http://127.0.0.1:8000/api/control-users", JSON.stringify(data))
        console.log(resp.status)
    }

    return(
        <>

        <H4>{props.full_name}</H4>
        <H4>{props.rut}</H4>
        <H4>{props.career}</H4>
        {
            props.active == true ? (<ButtonRojo onClick={block}>Bloquear</ButtonRojo>) : (<ButtonVerde onClick={block}>Desbloquear</ButtonVerde>)
        }
        </>
    )
}
