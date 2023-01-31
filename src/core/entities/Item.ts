export type ItemProperties = {
    productId: string;
    productName: string;
    productPrice: number;
    quantity: number;
}

export class Item {
    props: ItemProperties

    constructor(props: ItemProperties) {
        this.props = props
    }

    static create(props: {
        productId: string;
        productName: string;
        productPrice: number;
        quantity: number;
    }) {
        return new Item({
            productId: props.productId,
            productName: props.productName,
            productPrice: props.productPrice,
            quantity: props.quantity,
        })
    }

    update(props: {
        quantity: number
    }) {
        this.props.quantity = props.quantity
    }


}