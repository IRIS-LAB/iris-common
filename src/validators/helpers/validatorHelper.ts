import { ValidationResult } from 'tsdv-joi/ValidationResult'
import { ErreurDO } from '../../do'
import { BusinessException } from '../../exception'
import { IMessages } from '../IMessages'

/**
 * Check the validation result and throw BusinessException with champErreur erreurs if the validation fails.
 * @param result the valid object
 * @param messages messages object
 */
export function validateJoiResult<T>(result: ValidationResult<T>, messages?: IMessages | null): T {
  if (result.error) {
    const errors = result.error.details.map(({ message, context, type }) => {
      if (!context || !context.key) {
        return
      }
      const field = context.key
      return new ErreurDO(field, type, getMessage(field, type, context, message, messages))
    }).filter(e => e !== undefined && e !== null) as ErreurDO[]
    throw new BusinessException(errors)
  }
  return result.value
}

function getMessage(field: string, type: string, context: any, message: string, messages?: IMessages | null): string {
  if (messages) {
    let found = false
    const splittedType = type.split('.')
    let data: any = messages
    for (const part of splittedType) {
      if (data.hasOwnProperty(part)) {
        data = data[part]
        if (typeof data === 'string') {
          found = true
          break
        }
      } else {
        break
      }
    }
    if (found && data) {
      let result = data.toString()
      for (const key in context) {
        result = result.replace('$field', context.key)
        if (context.hasOwnProperty(key)) {
          result = result.replace('$' + key, context[key])
        }
      }
      return result
    }
  }
  return message
}
