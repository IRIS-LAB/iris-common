import { ErrorExtraFields } from '../../interfaces'

/**
 * Data object for Iris errors.
 */
export class ErrorDO {

  public readonly path?: Array<string|number>
  public readonly value?: string | null
  public readonly limit?: number

  /**
   * Constructor
   * @param field (string) error fieldname
   * @param code (string) error code
   * @param label (string) error label
   * @param extraFields (object) error extra fields (path, value, limit)
   */
  constructor(public readonly field: string, public readonly code: string, public readonly label: string, extraFields?: ErrorExtraFields) {
    if (typeof extraFields === 'object') {
      this.path = extraFields.path
      this.value = extraFields.value
      this.limit = extraFields.limit
    }
  }
}
