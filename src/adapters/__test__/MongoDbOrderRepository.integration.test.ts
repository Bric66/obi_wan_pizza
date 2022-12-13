import { SizeType } from "./../../core/types/SizeType";
import { v4 } from "uuid";
import mongoose from "mongoose";
import { Order } from "./../../core/entities/Order";
import { MongoDbOrderRepository } from "./../repositories/mongoDb/repositories/MongoDbOrderRepository";
import { OrderModel } from "../repositories/mongoDb/models/order";
import { OrderErrors } from "../../core/errors/OrderErrors";


describe("Integration - MongoDbOrderRespository", () => {
  let mongoDbOrderRepository: MongoDbOrderRepository;
  let order: Order;
  let result: Order;

  beforeAll(async () => {
    const databaseId = v4();
    mongoose.connect(`mongodb://127.0.0.1:27017/${databaseId}`, (err) => {
      if (err) {
        throw err;
      }
      console.info("Connected to mongodb");
    });
    mongoDbOrderRepository = new MongoDbOrderRepository();
    order = new Order({
      id: "12345",
      userId: "9999",
      address: "999 chemin du 888",
      creationDate: new Date(),
      deliveryDate: new Date(),
      price: 30,
      items: [
        {
          orderId: "12345",
          productId: "546456",
          productName: "pizzouletta",
          size: SizeType.SMALL,
          quantity: 2,
          price: 30,
          productPrice: 15,
        },
      ],
    });
  });

  beforeEach(async () => {
    result = await mongoDbOrderRepository.create(order);
  });

  afterEach(async () => {
    await OrderModel.collection.drop();
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it("should get an order", async () => {
    const result = await mongoDbOrderRepository.getById("12345");
    
    expect(result.props.address).toEqual("999 chemin du 888");
  });

  it("should update an order", async () => {
    const result = await mongoDbOrderRepository.updateOrder(
      new Order({
        id: "12345",
        userId: "9999",
        address: "new addres",
        creationDate: new Date(),
        deliveryDate: new Date(),
        price: 30,
        items: [
          {
            orderId: "12345",
            productId: "546456",
            productName: "pizzouletta",
            size: SizeType.SMALL,
            quantity: 2,
            price: 30,
            productPrice: 15,
          },
        ],
      })
    );

    expect(result.props.address).toEqual("new addres");
  });

  it("should delete an order", async () => {
    await mongoDbOrderRepository.delete("12345")

    const result = mongoDbOrderRepository.getById("12345")

    await expect(result).rejects.toThrow(OrderErrors.NotFound)
  })
});
