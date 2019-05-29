import { ErreurDO } from '../do'

export class IrisException extends Error {
    constructor(public erreurs: ErreurDO[]) {
        super()

        Object.setPrototypeOf(this, IrisException.prototype)
    }
}
