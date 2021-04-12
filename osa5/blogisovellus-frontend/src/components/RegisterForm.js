// Dependencies
import React from "react";
import PropTypes from "prop-types";
// Hooks
import { useField } from "../hooks";
import { Link } from "react-router-dom";

const RegisterForm = ({ register }) => {
    const username = useField("text");
    const name = useField("text");
    const password = useField("password");

    const addUser = (event) => {
        event.preventDefault();

        register({
            username: username.value,
            name: name.value,
            password: password.value,
        });
    };

    const handleReset = () => {
        username.onReset();
        name.onReset();
        password.onReset();
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={addUser} onReset={handleReset}>
                <div>
                    <label htmlFor="username">username&nbsp;</label>
                    <input {...username} id="username" />
                </div>
                <div>
                    <label htmlFor="name">name&nbsp;</label>
                    <input {...name} id="name" />
                </div>
                <div>
                    <label htmlFor="password">password&nbsp;</label>
                    <input {...password} id="password" />
                </div>
                <button type="submit">Register</button>
                <button type="reset">Reset</button>
            </form>
            <Link to="/login">Back to login page</Link>
        </div>
    );
};

RegisterForm.PropTypes = {
    register: PropTypes.func.isRequired,
};

export default RegisterForm;
