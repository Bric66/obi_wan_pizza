import express from "express";
import {v4} from "uuid";
import mongoose from "mongoose";
import supertest from "supertest";
import {ProductRepository} from "../../core/repositories/ProductRepository";
import {FoodType, Product} from "../../core/entities/Product";
import {MongoDbProductRepository} from "../../adapters/repositories/mongoDb/repositories/MongoDbProductRepository";
import {ProductModel} from "../../adapters/repositories/mongoDb/models/product";
import {productRouter} from "../routes/product";

const app = express();

describe("E2E - Product Router", () => {
    let productRepository: ProductRepository;
    let product: Product;

    beforeAll(async () => {
        app.use(express.json());
        app.use("/product", productRouter);

        const databaseId = v4();
        mongoose.connect(`mongodb://127.0.0.1:27017/${databaseId}`, (err) => {
            if (err) {
                throw err;
            }
            console.info("Connected to mongodb");
        });
        productRepository = new MongoDbProductRepository();
        product = Product.create({
            productId: "1234",
            description: "pizza1",
            name: "pizza1",
            price: 15,
            foodType: FoodType.PIZZA
        });
    });

    afterEach(async () => {
        await ProductModel.collection.drop();
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it("Should post/product/", async () => {
        await supertest(app)
            .post("/product/")
            .send({
                description: "pizza description",
                name: "pizza name",
                price: 15,
                foodType: "pizza"
            })
            .expect((response) => {
                console.log (response)
                const responseBody = response.body;
                expect(responseBody.price).toEqual(15);
            })
            .expect(201);
    });
});