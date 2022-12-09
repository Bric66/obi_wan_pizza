import {UuidGateway} from "../adapters/gateways/UuidGateway";
import {DeleteUser} from "../../Usecases/user/DeleteUser";
import {InMemoryUserRepository} from "../adapters/repositories/InMemoryUserRepository";
import {User} from "../../Entities/User";

const dbDeleteUser = new Map<string, User>();

describe('When I call DeleteUser', () => {
    const inMemoryUserRepository = new InMemoryUserRepository(dbDeleteUser);
    const deleteUser = new DeleteUser(inMemoryUserRepository)
    const uuidGateway = new UuidGateway()
    const id = uuidGateway.generate()

    it('should delete user', async () => {
        const result = await deleteUser.execute({
            userId: id,
        });
        await expect(result).toBeFalsy();
    });
})