// Dependencies
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Link, useHistory } from "react-router-dom";
// Components
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import RegisterForm from "./components/RegisterForm";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
// Action creators
import { initializeBlogs } from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";
import { initializeUsers } from "./reducers/userReducer";
// Hooks
import { useResource } from "./hooks";
import { logoutUser } from "./reducers/loginReducer";

const App = () => {
    const dispatch = useDispatch((state) => state);

    const blogFormRef = useRef();
    const loginFormRef = useRef();
    const loginService = useResource("/api/login");
    const userService = useResource("/api/users");

    const history = useHistory();

    useEffect(() => {
        dispatch(initializeBlogs());
    }, [dispatch]);

    useEffect(() => {
        dispatch(initializeUsers());
    }, [dispatch]);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
        if (loggedUserJSON) {
            dispatch({ type: "LOGGED_IN", data: JSON.parse(loggedUserJSON) });
        }
    }, [dispatch]);

    const loggedInUser = useSelector((state) => state.login);
    console.log("state.login", loggedInUser);

    const loginForm = () => {
        return (
            <Togglable buttonLabel={"login"} ref={loginFormRef}>
                <LoginForm login={loginBlog} />
                <Link to="/register">Register a new account</Link>
            </Togglable>
        );
    };

    const blogForm = () => (
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm />
        </Togglable>
    );

    const loginBlog = async (loginObject) => {
        try {
            const user = await loginService.create(loginObject);
            loginService.setToken(user.token);
            window.localStorage.setItem(
                "loggedBlogappUser",
                JSON.stringify(user)
            );
            history.push("/");
        } catch (e) {
            dispatch(setNotification("wrong credentials."), 5);
        }
    };

    const registerUser = async (userObject) => {
        try {
            const user = await userService.create(userObject);
            loginService.setToken(user.token);
            window.localStorage.setItem(
                "loggedBlogappUser",
                JSON.stringify(user)
            );
            history.push("/");
        } catch (e) {
            dispatch(setNotification("Error creating user."));
        }
    };

    return (
        <>
            <nav
                style={
                    loggedInUser.length !== undefined
                        ? { backgroundColor: "lightgray", padding: "0.5rem" }
                        : { display: "none" }
                }
            >
                <Link to="/blogs">Blogs&nbsp;</Link>
                <Link to="/users">Users&nbsp;</Link>
                {loggedInUser ? (
                    <>
                        {loggedInUser.name} logged in&nbsp;
                        <button
                            onClick={() => {
                                window.localStorage.removeItem(
                                    "loggedBlogappUser"
                                );
                                dispatch(logoutUser());
                                history.push("/login");
                            }}
                            id="logout-button"
                        >
                            Logout
                        </button>
                    </>
                ) : null}
            </nav>
            <h1>Blogs</h1>

            <Notification />

            <Switch>
                <Route path="/blogs">
                    {loggedInUser ? (
                        <>
                            {blogForm()}
                            <Blogs />
                        </>
                    ) : (
                        history.push("/login")
                    )}
                </Route>
                <Route path="/users">
                    {loggedInUser ? <Users /> : history.push("/login")}
                </Route>
                <Route path="/register">
                    {loggedInUser.length === undefined ? (
                        <RegisterForm register={registerUser} />
                    ) : (
                        history.push("/")
                    )}
                </Route>
                <Route path="/login">
                    {loggedInUser.length === undefined
                        ? loginForm()
                        : history.push("/")}
                </Route>
                <Route path="/">
                    <div>
                        {blogForm()}
                        <Blogs />
                    </div>
                </Route>
                )
            </Switch>
        </>
    );
};

export default App;
