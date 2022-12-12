import { DeleteItem } from "./../../usecases/order/DeleteItem";

import { Order } from "./../../Entities/Order";
import { InMemoryOrderRepository } from "./../adapters/repositories/InMemoryOrderRepository";
import { OrderErrors } from "../../errors/OrderErrors";
import { SizeType } from "../../types/SizeType";

const orderDb = new Map<string, Order>();

describe("Unit - AddItem", () => {
  let deleteItem: DeleteItem;
  let order: Order;

  beforeAll(() => {
    const inMemoryOrderRepository = new InMemoryOrderRepository(orderDb);
    deleteItem = new DeleteItem(inMemoryOrderRepository);
    order = new Order({
      id: "13245",
      userId: "9999",
      address: "12 chemin du 12",
      deliveryDate: new Date(),
      creationDate: new Date(),
      items: [
        {
          orderId: "13245",
          productId: "546456",
          productName: "pizzouletta",
          size: SizeType.SMALL,
          price: 30,
          quantity: 2,
          productPrice: 15
        },
        {
          orderId: "13245",
          productId: "979797",
          productName: "pizza du papa",
          size: SizeType.LARGE,
          price: 30,
          quantity: 2,
          productPrice: 15
        },
      ],
      price: 124,
    });

    orderDb.set(order.props.id, order);
  });

  it("should delete item to order", async () => {
    const result = await deleteItem.execute({
      orderId: "13245",
      productId: "546456",
    });
    expect(result.props.price).toEqual(64);
    expect(result.props.items).toHaveLength(1);
  });

  it("should throw if item not found", async () => {
    const result = () =>
      deleteItem.execute({
        orderId: "13245",
        productId: "fake",
      });
    await expect(() => result()).rejects.toThrow(OrderErrors.ItemNotFound);
  });
});
