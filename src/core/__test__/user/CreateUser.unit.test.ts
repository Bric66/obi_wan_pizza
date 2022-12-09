import { CreateUser } from "../../Usecases/user/CreateUser";
import { User } from "../../Entities/User";
import { InMemoryUserRepository } from "../adapters/repositories/InMemoryUserRepository";
import { UuidGateway } from "../adapters/gateways/UuidGateway";
import { BcryptGateway } from "../adapters/gateways/BcryptGateway";

const dbCreateUser = new Map<string, User>();

describe("When I call CreateUser ====>", () => {
  let createUser: CreateUser;

  beforeAll(() => {
    const inMemoryUserRepository = new InMemoryUserRepository(dbCreateUser);
    const uuidGateway = new UuidGateway();
    const bcryptGateway = new BcryptGateway();
    createUser = new CreateUser(
      inMemoryUserRepository,
      uuidGateway,
      bcryptGateway
    );
  });

  it("should create user", async () => {
    const result = await createUser.execute({
      userName: "JOJO",
      email: "jojo@gmail.com",
      password: "1234",
    });
    expect(result.props.id).toBeTruthy();
    expect(result.props.userName).toEqual("jojo");
  });

  it("should throw if user already exists", async () => {
    const result = () =>
      createUser.execute({
        userName: "JOJO",
        email: "jojo@gmail.com",
        password: "1234",
      });
    await expect(() => result()).rejects.toThrow();
  });
});
