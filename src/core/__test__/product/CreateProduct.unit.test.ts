import {FoodType, Product } from "../../entities/Product";
import {CreateProduct} from "../../usecases/product/CreateProduct";
import {InMemoryProductRepository} from "../adapters/repositories/InMemoryProductRepository";
import {UuidGateway} from "../adapters/gateways/UuidGateway";
import {ProductErrors} from "../../errors/ProductErrors";

const dbCreateProduct = new Map<string, Product>();

describe("When I call CreateProduct ====>", () => {
    let createProduct: CreateProduct;

    beforeAll(() => {
        const inMemoryProductRepository = new InMemoryProductRepository(dbCreateProduct);
        const uuidGateway = new UuidGateway();
        createProduct = new CreateProduct(
            inMemoryProductRepository,
            uuidGateway,
        );
    });
    beforeEach(() => {
        dbCreateProduct.clear();
    })

    it("should create product", async () => {
        const result = await createProduct.execute({
            description : "Au bon lait de brebis",
            name :"rebellious",
            foodType : FoodType.PIZZA,
            price : 20,
        });
        expect(result.props.productId).toBeTruthy();
        expect(result.props.name).toEqual("rebellious");
    });

    it("should throw if product already exists", async () => {
        await createProduct.execute({
            description : "Au bon lait de brebis",
            name :"rebellious",
            foodType : FoodType.PIZZA,
            price : 20,
        });
        const result = () =>
            createProduct.execute({
                description : "Au bon lait de brebis",
                name :"rebellious",
                foodType : FoodType.PIZZA,
                price : 20,
            });
        await expect(() => result()).rejects.toThrow(new ProductErrors.AlreadyExists());
    });
});
