import './App.css';
import React from "react";
import BarraPrincipal from "./Components/BarraPrincipal";
// todo esto es por mientras
import BarraSecundaria from './Components/BarraSecundaria';
import OrdenesActivas from './Components/OrdenesActivas';
import HistorialTransac from './Components/HistorialTransac';
import Activos from './Components/Activos';
 
 export default function App(){
  return(
    <div className='principal'>
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
    
  );
}

    