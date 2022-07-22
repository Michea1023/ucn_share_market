import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Form,A,Label,Input,Button} from "../Styled";
import {getRequest, postRequest} from "../../context/Request";
import Comprobante from "./Comprobante";
import {updateUser} from "../../utils/Updade";


const ButtonRojo = styled(Button)`
    background-color:#FF0000;
`;

export default function Venta(props){

    const [monto,setMonto] = useState(0)
    const [cantidad, setCantidad] = useState(0) //con request
    const [precio, setPrecio] = useState(0) // con request en precio mercado
    const [date, setDate] = useState(null)
    const [comprobante,setComprobante] =useState(false)
    const [comV, setComV] = useState(0)
    const [comF, setComF] = useState(0)


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
    function change_cantidad(){
        var monto1 = (document.getElementById("monto").value);
        setMonto(monto1)
        var cantidad1 = document.getElementById("cantidad_acciones").value = monto1/precio;
        setCantidad(cantidad1)
    }
    function change_monto(){
        var cantidad1 = (document.getElementById("cantidad_acciones").value);
        setCantidad(cantidad1)
        var monto1 = document.getElementById("monto").value = cantidad1*precio;
        setMonto(monto1)
    }

    function disable_precio(){ //desactivar input de precio compra en mercado
        let price_input = document.getElementById("precio_compra")
        if(price_input.disabled == false) {
            price_input.disabled = true;
        }
    }
    function enable_precio(){ //desactivar input de precio compra en mercado
        let price_input = document.getElementById("precio_compra")
        if(price_input.disabled == true) {
            price_input.disabled = false;
        }
    }
    function change_precio(event){
        if(event === "limite"){
            let precio1 = document.getElementById("precio_compra");
            precio1.disabled = false;
            precio1.removeAttribute("value");
            precio1.removeAttribute("onchange");
            setPrecio(precio1.value)
        }
    }

    async function typeBuy(e, event) {
        e.preventDefault();
        if (event === "mercado" && props.share !== null) {
            enable_precio()
            const resp = await getRequest("http://127.0.0.1:8000/api/transaction-table").then(data => data.map(x => x.name === props.share+"/CLP" ? setPrecio(x.market_val) : null))
            disable_precio()
        } else if (event === "limite") {
            enable_precio();
            setPrecio(precio)
            change_precio(event);
        }

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
                headers, formData,"omit")
            if(response.status == 201){
                await updateUser()
                setComprobante(true)
            }else{
                alert("Error al enviar la solicitud, error: http " + response.status + " , " + response.statusText)
            }

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
                                        <Button onClick={(e) => typeBuy(e, "limite")}>Límite</Button>
                                    </A>
                                    <A>
                                        <Label>Monto:</Label>
                                        <Input id="monto" type="number" id={"monto"} onKeyUp={change_cantidad} step="any"/>
                                    </A>
                                    <A>
                                        <Label>Cantidad de acciones:</Label>
                                        <Input id="cantidad_acciones" type="number" id={"cantidad_acciones"} onKeyUp={change_monto} step="any"/>
                                    </A>
                                    <A>
                                        <Label>Precio venta:</Label>
                                        <Input id="precio_compra" type="number" value={precio} onChange={handleChangePrecio}/>
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