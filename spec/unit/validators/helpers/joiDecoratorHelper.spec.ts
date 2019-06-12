import { string } from 'joi'
import 'reflect-metadata'
import { Required } from 'tsdv-joi/constraints/any'
import { Greater } from 'tsdv-joi/constraints/number'
import { Max as MaxLength, Min as MinLength } from 'tsdv-joi/constraints/string'
import { Joi } from 'tsdv-joi/core'
import { BusinessException } from '../../../../src/exception'
import { BusinessValidator, checkByDecorator } from '../../../../src/validators'

describe('JoiDecoratorHelper', () => {

  describe('checkByDecorator', () => {
    it('should validate dto', () => {
      // tslint:disable-next-line:max-classes-per-file
      class DTO {
        @MaxLength(50)
        @Required()
        public name: string
      }

      const instance: DTO = new DTO()
      instance.name = 'nom'
      expect(checkByDecorator(instance)).toEqual(instance)
    })

    it('should validate dto with other properties', () => {
      // tslint:disable-next-line:max-classes-per-file
      class DTO {
        @MaxLength(50)
        @Required()
        public name: string

        public other: number
      }

      const instance: DTO = new DTO()
      instance.name = 'nom'
      instance.other = 5
      expect(checkByDecorator(instance, {allowUnknown: true})).toEqual(instance)
    })

    it('should not validate name with BusinessValidator', async () => {
      // tslint:disable-next-line:max-classes-per-file
      class DTO {
        @BusinessValidator(Joi.string().min(5).required())
        public name: string
      }

      const instance: DTO = new DTO()
      instance.name = 'nom'

      let exception = null
      try {
        checkByDecorator(instance)
      } catch (e) {
        exception = e
      }
      expect(exception).toBeDefined()
      expect(exception).toBeInstanceOf(BusinessException)
      const businessException = exception as BusinessException
      expect(businessException.erreurs).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ champErreur: 'name', codeErreur: 'string.min' })
        ])
      )
    })

    it('should not validate name with tsdv-joi', async () => {
      // tslint:disable-next-line:max-classes-per-file
      class DTO {
        @Required()
        public firstname: string
      }

      const instance: DTO = new DTO()

      let exception = null
      try {
        checkByDecorator(instance)
      } catch (e) {
        exception = e
      }
      expect(exception).toBeDefined()
      expect(exception).toBeInstanceOf(BusinessException)
      const businessException = exception as BusinessException
      expect(businessException.erreurs).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ champErreur: 'firstname', codeErreur: 'any.required' })
        ])
      )
    })

    it('should not validate cause of multiple erreurs', async () => {
      // tslint:disable-next-line:max-classes-per-file
      class DTO {
        @MinLength(5)
        @Required()
        public firstname: string

        @Greater(18)
        public age: number
      }

      const instance: DTO = new DTO()
      instance.firstname = 'nom'
      instance.age = 15

      let exception = null
      try {
        checkByDecorator(instance)
      } catch (e) {
        exception = e
      }
      expect(exception).toBeDefined()
      expect(exception).toBeInstanceOf(BusinessException)
      const businessException = exception as BusinessException
      expect(businessException.erreurs).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ champErreur: 'firstname', codeErreur: 'string.min' })
        ])
      )
      expect(businessException.erreurs).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ champErreur: 'age', codeErreur: 'number.greater' })
        ])
      )
    })

  })
})
