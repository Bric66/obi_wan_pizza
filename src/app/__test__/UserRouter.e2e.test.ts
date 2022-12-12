import "dotenv/config";
import {sign} from "jsonwebtoken";
import express, {request} from "express";
import {v4} from "uuid";
import mongoose from "mongoose";
import {userRouter} from "../routes/user";
import supertest from "supertest";
import {MongoDbUserRepository} from "../../adapters/repositories/mongoDb/repositories/MongoDbUserRepository";
import {User} from "../../core/entities/User";
import {UserModel} from "../../adapters/repositories/mongoDb/models/user";
import {UserRepository} from "../../core/repositories/UserRepository";
import {BcryptGateway} from "../../adapters/gateways/BcryptGateway";
process.env.SECRET_KEY = "maytheforcebewithyou"

const app = express();

describe("E2E - User Router", () => {
    let accessKey;
    let userRepository: UserRepository;
    let user: User;

    beforeAll(async () => {
        app.use(express.json());
        app.use("/user", userRouter);

        const databaseId = v4();
        mongoose.connect(`mongodb://127.0.0.1:27017/${databaseId}`, (err) => {
            if (err) {
                throw err;
            }
            console.info("Connected to mongodb");
        });
        const bcryptGateway = new BcryptGateway();
        userRepository = new MongoDbUserRepository();
        user = User.create({
            userName: "jojolapin",
            email: "jojolapin@gmail.com",
            password: bcryptGateway.encrypt("1234"),
            id: "12345",
        });
    });

    afterEach(async () => {
        await UserModel.collection.drop();
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it("Should post/user/signUp", async () => {
        await supertest(app)
            .post("/user/signUp")
            .send({
                userName: "jojolapin",
                email: "jojolapin@gmail.com",
                password: "1234",
                libraryTitle: "my title",
            })

            .expect((response) => {
                const responseBody = response.body;
                expect(responseBody.userName).toEqual("jojolapin");
            })
            .expect(201);
    });

    it("Should post/user/sigIn", async () => {
        await userRepository.create(user);
        await supertest(app)
            .post("/user/signIn")
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
