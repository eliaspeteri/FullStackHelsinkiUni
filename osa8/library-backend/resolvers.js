const Author = require("./models/author");
const Book = require("./models/book");

const {
    UserInputError,
    AuthenticationError,
    PubSub,
} = require("apollo-server");

const pubsub = new PubSub();

const resolvers = {
    Query: {
        me: (root, args, context) => {
            return context.currentUser;
        },
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: () => {
            const books = Book.find({}).populate("author");
            return books;
        },
        allAuthors: () => {
            const authors = Author.find({}).populate("books");
            return authors;
        },
        findAuthor: (root, args) => {
            return Author.findOne({ name: args.name });
        },
        findBooks: (root, args) => {
            return Book.find({ author: args.author });
        },
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const book = new Book({ ...args });
            const currentUser = context.currentUser;

            // Check authentication
            if (!currentUser) {
                throw new AuthenticationError("not authenticated");
            }

            // Check for pre-existing items
            if (await Book.findOne({ title: args.title })) {
                throw new UserInputError("Book already exists");
            }

            // Check if author exists in the collection
            // if not, add to the 'authors' collection
            if (!Author.findOne({ name: args.author })) {
                try {
                    const newAuthor = new Author({
                        name: args.author,
                        books: [book.id],
                    });
                    await newAuthor.save();
                    console.log("New author added.");
                } catch (error) {
                    throw new Error(error.message);
                }
            }
            // Attempt to save the book into the 'books' collection
            try {
                await book.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }

            pubsub.publish("BOOK_ADDED", { bookAdded: book });

            return book;
        },
        addAuthor: async (root, args, context) => {
            const author = new Author({ ...args });
            const currentUser = context.currentUser;

            if (!currentUser) {
                throw new AuthenticationError("not authenticated");
            }
            try {
                await author.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                });
            }
            return author;
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser;
            if (!currentUser) {
                throw new AuthenticationError("not authenticated");
            }
            if (args.setBornTo) {
                const author = await Author.findOne({ name: args.name });
                author.born = args.setBornTo;
                if (args.name) {
                    author.name = args.name;
                }
                try {
                    await author.save();
                } catch (error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args,
                    });
                }
                // IF Query does not find a result, return null
                if (!author) return null;
                return author;
            }
        },

        createUser: (root, args) => {
            const user = new User({ username: args.username });

            return user.save().catch((error) => {
                throw newUserInputError(error.message, { invalidArgs: args });
            });
        },

        editUser: async (root, args, context) => {
            const currentUser = context.currentUser;
            if (!currentUser) {
                throw new AuthenticationError("not authenticated");
            }
            const user = await User.findOne({ username: args.username });
            if (args.favoriteGenre) {
                user.favoriteGenre;
            }
            try {
                await user.save();
            } catch (error) {
                throw (
                    (new UserInputError(error.message),
                    {
                        invalidArgs: args,
                    })
                );
            }
            return user;
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
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
        },
    },
};

module.exports = resolvers;
