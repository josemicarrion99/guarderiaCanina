import {createContext, useEffect, useState} from "react";


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = () => {
        //todo
        setCurrentUser({id:1, name:"Jose", profilePicture:"https://free-images.com/lg/5411/dolphin_marine_mammals_water.jpg"})
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser]);
    
    return(
        <AuthContext.Provider value={{currentUser, login}}>
            {children}
        </AuthContext.Provider>
    );
};