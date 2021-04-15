const { gql } = require("apollo-server");

const typeDefs = gql`
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }

    type Book {
        title: String!
        published: Int
        author: Author!
        genres: [String!]!
        id: ID!
    }

    type User {
        username: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        me: User
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }

    type Mutation {
        createUser(username: String!): User
        login(username: String!, password: String!): Token
        addBook(
            title: String!
            published: Int
            author: String!
            genres: [String!]!
        ): Book
        editAuthor(name: String!, setBornTo: Int!): Author
    }
`;

module.exports = typeDefs;
