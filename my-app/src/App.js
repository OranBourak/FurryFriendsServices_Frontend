import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarCustom from "./components/NavbarCustom.jsx";
import LoginPage from "./components/LoginPage.jsx";
import {useState} from "react";
import LoginAlert from "./components/LoginAlert.jsx";
import Home from "./components/Home.jsx";

/**
 * Pet Service application
 *
 * @return {null}
 */
function App() {
    const [loggedInUserName, setLoggedInUsername] = useState("");

    const handleLogin = (user) => {
        setLoggedInUsername(user);
        console.log("Login");
    };
    let component;

    switch (window.location.pathname) {
    case "/":
        component = <Home/>;
        break;
    case "/login":
        component = <LoginPage onLogin={handleLogin} />;
        break;
    default:
        component = <h1>404</h1>;
        break;
    }
    return (
        <>
            <NavbarCustom />
            {!loggedInUserName&& component}
            {loggedInUserName&&<LoginAlert name={loggedInUserName} />}

        </>
    );
};
export default App;
