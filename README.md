# iris-common

Backend and Frontend Utils for Iris

See the change log at [link](release-notes.md).

## Build Setup

```bash
# install dependencies
npm install

# build for production with minification
npm run build

# run unit tests
npm run test:unit

# run e2e tests
npm run test:e2e

# run all tests
npm test
```

## Import in your project

```bash
# install dependency
npm i @u-iris/iris-common --save
```

## Objects

Commonly used classes :

- ErrorDO: error structure with 3 required fields (`field`, `code`, `label`) and extra fields (value, path, limit)

```js
import { ErrorDO } from '@u-iris/iris-common'

const error = ErrorDO(
  'field', // the field name 
  'code', // the error code
  'label' // the label
)
const errorWithExtraFields = ErrorDO('field', 'code', 'label', {
  value: 'the value', // the value in error as any
  path: ['child', 'field'], // the path as array of string or number : used to identify full path of field when the error is from a nested object (You can use index of array like ['children', 1, 'field'] which means the field 'field' of the 2nd element (index is from 0) of the array 'children'. 
  limit: 5 // the limit for a string max / min length or for a number which must be greater / lesser than
})
```

## Exceptions

Classes for exceptions that all holds an array of `ErrorDO` in property `errors`.

- BusinessException
- EntityNotFoundBusinessException
- TechnicalException
- SecurityException

```js
import {
  BusinessException,
  EntityNotFoundBusinessException,
  TechnicalException,
  SecurityException
} from '@u-iris/iris-common'

const testBusinessException = new BusinessException(errorsArray)
const testEntityNotFoundBusinessException = new EntityNotFoundBusinessException(
  errorObject
)
const testTechnicalException = new TechnicalException(
  errorsArray,
  causedException
)
const securityException = new SecurityException(
  errorsArray
)
```

## Licence
MIT
