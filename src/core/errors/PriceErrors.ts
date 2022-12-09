import { DomainErrors } from './DomainErrors';
export namespace PriceErrors {
    export class Invalid extends DomainErrors {
        constructor() {
            super("INVALID_PRICE")
        }
    }
}