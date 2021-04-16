import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        author {
            name
        }
        published
    }
`;

const AUTHOR_DETAILS = gql`
    fragment AuthorDetails on Author {
        name
        born
        bookCount
    }
`;

export const ALL_BOOKS = gql`
    query {
        allBooks {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            ...AuthorDetails
        }
    }
    ${AUTHOR_DETAILS}
`;

export const NEW_BOOK = gql`
    mutation createBook(
        $title: String!
        $published: Int
        $author: String!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            published: $published
            author: $author
            genres: $genres
        ) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`;

export const EDIT_BORN = gql`
    mutation editBorn($name: String!, $born: Int!) {
        editAuthor(name: $name, setBornTo: $born) {
            name
            born
        }
    }
`;

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`;

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...bookDetails
        }
    }
    ${BOOK_DETAILS}
`;
