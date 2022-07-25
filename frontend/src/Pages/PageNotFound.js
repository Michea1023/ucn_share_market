import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import BarraPrincipal from "../components/NavBar/BarraPrincipal";

const H1 = styled.h1`
    letter-spacing:6px;
    text-shadow: red 0 2px, cyan 0 -2px;
    transition: text-shadow 200ms;
    :hover{
        text-shadow: red -6px, cyan 6px 0;
    }
    
`;

const PageNotFound = () => (

  <>
      <BarraPrincipal/>
		{/* Mensaje cuando llegue a página incorrecta */}
    <H1>Recuerda logearte para utilizar la pagina.</H1>
      <p></p>
      <Link to="/">Iniciar sesion</Link>
  </>
)
export default PageNotFound