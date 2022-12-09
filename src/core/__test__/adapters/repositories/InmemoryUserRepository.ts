import {User} from "../../../Entities/User";
import {UserRepository} from "../../../repositories/UserRepository";

export class InMemoryUserRepository implements UserRepository {

    constructor(private readonly dbUser: Map<string, User>) {
    }

    create(user: User): Promise<User> {
        this.dbUser.set(user.props.id, user);
        return Promise.resolve(user)
    }

    getByEmail(email: string): Promise<User> {
        const values = Array.from(this.dbUser.values());
        const user = values.find(v => v.props.email === email);
        return Promise.resolve(user);
    }

    getById(id: string): Promise<User> {
        const user = this.dbUser.get(id);
        return Promise.resolve(user);
    }

    update(user: User): Promise<User> {
        this.dbUser.set(user.props.id, user);
        return Promise.resolve(user);
    }


    delete(userId: string): Promise<void> {
        return
    };
}