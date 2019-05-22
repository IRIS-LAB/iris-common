import { ErreurDO } from '~/do/ErreurDO'
import { IrisException } from '~/exception/IrisException'

export class BusinessException extends IrisException {
    constructor(errors: ErreurDO[]) {
        super(errors)
        Object.setPrototypeOf(this, BusinessException.prototype)
    }
}
