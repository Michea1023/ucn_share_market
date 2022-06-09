import React, {Component} from "react";
import styled from "styled-components";
import {Form,A,Label,Input,Button} from "../Styled";


const ButtonRojo = styled(Button)`
    background-color:#FF0000;
`;

export default class Venta extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <>
                <Form action="" method="">
                        <A>
                            <Label>Tipo de Venta:</Label>
                            <Button>Mercado</Button>
                            <Button>Limite</Button>
                        </A>
                        <A>
                            <Label>Cantidad de acciones:</Label>
                            <Input type="number"/>
                        </A>
                        <A>
                            <Label>Monto:</Label>
                            <Input type="number"/>
                        </A>
                        <A>
                            <Label>Precio venta:</Label>
                            <Input type="number"/>
                        </A>
                        <A>
                            <Label>Vigencia:</Label>
                            <Input type="date"/>
                        </A>
                        <A>
                            <Label>Monto a vender:</Label>
                            <Input disabled/>
                        </A>
                        <A>
                            <Label>Comisión estimada:</Label>
                            <Input disabled/>
                        </A>
                        <A>
                            <Label>Monto total:</Label>
                            <Input disabled/>
                        </A>
                        <A>
                            <ButtonRojo>Vender</ButtonRojo>
                        </A>
                </Form>
            </>
        )
    }
}