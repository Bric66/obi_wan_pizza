import {Price} from "../ValueObjects/Price";

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
    id: string;
    price: Price;
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
        id: string;
        price: number;
        name: string;
        description: string;
        foodType: FoodType;
        size: Size;
    }) {
        return new Product({
            id: props.id,
            price: new Price(props.price),
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
        this.props.price = new Price(props.price);
        this.props.name = props.name.toLowerCase().trim();
        this.props.description = props.description.toLowerCase().trim();
        this.props.updated = new Date();
    }
}

