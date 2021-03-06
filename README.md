# redux-firestore

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Build Status][travis-image]][travis-url]

[![Gitter][gitter-image]][gitter-url]
<!-- [![Quality][quality-image]][quality-url] -->
<!-- [![Code Coverage][coverage-image]][coverage-url] -->

> Redux bindings for Firestore

**NOTE**: This library is still under construction, use at your own risk

## Installation

```sh
npm install redux-firestore --save
```

## Use

```javascript
import { createStore, combineReducers, compose } from 'redux'
import { reduxFirestore, firestoreReducer } from 'react-redux-firebase'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  storageBucket: '<your-storage-bucket>'
}
const rfConfig = { userProfile: 'users' } // react-redux-firebase config

// initialize firebase instance
const firebaseApp = firebase.initializeApp(config) // <- new to v2.*.*

// Add reduxReduxFirebase to compose
const createStoreWithFirebase = compose(
  reduxFirestore(firebaseApp, rfConfig), // firebase instance as first argument
)(createStore)

// Add Firebase to reducers
const rootReducer = combineReducers({
  firestore: firestoreReducer
})

// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)
```

### Call Firestore

#### Firestore Instance

#### Middleware

redux-firestore's enhancer offers a new middleware setup that was not offered in `react-redux-firebase` (but will eventually make it `redux-firebase`)
**Note**: This syntax is just a sample and is not currently released

```js
import { actionTypes } from 'redux-firestore'

dispatch({
  type: actionTypes.FIREBASE_CALL,
  namespace: 'firestore' ,// database, auth, storage, etc
  collection: 'users', // only used when namespace is firestore
  method:  'get' // get method
})
```

Some of the goals behind this approach include:

1. Not needing to pass around a Firebase instance (with `react-redux-firebase` this meant using `firebaseConnect` HOC or `getFirebase`)
2. Follows [patterns outlined in the redux docs for data fetching](http://redux.js.org/docs/advanced/ExampleRedditAPI.html)
3. Easier to expand/change internal API as Firebase/Firestore API grows & changes


## Roadmap

`v0.1.0` - Basic querying

[npm-image]: https://img.shields.io/npm/v/redux-firestore.svg?style=flat-square
[npm-url]: https://npmjs.org/package/redux-firestore
[npm-downloads-image]: https://img.shields.io/npm/dm/redux-firestore.svg?style=flat-square
[quality-image]: http://npm.packagequality.com/shield/redux-firestore.svg?style=flat-square
[quality-url]: https://packagequality.com/#?package=redux-firestore
[travis-image]: https://img.shields.io/travis/prescottprue/redux-firestore/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/prescottprue/redux-firestore
[daviddm-image]: https://img.shields.io/david/prescottprue/redux-firestore.svg?style=flat-square
[daviddm-url]: https://david-dm.org/prescottprue/redux-firestore
[climate-image]: https://img.shields.io/codeclimate/github/prescottprue/redux-firestore.svg?style=flat-square
[climate-url]: https://codeclimate.com/github/prescottprue/redux-firestore
[coverage-image]: https://img.shields.io/codecov/c/github/prescottprue/redux-firestore.svg?style=flat-square
[coverage-url]: https://codecov.io/gh/prescottprue/redux-firestore
[license-image]: https://img.shields.io/npm/l/redux-firestore.svg?style=flat-square
[license-url]: https://github.com/prescottprue/redux-firestore/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-airbnb-blue.svg?style=flat-square
[code-style-url]: https://github.com/airbnb/javascript
[gitter-image]: https://img.shields.io/gitter/room/redux-firestore/gitter.svg?style=flat-square
[gitter-url]: https://gitter.im/redux-firestore/Lobby
