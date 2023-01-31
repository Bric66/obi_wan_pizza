import "dotenv/config";
import {sign} from "jsonwebtoken";
import express from "express";
import {userRouter} from "../routes/user";
import supertest from "supertest";
import {User} from "../../core/entities/User";
import {UserRepository} from "../../core/repositories/UserRepository";
import {BcryptGateway} from "../../adapters/gateways/BcryptGateway";
import {ClassRegistry, DbDeployer, Neo4jConnection} from "neo4j-builder";
import {UserModel} from "../../adapters/repositories/neo4j/models/user";
import {Neo4JUserRepository} from "../../adapters/repositories/neo4j/repositories/Neo4JUserRepository";
process.env.SECRET_KEY = "maytheforcebewithyou"

const app = express();

describe("E2E - User Router", () => {
    let accessKey;
    let userRepository: UserRepository;
    let user: User;
    let cnx: Neo4jConnection;

    beforeAll(async () => {
        app.use(express.json());
        app.set("/user", userRouter);
        app.use("/user", userRouter);

        cnx = new Neo4jConnection("bolt://127.0.0.1:7687", "neo4j","obiwan_pizza");
        const registry = new ClassRegistry();
        registry.register(UserModel.name, UserModel)
        await new DbDeployer(
            registry, cnx , console
        )//.launch()

        const bcryptGateway = new BcryptGateway();
        userRepository = new Neo4JUserRepository();
        user = User.create({
            userName: "jojolapin",
            email: "jojolapin@gmail.com",
            password: bcryptGateway.encrypt("1234"),
            id: "12345",
        });
    });

    afterEach(async () => {
        await cnx.query(`match (v) detach delete v`);
    });

    afterAll(async () => {

    });

    it("Should post/user/", async () => {
        await supertest(app)
            .post("/user/")
            .send({
                userName: "jojolapin",
                email: "jojolapin@gmail.com",
                password: "1234",
                libraryTitle: "my title",
            })

            .expect((response) => {
                const responseBody = response.body;
                console.log(response)
                expect(responseBody.userName).toEqual("jojolapin");
            })
            .expect(201);
    });

    it("Should post/user/sign-in", async () => {
        await userRepository.create(user);
        await supertest(app)
            .post("/user/sign-in")
            .send({
                email: "jojolapin@gmail.com",
                password: "1234",
            })
            .expect((response) => {
                const responseBody = response.body;
                expect(responseBody.email).toEqual("jojolapin@gmail.com");
            })
            .expect(200);
    });

    it("Should patch/user", async () => {
        await userRepository.create(user);

        accessKey = sign(
            {
                id: user.props.id,
                userName: user.props.userName,
                email: user.props.email,
            },
            "maytheforcebewithyou"
        );

        await supertest(app)
            .patch("/user")
            .set("access_key", accessKey)
            .send({
                userName: "fifibrindacier",
                email: "fifibrindacier@gmail.com",
                password: "4567",
            })
            .expect((response) => {
                const responseBody = response.body;
                expect(responseBody.email).toEqual("fifibrindacier@gmail.com");
                expect(responseBody.updated).toBeTruthy();
            })
            .expect(200);
    });

    it("Should delete/user", async () => {
        await userRepository.create(user);

        accessKey = sign(
            {
                id: user.props.id,
                userName: user.props.userName,
                email: user.props.email,
            },
            "maytheforcebewithyou"
        );

        await supertest(app)
            .delete("/user/:id")
            .set("access_key", accessKey)
            .send({
                id: user.props.id,
            })
            .expect((response) => {
                const responseBody = response.body;
                expect(responseBody.userName).toBeFalsy();
            })
            .expect(200);
    });

});
