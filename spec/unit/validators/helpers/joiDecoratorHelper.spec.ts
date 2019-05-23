import 'reflect-metadata'
import { Required } from 'tsdv-joi/constraints/any'
import { Greater } from 'tsdv-joi/constraints/number'
import { Max as MaxLength, Min as MinLength } from 'tsdv-joi/constraints/string'
import { Joi } from 'tsdv-joi/core'
import { BusinessException } from '~/exception/BusinessException'
import { checkException } from '~/tests/tests.utils'
import { BusinessValidator } from '~/validators/decorators/joiDecorators'
import { checkByDecorator } from '~/validators/helpers/joiDecoratorHelper'

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
            await checkException(BusinessException, [{champErreur: 'name', codeErreur: 'string.min'}], checkByDecorator, instance)
        })

        it('should not validate name with tsdv-joi', async () => {
            // tslint:disable-next-line:max-classes-per-file
            class DTO {
                @Required()
                public firstname: string
            }

            const instance: DTO = new DTO()

            await checkException(BusinessException, [{champErreur: 'firstname', codeErreur: 'any.required'}], checkByDecorator, instance)
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

            await checkException(BusinessException, [
                {champErreur: 'firstname', codeErreur: 'string.min'},
                {champErreur: 'age', codeErreur: 'number.greater'}
            ], checkByDecorator, instance)
        })
    })
})
