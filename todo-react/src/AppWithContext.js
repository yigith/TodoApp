import React, {useState, useEffect} from 'react'
import App from './App'
import AppContext from './AppContext'


function AppWithContext() {
    let defaultLoggedIn = false;
    let defaultToken = null;

    if(localStorage["token"]) {
        defaultLoggedIn = true;
        defaultToken = localStorage["token"];
    }

    const [loggedIn, setLoggedIn] = useState(defaultLoggedIn);
    const [token, setToken] = useState(defaultToken);

    return (
        <AppContext.Provider value={{ loggedIn, setLoggedIn, token, setToken }}>
            <App />
        </AppContext.Provider>
    );
}

export default AppWithContext;