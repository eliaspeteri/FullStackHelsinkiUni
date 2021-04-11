// Dependencies
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
// Services
import blogService from "./services/blogs";
import loginService from "./services/login";
// Components
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
// Action creators
import { initializeBlogs } from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
    const dispatch = useDispatch((state) => state);

    const [user, setUser] = useState(null);

    const blogFormRef = useRef();

    useEffect(() => {
        dispatch(initializeBlogs());
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
                <Togglable buttonLabel="login">
                    <LoginForm login={loginBlog} />
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
            const user = await loginService.login(loginObject);
            blogService.setToken(user.token);
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

    return (
        <div>
            <h1>Blogs</h1>

            <Notification />

            {user === null ? (
                loginForm()
            ) : (
                <div>
                    <p>{user.name} logged in</p>
                    <button onClick={logoutBlog} id="logout-button">
                        Logout
                    </button>
                    {blogForm()}
                    <Blogs />
                </div>
            )}
        </div>
    );
};

export default App;
