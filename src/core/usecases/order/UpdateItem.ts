import { SizeType } from './../../types/SizeType';
import { OrderRepository } from './../../repositories/OrderRepository';
import { Order } from './../../entities/Order';
import { UseCase } from './../Usecase';

export type UpdateItemInput = {
    orderId: string;
    productId: string;
    size: SizeType;
    quantity: number;
}

export class UpdateItem implements UseCase<UpdateItemInput, Order> {
    constructor(
        private readonly orderRepository: OrderRepository
    ) {}

    async execute(input: UpdateItemInput): Promise<Order> {
        const order = await this.orderRepository.getById(input.orderId)
        const item = order.getItemById(input.productId)
        order.updateItem({
            orderId: item.orderId,
            price: item.price,
            productId: item.productId,
            productName: item.productName,
            quantity: input.quantity,
            size: input.size,
            productPrice: item.productPrice
        })
        return order
    }
}