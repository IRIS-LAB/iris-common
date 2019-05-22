import 'reflect-metadata'
import { Required } from 'tsdv-joi/constraints/any'
import { Greater } from 'tsdv-joi/constraints/number'
import { Max as MaxLength, Min as MinLength } from 'tsdv-joi/constraints/string'
import { Joi } from 'tsdv-joi/core'
import { BusinessException } from '~/exception/BusinessException'
import { checkException } from '~/tests/tests.utils'
import { checkByDecorator } from '~/validators/joiDecoratorHelper'
import { BusinessValidator } from '~/validators/joiDecorators'

function checkAsync<T>(model: T): Promise<T> {
    try {
        const result = checkByDecorator(model)
        return Promise.resolve(result)
    } catch (e) {
        return Promise.reject(e)
    }
}

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
        it('should not validate name with BusinessValidator', async () => {
            // tslint:disable-next-line:max-classes-per-file
            class DTO {
                @BusinessValidator(Joi.string().min(5).required())
                public name: string
            }

            const instance: DTO = new DTO()
            instance.name = 'nom'
            await checkException(BusinessException, [{field: 'name', codes: ['string.min']}], checkAsync, instance)
        })

        it('should not validate name with tsdv-joi', async () => {
            // tslint:disable-next-line:max-classes-per-file
            class DTO {
                @Required()
                public firstname: string
            }

            const instance: DTO = new DTO()

            await checkException(BusinessException, [{field: 'firstname', codes: ['any.required']}], checkAsync, instance)
        })

        it('should not validate cause of multiple errors', async () => {
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

            await checkException(BusinessException, [{field: 'firstname', codes: ['string.min']}, {
                field: 'age',
                codes: ['number.greater']
            }], checkAsync, instance)
        })
    })
})
