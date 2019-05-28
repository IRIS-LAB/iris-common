import 'reflect-metadata'
import { Joi } from 'tsdv-joi/core'
import { BusinessException } from '~/exception'
import { checkException } from '~/tests'
import { BusinessValidator, Validator } from '~/validators'

describe('Validator', () => {
    describe('validate with base options', () => {
        it('should validate', async () => {
            class DTO {
                @BusinessValidator(Joi.string().max(10).regex(/^([A-Za-z0-9]*)$/).required())
                public name: string

                @BusinessValidator(Joi.number().greater(0))
                public count: number

                @BusinessValidator(Joi.string().required())
                public alias: string

            }

            const dto = new DTO()
            dto.name = 'ceci est un nom trop long'
            dto.count = -1
            const validatorLBS = new Validator({
                messages: {
                    string: {
                        max: 'Field $field must be $limit char max',
                        regex: 'Field $field is not well format'
                    },
                    number: {
                        greater: 'Field $field must be greater than $limit'
                    },
                }
            })
            await checkException(BusinessException, [
                {champErreur: 'name', codeErreur: 'string.max', libelleErreur: 'Field name must be 10 char max'},
                {champErreur: 'name', codeErreur: 'string.regex.base', libelleErreur: 'Field name is not well format'},
                {champErreur: 'count', codeErreur: 'number.greater', libelleErreur: 'Field count must be greater than 0'},
                {champErreur: 'alias', codeErreur: 'any.required', libelleErreur: '"alias" is required'}
            ], validatorLBS.validate.bind(validatorLBS), dto)
        })
    })
    describe('validate with specifics options passed to validate functoin', () => {
        it('should validate', async () => {
            class DTO {
                @BusinessValidator(Joi.string().max(10).regex(/^([A-Za-z0-9]*)$/).required())
                public name: string

                @BusinessValidator(Joi.number().greater(0))
                public count: number

                @BusinessValidator(Joi.string().required())
                public alias: string

            }

            const dto = new DTO()
            dto.name = 'ceci est un nom trop long'
            dto.count = -1
            const validatorLBS = new Validator({
                messages: {
                    string: {
                        max: 'Field $field must be $limit char max',
                        regex: 'Field $field is not well formatted'
                    },
                    number: {
                        greater: 'Field $field must be greater than $limit'
                    }
                }
            })
            await checkException(BusinessException, [
                {champErreur: 'name', codeErreur: 'string.max', libelleErreur: 'Field name must be 10 char max'},
                {champErreur: 'name', codeErreur: 'string.regex.base', libelleErreur: 'Field name is bad formatted'},
                {champErreur: 'count', codeErreur: 'number.greater', libelleErreur: 'Field count must be greater than 0'},
                {champErreur: 'alias', codeErreur: 'any.required', libelleErreur: '"alias" is required'}
            ], validatorLBS.validate.bind(validatorLBS), dto, {messages: {
                string: {
                    regex: 'Field $field is bad formatted'
                }
                }})
        })
    })
})
