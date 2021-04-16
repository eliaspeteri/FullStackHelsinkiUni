const { gql } = require("apollo-server");

const typeDefs = gql`
    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
        books: [Book!]!
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
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        findAuthor(name: String): Author!
        findBooks(author: String): Book
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            published: Int
            author: String!
            genres: [String!]!
        ): Book
        addAuthor(name: String!, born: Int): Author
        editAuthor(name: String!, setBornTo: Int!): Author
        createUser(username: String!): User
        editUser(username: String!, favoriteGenre: String!): User
        login(username: String!, password: String!): Token
    }

    type Subscription {
        bookAdded: Book!
    }
`;

module.exports = typeDefs;
