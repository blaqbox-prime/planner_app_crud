import React, { useContext, useState } from "react";

const AuthContext = new React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

function AuthProvider({children}){
    const [authUser, setAuthUser] = useState(null);


    function loginUser(user){
        setAuthUser(user);
    }

    const value = {
        authUser,
        loginUser,
    }
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
 }

 export default AuthProvider;