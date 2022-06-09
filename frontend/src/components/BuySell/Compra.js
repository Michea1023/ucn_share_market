import React, {Component} from "react";
import styled from "styled-components";
import {Form,A,Label,Input,Button} from "../Styled";


const ButtonVerde = styled(Button)`
    background-color:#27E709;
`;

export default class Compra extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return(
            <>

                <Form action="" method="">
                        <A>
                            <Label>Tipo de Compra:</Label>
                            <Button>Mercado</Button>
                            <Button>Limite</Button>
                        </A>
                        <A>
                            <Label>Monto:</Label>
                            <Input type="number"/>
                        </A>
                        <A>
                            <Label>Cantidad de acciones:</Label>
                            <Input type="number"/>
                        </A>
                        <A>
                            <Label>Precio compra:</Label>
                            <Input type="number"/>
                        </A>
                        <A>
                            <Label>Vigencia:</Label>
                            <Input type="date"/>
                        </A>
                        <A>
                            <Label>Monto a invertir:</Label>
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
                            <ButtonVerde>Comprar</ButtonVerde>
                        </A>



                </Form>

            </>
        )
    }
}