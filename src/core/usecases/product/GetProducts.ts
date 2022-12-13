import {UseCase} from "../UseCase";
import {ProductRepository} from "../../repositories/ProductRepository";
import {Product} from "../../entities/Product";

export class GetProducts implements UseCase<void, Product[]> {
    constructor(private readonly productRepository: ProductRepository) {
    }

    async execute(): Promise<Product[]> {
        return await this.productRepository.getAll();
    }
}