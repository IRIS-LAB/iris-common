import { ErreurDO } from '~/do/ErreurDO'
import { IrisException } from '~/exception/IrisException'

export class TechnicalException extends IrisException {
    constructor(errors: ErreurDO[], causedException: Error) {
        super(errors)
        Object.setPrototypeOf(this, TechnicalException.prototype)
        if (causedException) {
            this.stack += `\nCaused by : ${causedException.stack}`
        }
    }
}
