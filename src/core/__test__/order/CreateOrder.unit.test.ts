import { InMemoryOrderRepository } from "./../adapters/repositories/InMemoryOrderRepository";
import { UuidGateway } from "./../adapters/gateways/UuidGateway";
import { CreateOrder } from "./../../usecases/order/CreateOrder";
import { Order } from "./../../Entities/Order";
import { PriceErrors } from "../../errors/PriceErrors";
import { DeliveryDateErrors } from "../../errors/DeliveryDateErrors";

const db = new Map<string, Order>();
describe("Unit - CreateOrder", () => {
  let createOrder: CreateOrder;

  beforeAll(() => {
    const inMemoryOrderRepository = new InMemoryOrderRepository(db);
    const id = new UuidGateway();
    createOrder = new CreateOrder(inMemoryOrderRepository, id);
  });
  
  it("shoul create an order", async  () => {
    const result = await createOrder.execute({
      id: "12345",
      userId: "9999",
      address: "12, chemin du 12",
      // the deliveryDate must be that of the day and between 12 p.m. and 11 p.m.
      deliveryDate: new Date(),
      price: 12.15,
      items: [
        {
          productId: "145884998",
          name: "pizzouletta",
          price: 15,
          quantity: "3",
        },
      ],
    });
    expect(result.props.userId).toEqual("9999")
  });

  it("shoul throw INVALID_PRICE", async  () => {
    const result = () => createOrder.execute({
        id: "12345",
        userId: "9999",
        address: "12, chemin du 12",
        deliveryDate: new Date(),
        price: -15,
        items: [
          {
            productId: "145884998",
            name: "pizzouletta",
            price: 15,
            quantity: "3",
          },
        ],
      });
      expect(async () => result()).rejects.toThrow(PriceErrors.Invalid)
  })

  it("shoul throw INVALID_DELIVERY_DATE", () => {
    const result = () => createOrder.execute({
        id: "12345",
        userId: "9999",
        address: "12, chemin du 12",
        deliveryDate: new Date('March 13, 08 23:20'),
        price: 12.15,
        items: [
          {
            productId: "145884998",
            name: "pizzouletta",
            price: 15,
            quantity: "3",
          },
        ],
      });
      expect(async () => result()).rejects.toThrow(DeliveryDateErrors.Invalid)
  })
});
