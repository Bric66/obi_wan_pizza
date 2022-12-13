import {Product} from "../entities/Product";

export interface ProductRepository {
    create(input: Product): Promise<Product>;

    getByName(name: string): Promise<Product>;

    getById(productId: string): Promise<Product>;

    update (input: Product) : Promise<Product>;

    delete(productId:string): Promise<void>;

    getAll(): Promise<Product[]>;
}