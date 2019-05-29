import { ErreurDO } from '../do'
import { BusinessException } from './BusinessException'

export class EntityNotFoundBusinessException extends BusinessException {

    constructor(error: ErreurDO) {
        super([error])
        Object.setPrototypeOf(this, EntityNotFoundBusinessException.prototype)
    }
}
