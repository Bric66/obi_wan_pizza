import { IdGateway } from './../../gateways/IdGateway';
import { OrderRepository } from './../../repositories/OrderRepository';
import { Order } from '../../entities/Order';
import { UseCase } from './../Usecase';

export type OrderInput = {
    userId: string;
    address: string;
    deliveryDate: Date;
}
export class CreateOrder implements UseCase<OrderInput, Order> {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly idGateway: IdGateway
    ) {}

    async execute(input: OrderInput): Promise<Order> {
        const id = this.idGateway.generate();
        const order = Order.create({
            id: id,
            userId: input.userId,
            address: input.address,
            deliveryDate: input.deliveryDate,
        })
        return await this.orderRepository.create(order)     
    }
}