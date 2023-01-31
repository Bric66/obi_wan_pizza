import express from "express";
import {authorization} from "../middlewares/JwtAuthorizationMiddleware";
import {AuthentifiedRequest} from "../types/AuthentifiedRequest";
import {FoodType} from "../../core/entities/Product";
import {MongoDbProductRepository} from "../../adapters/repositories/mongoDb/repositories/MongoDbProductRepository";
import {V4IdGateway} from "../../adapters/gateways/V4IdGateway";
import {CreateProduct} from "../../core/usecases/product/CreateProduct";

const mongoDbProductRepository = new MongoDbProductRepository();
const v4IdGateway = new V4IdGateway();
const createProduct = new CreateProduct(mongoDbProductRepository, v4IdGateway)

const productRouter = express.Router();

productRouter.post("/", async (req, res) => {
    try {
        const body = {
            price: req.body.price,
            name: req.body.name,
            description: req.body.description,
            foodType: req.body.foodType,
        };

        const product = await createProduct.execute(body);

        return res.status(201).send({
            productId: product.props.productId,
            price: product.props.price,
            name: product.props.name,
            description: product.props.description,
            foodType: product.props.foodType,
            created: product.props.created

        });
    } catch (err) {
        return res.status(400).send({
            message: err.message,
        });
    }
});

export {productRouter};
