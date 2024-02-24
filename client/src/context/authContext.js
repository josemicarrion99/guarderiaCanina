import {createContext, useEffect, useState} from "react";
import axios from "axios";


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (inputs) => {
        const res = await axios.post("https://192.168.56.1:3001/api/auth/login", inputs, {
            withCredentials: true, //añadido porque usamos cookies
        });

        setCurrentUser(res.data);

    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);
    
    return(
        <AuthContext.Provider value={{currentUser, login}}>
            {children}
        </AuthContext.Provider>
    );
};