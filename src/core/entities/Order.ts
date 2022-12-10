import { DeliveryDate } from '../ValueObjects/DeliveryDate';
import { Price } from '../ValueObjects/Price';

export type OrderProperties = {
    id: string;
    userId: string;
    address: string;
    creationDate: Date;
    deliveryDate: Date;
    price: number;
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
            deliveryDate: new DeliveryDate(props.deliveryDate).value,
            items: props.items,
            price: new Price(props.price).value
        })
    }

    update(props: {
        address: string;
        deliveryDate: Date;
        price: number;
        items: Object[];
    }) 
    {
        this.props.address = props.address;
        this.props.deliveryDate = new DeliveryDate(props.deliveryDate).value;
        this.props.price = new Price(props.price).value;
        this.props.items = props.items
    }
}