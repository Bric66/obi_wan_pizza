import {FoodType, Product, Size} from "../../entities/Product";
import {InMemoryProductRepository} from "../adapters/repositories/InMemoryProductRepository";
import {UuidGateway} from "../adapters/gateways/UuidGateway";
import {CreateProduct} from "../../usecases/product/CreateProduct";
import {UpdateProduct} from "../../usecases/product/UpdateProduct";
import {Price} from "../../ValueObjects/Price";

const dbUpdateProduct = new Map<string, Product>();

describe('When I call UpdateProduct====>', () => {
    let createProduct: CreateProduct;
    let updateProduct: UpdateProduct;
    let uuidGateway = new UuidGateway()
    beforeAll(() => {
        const inMemoryProductRepository = new InMemoryProductRepository(dbUpdateProduct);
        uuidGateway = new UuidGateway();
        updateProduct = new UpdateProduct(inMemoryProductRepository)
        createProduct = new CreateProduct(
            inMemoryProductRepository, uuidGateway
        )
    });

    it('should update product', async () => {
        const product = new Product({
            productId: "1234",
            description: "Description",
            name: "name",
            price: 20,
            updated: null,
            size: Size.LARGE,
            foodType: FoodType.PIZZA,
            created: new Date()
        })

        dbUpdateProduct.set("1234", product)

        const result = await updateProduct.execute({
            name: "rebellious 2 le retour",
            price: 25,
            description: "au bon lait de vache",
            updated: new Date,
            productId: "1234"
        })
        await expect(result.props.price).toEqual(25);
        await expect(result.props.description).toEqual("au bon lait de vache");
    })
})