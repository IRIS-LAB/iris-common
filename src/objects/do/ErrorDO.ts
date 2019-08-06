/**
 * Functional error DO.
 */
export class ErrorDO {

  public readonly path?: string
  public readonly value?: string
  public readonly limit?: number

  /**
   * Constructor
   * @param field (string) error fieldname
   * @param code (string) error code
   * @param label (string) error label
   * @param path (string) error field path
   * @param value (any) value in error
   * @param limit (limit) limit of value length or max/min
   */
  constructor(public readonly field: string, public readonly code: string, public readonly label: string, path?: string | { path?: string, value?: string, limit?: number }, value?: string, limit?: number) {
    if (typeof path === 'object' && (typeof path.path !== 'undefined' || typeof path.value !== 'undefined' || typeof path.limit !== 'undefined')) {
      this.path = path.path
      this.value = path.value
      this.limit = path.limit
    } else {
      this.path = path as string
      this.value = value
      this.limit = limit
    }
  }
}
