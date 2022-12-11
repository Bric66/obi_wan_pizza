import {DomainErrors} from "./DomainErrors";

export namespace QuantityErrors {
    export class Invalid extends DomainErrors {
        constructor() {
            super("INVALID_QUANTITY")
        }
    }
}