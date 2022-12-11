import { OrderRepository } from './../../repositories/OrderRepository';
import { Order } from './../../Entities/Order';
import { UseCase } from './../Usecase';

export type DeleteItemInput = {
    orderId: string,
    productName: string,
}

export class DeleteItem implements UseCase<DeleteItemInput, Order> {
    constructor(
        private readonly orderRepository: OrderRepository
    ) {}

    async execute(input: DeleteItemInput): Promise<Order> {
        const order = await this.orderRepository.getById(input.orderId)
        const item = order.getItem(input.productName)

        order.deleteItem({
            orderId: input.orderId,
            productName: input.productName,
            quantity: item.quantity,
            price: item.price,
            productId: item.productId
        })
        
        return order
    }
}