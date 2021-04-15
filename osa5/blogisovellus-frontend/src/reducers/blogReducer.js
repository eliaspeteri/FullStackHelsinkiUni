// Hooks
import useResource from "../hooks/useResource";
const blogService = useResource("/api/blogs");
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
            return action.data;
        }
        default:
            return state;
    }
};

export const addLike = (id, content) => {
    return async (dispatch) => {
        content.likes++;
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
