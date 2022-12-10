import { OrderRepository } from './../../repositories/OrderRepository';
import { Order } from '../../entities/Order';
import { UseCase } from './../../usecases/Usecase';

export class DeleteOrder implements UseCase<string, Order> {
    constructor(
        private readonly orderRepository: OrderRepository
    ) {}

    async execute(orderId: string): Promise<Order> {
        const order = await this.orderRepository.getById(orderId)
        this.orderRepository.delete(order)
        return
    }
}