import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Form,A,Label,Input,Button} from "../Styled";
import {getRequest, postRequest} from "../../context/Request";
import Comprobante from "../../Pages/Comprobante";


const ButtonRojo = styled(Button)`
    background-color:#FF0000;
`;

export default function Venta(props){

    const [cantidad, setCantidad] = useState(0) //con request
    const [precio, setPrecio] = useState(0) // con request en precio mercado
    const [date, setDate] = useState(null)
    const [comprobante,setComprobante] =useState(false)
    const [comV, setComV] = useState(0)
    const [comF, setComF] = useState(0)


    let monto = cantidad*precio

    const headers = {'Content-Type': 'application/json'}

    useEffect(()=>{
        async function comision(){
            const com = await getRequest("http://127.0.0.1:8000/api/setting?query=com",{headers})
            setComV(com.variable_commission)
            setComF(com.fixed_commission)
        }
        comision()

    },[])

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

    async function typeBuy(e, event) {
        if (event === "mercado" && props.share !== null) {
            const resp = await getRequest("http://127.0.0.1:8000/api/transaction-table").then(data => data.map(x => x.share_sell === props.share ? setPrecio(x.market_val) : null))
        } else if (event === "limite") {
            setPrecio(precio)
        }
        e.preventDefault();
    }

    async function handleSubmit(e, date) {
        e.preventDefault()
        const user = (JSON.parse(sessionStorage.getItem('user'))).rut;
        const type = 'S';
        const divisa = 'CLP';
        const share = props.share;

        let formData = new FormData()
        formData.append("rut", user)
        formData.append("price", parseInt(precio))
        formData.append("amount", parseInt(cantidad))
        formData.append("type_order", type)
        formData.append("vigency", date)
        formData.append("share_buy", divisa)
        formData.append("share_sell", share)

        const headers = {"Content-Type": "multipart/form-data"};
        if (share !== undefined)  {
            const response = await postRequest('http://127.0.0.1:8000/api/transaction',
                headers, formData)
            response.status == 201 ? alert("wena") : alert("Problemas al enviar la solicitud")

        } else {
            alert("Seleccione una accion")
        }

    }


    return(
            <>
                {
                    comprobante ?
                        (
                            <Comprobante type={"Venta"} cantidad={cantidad} share={props.share} comisionV={comV} comisionF={comF} precio={precio} monto={monto} vigencia={date}/>
                        ) :
                        (
                            <Form onSubmit={(e) => handleSubmit(e, date)}>
                                    <A>
                                        <Label>Tipo de Venta:</Label>
                                        <Button onClick={(e) => typeBuy(e, "mercado")}>Mercado</Button>
                                        <Button onClick={(e) => typeBuy(e, "limite")}>Limite</Button>
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
                                        <Label>Precio venta:</Label>
                                        <Input type="number" value={precio} onChange={handleChangePrecio}/>
                                    </A>
                                    <A>
                                        <Label>Vigencia:</Label>
                                        <Input type="date" type="datetime-local" required onChange={e => setDate(e.target.value)}/>
                                    </A>
                                    <A>
                                        <Label>Monto a vender:</Label>
                                        <Input disabled value={monto}/>
                                    </A>
                                    <A>
                                        <Label>Comisión estimada:</Label>
                                        <Input disabled value={(monto * comV) + comF}/>
                                    </A>
                                    <A>
                                        <Label>Monto total:</Label>
                                        <Input disabled value={parseInt(monto) + monto *comV + comF}/>
                                    </A>
                                    <A>
                                        <ButtonRojo type="submit">Vender</ButtonRojo>
                                    </A>
                            </Form>
                        )
                }


            </>
        )
}