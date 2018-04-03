import React from 'react';
import { render } from 'react-dom';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import App from './App';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { routerReducer } from 'react-router-redux'

const history = createHistory();

console.log(history);

const firebaseConfig = {
  apiKey: "AIzaSyAa-SiXezZwWi4UzZWx_IFxA_yKfwfLNiM",
  authDomain: "test-4779d.firebaseapp.com",
  databaseURL: "https://test-4779d.firebaseio.com",
  projectId: "test-4779d",
  storageBucket: "test-4779d.appspot.com",
  messagingSenderId: "751876021851"
};

firebase.initializeApp(firebaseConfig);

const rootReducer = combineReducers({
  routing: routerReducer,
  firebase: firebaseReducer,
});

const enhancers = [];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const store = createStore(rootReducer,
  compose(
    applyMiddleware(
      routerMiddleware(history)
    ),
    reactReduxFirebase(firebase, {}),
    ...enhancers
  )
);

const Page = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>
);

render(<Page/>, document.getElementById('root'));
