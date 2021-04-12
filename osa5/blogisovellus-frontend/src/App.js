// Dependencies
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
    Switch,
    Route,
    Link,
    useHistory,
    useRouteMatch,
} from "react-router-dom";
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

const App = () => {
    const dispatch = useDispatch((state) => state);

    const [user, setUser] = useState(null);
    const blogFormRef = useRef();

    const blogService = useResource("/api/blogs");
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
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const loginForm = () => {
        return (
            <div>
                <Togglable buttonLabel={"login"}>
                    <LoginForm login={loginBlog} />
                    <Link to="/register">Register a new account</Link>
                </Togglable>
            </div>
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
            setUser(user);
            window.localStorage.setItem(
                "loggedBlogappUser",
                JSON.stringify(user)
            );
        } catch (e) {
            dispatch(setNotification("wrong credentials."), 5);
        }
    };

    const logoutBlog = async () => {
        setUser(null);
        window.localStorage.removeItem("loggedBlogappUser");
    };

    const registerUser = async (userObject) => {
        try {
            const user = await userService.create(userObject);
            loginService.setToken(user.token);
            setUser(user);
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
            <h1>Blogs</h1>

            <Notification />

            <Switch>
                <Route path="/blogs">
                    <Blogs />
                </Route>
                <Route path="/users">
                    <Users />
                </Route>
                <Route path="/register">
                    <RegisterForm register={registerUser} />
                </Route>
                <Route path="/">
                    {user === null ? (
                        loginForm()
                    ) : (
                        <div>
                            <p>{user.name} logged in</p>
                            <button onClick={logoutBlog} id="logout-button">
                                Logout
                            </button>
                            {blogForm()}
                            <Link to="/blogs">Blogs</Link>
                            <Link to="/users">Users</Link>
                            <Blogs />
                        </div>
                    )}
                </Route>
            </Switch>
        </>
    );
};

export default App;
