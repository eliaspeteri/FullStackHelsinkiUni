import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeUsers } from "../reducers/userReducer";
const Users = () => {
    const users = useSelector((state) => state.users);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeUsers());
    }, [dispatch]);
    return (
        <>
            <h2>Users</h2>
            <table>
                <thead>
                    <td></td>
                    <td>
                        <strong>blogs created</strong>
                    </td>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Users;
