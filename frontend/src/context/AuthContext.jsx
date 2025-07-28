import React, {createContext, useContext, useState} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(useState(localStorage.getItem("authToken")))

    const login = (newToken) => {
        localStorage.setItem("authToken", newToken);
        setToken(newToken);
    };
    const logout = () => {
        localStorage.removeItem("authToken");
        setToken(null);
    }
    const value = {
        token,
        isAuthenticated: !!token,
        login,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context){
        throw new Error("useAuth debe ser usado dentro de un AuthProvider");
    }
    return context;
};