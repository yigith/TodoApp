import React, {useState} from 'react'
import App from './App'
import AppContext from './AppContext'


function AppWithContext() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    return (
        <AppContext.Provider value={{ loggedIn, setLoggedIn, token, setToken }}>
            <App />
        </AppContext.Provider>
    );
}

export default AppWithContext;