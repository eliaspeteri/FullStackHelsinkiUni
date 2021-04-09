import React, { useState } from "react";
const Blog = ({ blog, removeBlog, userId }) => {
    const [showFullBlog, setShowFullBlog] = useState(false);

    const toggleVisibility = () => {
        setShowFullBlog(!showFullBlog);
    };

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
    };
    return (
        <div style={blogStyle} className="blog">
            <div>
                <div
                    onClick={toggleVisibility}
                    style={{ cursor: "pointer" }}
                    className="titleAuthor"
                >
                    <button
                        onClick={toggleVisibility}
                        className="showFullBlogButton"
                    >
                        {showFullBlog ? "hide" : "show"}
                    </button>
                    <span>{blog.title}</span>
                    &nbsp;by&nbsp;
                    <span>{blog.author}</span>
                </div>
            </div>
            {showFullBlog ? (
                <div>
                    <div>
                        URL:&nbsp;<b>{blog.url}</b>
                    </div>
                    <div>
                        Likes:&nbsp;
                        {blog.likes}
                        <button className="likeButton">Like</button>
                    </div>
                    {userId === blog.userId ? (
                        <button
                            className="removeBlogButton"
                            onClick={() =>
                                window.confirm(
                                    `Remove blog ${blog.title} by ${blog.author} ?`
                                )
                                    ? removeBlog(blog.id)
                                    : null
                            }
                        >
                            remove
                        </button>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
};

export default Blog;
