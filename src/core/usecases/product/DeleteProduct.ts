import {UseCase} from "../UseCase";
import {ProductRepository} from "../../repositories/ProductRepository";

export type ProductDeletedInput = {
    productId: string
}

export class DeleteProduct implements UseCase<ProductDeletedInput, void> {

    constructor(private readonly productRepository: ProductRepository) {
    }

    async execute(input: ProductDeletedInput): Promise<void> {
        await this.productRepository.delete(input.productId);
        return;
    }
}