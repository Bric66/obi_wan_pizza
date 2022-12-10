import { Order } from '../entities/Order';
export interface OrderRepository {
    create(input: Order ): Promise<Order>;

}