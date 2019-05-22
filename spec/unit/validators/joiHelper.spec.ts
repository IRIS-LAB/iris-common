import { number, object, SchemaLike, string } from 'joi'
import { BusinessException } from '~/exception/BusinessException'
import { checkException } from '~/tests/tests.utils'
import { check } from '~/validators/joiHelper'

function checkAsync<T>(model: SchemaLike, o: T): Promise<T> {
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
            const instance = {name: 'nom'}
            expect(check(object().keys({
                name: string().max(50).required(),
            }), instance)).toEqual(instance)
        })
        it('should not validate name with min length', async () => {
            const instance = {name: 'nom'}
            await checkException(BusinessException, [{field: 'name', codes: ['string.min']}], checkAsync, object().keys({
                name: string().min(5).required(),
            }), instance)
        })
        it('should not validate cause of multiple errors', async () => {
            const instance = {firstname: 'nom', age: 15}
            await checkException(BusinessException, [{field: 'firstname', codes: ['string.min']}, {
                field: 'age',
                codes: ['number.greater']
            }], checkAsync, object().keys({
                firstname: string().min(5).required(),
                age: number().greater(18),
            }), instance)
        })
    })
})
