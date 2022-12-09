import {Product} from "../Entities/Product";

export interface ProductRepository {
    create(input: Product): Promise<Product>;

    getByNameAndSize(name: string,size : string): Promise<Product>;

    getById(productId: string): Promise<Product>;

    update (input: Product) : Promise<Product>;

    delete(productId:string): Promise<void>;
}