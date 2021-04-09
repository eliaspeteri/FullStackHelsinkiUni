import React, { useState } from "react";
import PropTypes from "prop-types";
const LoginForm = ({ login }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const addLogin = (event) => {
        event.preventDefault();

        login({ username, password });

        setUsername("");
        setPassword("");
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={addLogin}>
                <div>
                    <label htmlFor="username">username&nbsp;</label>
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        id="username"
                        onChange={({ target }) => {
                            setUsername(target.value);
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="password">password&nbsp;</label>
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        id="password"
                        onChange={({ target }) => {
                            setPassword(target.value);
                        }}
                    />
                </div>
                <button type="submit" id="login-button">
                    login
                </button>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
};

export default LoginForm;
