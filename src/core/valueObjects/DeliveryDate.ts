import { DeliveryDateErrors } from "../errors/DeliveryDateErrors";

export class DeliveryDate {
    value: Date;

    constructor(value: Date) {
        this.value = this.isValid(value)
    }

    isValid(value: Date): Date {
        const today = new Date()
        const date = value
        if (today.toDateString() != date.toDateString() || date.getHours() < 10 || date.getHours() > 23 ) {
            throw new DeliveryDateErrors.Invalid()
        }
        return value
    }
}