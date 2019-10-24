import { ErrorDO } from '../do'
import { IrisException } from './IrisException'

const TYPE = 'iris-common:SecurityException'

/**
 * Exception to throw for security problems.
 */
export class SecurityException extends IrisException {
  public static isA(o: any): boolean {
    return o && o._type && o._type === TYPE
  }

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
