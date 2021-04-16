import React from "react";
import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";

const Books = (props) => {
    const result = useQuery(ALL_BOOKS, {
        onError: (error) => props.setError(error.graphQLErrors[0].message),
    });

    if (!props.show) {
        return null;
    }

    let books = [];
    if (result.data) {
        books = result.data.allBooks;
        console.log(books);
    }

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th>book</th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Books;
