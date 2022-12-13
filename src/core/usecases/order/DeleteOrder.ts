import { OrderRepository } from './../../repositories/OrderRepository';
import { Order } from '../../entities/Order';
import { UseCase } from '../UseCase';

export class DeleteOrder implements UseCase<string, Order> {
    constructor(
        private readonly orderRepository: OrderRepository
    ) {}

    async execute(orderId: string): Promise<Order> {
        this.orderRepository.delete(orderId)
        return
    }
}