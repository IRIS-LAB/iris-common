import { number, object, Schema, string } from 'joi'
import { BusinessException } from '../../../../src/exception'
import { check } from '../../../../src/validators'

function checkAsync<T>(model: Schema, o: T): Promise<T> {
  try {
    const result = check(model, o)
    return Promise.resolve(result)
  } catch (e) {
    return Promise.reject(e)
  }
}

describe('JoiHelper', () => {

  describe('checkByDecorator', () => {
    it('should validate dto', () => {
      const model = object().keys({
        name: string().max(50).required()
      })
      const instance = { name: 'nom' }
      expect(check(model, instance)).toEqual(instance)
    })
    it('should not validate name with min length', () => {
      const instance = { name: 'nom' }
      let exception = null
      try {
        check(object().keys({
          name: string().min(5).required()
        }), instance)
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
    it('should not validate cause of multiple erreurs', () => {
      const instance = { firstname: 'nom', age: 15 }

      let exception = null
      try {
        check(object().keys({
          firstname: string().min(5).required(),
          age: number().greater(18)
        }), instance)
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
