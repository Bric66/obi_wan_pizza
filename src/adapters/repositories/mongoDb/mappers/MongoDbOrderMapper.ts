import { OrderModelProperties } from './../models/order';

import { Order } from "./../../../../core/entities/Order";
import { Mapper } from "./../../../../core/models/Mapper";

export class MongoDbOrderMapper implements Mapper<OrderModelProperties, Order> {
  toDomain(raw: OrderModelProperties): Order {
    const { id, userId, address, creationDate, deliveryDate, price, items } =
      raw;
    return new Order({
      id,
      userId,
      address,
      creationDate: new Date(creationDate),
      deliveryDate: new Date(deliveryDate),
      price,
      items,
    });
  }
  fromDomain(data: Order): OrderModelProperties {
    const { id, userId, address, creationDate, deliveryDate, price, items } =
      data.props;
    let order: OrderModelProperties = {
      id,
      userId,
      address,
      creationDate: +creationDate,
      deliveryDate: +deliveryDate,
      price,
      items,
    };
    return order;
  }
}
