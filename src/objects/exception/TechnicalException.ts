import { ErrorDO } from '../do'
import { IrisException } from './IrisException'

/**
 * Exception to throw for a technical reason (i.e connection problem)
 */
export class TechnicalException extends IrisException {
  constructor(errors: ErrorDO[] | ErrorDO, causedException: Error) {
    super(errors)
    Object.setPrototypeOf(this, TechnicalException.prototype)
    if (causedException) {
      this.stack += `\nCaused by : ${causedException.stack}`
    }
  }
}
