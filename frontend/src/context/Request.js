import React, {useState} from "react";

function getCookie(name) {
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



export const getRequest = async (http,header) => {
        const response = await fetch(http);

        const data = await response.json();
        //console.log(data)
        return data;
        //console.log(data.map(elem => (console.log(elem.code))));
}

export const postRequest = async (http,header,data) => {
    const response = await fetch(http,
        {header, method: "POST",
            body : JSON.stringify(data)})
    return response;

}



