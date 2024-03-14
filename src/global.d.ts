// store 中加入 REDUX DEVTOOLS 設定報錯時須新增此檔案

export {}

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}