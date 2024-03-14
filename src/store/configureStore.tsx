import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const persistConfig = { // 定義 Redux Persist 的配置
    key: 'root',
    storage, // 指定了要使用的儲存庫 (storage)，這裡使用了 redux-persist/lib/storage 來保存狀態
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // 使用 persistReducer 函式將配置應用於 reducer，從而創建了一個被持久化的 reducer (persistedReducer)

const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Redux Dev Tool 追蹤state跟Action

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware(); // 創建了 Redux Saga 中間件

    // 使用 createStore 函式創建 Redux Store，並將持久化的 reducer (persistedReducer) 作為第一個參數傳遞給它。還使用了 composeEnhancers 函式來啟用 Redux DevTools 擴展
    const store = createStore(persistedReducer, /* preloadedState, */ composeEnhancers(applyMiddleware(sagaMiddleware))); // 使用 applyMiddleware 函式將 Saga 中間件 (sagaMiddleware) 添加到 Store 中
    const persistor = persistStore(store); // 使用 persistStore 函式將 Store 和持久化的配置 (persistConfig) 一起傳遞給它，從而創建了一個持久化儲存 (persistor)
    sagaMiddleware.run(rootSaga); // 使用 sagaMiddleware.run 函式運行 Saga (rootSaga)，將 Saga 中間件連接到 Redux Store
    return { store, persistor }; // 返回一個包含 Store 和 Persistor 的物件，從而允許在應用程序中使用這些對象
};

export default configureStore;

// 透過這個配置，我們實現了 Redux 的狀態持久化，並使用 Redux Saga 處理非同步操作。同時，我們還啟用了 Redux DevTools，以方便調試和監視應用程序的狀態變化