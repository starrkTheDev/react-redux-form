import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    form: formReducer
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;