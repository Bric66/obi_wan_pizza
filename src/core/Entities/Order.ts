import { DeliveryDate } from './../ValueObjects/DeliveryDate';
import { Price } from './../ValueObjects/Price';

export type OrderProperties = {
    id: string;
    userId: string;
    address: string;
    creationDate: Date;
    deliveryDate: DeliveryDate;
    price: Price;
    items: Object[];
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
        price: number;
        items: Object[];
    }) {
        return new Order({
            id: props.id,
            userId: props.userId,
            address: props.address,
            creationDate: new Date(),
            deliveryDate: new DeliveryDate(props.deliveryDate),
            items: props.items,
            price: new Price(props.price)
        })
    }

    update(props: {
        address: string;
        deliveryDate: Date;
        price: Price;
        items: Object[];
    }) 
    {
        this.props.address = props.address;
        this.props.deliveryDate = new DeliveryDate(props.deliveryDate);
        this.props.price = props.price;
        this.props.items = props.items
    }
}