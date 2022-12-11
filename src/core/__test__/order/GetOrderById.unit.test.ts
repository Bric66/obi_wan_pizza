import { InMemoryOrderRepository } from './../adapters/repositories/InMemoryOrderRepository';
import { GetOrderById } from './../../usecases/order/GetOrderById';
import { Order } from '../../entities/Order';
import { OrderErrors } from '../../errors/OrderErrors';

const db = new Map<string, Order>()
describe("Unit - GetOrderById", () => {
    let getOrderById: GetOrderById

    beforeAll(() => {
        const inMemoryOrderRepository = new InMemoryOrderRepository(db);
        getOrderById = new GetOrderById(inMemoryOrderRepository);
      });

    it("should get an order by id", async () => {
        const order = Order.create({
            id: "12345",
            userId: "9999",
            address: "12, chemin du 12",
            // the deliveryDate must be that of the day and between 12 p.m. and 11 p.m.
            deliveryDate: new Date(),
        })
        db.set(order.props.id, order)
        const result = await getOrderById.execute("12345")
        expect(result.props.userId).toEqual("9999")
    })

    it("shoul throw INVALID_PRICE", async  () => {
        const result = () => getOrderById.execute("false")
          expect(async () => result()).rejects.toThrow(OrderErrors.NotFound)
      })
})