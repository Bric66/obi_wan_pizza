import { OrderRepository } from './../../repositories/OrderRepository';
import { Order} from './../../Entities/Order';
import { UseCase } from './../Usecase';

export type DeleteItemInput = {
    orderId: string,
    productId: string
}

export class DeleteItem implements UseCase<DeleteItemInput, Order> {
    constructor(
        private readonly orderRepository: OrderRepository
    ) {}

    async execute(input: DeleteItemInput): Promise<Order> {
        const order = await this.orderRepository.getById(input.orderId)

        order.deleteItem(input.productId)
        
        return order
    }
}