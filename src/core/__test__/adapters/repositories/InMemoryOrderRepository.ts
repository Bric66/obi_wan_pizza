import { OrderRepository } from './../../../repositories/OrderRepository';
import { Order } from '../../../entities/Order';

export class InMemoryOrderRepository implements OrderRepository {
    constructor(
        private readonly db: Map<string, Order>
    ) {}

    async create(input: Order): Promise<Order> {
        this.db.set(input.props.id, input)
        return input
    }
}