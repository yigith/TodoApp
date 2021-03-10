import React, {useState} from 'react'
import App from './App'
import AppContext from './AppContext'


function AppWithContext() {
    const [loggedIn, setLoggedIn] = useState(true);

    return (
        <AppContext.Provider value={{ loggedIn, setLoggedIn }}>
            <App />
        </AppContext.Provider>
    );
}

export default AppWithContext;