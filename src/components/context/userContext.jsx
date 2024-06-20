import React, { useState, createContext } from "react"

const userContext = createContext([{}, () => { }]);

const UserProvider = ({ children }) => {
    const [auth, setAuth] = useState(
        {
            auth: false,
        }
    )

    return (
        <userContext.Provider value={[auth, setAuth]}>
            {children}
        </userContext.Provider>
    )
}

export { userContext, UserProvider }