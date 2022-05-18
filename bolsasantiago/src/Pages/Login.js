import React from "react";
import BarraPrincipal from "../Components/NavBar/BarraPrincipal";
import logoucn from "../img/logo-ucn.png";

export default function Login(){
    
    return ( 
        <div className="grid-login">
            <div >
                    <BarraPrincipal/>
                    

            </div>
            
            <div className="grid-login1">
                    {/* <h1>Bienvenido UCN-SHARE-MARKET</h1> */}

                    <img className="avatar" src={logoucn} /*src="/img/logo-ucn.png"*/ alt="Logo de ucn"/>
                    <h1>Inicio de sesión</h1>
                    <form>
                        <label for="username">Nombre de usuario</label>
                        <input type="text" placeholder="Ingrese usuario"></input>

                        <label for="password">Contraseña</label>
                        <input type="password" placeholder="Ingrese contraseña"></input>

                        <input type = "submit" value ="Iniciar sesión"></input>

                        <a href="#">¿Olvidastes tu contraseña?</a><br>
                        </br>
                        <a href="#">¿No tienes una cuenta?</a>


                    </form>
            </div>
            

        </div>
    )

}