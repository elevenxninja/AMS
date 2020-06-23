import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
import rootReducer from './reducers/auth';
 
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
 

  let store = createStore(persistedReducer, applyMiddleware(thunk))
  let persistor = persistStore(store)
  export default store;
