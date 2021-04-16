// Dependencies
import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
// GraphQL Queries
import { ALL_AUTHORS } from "../queries";
import { EDIT_BORN } from "../queries";

const Authors = ({ setError, token, show }) => {
    const result = useQuery(ALL_AUTHORS, {
        onError: (error) => setError(error.graphQLErrors[0].message),
    });

    const [name, setName] = useState("");
    const [born, setBirthYear] = useState(Number(null));

    const [editBorn] = useMutation(EDIT_BORN, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    });

    const submit = async (event) => {
        event.preventDefault();

        console.log("edit birth year...");

        editBorn({ variables: { name, born } });
        setName("");
        setBirthYear(Number(null));
    };

    let authors = [];
    if (!show) {
        return null;
    }
    if (result.data) {
        authors = result.data.allAuthors;
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {token ? (
                <div>
                    <h2>set birthyear</h2>
                    <form onSubmit={submit}>
                        <div>
                            <label htmlFor="name">name</label>
                            <select
                                onChange={({ target }) => setName(target.value)}
                            >
                                {authors.map((a) => (
                                    <option value={a.name}>{a.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="born">born</label>
                            <input
                                id="born"
                                onChange={({ target }) =>
                                    setBirthYear(Number(target.value))
                                }
                            />
                        </div>
                        <button type="submit">update author</button>
                    </form>
                </div>
            ) : null}
        </div>
    );
};

export default Authors;
