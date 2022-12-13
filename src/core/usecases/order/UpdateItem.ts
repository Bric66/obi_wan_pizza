import { SizeType } from "./../../types/SizeType";
import { OrderRepository } from "./../../repositories/OrderRepository";
import { Order } from "./../../entities/Order";
import { UseCase } from "../UseCase";

export type UpdateItemInput = {
  orderId: string;
  productId: string;
  size: SizeType;
  quantity: number;
};

export class UpdateItem implements UseCase<UpdateItemInput, Order> {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(input: UpdateItemInput): Promise<Order> {
    const order = await this.orderRepository.getById(input.orderId);

    order.updateItem({
      productId: input.productId,
      quantity: input.quantity,
      size: input.size,
    });

    return await this.orderRepository.updateOrder(order)  
  }
}