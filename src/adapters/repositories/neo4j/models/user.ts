import 'reflect-metadata';
import {
    Edge,
    Vertex,
    commandBuilder,
    Neo4jConnection,
    ClassRegistry,
    DbDeployer,
    GraphItem,
    Prop
}
    from "neo4j-builder"


@GraphItem('UserModel')
export class UserModel extends Vertex<UserModel> {
    @Prop({
        type: 'string',
        mandatory: true,
        unique: true,
        indexed: true,
    })
    id: string;

    @Prop({
        type: 'string',
        mandatory: true,
        unique: false,
        indexed: true,
    })
    userName: string;

    @Prop({
        type: 'string',
        mandatory: true,
        unique: true,
        indexed: true,
    })
    email: string;

    @Prop({
        type: 'string',
        mandatory: true,
        unique: false,
        indexed: false,
    })
    password: string;

    @Prop({
        type: 'number',
        mandatory: true,
        unique: false,
        indexed: false,
    })
    created: number;

    @Prop({
        type: 'number',
        mandatory: true,
        unique: false,
        indexed: false,
    })
    updated: number;
}
//
// @GraphItem('LIKE')
// class EUserFriendship extends Edge<UserModel, UserModel> {
// }
//
// describe("Fluent API", () => {
//     let cnx: Neo4jConnection;
//
//     beforeAll(async () => {
//         cnx = new Neo4jConnection("bolt://localhost:7687", "neo4j", "root");
//         const registry = new ClassRegistry();
//         registry.register(UserModel.name, UserModel);
//         await new DbDeployer(
//             registry, cnx, console
//         ).launch()
//     })
//
//     afterEach(async () => {
//         //  await cnx.query(`match (v) detach delete v`);
//     })
//
//     it("Simple create should save a new user", async () => {
//         const email = "user@mail.com";
//         const user = new UserModel({
//             email,
//         });
//         user.name = "cedric";
//         expect(user.id).toBeFalsy()
//         const userModel = await cnx.query<UserModel[]>(
//             `CREATE (u:UserModel)
//                    SET u.email = '${user.email}'
//                    SET u.name = '${user.name}'
//                    RETURN u
//             `
//         );
//         const toUserModel = userModel[0];
//         expect(toUserModel.id).toBeTruthy()
//         const result = await cnx.first('match (u:UserTestModel {email: $email}) return u', {email});
//         expect(result.record).toBeTruthy();
//     });
//
//     it("Create edge between new vertice", async () => {
//         const email1 = "user1@mail.com";
//         const user1 = new UserModel({
//             email: email1
//         });
//         const email2 = "user2@mail.com";
//         const user2 = new UserModel({
//             email: email2
//         });
//         expect(user1.id).toBeFalsy()
//         await commandBuilder()
//             .create(user1)
//             .edge(new EUserFriendship())
//             .to()
//             .create(user2)
//             .save(cnx);
//
//         const result = await cnx.first('match (u1:UserTestModel {email: $email1})-[:FRIEND]->(u2:UserTestModel {email: $email2}) return u1,u2', {
//             email1,
//             email2
//         });
//         expect(result.record).toBeTruthy();
//     });
//
//     it("Create edge between new vertice and a matched one", async () => {
//         const email1 = "user1@mail.com";
//         const user1 = new UserModel({
//             email: email1
//         });
//         const email2 = "user2@mail.com";
//         const user2 = new UserModel({
//             email: email2
//         });
//
//         await commandBuilder()
//             .create(user1)
//             .save(cnx);
//         await commandBuilder()
//             .create(user2)
//             .edge(new EUserFriendship())
//             .to()
//             .match(user1)
//             .save(cnx);
//
//         const result = await cnx.first('match (u1:UserTestModel {email: $email1})<-[:FRIEND]-(u2:UserTestModel {email: $email2}) return u1,u2', {
//             email1,
//             email2
//         });
//         expect(result.record).toBeTruthy()
//     });
//     it("Create two vertice", async () => {
//         const email1 = "user1@mail.com";
//         const user1 = new UserModel({
//             email: email1
//         });
//         const email2 = "user2@mail.com";
//         const user2 = new UserModel({
//             email: email2
//         });
//         await commandBuilder()
//             .create(user1)
//             .with()
//             .create(user2)
//             .save(cnx);
//         const result = await cnx.first('match (u1:UserTestModel {email: $email1}) match(u2:UserTestModel {email: $email2}) return u1,u2', {
//             email1,
//             email2
//         });
//         expect(result.record).toBeTruthy()
//     });
//
//     it("Create a command with a custom delete query", async () => {
//         const email1 = "user1@mail.com";
//         const user1 = new UserModel({
//             email: email1
//         });
//         const email2 = "user2@mail.com";
//         const user2 = new UserModel({
//             email: email2
//         });
//         await commandBuilder()
//             .create(user2)
//             .save(cnx);
//         await commandBuilder()
//             .execute("match(u:UserTestModel {email: $email2 }) delete u ", {email2})
//             .create(user1)
//             .with()
//             .execute("create (:VertexOwi {id: $id, name: $name})", {id: 'toto', name: 'tata'})
//             .save(cnx);
//
//         const result = await cnx.first('match (u1:UserTestModel {email: $email1}) match (owi:VertexOwi {id: $id}) return u1,owi', {
//             email1,
//             id: "toto"
//         });
//         expect(result.record).toBeTruthy()
//
//         const noResult = await cnx.first('match (u2:UserTestModel {email: $email2}) return u2', {email2});
//         expect(noResult.record).toBeFalsy()
//     });
//
//     it("Create a command with a custom update query", async () => {
//         const email1 = "user1@mail.com";
//         const user1 = new UserModel({
//             email: email1
//         });
//         const email2 = "user2@mail.com";
//         const email3 = "ohiii@mail.com";
//
//         const user2 = new UserModel({
//             email: email2
//         });
//         await commandBuilder()
//             .create(user2)
//             .save(cnx);
//         await commandBuilder()
//             .execute("match(u:UserTestModel {email: $email2 }) set u.email=$email3 ", {email2, email3})
//             .create(user1)
//             .edge(new EUserFriendship())
//             .to()
//             .match(user2)
//             .save(cnx);
//
//         const result = await cnx.first('match (u1:UserTestModel {email: $email1})-[:FRIEND]->(u2:UserTestModel {email: $email3}) return u1,u2', {
//             email1,
//             email3
//         });
//         expect(result.record).toBeTruthy()
//
//         const updateRes = await cnx.first('match (u2:UserTestModel {email: $email3}) return u2', {email3});
//         expect(updateRes.record).toBeTruthy()
//     });
//
//     it("Match using key properties", async () => {
//         const email1 = "user1@mail.com";
//         const user1 = new UserModel({
//             email: email1
//         });
//         const email2 = "user2@mail.com";
//         const user2 = new UserModel({
//             email: email2
//         });
//         await commandBuilder()
//             .create(user1)
//             .with()
//             .create(user2)
//             .save(cnx);
//
//         await commandBuilder()
//             .match(new UserModel({email: email1}), ["email"])
//             .edge(new EUserFriendship())
//             .to()
//             .match(new UserModel({email: email2}), ["email"])
//             .save(cnx);
//
//         const result = await cnx.first('match (u1:UserTestModel {email: $email1})-[:FRIEND]->(u2:UserTestModel {email: $email2}) return u1,u2', {
//             email1,
//             email2
//         });
//         expect(result.record).toBeTruthy()
//     });
//
//     it("Update without merge", async () => {
//         const email1 = "user1@mail.com";
//         const email2 = "user-corrected@mail.com";
//         const user1 = new UserModel({
//             email: email1,
//             name: "bob"
//         });
//
//         await commandBuilder()
//             .create(user1)
//             .save(cnx);
//         user1.email = email2;
//
//         await commandBuilder()
//             .update(user1)
//             .save(cnx);
//
//         const result = await cnx.first('match (u1:UserTestModel {email: $email2}) return u1', {email2});
//         expect(result.record).toBeTruthy()
//         await expect(commandBuilder()
//             .update(new UserModel({
//                 id: user1.id
//             }))
//             .save(cnx)
//         ).rejects.toThrow(new Error("Property email of vertice UserTestModel is required"));
//     });
//
//     it("Update with merge", async () => {
//         const email1 = "user1@mail.com";
//         const email2 = "user-corrected@mail.com";
//         const user1 = new UserModel({
//             email: email1,
//             name: "bob"
//         });
//
//         await commandBuilder()
//             .create(user1)
//             .save(cnx);
//         user1.email = email2;
//
//         await commandBuilder()
//             .update(user1, true)
//             .save(cnx);
//
//         const result = await cnx.first('match (u1:UserTestModel {email: $email2}) return u1', {email2});
//         expect(result.record).toBeTruthy()
//         const previousValue = async () => commandBuilder()
//             .update(new UserModel({
//                 id: user1.id,
//             }), true)
//             .save(cnx)
//         await expect(previousValue).rejects.toThrow(new Error("Can not save an empty query"))
//     });
// });