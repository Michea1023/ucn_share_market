import React from "react";

import BarraPrincipal from "../components/NavBar/BarraPrincipal";
// todo esto es por mientras
import BarraSecundaria from '../components/NavBar/BarraSecundaria';
import OrdenesActivas from '../components/UserPage/OrdenesActivas';
import HistorialTransac from '../components/UserPage/HistorialTransac';
import Activos from '../components/UserPage/Activos';

export default function UserProfile(){
    return(
        <div className='grid-usuario'>
            <div className='grid-usuario1'>
                <BarraPrincipal />
            </div>
            <div className='grid-usuario2'>
                <BarraSecundaria />
            </div>
            <h3 className='grid-usuario3'>Perfil Usuario</h3>
            <div className='grid-usuario4'>
                <OrdenesActivas />
            </div>
            <div className='grid-usuario5'>
                <HistorialTransac />
            </div>
            <div className='grid-usuario6'>
                <Activos />
            </div>
        </div>
    )
}