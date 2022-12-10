import { InMemoryOrderRepository } from "./../adapters/repositories/InMemoryOrderRepository";
import { UpdateOrder } from "./../../usecases/order/UpdateOrder";
import { Order } from "../../entities/Order";

const db = new Map<string, Order>();

describe("Unit - UpdateOrder", () => {
  let updateOrder: UpdateOrder;
  beforeAll(() => {
    const inMemoryOrderRepository = new InMemoryOrderRepository(db);
    updateOrder = new UpdateOrder(inMemoryOrderRepository);
  });
  it("should update order", async () => {
    const order = Order.create({
      id: "12345",
      userId: "9999",
      address: "12, chemin du 12",
      // the deliveryDate must be that of the day and between 12 p.m. and 11 p.m.
      deliveryDate: new Date(),
      price: 12.15,
      items: [
        {
          productId: "145884998",
          Productame: "pizzouletta",
          price: 15,
          quantity: "3",
        },
      ],
    });
    db.set(order.props.id, order);
    const result = await updateOrder.execute({
        orderId: "12345",
        address: "1112 chemin du chemin",
        deliveryDate: new Date(),
        price: 150,
        items: [
            {
              productId: "145884998",
              Productame: "pizzouletta",
              price: 15,
              quantity: "3",
            },
          ],
    })
    expect(result.props.address).toEqual("1112 chemin du chemin")
    expect(result.props.price).toEqual(150)
  });
});
