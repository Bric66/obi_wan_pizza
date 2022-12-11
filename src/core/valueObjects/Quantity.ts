import {QuantityErrors} from "../errors/QuantityErrors";


export class Quantity {
    value: number;

    constructor(value: number) {
        this.value = this.isValid(value);
    }

    isValid(value: number): number {
        if (typeof value != "number" || value <=0 || !Number.isInteger(value)) {
            throw new QuantityErrors.Invalid()
        }
        return value;
    }
}