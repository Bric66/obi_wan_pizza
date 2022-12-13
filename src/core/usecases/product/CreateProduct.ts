import {UseCase} from "../UseCase";
import {FoodType, Product } from "../../entities/Product";
import {ProductRepository} from "../../repositories/ProductRepository";
import {IdGateway} from "../../gateways/IdGateway";
import {ProductErrors} from "../../errors/ProductErrors";

export type ProductInput = {
    price: number;
    name: string;
    description: string;
    foodType: FoodType;
}

export class CreateProduct implements UseCase<ProductInput, Product> {

    constructor(private readonly productRepository: ProductRepository,
                private readonly idGateway: IdGateway) {
    }

    async execute(input: ProductInput): Promise<Product> {
        const productExists = await this.productRepository.getByName(input.name.toLowerCase().trim());
        if (productExists) {
            throw new ProductErrors.AlreadyExists()
        }

        const id = this.idGateway.generate();
        const product = Product.create({
            productId: id,
            price: input.price,
            name: input.name,
            description: input.description,
            foodType: input.foodType,
        })

        const result = await this.productRepository.create(product);
        return Promise.resolve(result);
    }
}