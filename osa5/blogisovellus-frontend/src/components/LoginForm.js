import React, { useState } from "react";

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
                    <label for="username">username&nbsp;</label>
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
                    <label for="password">password&nbsp;</label>
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
                <button type="submit">login</button>
            </form>
        </div>
    );
};

export default LoginForm;
