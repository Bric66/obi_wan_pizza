import { InMemoryOrderRepository } from "./../adapters/repositories/InMemoryOrderRepository";
import { UuidGateway } from "./../adapters/gateways/UuidGateway";
import { CreateOrder } from "./../../usecases/order/CreateOrder";
import { Order } from "../../entities/Order";
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
      userId: "9999",
      address: "12, chemin du 12",
      // the deliveryDate must be that of the day and between 12 p.m. and 11 p.m.
      deliveryDate: new Date(),
    });
    expect(result.props.userId).toEqual("9999")
  });


  it("shoul throw INVALID_DELIVERY_DATE", () => {
    const result = () => createOrder.execute({
        userId: "9999",
        address: "12, chemin du 12",
        deliveryDate: new Date('March 13, 08 23:20'),
      });
      expect(async () => await result()).rejects.toThrow(DeliveryDateErrors.Invalid)
  })
});