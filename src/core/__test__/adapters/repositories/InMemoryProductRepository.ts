import {Product} from "../../../entities/Product";
import {ProductRepository} from "../../../repositories/ProductRepository";

export class InMemoryProductRepository implements ProductRepository {

    constructor(private readonly dbProduct: Map<string, Product>) {
    }

    create(product: Product): Promise<Product> {
        this.dbProduct.set(product.props.id, product);
        return Promise.resolve(product)
    }

    getByNameAndSize(name: string, size: string): Promise<Product> {
        const values = Array.from(this.dbProduct.values());
        const product = values.find(v => v.props.name === name && v.props.size === size);
        return Promise.resolve(product);
    }

    getById(productId: string): Promise<Product> {
        const product = this.dbProduct.get(productId);
        return Promise.resolve(product);
    }

    update(product: Product): Promise<Product> {
        this.dbProduct.set(product.props.id, product);
        return Promise.resolve(product);
    }

    delete(productId: string): Promise<void> {
        return
    }
}