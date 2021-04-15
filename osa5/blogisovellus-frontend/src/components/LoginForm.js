// Dependencies
import React from "react";
import PropTypes from "prop-types";
// Hooks
import { useField } from "../hooks/index";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/loginReducer";

const LoginForm = () => {
    const dispatch = useDispatch();

    const username = useField("text");
    const password = useField("password");

    const addLogin = (event) => {
        event.preventDefault();

        const loginObject = {
            username: username.value,
            password: password.value,
        };

        // login(loginObject);
        dispatch(loginUser(loginObject));
        username.onReset();
        password.onReset();
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={addLogin}>
                <div>
                    <label htmlFor="username">username&nbsp;</label>
                    <input
                        type="text"
                        value={username.value}
                        name="Username"
                        id="username"
                        onChange={username.onChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">password&nbsp;</label>
                    <input
                        type="password"
                        value={password.value}
                        name="Password"
                        id="password"
                        onChange={password.onChange}
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
