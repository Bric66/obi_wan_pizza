import {UseCase} from "../Usecase";
import {User} from "../../Entities/User";
import {UserRepository} from "../../repositories/UserRepository";
import {PasswordGateway} from "../../gateways/PasswordGateway";

export type UserUpdatedInput = {
    userName: string,
    email: string,
    password: string,
    updated:Date,
    userId: string
}

export class UpdateUser implements UseCase<UserUpdatedInput, User> {

    constructor(private readonly userRepository: UserRepository,
                private readonly passwordGateway: PasswordGateway) {
    }

    async execute(input: UserUpdatedInput): Promise<User> {
        const user = await this.userRepository.getById(input.userId)
        
        const hashedPassword = this.passwordGateway.encrypt(input.password)
        user.update({
            email: input.email,
            password: hashedPassword,
            userName: input.userName,
        })
        
        await this.userRepository.update(user);

        return Promise.resolve(user);
    }
}