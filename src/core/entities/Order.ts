import {Price} from './../ValueObjects/Price';
import {OrderErrors} from '../errors/OrderErrors';
import {DeliveryDate} from '../ValueObjects/DeliveryDate';

export enum ItemSize {
    SMALL = 'small',
    LARGE = 'large',
    XL = 'xl',
}

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
    size: string;
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
    }) {
        this.props.address = props.address;
        this.props.deliveryDate = new DeliveryDate(props.deliveryDate).value;
    }

    addItem(item: ItemProperties) {
        if (item.size == "large") {
            item.price += 2
        }
        if (item.size == "xl") {
            item.price += 4
        }

        const price = item.price * item.quantity;
        this.props.price = new Price(this.props.price + price).value;


        this.props.items.push(item);
    }

    deleteItem(input: ItemProperties) {
        const price = input.price * input.quantity;
        this.props.price = new Price(this.props.price - price).value;
        this.props.items.splice(this.props.items.findIndex(item => item.productName === input.productName && item.size === input.size), 1)
    }

    getItem(productName: string, size : string) {
        const item = this.props.items.find(item => item.productName === productName && item.size === size)
        if (!item) {
            throw new OrderErrors.ItemNotFound()
        }
        return item
    }
}