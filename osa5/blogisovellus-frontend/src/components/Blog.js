// Dependencies
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// Action creators
import { addLike } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog, removeBlog, userId }) => {
    const dispatch = useDispatch();
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
                    <span>{blog.title}</span>
                    &nbsp;by&nbsp;
                    <span>{blog.author}</span>
                    &nbsp;
                    <button
                        onClick={toggleVisibility}
                        className="showFullBlogButton"
                    >
                        {showFullBlog ? "hide" : "show"}
                    </button>
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
                        <button
                            className="likeButton"
                            onClick={() => {
                                dispatch(addLike(blog.id, blog));
                                dispatch(
                                    setNotification(
                                        `You liked ${blog.title}!`,
                                        5
                                    )
                                );
                            }}
                        >
                            Like
                        </button>
                    </div>
                    {userId === blog.userId ? (
                        <button
                            className="removeBlogButton"
                            onClick={() =>
                                window.confirm(
                                    `Remove blog ${blog.title} by ${blog.author} ?`
                                )
                                    ? removeBlog(blog.id) &&
                                      dispatch(
                                          setNotification(
                                              `Removed blog '${blog.title}'.`,
                                              5
                                          )
                                      )
                                    : null
                            }
                        >
                            remove
                        </button>
                    ) : null}
                    <div>id:&nbsp;{blog.id}</div>
                </div>
            ) : null}
        </div>
    );
};

export default Blog;
