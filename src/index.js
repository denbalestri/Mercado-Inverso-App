import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../src/styles/style.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import {createStore} from 'redux'
import {Provider} from 'react-redux'



let initialData =  {
    appTitle: 'Mercado Inverso',
    user: {},
    post:{},

   
}



let store = createStore(function (state = initialData, action) {
    if (action.type === 'FETCH_USER') {
        state = {
            ...state,
            user: action.payload
        }
    }
        if (action.type === 'SET_POST_ID') {
            state = {
                ...state,
                post: action.payload
            }
        }
        if (action.type === 'USER_LOGOUT') {
            console.log('aca')
            state = {
                appTitle: 'Mercado Inverso',
                user:{},
                post:{}
            }
          }
        //console.log(action.payload)
        console.log(state)
       
    
   
    return state
})

window.store = store;



ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
