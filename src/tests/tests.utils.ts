import { set as _set } from 'lodash'
import { Omit } from 'yargs'
import { ErreurDO, IrisException } from '~/exception'
import '~/tests/expect.extend'

// TODO : remove test-utils and migrate to an other lib  @u-iris/iris-test-utils

/**
 * Function calling an async function with arguments and checking than its result is correct
 * @param {*} functionToCall
 * @param {*} expectedResult
 * @param  {...any} functionArgs
 * @deprecated please use @u-iris/iris-test-utils
 */
export async function callFunctionAndCheckResult<R>(
    functionToCall: (...args: any[]) => Promise<R>,
    expectedResult: R,
    ...functionArgs: Parameters<typeof functionToCall>
): Promise<void> {
    const result = await functionToCall.apply(null, functionArgs)
    expect(result).toEqual(expectedResult)
}

/**
 * Function checking if a given function has been called with given params as arguments
 * @param {function} functionToHaveBeenCalled
 * @param  {...any} functionArgs
 * @deprecated please use @u-iris/iris-test-utils
 */
// tslint:disable-next-line:ban-types
export function checkFunctionCall(functionToHaveBeenCalled: Function, ...functionArgs: any[]) {
    expect(functionToHaveBeenCalled).toHaveBeenCalledTimes(1)
    expect(functionToHaveBeenCalled).toHaveBeenCalledWith(...functionArgs)
}

type IErrorChecked = Omit<ErreurDO, 'libelleErreur'> & {
    libelleErreur?: string
}

/**
 * Function checking that an exception is thrown when an async function is called
 * @param {*} exceptionClass, constructor of the thrown exception
 * @param {array} errors, exhaustive array of the error errors thrown in exception
 * @param {function} functionToTest, function to call
 * @param  {...any} functionArgs, arguments of the function to call
 * @deprecated please use @u-iris/iris-test-utils
 */
export async function checkException<T extends IrisException>(
    exceptionClass: new (...args: any[]) => T,
    errors: IErrorChecked[],
    functionToTest: (...args: any[]) => any,
    ...functionArgs: Parameters<typeof functionToTest>
): Promise<void> {
    // WHEN
    let result = null
    try {
        const r = functionToTest.apply(null, functionArgs)
        if (r instanceof Promise) {
            await r
        }

    } catch (e) {
        // checking exception throwed within async function
        result = e
    }
    // THEN
    // Check exception class
    expect(result).toBeDefined()
    expect(result).toBeInstanceOf(exceptionClass)

    const exception = result as T

    // Check that each given errorCode is present in the result
    // for (const errorThrown of exception.errors) {
    //     expect(errors).toContainObjectLike({champErreur: errorThrown.champErreur, codeErreur: errorThrown.codeErreur})
    //     const expectedErrorFound = errors.find(e => e.champErreur === errorThrown.champErreur && e.codeErreur === errorThrown.codeErreur)
    //     expect(expectedErrorFound).toBeDefined()
    //     if (expectedErrorFound && expectedErrorFound.libelleErreur) {
    //         expect(errorThrown.libelleErreur).toEqual(expectedErrorFound.libelleErreur)
    //     }
    // }
    for (const expectedError of errors) {
        const {champErreur, codeErreur} = expectedError
        expect(exception.errors).toContainObjectLike({champErreur, codeErreur})
        const errorThrown = exception.errors.find(e => e.champErreur === expectedError.champErreur && e.codeErreur === expectedError.codeErreur)
        expect(errorThrown).toBeDefined()
        if (errorThrown && expectedError.libelleErreur) {
            expect(errorThrown.libelleErreur).toEqual(expectedError.libelleErreur)
        }
    }
    // Check that there is no other errorCode
    expect(exception.errors).toHaveLength(errors.length)
}

/**
 * Function creating an object of mocked functions (for ex., used to mock models or dao in node projects)
 * @param {*} functionsToMock (array of objects like { path: 'function.path.inFinalObject', value: returnedValueOfTheMock })
 * @deprecated please use @u-iris/iris-test-utils
 */
export function initMocks(functionsToMock: Array<{ path: string, value: any }>) {
    const mocksObject = {}
    functionsToMock.forEach(functionToMock => {
        _set(mocksObject, functionToMock.path, jest.fn(() => functionToMock.value))
    })
    return mocksObject
}
