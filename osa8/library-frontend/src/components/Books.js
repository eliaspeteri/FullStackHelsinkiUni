import React from "react";
import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";

const Books = (props) => {
    const result = useQuery(ALL_BOOKS, {
        onError: (error) => props.setError(error.graphQLErrors[0].message),
    });
    let books = [];

    if (!props.show) {
        return null;
    }

    if (!result.loading) {
        books = result.data.allBooks;
    }

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Books;
