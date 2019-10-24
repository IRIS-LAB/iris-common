import { ErrorDO } from '../do'

const TYPE = 'iris-common:IrisException'

/**
 * Super class for IRIS.
 */
export class IrisException extends Error {

  public static isA(o: any): boolean {
    return o && o._type && o._type === TYPE
  }

  public errors: ErrorDO[]

  // tslint:disable-next-line:variable-name
  public _type: string

  constructor(erreurs: ErrorDO[] | ErrorDO) {
    super((Array.isArray(erreurs) ? erreurs : [erreurs]).map(e => e.label).join(' et '))
    this.errors = Array.isArray(erreurs) ? erreurs : [erreurs]
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
