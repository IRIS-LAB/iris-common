import { ErrorDO } from '../do'
import { IrisException } from './IrisException'

const TYPE = 'iris-common:TechnicalException'

/**
 * Exception to throw for a technical reason (i.e connection problem)
 */
export class TechnicalException extends IrisException {
  public static isA(o: any): boolean {
    return o && o._type && o._type === TYPE
  }

  constructor(errors: ErrorDO[] | ErrorDO, causedException: Error) {
    super(errors)
    this._type = TYPE

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
