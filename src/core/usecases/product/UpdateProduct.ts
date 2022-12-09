import {UseCase} from "../Usecase";
import {Product} from "../../Entities/Product";
import {ProductRepository} from "../../repositories/ProductRepository";
import {Price} from "../../ValueObjects/Price";

export type ProductUpdatedInput = {
    productId : string;
    price: Price;
    name: string;
    description: string;
    updated: Date,
}

export class UpdateProduct implements UseCase<ProductUpdatedInput, Product> {

    constructor(private readonly productRepository: ProductRepository) {
    }

    async execute(input: ProductUpdatedInput): Promise<Product> {
        const product = await this.productRepository.getById(input.productId)

        product.update({
            price : input.price,
            name : input.name,
            description : input.description
        })

        await this.productRepository.update(product);

        return Promise.resolve(product);
    }
}