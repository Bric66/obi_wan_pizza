import {MongoDbProductMapper} from "../mappers/MongoDbProductMapper";
import {ProductRepository} from "../../../../core/repositories/ProductRepository";
import {Product} from "../../../../core/entities/Product";
import {ProductModel} from "../models/product";
import {ProductErrors} from "../../../../core/errors/ProductErrors";

const mongoDbProductMapper = new MongoDbProductMapper();

export class MongoDbProductRepository implements ProductRepository {

    async create(product: Product): Promise<Product> {
        const toProductModel = mongoDbProductMapper.fromDomain(product)
        const productModel = new ProductModel(toProductModel);
        await productModel.save();
        return product;
    }

    async delete(productId: string): Promise<void> {
        await ProductModel.deleteOne({productId: productId})
        return;
    }

    async getById(productId: string): Promise<Product> {
        const product = await ProductModel.findOne({productId: productId});
        if (!product) {
            throw new ProductErrors.DoesntExist();
        }
        return mongoDbProductMapper.toDomain(product);
    }

    async getByName(name: string): Promise<Product> {
        const product = await ProductModel.findOne({name: name});
        return mongoDbProductMapper.toDomain(product);
    }

    async getAll(): Promise<Product[]> {
        const products = await ProductModel.find();
        return products.map(elem => mongoDbProductMapper.toDomain(elem));
    }

    update(product: Product): Promise<Product> {
        const toProductModel = mongoDbProductMapper.fromDomain(product)
        ProductModel.findOneAndUpdate(
            {id: toProductModel.productId},
            {
                $set: {
                    price: toProductModel.price,
                    name: toProductModel.name,
                    description: toProductModel.description,
                },
            },
            {new: true}
        );
        return Promise.resolve(product);
    }


}