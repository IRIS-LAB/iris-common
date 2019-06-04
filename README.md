# iris-common

> Backend and Frontend Utils for Iris

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

- ErreurDO: error structure with 3 fields: `champErreur`, `codeErreur`, `libelleErreur`.

```js
import { ErreurDO } from '@u-iris/iris-common'

const error = ErreurDO('champErreur', 'codeErreur', 'libelleErreur')
```

## Exceptions

Classes for exceptions that all have the property `erreurs`.

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

## Validators (with Joi)

### Javascript
```javascript
import { check } from '@u-iris/iris-common'
// Joi shema
const model = object().keys({
  name: string().max(50).required()
})
// Object to validate
const instance = { name: 'nom' }
const aValidInstance = check(model, instance) // can throw BusinessException if instance of not valid
```

### Typescript

#### Model definition

You can use _tsdv-joi_ validators :

```typescript
import 'reflect-metadata'
import { Max as MaxLength } from 'tsdv-joi/constraints/string'
import { Required } from 'tsdv-joi/constraints/any'
import { checkByDecorator } from '@u-iris/iris-common'

class DTO {
    @MaxLength(50)
    @Required()
    public name: string
}

// Object to validate
const instance: DTO = new DTO()
instance.name = 'nom'
const aValidInstance = checkByDecorator(instance) // can throw BusinessException if instance of not valid
```

Or **@BusinessValidator** decorator :

```typescript
import 'reflect-metadata'
import { Joi } from 'tsdv-joi/core'
import { BusinessValidator, checkByDecorator } from '@u-iris/iris-common'

class DTO {
    @BusinessValidator(Joi.string().max(50).required())
    public name: string
}

// Object to validate
const instance: DTO = new DTO()
instance.name = 'nom'
const aValidInstance = checkByDecorator(instance) // can throw BusinessException if instance of not valid
```

#### Validator with options

Instead of using _checkByDecorator_ function to validate your beans, you can use the **Validator** class and override joi error messages.

Create a new Validator instance

```typescript
import { Validator } from '@u-iris/iris-common'
const validator = new Validator()
```

You can override error messages

```typescript
import { Validator } from '@u-iris/iris-common'
const validator = new Validator({
  messages: {...}
})
```
messages should be formatted like {'field type' : {'rule type' : 'message'}}

To override `Joi.string().max(10)` rule you should set message like `{string : {max : 'Field $field must be $limit char max'}}`

You can use some variables in your messages : 
- $field, $key and $label are replaced by the name of the property
- $value is replaced by the value of the property
- more variables depending on the type of the rule ($limit in string.max or number.greater)
 
To get a list of exhaustives field types and rule types, please see the [joi documentation](https://github.com/hapijs/joi)

```typescript
import 'reflect-metadata'
import { Joi } from 'tsdv-joi/core'
import { BusinessValidator, Validator } from '@u-iris/iris-common'
class DTO {
    @BusinessValidator(Joi.string().max(10).regex(/^([A-Za-z0-9]*)$/).required())
    public name: string
    
    @BusinessValidator(Joi.number().greater(0))
    public count: number
    
    @BusinessValidator(Joi.string().required())
    public alias: string
}

const dto = new DTO()
dto.name = 'ceci est un nom trop long'
dto.count = -1

// Create a new validator and set new messages
const validator = new Validator({
    messages: {
      // messages format is {'field type' : {'rule type' : 'message'}}
      
      string: {
        max: 'Field $field must be $limit char max',
        regex: 'Field $field is not well format'
      },
      number: {
        greater: 'Field $field must be greater than $limit'
      }
    }
})
validator.validate(dto)
// Will throw BusinessException with erreurs :
// { champErreur: 'name', codeErreur: 'string.max', libelleErreur: 'Field name must be 10 char max' } <- libelleErreur overriden by options
// { champErreur: 'name', codeErreur: 'string.regex.base', libelleErreur: 'Field name is not well format' } <- libelleErreur overriden by options
// { champErreur: 'count', codeErreur: 'number.greater', libelleErreur: 'Field count must be greater than 0' } <- libelleErreur overriden by options
// { champErreur: 'alias', codeErreur: 'any.required', libelleErreur: '"alias" is required' } <- libelleErreur not overriden
```
