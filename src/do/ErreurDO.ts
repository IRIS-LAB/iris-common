/**
 * Functional error DO.
 */
export class ErreurDO {

  /**
   * Fielname in error
   */
  public champErreur: string

  /**
   * Error code
   */
  public codeErreur: string

  /**
   * Error label
   */
  public libelleErreur: string

  /**
   * Constructor
   * @param champErreur (string) error fieldname
   * @param codeErreur (string) error code
   * @param libelleErreur (string) error label
   */
  constructor(champErreur: string, codeErreur: string, libelleErreur: string) {
    this.libelleErreur = libelleErreur
    this.codeErreur = codeErreur
    this.champErreur = champErreur
  }
}
