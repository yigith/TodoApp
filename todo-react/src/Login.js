import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AppContext from './AppContext'

function Login() {
    const history = useHistory();
    const ctx = useContext(AppContext);
    const [userName, setUserName] = useState("user@example.com");
    const [password, setPassword] = useState("Password1.");
    const [errors, setErrors] = useState([]);

    const formSubmit = (event) => {
        event.preventDefault();
        const apiUrl = process.env.REACT_APP_API_URL;
        fetch(apiUrl + "Accounts/Login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userName, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors) {
                    setErrors(getModelErrors(data));
                    return;
                }

                if (data.token) {
                    ctx.setToken(data.token);
                    ctx.setLoggedIn(true);
                    history.push("/");
                }
            });
    };

    // https://reactjs.org/docs/conditional-rendering.html
    return (
        <div>
            <h1>Login</h1>

            {errors.length > 0 &&
                <div>
                    <ul>
                        {errors.map((x,i) => <li key={i}>{x}</li>)}
                    </ul>
                </div>
            }

            <form onSubmit={formSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" value={userName}
                        onInput={(e) => setUserName(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password}
                        onInput={(e) => setPassword(e.target.value)} />
                </div>
                <button>Login</button>
            </form>
        </div>
    );
}

function getModelErrors(response) {
    if (!response.errors)
        return [];

    let result = [];
    for (const key in response.errors) {
        result.push(...response.errors[key]);
    }
    return result;
}

export default Login;