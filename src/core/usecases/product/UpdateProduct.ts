import {UseCase} from "../UseCase";
import {Product} from "../../entities/Product";
import {ProductRepository} from "../../repositories/ProductRepository";
import {Price} from "../../ValueObjects/Price";

export type UpdateProductInput = {
    productId : string;
    price: number;
    name: string;
    description: string;
    updated: Date,
}

export class UpdateProduct implements UseCase<UpdateProductInput, Product> {

    constructor(private readonly productRepository: ProductRepository) {
    }

    async execute(input: UpdateProductInput): Promise<Product> {
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