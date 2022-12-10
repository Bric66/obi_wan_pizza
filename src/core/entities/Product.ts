import {Price} from "../valueObjects/Price";

export enum FoodType {
    PIZZA = "pizza",
    BEVERAGE = "beverage"
}

export enum Size {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large"
}

export type ProductProperties = {
    productId: string;
    price: number;
    name: string;
    description: string;
    foodType: FoodType;
    size: Size;
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
        size: Size;
    }) {
        return new Product({
            productId: props.productId,
            price: new Price(props.price).value,
            name: props.name.toLowerCase().trim(),
            description: props.description.toLowerCase().trim(),
            foodType: props.foodType,
            size: props.size,
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

