import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            author
            published
        }
    }
`;

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
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
            title
            author
        }
    }
`;

export const EDIT_BORN = gql`
    mutation editBorn($name: String!, $born: Int!) {
        editAuthor(name: $name, setBornTo: $born) {
            name
            born
        }
    }
`;
