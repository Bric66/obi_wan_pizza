import {Product} from "../../../entities/Product";
import {ProductRepository} from "../../../repositories/ProductRepository";
import {ProductErrors} from "../../../errors/ProductErrors";

export class InMemoryProductRepository implements ProductRepository {

    constructor(private readonly dbProduct: Map<string, Product>) {
    }

    create(product: Product): Promise<Product> {
        this.dbProduct.set(product.props.productId, product);
        return Promise.resolve(product)
    }

    getByNameAndSize(name: string, size: string): Promise<Product> {
        const values = Array.from(this.dbProduct.values());
        const product = values.find(v => v.props.name === name && v.props.size === size);
        return Promise.resolve(product);
    }

    getById(productId: string): Promise<Product> {
        const product = this.dbProduct.get(productId);
        if (!product) {
            throw new ProductErrors.DoesntExist()
        }
        return Promise.resolve(product);
    }

    update(product: Product): Promise<Product> {
        this.dbProduct.set(product.props.productId, product);
        return Promise.resolve(product);
    }

    delete(productId: string): Promise<void> {
        return
    }
}