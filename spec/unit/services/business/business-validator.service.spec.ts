import 'reflect-metadata'
import { Joi } from 'tsdv-joi/core'
import { BusinessValidator } from '../../../../src/decorators'
import { BusinessException } from '../../../../src/objects/exception'
import { BusinessValidatorService } from '../../../../src/services/business'
import { TestUtils } from '../../../commons/test.utils'

describe('BusinessValidatorservice', () => {
  describe('validate', () => {
    it('should return errors', async () => {
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
      const validatorLBS = new BusinessValidatorService({
        messages: {
          string: {
            max: 'Field $field must be $limit char max',
            regex: 'Field $field is not well format'
          },
          number: {
            greater: 'Field $field must be greater than $limit'
          }
        }
      })

      let exception = null
      try {
        validatorLBS.validate(dto)
      } catch (e) {
        exception = e
      }
      expect(exception).toBeDefined()
      expect(exception).toBeInstanceOf(BusinessException)

      TestUtils.expectExceptionToContain(exception, {
        field: 'name',
        code: 'string.max',
        label: 'Field name must be 10 char max'
      })
      TestUtils.expectExceptionToContain(exception, {
        field: 'name',
        code: 'string.regex.base',
        label: 'Field name is not well format'
      })
      TestUtils.expectExceptionToContain(exception, {
        field: 'count',
        code: 'number.greater',
        label: 'Field count must be greater than 0'
      })
      TestUtils.expectExceptionToContain(exception, { field: 'alias', code: 'any.required', label: '"alias" is required' })
    })
  })
  describe('validate with specifics options passed to validate function', () => {
    it('should throw error', async () => {
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
      const validatorLBS = new BusinessValidatorService({
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
      let exception = null
      try {
        validatorLBS.validate(dto, {
          messages: {
            string: {
              regex: 'Field $field is bad formatted'
            }
          }
        })
      } catch (e) {
        exception = e
      }
      expect(exception).toBeDefined()
      expect(exception).toBeInstanceOf(BusinessException)
      TestUtils.expectExceptionToContain(exception, {
        field: 'name',
        code: 'string.max',
        label: 'Field name must be 10 char max'
      })
      TestUtils.expectExceptionToContain(exception, {
        field: 'name',
        code: 'string.regex.base',
        label: 'Field name is bad formatted'
      })
      TestUtils.expectExceptionToContain(exception, {
        field: 'count',
        code: 'number.greater',
        label: 'Field count must be greater than 0'
      })
      TestUtils.expectExceptionToContain(exception, { field: 'alias', code: 'any.required', label: '"alias" is required' })
    })
    it('should validate with unknown fields', () => {
      class DTO {
        @BusinessValidator(Joi.string().max(10).regex(/^([A-Za-z0-9]*)$/).required())
        public name: string

        public count: number
      }

      const dto = new DTO()
      dto.name = 'cool'
      dto.count = -1
      expect(new BusinessValidatorService().validate(dto)).toEqual({ name: 'cool', count: -1 })
    })
  })
})
