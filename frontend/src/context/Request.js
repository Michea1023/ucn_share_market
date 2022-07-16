import React, {useState} from "react";

export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // ¿Esta cadena de cookies comienza con el nombre que queremos?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}



export const getRequest = async (http) => {

        const response = await fetch(http);
        const data = await response.json();

        return data;

}


export const postRequest = async(http,header,data) => {
    try {
       const response =await fetch(http,
        {header, method: "POST",
            body : data, credentials: "omit"})
        return response
    }catch (error){
        console.log(error)
    }


}

export const postRequestCer = async(http,data) => {
    try {
       const response =await fetch(http,
        {headers: {
                "Content-Type": "application/json",
                 "X-CSRFToken": getCookie("csrftoken")
            }, method: "POST",
            body : JSON.stringify(data)})
        return response
    }catch (error){
        console.log(error)
    }
}



