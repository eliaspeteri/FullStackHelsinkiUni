// Dependencies
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// Services
import blogService from "../services/blogs";
// Action creators
import { setNotification } from "../reducers/notificationReducer";
// Hooks
import useField from "../hooks/index";

const BlogForm = () => {
    const title = useField("text");
    const author = useField("text");
    const url = useField("text");

    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs);

    const addBlog = async (event) => {
        event.preventDefault();

        const blogObject = {
            title: title.value,
            author: author.value,
            url: url.value,
        };

        await blogService.create(blogObject);
        blogs.push(blogObject);
        dispatch(
            setNotification(
                `Successfully added blog ${blogObject.title} by ${blogObject.author}.`,
                5
            )
        );
        title.onReset();
        author.onReset();
        url.onReset();
    };

    const labelStyle = {
        display: "inline-block",
        width: "10%",
        textAlign: "right",
    };

    const inputStyle = {
        display: "inline-block",
    };

    const formStyle = {
        marginRight: "50%",
    };

    return (
        <div className="formDiv">
            <h2>Add a new blog</h2>

            <form onSubmit={addBlog} style={formStyle}>
                <div>
                    <label htmlFor="title" style={labelStyle}>
                        Title&nbsp;
                    </label>
                    <input
                        id="title"
                        value={title.value}
                        style={inputStyle}
                        onChange={title.onChange}
                    />
                </div>
                <div>
                    <label htmlFor="author" style={labelStyle}>
                        Author&nbsp;
                    </label>
                    <input
                        id="author"
                        value={author.value}
                        style={inputStyle}
                        onChange={author.onChange}
                    />
                </div>
                <div>
                    <label htmlFor="url" style={labelStyle}>
                        Url&nbsp;
                    </label>
                    <input
                        id="url"
                        value={url.value}
                        style={inputStyle}
                        onChange={url.onChange}
                    />
                </div>
                <button type="submit">save</button>
            </form>
        </div>
    );
};

export default BlogForm;
