import { DeleteOrder } from "./../../usecases/order/DeleteOrder";
import { Order } from "../../entities/Order";
import { InMemoryOrderRepository } from "./../adapters/repositories/InMemoryOrderRepository";

const db = new Map<string, Order>();

describe("Unit - DeleteOrder", () => {
  let deleteOrder: DeleteOrder;

  beforeAll(() => {
    const inMemoryOrderRepository = new InMemoryOrderRepository(db);
    deleteOrder = new DeleteOrder(inMemoryOrderRepository);
    const order = Order.create({
      id: "12345",
      userId: "9999",
      address: "12, chemin du 12",
      // the deliveryDate must be that of the day and between 12 p.m. and 11 p.m.
      deliveryDate: new Date(),
    });
    db.set(order.props.id, order);
  });
  it("should delete order", () => {
    deleteOrder.execute("12345");
    expect(db.get("12345")).toBeUndefined;
  });
});
