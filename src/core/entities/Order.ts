import { Price } from './../ValueObjects/Price';
import { OrderErrors } from '../errors/OrderErrors';
import { DeliveryDate } from '../ValueObjects/DeliveryDate';


export type OrderProperties = {
    id: string;
    userId: string;
    address: string;
    creationDate: Date;
    deliveryDate: Date;
    price: number;
    items: ItemProperties[];
}

export type ItemProperties = {
    orderId: string;
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

export class Order {
    props: OrderProperties

    constructor(props: OrderProperties) {
        this.props = props
    }

    static create(props: {
        id: string;
        userId: string;
        address: string;
        deliveryDate: Date;
    }) {
        return new Order({
            id: props.id,
            userId: props.userId,
            address: props.address,
            creationDate: new Date(),
            deliveryDate: new DeliveryDate(props.deliveryDate).value,
            items: [],
            price: null
        })
    }

    update(props: {
        address: string;
        deliveryDate: Date;
    }) 
    {
        this.props.address = props.address;
        this.props.deliveryDate = new DeliveryDate(props.deliveryDate).value;
    }

    addItem(item: ItemProperties) {
        const price = item.price * item.quantity
        this.props.price = new Price(this.props.price + price).value
        this.props.items.push(item)
    }

    deleteItem(input: ItemProperties) {
        const price = input.price * input.quantity;
        this.props.price = new Price(this.props.price - price).value;
        this.props.items.splice(this.props.items.findIndex(item => item.productName === input.productName) , 1)
    }

    getItem(productName: string) {
       const item =  this.props.items.find(item => item.productName === productName)
       if (!item) {
        throw new OrderErrors.ItemNotFound()
       }
       return item
    }
}