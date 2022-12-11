import {ProductRepository} from './../../repositories/ProductRepository';
import {OrderRepository} from './../../repositories/OrderRepository';
import { Order} from './../../Entities/Order';
import {UseCase} from './../Usecase';
import {Quantity} from "../../valueObjects/Quantity";
import {Size} from "../../valueObjects/Size";

export type AddItemInput = {
    orderId: string,
    productId: string,
    ProductName: string,
    size: string,
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
        const product = await this.productRepository.getByName(input.ProductName)

        order.addItem({
            orderId: order.props.id,
            productId: product.props.productId,
            productName: product.props.name,
            size: new Size(input.size).size,
            quantity: new Quantity(input.quantity).value,
            price: product.props.price,
        })

        return order
    }
}