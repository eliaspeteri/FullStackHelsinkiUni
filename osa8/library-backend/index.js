// Apollo Server
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
// Mongo
const mongoose = require("mongoose");

const User = require("./models/user");
const URI = require("./URI");
// JWT
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./JWT_SECRET");

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 */

// MongoDB Connection
const MONGODB_URI = `mongodb+srv://fullstack:${URI}@cluster0.x3oih.mongodb.net/library?retryWrites=true&w=majority`;
console.log("connecting to", MONGODB_URI);
mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => console.log("connected to MongoDB"))
    .catch((error) => {
        console.log("error connecting to MongoDB:", error.message);
    });

// Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.toLowerCase().startsWith("bearer ")) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
            const currentUser = await User.findById(decodedToken.id);
            return { currentUser };
        }
    },
});

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
