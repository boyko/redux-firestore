import { defaultConfig } from './constants';
import createFirebaseInstance from './createFirebaseInstance'
import { createAuthIsReady } from './utils/auth'
import { authActions } from './actions';


/**
 * @name reduxFirestore
 * @external
 * @description Redux store enhancer that accepts configuration options and adds
 * store.firestore. Enhancers are most commonly placed in redux's `compose` call
 * along side applyMiddleware.
 * @property {Object} firebaseInstance - Initiated firebase instance
 * @property {Object} config - Containing react-redux-firebase specific configuration
 * @return {Function} That accepts a component and returns a Component which
 * wraps the provided component (higher order component).
 * @return {Function} That enhances a redux store with store.firestore
 * @example <caption>Setup</caption>
 * import { createStore, compose } from 'redux'
 * import { reduxFirestore } from 'redux-firestore'
 * import * as firebase from 'firebase' // must be 4.5.0 or higher

 * // Redux Firestore Config
 * const config = {
 *   // here is where you place other config options
 * }

 * // initialize script from Firebase page
 * const fbConfg = {} // firebase config object
 * firebase.initializeApp(fbConfig)
 *
 * // Add redux-firestore enhancer to store creation compose
 * // Note: In full projects this will often be within createStore.js or store.js
 * const createStoreWithFirebase = compose(
 *  reduxFirestore(firebase, config),
 * )(createStore)
 *
 * // Use Function later to create store
 * const store = createStoreWithFirebase(rootReducer, initialState)
 */
export default (firebaseInstance, otherConfig) => next =>
  (reducer, initialState, middleware) => {
    const store = next(reducer, initialState, middleware);

    const configs = { ...defaultConfig, ...otherConfig };

    firebaseInstance = createFirebaseInstance( // eslint-disable-line no-param-reassign
      instance.firebase_ || instance, // eslint-disable-line no-underscore-dangle, no-undef
      configs,
      store.dispatch // eslint-disable-line comma-dangle
    );

    authActions.init(store.dispatch, firebaseInstance);

    store.firestore = { ...firebaseInstance, _: { config: configs } };

    if (configs.attachAuthIsReady) {
      store.firebaseAuthIsReady = createAuthIsReady(store, configs);
    }

    return store;
  };
