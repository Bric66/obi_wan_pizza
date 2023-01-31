import "dotenv/config";
import express from "express";
//import * as mongoose from "mongoose";
import {userRouter} from "./app/routes/user";
import {productRouter} from "./app/routes/product";
import {ClassRegistry, DbDeployer, Neo4jConnection} from "neo4j-builder";
import {UserModel} from "./adapters/repositories/neo4j/models/user";

const port = +process.env.PORT_KEY;

export const connection = new Neo4jConnection("bolt://127.0.0.1:7687", "neo4j","obiwan_pizza");
const registry = new ClassRegistry();
registry.register(UserModel.name, UserModel)
new DbDeployer(
    registry, connection , console
).launch()
//
// mongoose.connect("mongodb://127.0.0.1:27017/obiwan_pizza", (err) => {
//     if (err) {
//         throw err;
//     }
//     console.info("Connected to mongodb");
// });

const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.use("/product", productRouter);


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
