import mongoose from "mongoose";
import {MongoDbProductRepository} from "../repositories/mongoDb/repositories/MongoDbProductRepository";
import {FoodType, Product} from "../../core/entities/Product";
import {v4} from "uuid";
import {ProductModel} from "../repositories/mongoDb/models/product";
import {ProductErrors} from "../../core/errors/ProductErrors";


describe("Integration - MongoDbProductRepository", () => {
    let mongoDbProductRepository: MongoDbProductRepository;
    let product: Product;

    beforeAll(async () => {
        const databaseId = v4();
        mongoose.connect(`mongodb://127.0.0.1:27017/${databaseId}`, (err) => {
            if (err) {
                throw err;
            }
            console.info("Connected to mongodb");
        });
        mongoDbProductRepository = new MongoDbProductRepository();
        product = Product.create({
            productId: "1234",
            description: "description",
            name: "name",
            price: 20,
            foodType: FoodType.PIZZA
        })


    })
    beforeEach(async () => {
        await mongoDbProductRepository.create(product);
    });
    afterEach(async () => {
        await ProductModel.collection.drop();
    });
    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it("should delete a product", async () => {
        await mongoDbProductRepository.delete(product.props.productId);
        const result =  mongoDbProductRepository.getById("1234");
        await expect( result).rejects.toThrow(ProductErrors.DoesntExist)
    });

    it("should get a product by id", async () => {
        const result = await mongoDbProductRepository.getById("1234");
        expect(result.props.description).toEqual("description");
    });

    it("Should get a product by name", async () => {
        const result = await mongoDbProductRepository.getByName("name");
        expect(result.props.name).toEqual("name");
        expect(result.props.productId).toEqual("1234");
    });

    it("Should get all products", async () => {
        const product2 = Product.create({
            productId: "5678",
            description: "description2",
            name: "name2",
            price: 40,
            foodType: FoodType.BEVERAGE
        })
        await mongoDbProductRepository.create(product2);
        const result = await mongoDbProductRepository.getAll();
        expect(result).toHaveLength(2);
    })

    it("Should update a product", async () => {
        product.update({
            name: "test",
            price: 50,
            description: "test description"
        })
        const result = await mongoDbProductRepository.update(product)
        expect(result.props.name).toEqual("test");
    })
})