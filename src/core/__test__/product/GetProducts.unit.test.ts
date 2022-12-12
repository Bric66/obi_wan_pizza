import {FoodType, Product} from "../../entities/Product";
import {GetProducts} from "../../usecases/product/GetProducts";
import {InMemoryProductRepository} from "../adapters/repositories/InMemoryProductRepository";

const db = new Map<string, Product>();

describe("unit - GetProducts", () => {

    let getProducts: GetProducts;
    let product1: Product;
    let product2: Product;

    beforeAll(() => {
        product1 = new Product({
            productId: "1234",
            description: "Description",
            name: "name",
            price: 20,
            updated: null,
            size: [],
            foodType: FoodType.PIZZA,
            created: new Date()
        })

        product2 = new Product({
            productId: "5678",
            description: "Description2",
            name: "name2",
            price: 40,
            updated: null,
            size: [],
            foodType: FoodType.PIZZA,
            created: new Date()
        })

        const inMemoryProductRepository = new InMemoryProductRepository(db);
        getProducts = new GetProducts(inMemoryProductRepository);
        db.set(product1.props.productId, product1);
        db.set(product2.props.productId, product2);
    })

    it('should get all products', async () => {
        const result = await getProducts.execute()
        expect(result).toHaveLength(2)
    })

})