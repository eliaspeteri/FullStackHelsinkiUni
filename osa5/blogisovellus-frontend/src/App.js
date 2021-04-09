import React, { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [user, setUser] = useState(null);

    const blogFormRef = useRef();

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

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
            <BlogForm createBlog={addBlog} />
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
            setErrorMessage("wrong credentials");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const logoutBlog = async () => {
        setUser(null);
        window.localStorage.removeItem("loggedBlogappUser");
    };

    const addBlog = async (blogObject) => {
        await blogService.create(blogObject);
        blogs.push(blogObject);
        setErrorMessage(
            `Successfully added blog ${blogObject.title} by ${blogObject.author}.`
        );
    };

    const removeBlog = async (id) => {
        try {
            setErrorMessage("Successfully removed blog.");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            blogService.getAll().then((blogs) => setBlogs(blogs));
        } catch (e) {
            setErrorMessage("Error removing blog.");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
        await blogService.remove(id);
    };

    return (
        <div>
            <h1>Blogs</h1>

            <Notification message={errorMessage} />

            {user === null ? (
                loginForm()
            ) : (
                <div>
                    <p>{user.name} logged in</p>
                    <button onClick={logoutBlog} id="logout-button">
                        Logout
                    </button>
                    {blogForm()}
                    <h2>Blogs</h2>
                    {blogs.map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            removeBlog={removeBlog}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
