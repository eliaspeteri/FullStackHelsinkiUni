// Services
import blogService from "../services/blogs";

/* eslint-disable indent */
const blogReducer = (state = [], action) => {
    switch (action.type) {
        case "NEW_BLOG":
            return [...state, action.data];
        case "REMOVE_BLOG":
            console.log(action.data.id);
            return action.data;
        case "INIT_BLOGS":
            return action.data;
        case "LIKE": {
            console.log(action);
            const id = action.data.id;
            const blogToChange = state.find((n) => n.id === id);
            const changedBlog = {
                ...blogToChange,
                votes: blogToChange.votes + 1,
            };

            return state.map((anecdote) =>
                id !== anecdote.id ? anecdote : changedBlog
            );
        }
        default:
            return state;
    }
};

export const addLike = (id, content) => {
    return async (dispatch) => {
        console.log(content);
        const updatedBlog = await blogService.update(id, content);
        dispatch({ type: "LIKE", data: updatedBlog });
    };
};

export const createBlog = (content) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(content);
        dispatch({
            type: "NEW_BLOG",
            data: newBlog,
        });
    };
};

export const removeBlog = (id) => {
    return async (dispatch) => {
        await blogService.remove(id);
        dispatch({ type: "REMOVE_BLOG", data: { id } });
    };
};

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll();
        dispatch({ type: "INIT_BLOGS", data: blogs });
    };
};

export default blogReducer;
