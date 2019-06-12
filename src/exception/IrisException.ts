import { ErreurDO } from '../do'

export class IrisException extends Error {
  public erreurs: ErreurDO[]

  constructor(erreurs: ErreurDO[] | ErreurDO) {
    super((Array.isArray(erreurs) ? erreurs : [erreurs]).map(e => e.libelleErreur).join(' et '))
    this.erreurs = Array.isArray(erreurs) ? erreurs : [erreurs]

    Object.setPrototypeOf(this, IrisException.prototype)
  }
}
