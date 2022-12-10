import {DomainErrors} from "./DomainErrors";

export namespace ProductErrors {
    export class AlreadyExists extends DomainErrors {
        constructor() {
            super("PRODUCT_ALREADY_EXISTS")
        }
    }

    export class DoesntExist extends DomainErrors {
        constructor() {
            super("PRODUCT_DOESNT_EXIST")
        }
    }

}