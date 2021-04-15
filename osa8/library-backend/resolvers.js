const Author = require("./models/author");
const Book = require("./models/book");

const { UserInputError, AuthenticationError } = require("apollo-server");

const resolvers = {
    Query: {
        me: (root, args, context) => {
            return context.currentUser;
        },
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: () => {
            return Book.find({});
        },
        allAuthors: () => {
            return Author.find({});
        },
    },
    Mutation: {
        createUser: (root, args) => {
            const user = new User({ username: args.username });

            return user.save().catch((error) => {
                throw newUserInputError(error.message, { invalidArgs: args });
            });
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username });

            if (!user || args.password !== "secret") {
                throw new UserInputError("wrong credentials");
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            };

            return { value: jwt.sign(userForToken, JWT_SECRET) };
        },
        addBook: async (root, args, context) => {
            const book = new Book({ ...args });
            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new AuthenticationError("not authenticated");
            }

            try {
                await book.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }

            return book;
        },
        editAuthor: async (root, args) => {
            if (args.setBornTo) {
                const author = await Author.findOne({ name: args.name });
                author.born = args.setBornTo;

                try {
                    await author.save();
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    });
                }

                // IF Query does not find a result, return null
                if (!author) return null;
            }
        },
    },
};

module.exports = resolvers;
