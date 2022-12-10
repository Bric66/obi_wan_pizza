import { OrderRepository } from './../../repositories/OrderRepository';
import { Order } from '../../entities/Order';
import { UseCase } from './../Usecase';

export type UpdateOrderInput = {
    orderId: string
    address: string;
    deliveryDate: Date;
    price: number;
    items: Object[];
}

export class UpdateOrder implements UseCase<UpdateOrderInput, Order> {
    constructor(
        private readonly orderRepository: OrderRepository
    ) {}

    async execute(input: UpdateOrderInput): Promise<Order> {
        const order = await this.orderRepository.getById(input.orderId)
        
        order.update({
            address: input.address,
            deliveryDate: input.deliveryDate,
            price: input.price,
            items: input.items
        })
        this.orderRepository.updateOrder(order)

        return order
    }
}