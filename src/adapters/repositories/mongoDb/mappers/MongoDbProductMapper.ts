import {Mapper} from "../../../../core/models/Mapper";
import {Product} from "../../../../core/entities/Product";
import {productModel} from "../models/product";

export class MongoDbProductMapper implements Mapper<productModel, Product> {

    fromDomain(data: Product): productModel {
        const {
            productId,
            price,
            name,
            description,
            foodType,
            size,
            created,
            updated
        } = data.props;
        return {
            productId,
            price,
            name,
            description,
            foodType,
            size,
            created: +created,
            updated: +updated,
        }
    }

    toDomain(raw: productModel): Product {
        const {
            productId,
            price,
            name,
            description,
            foodType,
            size,
            created,
            updated
        } = raw;
        return new Product({
            productId,
            price,
            name,
            description,
            foodType,
            size,
            created: new Date(created),
            updated: new Date(updated),
        });
    }
}