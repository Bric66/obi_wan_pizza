import {DomainErrors} from "./DomainErrors";

export namespace ProductErrors {
    export class AlreadyExists extends DomainErrors {
        constructor() {
            super("PRODUCT_ALREADY_EXISTS")
        }
    }
}