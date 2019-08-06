/**
 * Functional error DO.
 */
export class ErrorDO {

  public readonly path?: string
  public readonly value?: string | null
  public readonly limit?: number

  /**
   * Constructor
   * @param field (string) error fieldname
   * @param code (string) error code
   * @param label (string) error label
   * @param extraFields (object) error extra fields (path, value, limit)
   */
  constructor(public readonly field: string, public readonly code: string, public readonly label: string, extraFields?: { path?: string, value?: string, limit?: number }) {
    if (typeof extraFields === 'object') {
      this.path = extraFields.path
      this.value = extraFields.value
      this.limit = extraFields.limit
    }
  }
}
