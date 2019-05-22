import { BusinessException } from '~/exception/BusinessException'
import { EntityNotFoundBusinessException } from '~/exception/EntityNotFoundBusinessException'
import { SecurityException } from '~/exception/SecurityException'
import { TechnicalException } from '~/exception/TechnicalException'
import { callFunctionAndCheckResult, checkException, checkFunctionCall } from '~/tests/tests.utils'

describe('TestUtils', () => {
    describe('checkFunctionCall', () => {
        it('should return success', () => {
            const module = {
                fct: (type: string, count: number) => {
                    return type + ' ' + count
                },
            }
            jest.spyOn(module, 'fct').mockImplementation(() => 'cool')
            module.fct('example', 5)
            checkFunctionCall(module.fct, 'example', 5)
        })
        it('should return error', () => {
            const module = {
                fct: (type: string, name: number) => {
                    return type + ' ' + name
                },
            }
            jest.spyOn(module, 'fct').mockImplementation(() => 'cool')
            module.fct('example', 5)
            try {
                checkFunctionCall(module.fct, 'baD param', 5)
                expect(false).toBeTruthy()
            } catch (e) {
                expect(e).toBeDefined()
            }
        })
    })
    describe('callFunctionAndCheckResult', () => {
        it('should return success', async () => {
            const module = {
                fct: async (type: string, name: number) => {
                    return (type + ' ' + name)
                },
            }
            // jest.spyOn(module, 'fct').mockImplementation(() => 'cool')
            module.fct('example', 5)
            await callFunctionAndCheckResult(module.fct, 'example 5', 'example', 5)
        })
        it('should return error', async () => {
            const module = {
                fct: async (type: string, name: number) => {
                    return (type + ' ' + name)
                },
            }
            // jest.spyOn(module, 'fct').mockImplementation(() => 'cool')
            module.fct('example', 5)
            try {
                await callFunctionAndCheckResult(module.fct, 'example5', 'example', 5)
                expect(false).toBeTruthy()
            } catch (e) {
                expect(e).toBeDefined()
            }
        })
    })

    describe('checkException', () => {
        it('should valid exception type and error codes', async () => {
            const module = {
                fct: async (type: string, name: number) => {
                    throw new BusinessException([{champErreur: 'field', codeErreur: 'required', libelleErreur: 'field is required'}])
                },
            }
            await checkException(BusinessException, [{field: 'field', codes: ['required']}], module.fct, 'example5')
        })
        it('should valid exception for children of BusinessException', async () => {
            const module = {
                fct: async (type: string, name: number) => {
                    throw new EntityNotFoundBusinessException({
                        champErreur: 'field',
                        codeErreur: 'required',
                        libelleErreur: 'field is required',
                    })
                },
            }
            await checkException(EntityNotFoundBusinessException, [{field: 'field', codes: ['required']}], module.fct, 'example5')
        })
        it('should valid exception for children of SecurityException', async () => {
            const module = {
                fct: async (type: string, name: number) => {
                    throw new SecurityException([{
                        champErreur: 'field',
                        codeErreur: 'required',
                        libelleErreur: 'field is required',
                    }])
                },
            }
            await checkException(SecurityException, [{field: 'field', codes: ['required']}], module.fct, 'example5')
        })
        it('should reject bad exception type', async () => {
            const module = {
                fct: async (type: string, name: number) => {
                    throw new BusinessException([{champErreur: 'field', codeErreur: 'field.required', libelleErreur: 'field is required'}])
                },
            }
            try {
                await checkException(TechnicalException, [{field: 'field', codes: ['required']}], module.fct, 'example5')
                expect(false).toBeTruthy()
            } catch (e) {
                expect(e).toBeDefined()
            }
        })
        it('should reject bad error code', async () => {
            const module = {
                fct: async (type: string, name: number) => {
                    throw new BusinessException([{champErreur: 'field', codeErreur: 'field.required', libelleErreur: 'field is required'}])
                },
            }
            try {
                await checkException(BusinessException, [{field: 'otherfield', codes: ['required']}], module.fct, 'example5')
                expect(false).toBeTruthy()
            } catch (e) {
                expect(e).toBeDefined()
            }
        })
        it('should reject multiple bad error code', async () => {
            const module = {
                fct: async (type: string, name: number) => {
                    throw new BusinessException([
                        {champErreur: 'field', codeErreur: 'required', libelleErreur: 'field is required'},
                        {champErreur: 'field2', codeErreur: 'string.max', libelleErreur: 'field2 is max'}])
                },
            }
            try {
                await checkException(BusinessException, [{field: 'field', codes: ['required']}, {
                    field: 'field2',
                    codes: ['string.max']
                }], module.fct, 'example5')
                expect(false).toBeTruthy()
            } catch (e) {
                expect(e).toBeDefined()
            }
        })
    })
})
