import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

    const addBlog = (event) => {
        event.preventDefault();

        createBlog({
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url,
        });

        setNewBlog({ title: "", author: "", url: "" });
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
                        value={newBlog.title}
                        style={inputStyle}
                        onChange={({ target }) => {
                            setNewBlog({
                                title: target.value,
                                author: newBlog.author,
                                url: newBlog.url,
                            });
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="author" style={labelStyle}>
                        Author&nbsp;
                    </label>
                    <input
                        id="author"
                        value={newBlog.author}
                        style={inputStyle}
                        onChange={({ target }) => {
                            setNewBlog({
                                title: newBlog.title,
                                author: target.value,
                                url: newBlog.url,
                            });
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="url" style={labelStyle}>
                        Url&nbsp;
                    </label>
                    <input
                        id="url"
                        value={newBlog.url}
                        style={inputStyle}
                        onChange={({ target }) => {
                            setNewBlog({
                                title: newBlog.title,
                                author: newBlog.author,
                                url: target.value,
                            });
                        }}
                    />
                </div>
                <button type="submit">save</button>
            </form>
        </div>
    );
};

export default BlogForm;
