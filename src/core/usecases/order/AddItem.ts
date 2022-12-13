import { SizeType } from './../../types/SizeType';
import {ProductRepository} from './../../repositories/ProductRepository';
import {OrderRepository} from './../../repositories/OrderRepository';
import { Order} from './../../Entities/Order';
import {UseCase} from '../UseCase';

export type AddItemInput = {
    orderId: string,
    productId: string,
    size: SizeType,
    quantity: number
}

export class AddItem implements UseCase<AddItemInput, Order> {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly productRepository: ProductRepository
    ) {
    }

    async execute(input: AddItemInput): Promise<Order> {
        const order = await this.orderRepository.getById(input.orderId)
        const product = await this.productRepository.getById(input.productId)

        order.addItem({
            orderId: order.props.id,
            productId: product.props.productId,
            productName: product.props.name,
            size: input.size,
            quantity: input.quantity,
            price: product.props.price,
            productPrice: product.props.price
        })

        return order
    }
}