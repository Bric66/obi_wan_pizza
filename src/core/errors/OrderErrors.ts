import { DomainErrors } from './DomainErrors';
export namespace OrderErrors {
    export class NotFound extends DomainErrors {
        constructor() {
            super("ORDER_NOT_FOUND")
        }
    }

    export class ItemNotFound extends DomainErrors {
        constructor() {
            super("ITEM_NOT_FOUND")
        }
    }
}