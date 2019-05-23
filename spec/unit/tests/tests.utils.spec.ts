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
        it('should valid exception codeErreur and error errors', async () => {
            const module = {
                fct: async (type: string, name: number) => {
                    throw new BusinessException([{champErreur: 'champErreur', codeErreur: 'required', libelleErreur: 'champErreur is required'}])
                },
            }
            await checkException(BusinessException, [{champErreur: 'champErreur', codeErreur: 'required'}], module.fct, 'example5')
        })
        it('should valid exception for children of BusinessException', async () => {
            const module = {
                fct: async (type: string, name: number) => {
                    throw new EntityNotFoundBusinessException({
                        champErreur: 'champErreur',
                        codeErreur: 'required',
                        libelleErreur: 'champErreur is required',
                    })
                },
            }
            await checkException(EntityNotFoundBusinessException, [{champErreur: 'champErreur', codeErreur: 'required'}], module.fct, 'example5')
        })
        it('should valid exception for children of SecurityException', async () => {
            const module = {
                fct: async (type: string, name: number) => {
                    throw new SecurityException([{
                        champErreur: 'champErreur',
                        codeErreur: 'required',
                        libelleErreur: 'champErreur is required',
                    }])
                },
            }
            await checkException(SecurityException, [{champErreur: 'champErreur', codeErreur: 'required'}], module.fct, 'example5')
        })
        it('should reject bad exception codeErreur', async () => {
            const module = {
                fct: async (type: string, name: number) => {
                    throw new BusinessException([{champErreur: 'champErreur', codeErreur: 'champErreur.required', libelleErreur: 'champErreur is required'}])
                },
            }
            try {
                await checkException(TechnicalException, [{champErreur: 'champErreur', codeErreur: 'required'}], module.fct, 'example5')
                expect(false).toBeTruthy()
            } catch (e) {
                expect(e).toBeDefined()
            }
        })
        it('should reject bad error code', async () => {
            const module = {
                fct: async (type: string, name: number) => {
                    throw new BusinessException([{champErreur: 'champErreur', codeErreur: 'champErreur.required', libelleErreur: 'champErreur is required'}])
                },
            }
            try {
                await checkException(BusinessException, [{champErreur: 'otherfield', codeErreur: 'required'}], module.fct, 'example5')
                expect(false).toBeTruthy()
            } catch (e) {
                expect(e).toBeDefined()
            }
        })
        it('should reject multiple bad error code for method async', async () => {
            const module = {
                fct: async (type: string, name: number) => {
                    throw new BusinessException([
                        {champErreur: 'champErreur', codeErreur: 'required', libelleErreur: 'champErreur is required'},
                        {champErreur: 'field2', codeErreur: 'string.max', libelleErreur: 'field2 is max'}])
                },
            }
            try {
                await checkException(BusinessException, [
                    {champErreur: 'champErreur', codeErreur: 'required'},
                    {champErreur: 'field2', codeErreur: 'string.max'}
                ], module.fct, 'example5')
                expect(false).toBeTruthy()
            } catch (e) {
                expect(e).toBeDefined()
            }
        })
        it('should reject multiple bad error code for method sync', async () => {
            const module = {
                fct: (type: string, name: number) => {
                    throw new BusinessException([
                        {champErreur: 'champErreur', codeErreur: 'required', libelleErreur: 'champErreur is required'},
                        {champErreur: 'field2', codeErreur: 'string.max', libelleErreur: 'field2 is max'}])
                },
            }
            try {
                await checkException(BusinessException, [
                    {champErreur: 'champErreur', codeErreur: 'required'},
                    {champErreur: 'field2', codeErreur: 'string.max'}
                ], module.fct, 'example5')
                expect(false).toBeTruthy()
            } catch (e) {
                expect(e).toBeDefined()
            }
        })
    })
})
