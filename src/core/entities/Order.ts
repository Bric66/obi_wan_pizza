import { Size } from "./../ValueObjects/Size";
import { Quantity } from "./../ValueObjects/Quantity";
import { SizeType } from "./../types/SizeType";
import { Price } from "./../ValueObjects/Price";
import { OrderErrors } from "../errors/OrderErrors";
import { DeliveryDate } from "../ValueObjects/DeliveryDate";

export type OrderProperties = {
  id: string;
  userId: string;
  address: string;
  creationDate: Date;
  deliveryDate: Date;
  price: number;
  items: ItemProperties[];
};

export type ItemProperties = {
  orderId: string;
  productId: string;
  productName: string;
  size: SizeType;
  quantity: number;
  price: number;
  productPrice: number
};

export type UpdateItem = {
  size: SizeType;
  quantity: number;
};

export class Order {
  props: OrderProperties;

  constructor(props: OrderProperties) {
    this.props = props;
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
      price: null,
    });
  }

  update(props: { address: string; deliveryDate: Date }) {
    this.props.address = props.address;
    this.props.deliveryDate = new DeliveryDate(props.deliveryDate).value;
  }

  addItem(item: ItemProperties) {
    if (item.size === SizeType.MEDIUM) {
      item.price += 2;
    }
    if (item.size === SizeType.LARGE) {
      item.price += 4;
    }
    const price = item.price * new Quantity(item.quantity).value;
    this.props.price = new Price(this.props.price + price).value;

    this.props.items.push(item);
  }

  deleteItem(productId: string) {
    const item = this.getItemById(productId);
    const price = item.price * item.quantity;
    this.props.price = new Price(this.props.price - price).value;
    this.props.items = this.props.items.filter(
      (elm) => elm.productId !== item.productId
    );
  }

  getItemById(id: string) {
    const item = this.props.items.find((item) => item.productId === id);
    if (!item) {
      throw new OrderErrors.ItemNotFound();
    }
    return item;
  }

  updateItem(item: ItemProperties) {
    item.quantity = new Quantity(item.quantity).value;
    item.size = new Size(item.size).value;

    if (item.size === SizeType.MEDIUM) {
        item.productPrice += 2;
      }
    if (item.size === SizeType.LARGE) {
        item.productPrice += 4;
      }

    const price = item.productPrice * item.quantity;
    this.props.price = new Price( price).value;
  }
}
