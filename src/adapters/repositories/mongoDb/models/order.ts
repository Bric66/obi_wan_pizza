import { SizeType } from "./../../../../core/types/SizeType";
import { ItemProperties } from "./../../../../core/entities/Order";
import { model, Schema } from "mongoose";

export type OrderModelProperties = {
  id: string;
  userId: string;
  address: string;
  creationDate: number;
  deliveryDate: number;
  price: number;
  items: ItemProperties[];
};

const orderSchema = new Schema({
  id: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  creationDate: {
    type: Number,
    required: true,
  },

  deliveryDate: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  items: [
    {
      type: {
        orderId: {
          type: String,
          required: false,
        },

        productId: {
          type: String,
          required: false,
        },

        productName: {
          type: String,
          required: false,
        },

        size: {
          type: String,
          enum: Object.values(SizeType),
          required: false,
          default: null,
        },

        quantity: {
          type: Number,
          required: false,
        },

        price: {
          type: Number,
          required: false,
        },

        productPrice: {
          type: Number,
          required: false,
        },
      },
    },
  ],
});

export const OrderModel = model("Order", orderSchema);
