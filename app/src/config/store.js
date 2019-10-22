import { createStore, applyMiddleware, compose } from 'redux';
import * as storage from 'redux-storage';
import thunk from 'redux-thunk';

import reducers from '../redux/reducers';
import {middleware} from '../config/navigation';

/* global __DEV__ */
const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;


export default function configureStore(onComplete = () => {}) {
  // const engine = createEngine('AppTree');
  // const storeMiddleware = storage.createMiddleware(engine);

  const store = createStore(
    storage.reducer(reducers), // Apply redux-storage so we can persist Redux state to disk
    compose(
      applyMiddleware(
        thunk,
        middleware,
      ),
    ),
  );


  return store;
}
