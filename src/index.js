import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import ingredientsReducer from './store/reducers/IngredientsReducer';
import orderReducer from './store/reducers/OrderReducer';
import authReducer from './store/reducers/authReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  ingredientsReducer: ingredientsReducer,
  orderReducer: orderReducer, 
  authReducer: authReducer
}); 

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)));

const RoutedApp = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(RoutedApp, document.getElementById('root'));