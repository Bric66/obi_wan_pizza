import {UseCase} from "../Usecase";
import {FoodType, Product, Size} from "../../entities/Product";
import {ProductRepository} from "../../repositories/ProductRepository";
import {IdGateway} from "../../gateways/IdGateway";
import {Price} from "../../valueObjects/Price";
import {ProductErrors} from "../../errors/ProductErrors";

export type ProductInput = {
    price: number;
    name: string;
    description: string;
    foodType: FoodType;
    size: Size;
}

export class CreateProduct implements UseCase<ProductInput, Product> {

    constructor(private readonly productRepository: ProductRepository,
                private readonly idGateway: IdGateway) {
    }

    async execute(input: ProductInput): Promise<Product> {
        const productExists = await this.productRepository.getByNameAndSize(input.name.toLowerCase().trim(), input.size);
        if (productExists) {
            throw new ProductErrors.AlreadyExists()
        }

        const id = this.idGateway.generate();
        const product = Product.create({
            productId: id,
            price: input.price,
            name: input.name,
            size: input.size,
            description: input.description,
            foodType: input.foodType,
        })

        const result = await this.productRepository.create(product);
        return Promise.resolve(result);
    }
}