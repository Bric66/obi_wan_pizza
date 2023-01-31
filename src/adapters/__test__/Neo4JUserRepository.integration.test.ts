import {v4} from "uuid";

import {User} from "../../core/entities/User";
import {Neo4JUserRepository} from "../repositories/neo4j/repositories/Neo4JUserRepository";
import {ClassRegistry, DbDeployer, Neo4jConnection} from "neo4j-builder";
import {UserModel} from "../repositories/neo4j/models/user";


describe("Integration - Neo4JUserRepository", () => {
    let cnx: Neo4jConnection;
    let neo4JUserRepository: Neo4JUserRepository;
    let user: User;
    let result: User;

    beforeAll(async () => {
        cnx = new Neo4jConnection("bolt://127.0.0.1:7687", "neo4j", "obiwan_pizza");
        const registry = new ClassRegistry();
        registry.register(UserModel.name, UserModel)
        await new DbDeployer(
            registry, cnx, console
        )//.launch()

        neo4JUserRepository = new Neo4JUserRepository();
        user = User.create({
            email: "user@example.com",
            id: "12345",
            password: "password",
            userName: "user Name",
        });
    });

    beforeEach(async () => {
        result = await neo4JUserRepository.create(user);
    });

    afterEach(async () => {
        await cnx.query(`match (v) detach delete v`);
    });

    afterAll(async () => {
        await cnx.dispose()
    });

    it("Should save a user", async () => {
        await expect(result.props.userName).toEqual("user name");
    });

    it("Should get a user by email", async () => {
        const result = await neo4JUserRepository.getByEmail("user@example.com");
        expect(result.props.userName).toEqual("user name");
        expect(result.props.id).toEqual("12345");
    });

    it("should be falsy if user email does not exist", async () => {
        const result = await neo4JUserRepository.getByEmail("fakeEmail@example.com");
        expect(result).toBeFalsy();
    })
    it("should get a user by id", async () => {
        const result = await neo4JUserRepository.getById("12345");
        expect(result.props.userName).toEqual("user name");
    });
    it("should throw if userId does not exist", async () => {
        const result = () => neo4JUserRepository.getById("false ID");
        await expect(() => result()).rejects.toThrow();
    })
    it("should throw if user does not exist", async () => {
        const result = () => neo4JUserRepository.getById("false ID");
        await expect(() => result()).rejects.toThrow();
    });

    it("should update a user", async () => {
        user.update({
            email: "newEmail@example.com",
            password: "newpassword",
            userName: "newUserName",
        });
        const result = await neo4JUserRepository.update(user);
        expect(result.props.id).toEqual("12345");
        expect(result.props.userName).toEqual("newusername");
        expect(result.props.email).toEqual("newemail@example.com");
    });

    it("should delete a user", async () => {
        await neo4JUserRepository.delete(user.props.id);
        const result = await neo4JUserRepository.getByEmail("fakeEmail@example.com");
        expect(result).toBeFalsy();
    });
});

