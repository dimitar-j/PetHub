import { createContext, useContext, useEffect, useState } from "react";

const userAuthContext = createContext();

export function UserAuthContextProvider({children}) {
    const [user, setUser] = useState(null);

    function signin(email, password){
      // axios call here to /login
    }

    function signup(email, password, fname, lname, address, birthday, profile_photo){
      //axios call here to /create-user
    }

    function logout(){
        // clear user id
    }

    async function makeUserDB(){

    }

    async function getUserDB(){
    }

    // useEffect(() => {
       
    // }, []);

    return (
        <userAuthContext.Provider value={{ user, signin, signup, logout, makeUserDB, getUserDB }}>
            {children}
        </userAuthContext.Provider>
    )
}

export function useUserAuth() {
    return useContext(userAuthContext);
}
