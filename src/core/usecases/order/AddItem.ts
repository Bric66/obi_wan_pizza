import { ProductRepository } from './../../repositories/ProductRepository';
import { OrderRepository } from './../../repositories/OrderRepository';
import { Order } from './../../Entities/Order';
import { UseCase } from './../Usecase';

export type AddItemInput = {
    orderId: string,
    productId: string,
    ProductName: string,
    quantity: number
}

export class AddItem implements UseCase<AddItemInput, Order> {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly productRepository: ProductRepository
    ) {}

    async execute(input: AddItemInput): Promise<Order> {
        const order = await this.orderRepository.getById(input.orderId)
        const product = await this.productRepository.getByName(input.ProductName)

        order.addItem({
            orderId: order.props.id,
            productId: product.props.productId,
            productName: product.props.name,
            quantity: input.quantity,
            price: product.props.price,
        })
        
        return order
    }
}