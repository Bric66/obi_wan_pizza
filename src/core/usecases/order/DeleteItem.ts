import { OrderRepository } from './../../repositories/OrderRepository';
import {ItemSize, Order} from './../../Entities/Order';
import { UseCase } from './../Usecase';

export type DeleteItemInput = {
    orderId: string,
    productName: string,
    size : string
}

export class DeleteItem implements UseCase<DeleteItemInput, Order> {
    constructor(
        private readonly orderRepository: OrderRepository
    ) {}

    async execute(input: DeleteItemInput): Promise<Order> {
        const order = await this.orderRepository.getById(input.orderId)
        const item = order.getItem(input.productName, input.size)

        order.deleteItem({
            orderId: input.orderId,
            productName: input.productName,
            quantity: item.quantity,
            size : item.size,
            price: item.price,
            productId: item.productId
        })
        
        return order
    }
}