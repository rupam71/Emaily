import React from 'react';
import materializeCSS from 'materialize-css/dist/css/materialize.min.css'
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reducers from './reducers'
import reduxThunk from 'redux-thunk'

const store = createStore( reducers, {}, applyMiddleware(reduxThunk) )
  
ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);

console.log('STRIPE_KEY_IS: ', process.env.REACT_APP_STRIPE_KEY)
console.log('ENVIRONMENT_IS: ', process.env.NODE_ENV)
