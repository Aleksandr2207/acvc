import "reflect-metadata";
import cors from "cors";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
// import path from "path";
import { HelloResolver } from "./resolvers/Hello";
import { User } from "./entities/User";
import { UserResolver } from "./resolvers/UserResolver";

const main = async () => {
    /*const conn = */ await createConnection({
        type: "postgres",
        database: "acvc",
        username: "postgres",
        password: "root",
        // url: process.env.DATABASE_URL,
        logging: true,
        synchronize: true,
        // migrations: [path.join(__dirname, "./migrations/*")],
        entities: [User],
    });

    const app = express();

    app.set("trust proxy", 1);

    app.use(
        cors({
            origin: "*",
            credentials: true,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
        }),
    });

    apolloServer.applyMiddleware({
        app,
        cors: false,
    });

    app.listen(/*parseInt( process.env.PORT! )*/ 4000, () => {
        console.log("server started on localhost:4000");
    });
};

main().catch((err) => console.error(err));
// asdf
