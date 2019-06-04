import { ErreurDO } from '../do'

export class IrisException extends Error {
  public erreurs: ErreurDO[]

  constructor(erreurs: ErreurDO[] | ErreurDO) {
    super()
    this.erreurs = Array.isArray(erreurs) ? erreurs : [erreurs]

    Object.setPrototypeOf(this, IrisException.prototype)
  }
}
