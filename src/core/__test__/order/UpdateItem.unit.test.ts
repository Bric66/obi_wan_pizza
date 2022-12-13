import { UpdateItem } from "./../../usecases/order/UpdateItem";
import { SizeType } from "./../../types/SizeType";
import { AddItem } from "./../../usecases/order/AddItem";
import { InMemoryProductRepository } from "./../adapters/repositories/InMemoryProductRepository";
import { InMemoryOrderRepository } from "./../adapters/repositories/InMemoryOrderRepository";
import { Product, FoodType } from "./../../entities/Product";
import { Order } from "./../../entities/Order";

const orderDb = new Map<string, Order>();
const productDb = new Map<string, Product>();
describe("Unit - UpdateItem", () => {
  let order: Order;
  let product: Product;
  let addItem: AddItem;
  let updateItem: UpdateItem;

  beforeEach(() => {
    order = Order.create({
      id: "13245",
      userId: "9999",
      address: "12 chemin du 12",
      deliveryDate: new Date(),
    });

    product = Product.create({
      productId: "546456",
      price: 15,
      name: "pizzouletta",
      description: "blablabla",
      foodType: FoodType.PIZZA,
    });

    orderDb.set(order.props.id, order);
    productDb.set(product.props.productId, product);

    const inMemoryOrderRepository = new InMemoryOrderRepository(orderDb);
    const inMemoryProductRepository = new InMemoryProductRepository(productDb);
    addItem = new AddItem(inMemoryOrderRepository, inMemoryProductRepository);
    updateItem = new UpdateItem(inMemoryOrderRepository);
  });

  it("should update item", async () => {
    await addItem.execute({
      orderId: "13245",
      productId: "546456",
      size: SizeType.MEDIUM,
      quantity: 8,
    });

    const result = await updateItem.execute({
      orderId: "13245",
      productId: "546456",
      size: SizeType.SMALL,
      quantity: 8,
    });

    expect(result.props.price).toEqual(120);
    expect(result.props.items).toHaveLength(1);
  });
});
