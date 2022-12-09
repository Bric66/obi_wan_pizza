import {User} from "../../Entities/User";
import {CreateUser} from "../../Usecases/user/CreateUser";
import {InMemoryUserRepository} from "../adapters/repositories/InMemoryUserRepository";
import {UuidGateway} from "../adapters/gateways/UuidGateway";
import {BcryptGateway} from "../adapters/gateways/BcryptGateway";
import {UpdateUser} from "../../Usecases/user/UpdateUser";

const dbUpdateUser = new Map<string, User>();


describe('When I call UpdateUser====>', () => {
    let createUser: CreateUser;
    let updateUser: UpdateUser;
    let bcryptGateway: BcryptGateway;

    beforeAll(() => {
        const inMemoryUserRepository = new InMemoryUserRepository(dbUpdateUser);
        const uuidGateway = new UuidGateway();
        bcryptGateway = new BcryptGateway();
        updateUser = new UpdateUser(inMemoryUserRepository, bcryptGateway)
        createUser = new CreateUser(
            inMemoryUserRepository, uuidGateway, bcryptGateway
        )
    });

    it('should update user', async () => {
        const user = await createUser.execute({
            userName: "JOJO",
            email: "jojo@gmail.com",
            password: "1234",
        })

        const result = await updateUser.execute({
            userName: "MIMI",
            email: "mimi@gmail.com",
            password: "5678",
            updated: new Date(),
            userId: user.props.id,
        })
        await expect(result.props.userName).toEqual("mimi");
        await expect(result.props.email).toEqual("mimi@gmail.com");
        await expect(bcryptGateway.decrypt("5678", result.props.password)).toEqual(true);
        await expect(result.props.id).toEqual(user.props.id)
    })
})