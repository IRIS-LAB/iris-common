import { ErrorDO } from '../do'
import { IrisException } from './IrisException'

const TYPE = 'iris-common:BusinessException'

/**
 * Exception to throw for business error.
 */
export class BusinessException extends IrisException {

  public static isA(o: any): boolean {
    return o && o._type && o._type === TYPE
  }

  public errors: ErrorDO[]

  constructor(errors: ErrorDO[] | ErrorDO) {
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
  }
}
