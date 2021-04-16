// Dependencies
import { useApolloClient, useSubscription } from "@apollo/client";
import React, { useState } from "react";
// Components
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
// GraphQL Queries
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

const Notify = ({ errorMessage }) => {
    if (!errorMessage) return null;
    return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
    const [page, setPage] = useState("authors");
    const [errorMessage, setErrorMessage] = useState(null);
    const [token, setToken] = useState(null);
    const client = useApolloClient();

    const updateCacheWith = (addedBook) => {
        const includedIn = (set, object) =>
            set.map((b) => b.id).includes(object.id);

        const dataInStore = client.readQuery({ query: ALL_BOOKS });
        if (!includedIn(dataInStore.allBooks, addedBook)) {
            client.writeQuery({
                query: ALL_BOOKS,
                data: { allBooks: dataInStore.allBooks.concat(addedBook) },
            });
        }
    };

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded;
            notify(`${addedBook.title} added`);
            updateCacheWith(addedBook);
        },
    });

    const notify = (message) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage(null);
        }, 10000);
    };

    const logout = () => {
        setToken(null);
        localStorage.clear();
        client.resetStore();
    };

    return (
        <div>
            <div>
                <button onClick={() => setPage("authors")}>authors</button>
                <button onClick={() => setPage("books")}>books</button>
                <button onClick={() => setPage("login")}>login</button>
                {token ? (
                    <div>
                        <button onClick={() => setPage("add")}>add book</button>
                        <button onClick={() => logout()}>logout</button>
                    </div>
                ) : null}
            </div>
            <Notify errorMessage={errorMessage} />
            {page === "login" ? (
                <div>
                    <h2>Login</h2>
                    <LoginForm setToken={setToken} setError={notify} />
                </div>
            ) : null}
            <Authors
                show={page === "authors"}
                setError={notify}
                token={token}
            />

            <Books show={page === "books"} setError={notify} />

            <NewBook
                show={page === "add"}
                setError={notify}
                updateCacheWith={updateCacheWith}
            />
        </div>
    );
};

export default App;
