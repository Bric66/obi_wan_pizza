import {PriceErrors} from "../errors/PriceErrors";

export class Price {
    value: number;

    constructor(value: number) {
        this.value = this.isValid(value);
    }

    isValid(value: number): number {
        if (typeof value != "number" || value < 0) {
            throw new PriceErrors.Invalid()
        }
        return +value.toFixed(2);
    }
}