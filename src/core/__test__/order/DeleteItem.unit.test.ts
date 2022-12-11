import { DeleteItem } from "./../../usecases/order/DeleteItem";
import { Order } from "./../../Entities/Order";
import { InMemoryOrderRepository } from "./../adapters/repositories/InMemoryOrderRepository";

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
      items: [{
        orderId: "13245",
        productId: "546456",
        productName: "pizzouletta",
        price: 30,
        quantity: 2
    },
    {
        orderId: "13245",
        productId: "979797",
        productName: "pizza du papa",
        price: 30,
        quantity: 2
    }],
    price: 120
    });

    orderDb.set(order.props.id, order);
  });

  it("should add item to order", async () => {
    const result = await deleteItem.execute({
      orderId: "13245",
      productName: "pizzouletta",
    });
    expect(result.props.price).toEqual(60);
    expect(result.props.items).toHaveLength(1);
  });
});