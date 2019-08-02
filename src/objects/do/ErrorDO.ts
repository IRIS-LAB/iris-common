/**
 * Functional error DO.
 */
export class ErrorDO {

  /**
   * Constructor
   * @param field (string) error fieldname
   * @param code (string) error code
   * @param label (string) error label
   */
  constructor(public readonly field: string, public readonly code: string, public readonly label: string) {
  }
}
