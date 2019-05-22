import { ValidationResult } from 'tsdv-joi/ValidationResult'
import { ErreurDO } from '~/do/ErreurDO'
import { BusinessException } from '~/exception/BusinessException'

/**
 * Check the validation result and throw BusinessException with field errors if the validation fails.
 * @param result the valid object
 */
export function validateJoiResult<T>(result: ValidationResult<T>): T {
    if (result.error) {
        const errors = result.error.details.map(({message, context, type}) => {
            if (!context || !context.key) {
                return
            }
            const field = context.key
            return new ErreurDO(field, type, message)
        }).filter(e => e !== undefined && e !== null) as ErreurDO[]
        throw new BusinessException(errors)
    }
    return result.value
}
