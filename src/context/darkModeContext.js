import {createContext, useEffect, useState} from "react";

//con este fichero vamos a poder tener una variable llamada darkMode en toda la aplicacion

//creamos un contexto API
export const DarkModeContext = createContext();

//creamos un provider para envolver nuestra aplicacion <DarkModeContextProvider>
export const DarkModeContextProvider = ({children}) =>{
    const [darkMode, setDarkMode] = useState(
        //gracias a conventirlo en un JSON convertira el string false o true en booleano
        JSON.parse(localStorage.getItem("darkMode")) || false
    );

    const toggle = () => {
        setDarkMode(!darkMode)
    };

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode)
    }, [darkMode]);
    
    return(
        <DarkModeContext.Provider value={{darkMode, toggle}}>
            {children}
        </DarkModeContext.Provider>
    );
};