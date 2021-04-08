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

    return (
        <div>
            <h2>Add a new blog</h2>

            <form onSubmit={addBlog}>
                <div>
                    <label for="title">Title&nbsp;</label>
                    <input
                        id="title"
                        value={newBlog.title}
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
                    <label for="author">Author&nbsp;</label>
                    <input
                        id="author"
                        value={newBlog.author}
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
                    <label for="url">Url&nbsp;</label>
                    <input
                        id="url"
                        value={newBlog.url}
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
