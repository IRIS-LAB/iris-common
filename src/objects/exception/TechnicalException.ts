import { ErrorDO } from '../do'
import { IrisException } from './IrisException'

/**
 * Exception to throw for a technical reason (i.e connection problem)
 */
export class TechnicalException extends IrisException {
  constructor(errors: ErrorDO[] | ErrorDO, causedException: Error) {
    super(errors)

    // restore prototype chain
    const actualProto = new.target.prototype

    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto)
    } else {
      // @ts-ignore
      this.__proto__ = actualProto
    }

    if (causedException) {
      this.stack += `\nCaused by : ${causedException.stack}`
    }
  }
}
