import { DeliveryDateErrors } from "../errors/DeliveryDateErrors";

export class DeliveryDate {
    value: Date;

    constructor(value: Date) {
        this.value = value
        if (!this.isValid()) {
            throw new DeliveryDateErrors.Invalid()
        }
    }

    isValid(): boolean {
        const today = new Date()
        const date = this.value
        if (today.toDateString() != date.toDateString() || date.getHours() < 12 || date.getHours() > 23 ) {
            return false
        }
        return true
    }
}
