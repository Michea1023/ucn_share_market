import React, {Component, useState} from "react";
import styled from "styled-components";
import {Form,A,Label,Input,Button} from "../Styled";
import buscador from "../../Pages/BuySell"
import {postRequest} from "../../context/Request";


const ButtonVerde = styled(Button)`
    background-color:#27E709;
`;

export default function Compra (){

    //const [monto, setMonto] = useState(null) revisar implementacion dinamica con cantidad y precio
    const [cantidad, setCantidad] = useState(null) //con request
    const [precio, setPrecio] = useState(null) // con request en precio mercado
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

    async function handleSubmit(date) {
        const user = (JSON.parse(sessionStorage.getItem('user'))).rut;
        const type = 'B'
        const divisa = 'CLP'
        const share = 'DOLAR'
        console.log(date)
        const data = {
            "rut"        : user,
            "price"      : precio,
            "amount"     : cantidad,
            "type_order" : type,
            "vigency"    : date,
            "share_buy"  : divisa,
            "share_sell" : share
        }
        console.log(data)
        const response = await postRequest('http://127.0.0.1:8000/api/transaction', null, JSON.stringify(data))
        alert(response.status)
        e.preventDefault();
    }



    return(
            <>

                <Form action="" method="" onSubmit={() => handleSubmit(date)}>
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
                            <Input type="datetime-local" onChange={e => setDate(e.target.value)}/>
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