# iris-common

> Backend and Frontend Utils for Iris

## Build Setup

```bash
# install dependencies
npm install

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Import in your project

```bash
# install dependency
npm i @ugieiris/iris-common --save
```

## Objects

Commonly used classes :

- ErreurDO: error structure with 3 fields: `champErreur`, `codeErreur`, `libelleErreur`.

```js
import { ErreurDO } from "@ugieiris/iris-common";

const error = ErreurDO("champErreur", "codeErreur", "libelleErreur");
```

## Exceptions

Classes for exceptions that all have the property `errors`.

- BusinessException
- EntityNotFoundBusinessException
- TechnicalException

```js
import { BusinessException, EntityNotFoundBusinessException, TechnicalException } from "@ugieiris/iris-common";

const testBusinessException = new BusinessException(errorsArray);
const testEntityNotFoundBusinessException = new EntityNotFoundBusinessException(errorObject);
const testTechnicalException = new TechnicalException(errorsArray, causedException);
```

## Unit Test Helpers

Severals utils functions for unit tests are available :

- **callFunctionAndCheckResult**: function calling an async function with arguments and checking than its result is correct.  
*`async function callFunctionAndCheckResult(functionToCall, expectedResult, ...functionArgs)`*

- **checkFunctionCall**: function checking if a given function has been called exactly one time, with given params as arguments.  
*`function checkFunctionCall(functionToHaveBeenCalled, ...functionArgs)`*

- **checkException**: function checking that an exception is thrown when an async function is called.  
Its arguments are the constructor of the thrown exception, an exhaustive array of the error codes thrown in exception, the function to call, and the arguments of the function to call.  
*`async function checkException(exceptionClass, errorCodes, functionToTest, ...functionArgs)`*

- **initMocks**: function creating an object of mocked functions (for ex., used to mock models or dao in node projects).  
Its argument should be an array of objects like `{ path: 'function.path.inFinalObject', value: returnedValueOfTheMock }`.  
*`function initMocks(functionsToMock)`*

```js
import { checkFunctionCall } from '@ugieiris/iris-common'
import { functionOne } from 'moduleToTest' // function taking two parameters
describe('functionOne', () => {
    it('should call functionTwo with arguments "toto" and "test", and return "tototest", when called with the parameter "toto" and "test"', () => {
        const functionTwo = jest.fn()
        await callFunctionAndCheckResult(functionOne, "tototest", "toto", "test")
        checkFunctionCall(functionTwo, "toto", "test")
    })
})
```

## Validators

Validator functions

```js
import { checkMail } from "@ugieiris/iris-common";

const isMailValid = checkMail("mail.test@systeme-u.fr");
```
