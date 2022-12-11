import {DomainErrors} from "./DomainErrors";

export namespace SizeErrors {
    export class Invalid extends DomainErrors {
        constructor() {
            super("ONLY_SIZES_small_large_xl")
        }
    }
}