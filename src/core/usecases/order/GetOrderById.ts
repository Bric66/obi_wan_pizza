import { OrderRepository } from './../../repositories/OrderRepository';
import { Order } from '../../entities/Order';
import { UseCase } from './../Usecase';

export class GetOrderById implements UseCase<string, Order> {
    constructor(
        private readonly orderRepository: OrderRepository
    ) {}

    async execute(input: string): Promise<Order> {
        return await this.orderRepository.getById(input)
    }
}