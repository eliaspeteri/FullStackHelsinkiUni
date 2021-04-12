// Dependencies
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Components
import Blog from "./Blog";
// Services
import blogService from "../services/blogs";
// Action creators
import { setNotification } from "../reducers/notificationReducer";
import { initializeBlogs } from "../reducers/blogReducer";

const Blogs = () => {
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs);

    useEffect(() => {
        dispatch(initializeBlogs());
    }, [dispatch]);

    const removeBlog = async (id) => {
        try {
            await blogService.remove(id);
        } catch (e) {
            dispatch(setNotification("Error removing blog.", 5));
        }
    };

    return (
        <>
            <h2>Blogs</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} removeBlog={removeBlog} />
            ))}
        </>
    );
};

export default Blogs;
