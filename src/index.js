import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../src/styles/style.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {loadState, saveState} from './../src/components/storeconfig'
let initialState = loadState() || {
    appTitle: 'Mercado Inverso',
    user: {},
   
}

let store = createStore(function (state = initialState, action) {
    if (action.type === 'FETCH_USER') {
        state = {
            ...state,
            user: action.payload
        }
        console.log(state)
       
    }

    return state
})

store.subscribe( function () {
    saveState(store.getState())
    
  })

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
