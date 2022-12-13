import { Order } from '../entities/Order';
export interface OrderRepository {
    create(input: Order ): Promise<Order>;

    getById(input: string): Promise<Order>;

    updateOrder(input: Order): Promise<Order>;

    delete(input: string): Promise<void>;

}