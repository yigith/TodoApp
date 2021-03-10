// https://reactrouter.com/web/guides/quick-start
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Home from './Home'
import Login from './Login'
import Logout from './Logout'
import Register from './Register'
import './App.css'
import AppContext from './AppContext'

function Nav() {
  const ctx = useContext(AppContext);

  return (
    <nav>
      <ul className="navMenu">
        <li>
          <Link to="/">Home</Link>
        </li>
        {!ctx.loggedIn ?
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
          :
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        }
      </ul>
    </nav>
  );
}

export default function App() {
  const ctx = useContext(AppContext);

  if (ctx.loggedIn) {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
  else {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

