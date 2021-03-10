import { useContext, useEffect } from 'react'
import AppContext from './AppContext';
import { Redirect } from 'react-router-dom';

function Logout() {
    const ctx = useContext(AppContext);

    useEffect(() => {
        ctx.setToken(null);
        ctx.setLoggedIn(false);
    });


    // https://dev.to/projectescape/programmatic-navigation-in-react-3p1l
    return (
        <Redirect to="/login" />
    );
}

export default Logout;