import { SizeType } from './../types/SizeType';
import {SizeErrors} from "../errors/SIzeErrors";

export class Size {
    value: SizeType;

    constructor(size: SizeType) {
        this.value = this.isValid(size);
    }

    isValid(size: SizeType): SizeType {
        if (typeof size !== "string" || !Object.values(SizeType).includes(size)) {
            throw new SizeErrors.Invalid()
        }
        return size;
    }
}