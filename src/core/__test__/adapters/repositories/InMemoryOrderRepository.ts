import { OrderRepository } from './../../../repositories/OrderRepository';
import { Order } from '../../../entities/Order';
import { OrderErrors } from '../../../errors/OrderErrors';

export class InMemoryOrderRepository implements OrderRepository {
    constructor(
        private readonly db: Map<string, Order>
    ) {}

    async create(input: Order): Promise<Order> {
        this.db.set(input.props.id, input)
        return input
    }

    async getById(id: string): Promise<Order> {
        const order = this.db.get(id)
        if (!order) {
            throw new OrderErrors.NotFound()
        }
        return order
    }

    async updateOrder(input: Order): Promise<Order> {
        this.db.set(input.props.id, input)
        return input
    }

    async delete(input: Order): Promise<void> {
        this.db.delete(input.props.id)
        return 
    }

}