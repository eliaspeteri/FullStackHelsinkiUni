import axios from "axios";

const useResource = (baseUrl) => {
    const getAll = async () => {
        const response = await axios.get(baseUrl);
        return response.data;
    };

    const getByID = async (id) => {
        const response = await axios.get(`${baseUrl}/${id}`);
        return response.data;
    };

    const create = async (object, token) => {
        if (token === null) {
            const user = window.localStorage.getItem("loggedBlogappUser");
            token = user.token;
        }
        const config = { headers: { Authorization: token } };

        const response = await axios.post(baseUrl, object, config);
        return response.data;
    };

    const update = async (id, object, token) => {
        if (token === null) {
            const user = window.localStorage.getItem("loggedBlogappUser");
            token = user.token;
        }
        const config = { headers: { Authorization: token } };
        const response = await axios.put(`${baseUrl}/${id}`, object, config);
        return response.data;
    };

    const remove = async (id) => {
        await axios.delete(`${baseUrl}/${id}`);
    };

    return {
        getAll,
        getByID,
        create,
        update,
        remove,
    };
};

export default useResource;
