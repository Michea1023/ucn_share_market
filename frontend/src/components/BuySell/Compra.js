import React, {Component, useState} from "react";
import styled from "styled-components";
import {Form,A,Label,Input,Button} from "../Styled";
import buscador from "../../Pages/BuySell"
import {getCookie, postRequest} from "../../context/Request";


const ButtonVerde = styled(Button)`
    background-color:#27E709;
`;

export default function Compra (){

    //const [monto, setMonto] = useState(null) revisar implementacion dinamica con cantidad y precio
    const [cantidad, setCantidad] = useState(0) //con request
    const [precio, setPrecio] = useState(0) // con request en precio mercado
    const [date, setDate] = useState(null)


    let comision = 0.025 //request !!!

    let monto = cantidad * precio

    function handleChangeMonto(event) {
        let va = event.target.value
        setMonto(va)
    }
    function handleChangeCantidad(event) {
        let va = event.target.value
        setCantidad(va)
    }
    function handleChangePrecio(event) {
        let va = event.target.value
        setPrecio(va)
    }
    function typeBuy(e,event){
        if (event === "mercado"){
            setPrecio(150)
        }else if(event === "limite"){
            setPrecio(precio)
        }
        e.preventDefault();
    }

    async function handleSubmit(e,date) {
        const user = (JSON.parse(sessionStorage.getItem('user'))).rut;
        const type = 'B'
        const divisa = 'CLP'
        const share = 'DOLAR'
        //const session = "udpgua267ncxselhhl475ppomd6wa2lt"
        //console.log(session)
        const cookie = getCookie("csrftoken")
        console.log(cookie)

        let formData = new FormData()
        formData.append("rut", user)
        formData.append("price", parseInt(precio))
        formData.append("amount", parseInt(cantidad))
        formData.append("type_order", type)
        formData.append("vigency", date)
        formData.append("share_buy", divisa)
        formData.append("share_sell", share)

        const data = {
            "rut"        : user,
            "price"      : parseInt(precio),
            "amount"     : parseInt(cantidad),
            "type_order" : type,
            "vigency"    : date,
            "share_buy"  : divisa,
            "share_sell" : share
        }

        const headers = {"Content-Type": "multipart/form-data"

                        };

        const response = await postRequest('http://127.0.0.1:8000/api/transaction',
            headers,
        formData)
        console.log( response.status)

        e.preventDefault();
    }



    return(
            <>

                <Form onSubmit={(e) => handleSubmit(e,date)}>
                        <A>
                            <Label>Tipo de Compra:</Label>
                            <Button onClick={(e) => typeBuy(e,"mercado")}>Mercado</Button>
                            <Button onClick={(e) => typeBuy(e,"limite")}>Limite</Button>
                        </A>
                        <A>
                            <Label>Monto:</Label>
                            <Input type="number" onChange={handleChangeMonto}/>
                        </A>
                        <A>
                            <Label>Cantidad de acciones:</Label>
                            <Input type="number" onChange={handleChangeCantidad}/>
                        </A>
                        <A>
                            <Label>Precio compra:</Label>
                            <Input type="number" value={precio} onChange={handleChangePrecio}/>
                        </A>
                        <A>
                            <Label>Vigencia: </Label>
                            <Input type="datetime-local" required onChange={e => setDate(e.target.value)}/>
                        </A>
                        <A>
                            <Label>Monto a invertir:</Label>
                            <Input disabled value={monto}/>
                        </A>
                        <A>
                            <Label>Comisión estimada:</Label>
                            <Input disabled value={(monto*comision)}/>
                        </A>
                        <A>
                            <Label>Monto total:</Label>
                            <Input disabled value={parseInt(monto)+monto*comision}/>
                        </A>
                        <A>
                            <ButtonVerde type ="submit">Comprar</ButtonVerde>
                        </A>



                </Form>

            </>
    )

}