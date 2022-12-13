import {UseCase} from "../UseCase";
import {ProductRepository} from "../../repositories/ProductRepository";

export class GetProducts implements UseCase<void, Promise<Object[]>> {
    constructor(private readonly productRepository: ProductRepository) {
    }
    async execute(): Promise<Object[]> {
        return await this.productRepository.getProducts();
    }
}