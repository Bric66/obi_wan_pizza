import { FoodType, Product } from "./../../Entities/Product";
import { Order } from "./../../Entities/Order";
import { InMemoryProductRepository } from "./../adapters/repositories/InMemoryProductRepository";
import { AddItem } from "./../../usecases/order/AddItem";
import { InMemoryOrderRepository } from "./../adapters/repositories/InMemoryOrderRepository";

const orderDb = new Map<string, Order>();
const productDb = new Map<string, Product>();

describe("Unit - AddItem", () => {
  let addItem: AddItem;
  let order: Order;
  let product: Product;

  beforeAll(() => {
    const inMemoryOrderRepository = new InMemoryOrderRepository(orderDb);
    const inMemoryProductRepository = new InMemoryProductRepository(productDb);
    addItem = new AddItem(inMemoryOrderRepository, inMemoryProductRepository);
    order = Order.create({
        id: "13245",
        userId: "9999",
        address: "12 chemin du 12",
        deliveryDate: new Date()
    });
    product = Product.create({
        productId: "546456",
        price: 15,
        name: "pizzouletta",
        description: "blablabla",
        foodType: FoodType.PIZZA,
    })
    orderDb.set(order.props.id, order);
    productDb.set(product.props.productId, product)
  });

  it("should add item to order", async () => {
    const result = await addItem.execute({
        orderId: "13245",
        productId: "546456",
        ProductName: "pizzouletta",
        quantity: 4
    });
    // console.log(result)
    expect(result.props.price).toEqual(60)
    expect(result.props.items).toHaveLength(1)
  });
});
