import { OrderModel } from "./../models/order";
import { MongoDbOrderMapper } from "./../mappers/MongoDbOrderMapper";
import { Order } from "../../../../core/entities/Order";
import { OrderRepository } from "./../../../../core/repositories/OrderRepository";
import { OrderErrors } from "../../../../core/errors/OrderErrors";
const mongoDbOrderMapper = new MongoDbOrderMapper();

export class MongoDbOrderRepository implements OrderRepository {
  async create(order: Order): Promise<Order> {
    const toOrderModel = mongoDbOrderMapper.fromDomain(order);
    const orderModel = new OrderModel(toOrderModel);
    await orderModel.save();
    return order;
  }

  async getById(id: string): Promise<Order> {
    const order = await OrderModel.findOne({ id: id });
    if (!order) {
      throw new OrderErrors.NotFound();
    }

    return mongoDbOrderMapper.toDomain(order);
  }

  async updateOrder(input: Order): Promise<Order> {
    const toOrderModel = mongoDbOrderMapper.fromDomain(input);
    await OrderModel.findOneAndUpdate(
      { id: input.props.id },
      {
        $set: {
          address: input.props.address,
          deliveryDate: input.props.deliveryDate,
        },
      },
      { new: true }
    );
    return input;
  }

  async delete(id: string): Promise<void> {
    await OrderModel.deleteOne({ id : id })
    return;
  }
}
