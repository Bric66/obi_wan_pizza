import {SizeErrors} from "../errors/SIzeErrors";

export class Size {
    size: string;

    constructor(size: string) {
        this.size = this.isValid(size);
    }

    isValid(size: string): string {
        if (typeof size != "string" || size !== "small" && size !== "large" && size !== "xl") {
            throw new SizeErrors.Invalid()
        }
        return size;
    }
}