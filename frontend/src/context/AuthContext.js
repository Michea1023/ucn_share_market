import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";


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





const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const loginUser = async (rut, password) => {
    const response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken")

      },
      body: JSON.stringify({
        rut,
        password
      })
    });
    const data = await response.json();

    if (response.status === 200) {
      setUser(data);
      localStorage.setItem("rut",data.rut);
      // console.log(user.rut);
      data.staff ? history.push("/admin") : history.push("/home")
      ;
    } else {
      alert("Contraseña invalida");
    }
  };

    const registerUser = async (rut, password, password2, email, full_name, career) => {
        const data = {
            rut,
            password,
            password2,
            email,
            full_name,
            career
        }

        console.log(JSON.stringify(data))

        const response = await fetch("http://127.0.0.1:8000/api/create-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                alert("Registro exitoso");
                history.push("/");
            })
            .catch((error) => {
                alert(error);
            })
    };

    const logOut = () => {
        setUser(null);
        history.push("/");
    }

    useEffect(() => {
        if (setUser) {
          setUser(user);
        }
        setLoading(false);
    }, [setUser, loading]);

    const contextData = {
        user,
        setUser,
        registerUser,
        loginUser,
        logOut

  };

    return (
        <AuthContext.Provider value={contextData}>
          {loading ? null : children}
        </AuthContext.Provider>
    );
};





