import {userModel} from "./../models/user";
import {User} from "../../../../core/entities/User";
import {Mapper} from "../../../../core/models/Mapper";

export class MongoDbUserMapper implements Mapper<userModel, User> {

    fromDomain(data: User): userModel {
        const {
            id,
            created,
            email,
            password,
            updated,
            userName
        } = data.props;
        let u: userModel = {
            id,
            created: +created,
            email,
            password,
            updated: +updated,
            userName
        }
        return u
    }

    toDomain(raw: userModel): User {
        const {
            id,
            created,
            email,
            password,
            updated,
            userName
        } = raw;
        return new User({
            id,
            created: new Date(created),
            email,
            password,
            updated: new Date(updated),
            userName
        });
    }
}