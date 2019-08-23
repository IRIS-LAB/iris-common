import 'reflect-metadata'
import { Nested, NestedArray } from 'tsdv-joi'
import { Joi } from 'tsdv-joi/core'
import { BusinessValidator } from '../../../../src/decorators'
import { BusinessException } from '../../../../src/objects/exception'
import { BusinessValidatorService } from '../../../../src/services/business'
import { TestUtils } from '../../../commons/test.utils'

class Child {
  @BusinessValidator(Joi.string().max(10).regex(/^([A-Za-z0-9]*)$/).required())
  public name: string
}

class DTO {
  @BusinessValidator(Joi.string().max(10).regex(/^([A-Za-z0-9]*)$/).required())
  public name: string

  @BusinessValidator(Joi.number().greater(0))
  public count: number

  @BusinessValidator(Joi.string().required())
  public alias: string

  @Nested(Child)
  public child: Child

  @BusinessValidator(Joi.array().max(5))
  @NestedArray(Child)
  public children: Child[]

  public unknownField: string

}

describe('BusinessValidatorservice', () => {
  describe('validate', () => {
    it('should validate', () => {
      const dto = new DTO()
      dto.name = 'cool'
      dto.alias = 'alias'
      expect(new BusinessValidatorService().validate(dto)).toBeDefined()
    })

    it('should return max length error', () => {
      const dto = new DTO()
      dto.name = 'this is very too long'
      dto.alias = 'alias'
      TestUtils.expectThrowIrisExceptionLike(() => new BusinessValidatorService().validate(dto), BusinessException, {
        field: 'name',
        code: 'string.max',
        limit: 10,
        path: ['name'],
        value: 'this is very too long'
      })
    })

    it('should return max length error for child', () => {
      const dto = new DTO()
      dto.name = 'ok'
      dto.alias = 'alias'
      dto.child = new Child()
      dto.child.name = 'this is very too long'

      TestUtils.expectThrowIrisExceptionLike(() => new BusinessValidatorService().validate(dto), BusinessException, {
        field: 'name',
        code: 'string.max',
        limit: 10,
        path: ['child', 'name'],
        value: 'this is very too long'
      })
    })

    it('should return max length error for children 0', () => {
      const dto = new DTO()
      dto.name = 'ok'
      dto.alias = 'alias'
      dto.children = [new Child()]
      dto.children[0].name = 'this is very too long'

      TestUtils.expectThrowIrisExceptionLike(() => new BusinessValidatorService().validate(dto), BusinessException, {
        field: 'name',
        code: 'string.max',
        limit: 10,
        path: ['children', 0, 'name'],
        value: 'this is very too long'
      })
    })
    it('should return max length error for children 1', () => {
      const dto = new DTO()
      dto.name = 'ok'
      dto.alias = 'alias'
      dto.children = [new Child(), new Child()]
      dto.children[0].name = 'cool'

      dto.children = [new Child(), new Child()]
      dto.children[1].name = 'this is very too long'

      TestUtils.expectThrowIrisExceptionLike(() => new BusinessValidatorService().validate(dto), BusinessException, {
        field: 'name',
        code: 'string.max',
        limit: 10,
        path: ['children', 1, 'name'],
        value: 'this is very too long'
      })
    })

    it('should return errors with specific messages', async () => {
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
        label: 'Field name must be 10 char max',
        limit: 10,
        path: ['name'],
        value: 'ceci est un nom trop long'
      })
      TestUtils.expectExceptionToContain(exception, {
        field: 'name',
        code: 'string.regex.base',
        label: 'Field name is not well format',
        path: ['name'],
        value: 'ceci est un nom trop long'
      })
      TestUtils.expectExceptionToContain(exception, {
        field: 'count',
        code: 'number.greater',
        label: 'Field count must be greater than 0',
        limit: 0,
        path: ['count'],
        value: -1
      })
      TestUtils.expectExceptionToContain(exception, { field: 'alias', code: 'any.required', label: '"alias" is required' })
    })
  })

  describe('validate with specifics options passed to validate function', () => {
    it('should throw error', async () => {
      const dto = new DTO()
      dto.name = 'ceci est un nom trop long'
      dto.count = -1
      dto.child = {
        name: 'ceci est un nom trop long'
      }
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
      const dto = new DTO()
      dto.name = 'cool'
      dto.alias = 'alias'
      dto.unknownField = 'yes'

      expect(new BusinessValidatorService().validate(dto)).toEqual({ name: 'cool', alias: 'alias', unknownField: 'yes' })
    })
  })
})
