import { Order } from './../Entities/Order';
export interface OrderRepository {
    create(input: Order ): Promise<Order>;

}