import {FoodType, Product, Size} from "../../entities/Product";
import {InMemoryProductRepository} from "../adapters/repositories/InMemoryProductRepository";
import {DeleteProduct} from "../../usecases/product/DeleteProduct";

const dbDeleteProduct = new Map<string, Product>();

describe('When I call DeleteProduct', () => {
    const inMemoryProductRepository = new InMemoryProductRepository(dbDeleteProduct);
    const deleteProduct = new DeleteProduct(inMemoryProductRepository)

    it('should delete product', async () => {
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
        dbDeleteProduct.set("1234", product)
        const result = await deleteProduct.execute({
            productId: "1234",
        });
        await expect(result).toBeFalsy();
    });
})