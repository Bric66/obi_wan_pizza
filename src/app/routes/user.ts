import express from "express";
import { CreateUser } from "../../core/Usecases/user/CreateUser";
import { MongoDbUserRepository } from "../../adapters/repositories/mongoDb/repositories/MongoDbUserRepository";
import { BcryptGateway } from "../../adapters/gateways/BcryptGateway";
import { V4IdGateway } from "../../adapters/gateways/V4IdGateway";
import { ConnectUser } from "../../core/Usecases/user/ConnectUser";
import jwt from "jsonwebtoken";
import { authorization } from "../middlewares/JwtAuthorizationMiddleware";
import { AuthentifiedRequest } from "../types/AuthentifiedRequest";
import { UpdateUser } from "../../core/Usecases/user/UpdateUser";
import {DeleteUser} from "../../core/Usecases/user/DeleteUser";
const userRouter = express.Router();
const secretKey = process.env.SECRET_KEY;
const mongoDbUserRepository = new MongoDbUserRepository();
const bcryptGateway = new BcryptGateway();
const v4IdGateway = new V4IdGateway();
const createUser = new CreateUser(
  mongoDbUserRepository,
  v4IdGateway,
  bcryptGateway
);
const connectUser = new ConnectUser(mongoDbUserRepository, bcryptGateway);
const updateUser = new UpdateUser(mongoDbUserRepository, bcryptGateway);
const deleteUser = new DeleteUser(mongoDbUserRepository)

userRouter.post("/signUp", async (req, res) => {
 try {
    const body = {
      userName: req.body.userName.trim(),
      email: req.body.email.toLowerCase().trim(),
      password: req.body.password,
      libraryTitle: req.body.libraryTitle,
    };

    const user = await createUser.execute(body);

    return res.status(201).send({
      id: user.props.id,
      userName: user.props.userName,
      email: user.props.email,
      created: user.props.created,
    });
  } catch (err) {
    return res.status(400).send({
      message: err.message,
    });
  }
});

userRouter.post("/signIn", async (req, res) => {
  try {
    const body = {
      email: req.body.email.toLowerCase().trim(),
      password: req.body.password,
    };

    const user = await connectUser.execute(body);
    const accessKey = jwt.sign(
      {
        id: user.props.id,
        userName: user.props.userName,
        email: user.props.email,
      },
      secretKey
    );

    return res.status(200).send({
      id: user.props.id,
      userName: user.props.userName,
      email: user.props.email,
      created: user.props.created,
      accesskey: accessKey,
    });
  } catch (err) {
    return res.status(400).send({
      message: err.message,
    });
  }
});

userRouter.use(authorization);

userRouter.patch("/", async (req: AuthentifiedRequest, res) => {
  try {
    const body = {
      userName: req.body.userName.trim(),
      email: req.body.email.toLowerCase().trim(),
      password: req.body.password,
    };
    const updatedUser = await updateUser.execute({
      userName: body.userName,
      email: body.email,
      password: body.password,
      updated: new Date(),
      userId: req.user.id,
    });
    return res.status(200).send({
      id: updatedUser.props.id,
      userName: updatedUser.props.userName,
      email: updatedUser.props.email,
      created: updatedUser.props.created,
      updated: updatedUser.props.updated,
    });
  } catch (err) {
    return res.status(400).send({
      message: err.message,
    });
  }
});


userRouter.delete("/:id",async (req: AuthentifiedRequest, res) => {
    try {

        await deleteUser.execute({
            userId: req.user.id
        })
        return res.status(200).send({

        });
    } catch (err) {
        return res.status(400).send({
            message: err.message,
        })
    }
});


export { userRouter };