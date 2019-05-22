import { ErreurDO } from '~/do'

export class IrisException extends Error {
    constructor(public errors: ErreurDO[]) {
        super()
        Object.setPrototypeOf(this, IrisException.prototype)
    }
}
