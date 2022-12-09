import { DomainErrors } from './DomainErrors';

export namespace DeliveryDateErrors {
    export class Invalid extends DomainErrors {
        constructor() {
            super("INVALID_DELIVERY_DATE")
        }
    }
}