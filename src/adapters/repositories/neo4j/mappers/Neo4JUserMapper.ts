import {Mapper} from "../../../../core/models/Mapper";
import {User} from "../../../../core/entities/User";
import {UserModel} from "../models/user";



export class Neo4JUserMapper implements Mapper<UserModel, User> {

    toDomain(raw: UserModel): User {
        return new User({
            id: raw.id,
            email: raw.email,
            created: new Date(raw.created),
            updated: new Date(raw.updated),
            userName: raw.userName,
            password: raw.password,
        });
    }

    fromDomain(data: User): UserModel {
        return {
            id: data.props.id,
            email: data.props.email,
            created: +data.props.created,
            updated: +data.props.updated,
            userName: data.props.userName,
            password: data.props.password,
            creationTime : 0
        }
    }
}