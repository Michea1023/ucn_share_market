import react from "react";
import BarraPrincipal from "../Components/NavBar/BarraPrincipal";


export default function Register(){

    return(

        <div className="grid-register">
            
            <div>
                <BarraPrincipal></BarraPrincipal>

            </div>
            
            <div className="grid-Register">
                <h4>Formulario Registro</h4>
                <input className="controls" type="text" name="nombres" id="nombres" placeholder="Ingrese el nombre"></input>
                <input className="controls" type="text" name="apellidos" id="apellidos" placeholder="Ingrese el apellido"></input>
                <input className="controls" type="email" name="correo" id="nombres" placeholder="Ingrese el correo"></input>
                <input className="controls" type="password" name="correo" id="nombres" placeholder="Ingrese la contraseña"></input>
                <input className="boton" type="submit" value="Registrar"></input>
                <p><a href ="#">¿Ya tengo cuenta?</a></p>


            </div>
            
        
        
         </div>



    )



}