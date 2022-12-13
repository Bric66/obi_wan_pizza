import {model, Schema} from "mongoose";
import {SizeType} from "../../../../core/types/SizeType";
import {FoodType} from "../../../../core/entities/Product";

export type productModel = {
    productId: string;
    price: number;
    name: string;
    description: string;
    foodType: FoodType;
    size: SizeType[];
    created: number;
    updated?: number;
};

const productSchema = new Schema({
    productId: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    foodType: {
        type: String,
        enum: Object.values(FoodType),
        default: null,
        required: true,
    },
    size: [
        {
            type: String,
            enum: Object.values(SizeType),
            default: null,
            required: true,
        },
    ],
    created: {
        type: Number,
        required: true,
    },
    updated: {
        type: Number,
        required: false,
    },
});

export const ProductModel = model("Product", productSchema);