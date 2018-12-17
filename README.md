# hivent-backend-utils

> Backend Utils for Hivent

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
npm i hivent-backend-utils --save
```

```js
import { BusinessException } from 'hivent-backend-utils'
const test = new BusinessException('code', 'message')
```
