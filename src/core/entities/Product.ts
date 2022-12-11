import {Price} from "../ValueObjects/Price";

export enum FoodType {
    PIZZA = "pizza",
    BEVERAGE = "beverage"
}

export type ProductProperties = {
    productId: string;
    price: number;
    name: string;
    description: string;
    foodType: FoodType;
    size: string[];
    created: Date;
    updated: Date;
}

export class Product {
    props: ProductProperties;

    constructor(props: ProductProperties) {
        this.props = props;
    }

    static create(props: {
        productId: string;
        price: number;
        name: string;
        description: string;
        foodType: FoodType;
    }) {
        return new Product({
            productId: props.productId,
            price: new Price(props.price).value,
            name: props.name.toLowerCase().trim(),
            description: props.description.toLowerCase().trim(),
            foodType: props.foodType,
            size: ["small", "medium", "large"],
            created: new Date(),
            updated: null,
        })
    }

    update(props: {
        price: number;
        name: string;
        description: string;
    }) {
        this.props.price = new Price(props.price).value;
        this.props.name = props.name.toLowerCase().trim();
        this.props.description = props.description.toLowerCase().trim();
        this.props.updated = new Date();
    }
}

