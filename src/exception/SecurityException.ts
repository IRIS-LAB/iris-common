import { ErreurDO } from '~/do/ErreurDO'
import { IrisException } from '~/exception/IrisException'

export class SecurityException extends IrisException {
    constructor(errors: ErreurDO[]) {
        super(errors)
        Object.setPrototypeOf(this, SecurityException.prototype)
    }
}
