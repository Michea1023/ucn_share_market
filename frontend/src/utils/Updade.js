import {getRequest} from "../context/Request";

export async function updateUser(){
    const res = await getRequest("http://127.0.0.1:8000/api/login")
    console.log(res)
    res ? (sessionStorage.setItem("user", JSON.stringify(res))) : alert("Problemas con la actualizacion de datos")
}