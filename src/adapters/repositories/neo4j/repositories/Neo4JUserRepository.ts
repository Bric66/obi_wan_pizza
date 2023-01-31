import {UserRepository} from "../../../../core/repositories/UserRepository";
import {User} from "../../../../core/entities/User";
import {connection} from "../../../../index";
import {UserModel} from "../models/user";
import {Neo4JUserMapper} from "../mappers/Neo4JUserMapper";

const neo4JUserMapper = new Neo4JUserMapper()

export class Neo4JUserRepository implements UserRepository {
    async create(user: User): Promise<User> {
        const userNeo4JModel = neo4JUserMapper.fromDomain(user)
        await connection.query<UserModel[]>(
            `CREATE (u:UserModel)
                       ${Object.keys(userNeo4JModel).map(key => `SET u.${key} = $${key}`).join(" ")}
                        RETURN u
            `, userNeo4JModel
        );
        return user

    }

    async delete(userId: string): Promise<void> {
        await connection.query<UserModel[]>(`MATCH (n:UserNeo4JModel) WHERE n.id = '${userId}'
        DETACH DELETE  n`
        );

        return;
    }

    async getByEmail(email: string): Promise<User> {
        const user = await connection.query<UserModel[]>(`MATCH (n:UserModel) WHERE n.email = '${email}'
        RETURN  n`
        );
        const toUserModel = user[0]
        if (!toUserModel) {
            return null;
        }
        return neo4JUserMapper.toDomain(toUserModel);
    }

    async getById(userId: string): Promise<User> {
        const user = await connection.query<UserModel[]>(`MATCH (n:UserModel) WHERE n.id = '${userId}'
        RETURN  n`
        );
        const toUserModel = user[0];
        if (!toUserModel) {
            throw new Error("user not found");
        }
        return neo4JUserMapper.toDomain(toUserModel);
    }

    async update(user: User): Promise<User> {
        const userNeo4JModel = neo4JUserMapper.fromDomain(user)
        await connection.query<UserModel[]>(
            `CREATE (u:UserNeo4JModel)
                        SET u.email = '${userNeo4JModel.email}'
                        SET u.updated = '${userNeo4JModel.updated}'
                        SET u.userName = '${userNeo4JModel.userName}'
                        SET u.password = '${userNeo4JModel.password}'
                        RETURN u
            `
        );
        return user
    }


}