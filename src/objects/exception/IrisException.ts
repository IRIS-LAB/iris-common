import { ErrorDO } from '../do'

/**
 * Super class for IRIS.
 */
export class IrisException extends Error {
  public errors: ErrorDO[]

  constructor(erreurs: ErrorDO[] | ErrorDO) {
    super((Array.isArray(erreurs) ? erreurs : [erreurs]).map(e => e.label).join(' et '))
    this.errors = Array.isArray(erreurs) ? erreurs : [erreurs]

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
