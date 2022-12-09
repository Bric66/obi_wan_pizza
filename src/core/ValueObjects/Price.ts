import { PriceErrors } from "../errors/PriceErrors";
export class Price {
    value: number;
    constructor(value: number) {
        this.value = value;
        if(!this.isValid()) {
            throw new PriceErrors.Invalid()
        }
    }
    isValid(): boolean {
        const value = this.value;
        const regex = new RegExp(/^[0-9]*(\.[0-9]{0,2})?$/);
        if (!regex.test(value.toString()) || typeof value != "number") {
            return false
        }
        return true;
    }
}