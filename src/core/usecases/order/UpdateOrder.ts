import { OrderRepository } from './../../repositories/OrderRepository';
import { Order } from '../../entities/Order';
import { UseCase } from '../UseCase';

export type UpdateOrderInput = {
    orderId: string
    address: string;
    deliveryDate: Date;
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
        })
        this.orderRepository.updateOrder(order)

        return order
    }
}