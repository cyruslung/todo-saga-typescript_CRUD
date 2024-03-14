import { put, takeEvery } from 'redux-saga/effects'; // 使用 takeEvery 函式來監聽指定的動作類型，當該動作發生時，執行對應的 Saga 函式
import {
    SET_TODOS,
    FETCH_TODOS,
    ADD_TODO,
    UPDATE_TODO,
    EDIT_TODO_CHANGE,
    TOGGLE_EDIT,
    DELETE_TODO,
} from "../constants";

function* fetchTodos():any { // 用於從後端獲取待辦事項列表
    try {
        const response = yield fetch('http://localhost:8000/todos'); // 向後端發送 HTTP 請求
        const todos = yield response.json(); // 解析回應的 JSON 數據
        yield put({ type: SET_TODOS, payload: { todos } }); // 使用 put 函式發送一個 SET_TODOS 動作，將從後端獲取的待辦事項列表設置到 Redux 的狀態中
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

function* addTodo({ payload }:any):any { // 用於新增待辦事項
    try {
        const response = yield fetch('http://localhost:8000/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: payload.title, completed: false }), // 將待辦事項的標題和完成狀態作為請求的內容
        });
        yield response.json(); // 等待更新完成
        yield put({ type: FETCH_TODOS }); // 更新後再重新獲取待辦事項清單
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

function* updateTodo({ payload }:any):any { // 用於更新待辦事項
    try {
        const response = yield fetch(`http://localhost:8000/todos/${payload.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: payload.todo.title, completed: payload.todo.completed }), // 將待辦事項的標題和完成狀態作為請求的內容
        });
        yield response.json(); // 等待更新完成
        yield put({ type: FETCH_TODOS }); // 更新後再重新獲取待辦事項清單
        // yield put({ type: SET_TODOS, payload: { todos: [] } }); // 清空 todos 狀態

        //// updateTodo 在後端進行更新之前，已經發送了 FETCH_TODOS 的 action，該 action 觸發了重新從後端獲取待辦事項的過程
        //// 這可能會導致看似非同步的行為，即在 updateTodo 完成之前重新獲取待辦事項列表

    } catch (error) {
        console.error('Error updating todo:', error);
    }
}

function* deleteTodo({ payload }:any) { // 用於刪除待辦事項
    try {
        yield fetch(`http://localhost:8000/todos/${payload.id}`, {
            method: 'DELETE',
        });
        yield put({ type: FETCH_TODOS }); // 重新獲取待辦事項列表
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
}

function* todoSaga() {
    yield takeEvery(FETCH_TODOS, fetchTodos);
    yield takeEvery(ADD_TODO, addTodo);
    yield takeEvery(UPDATE_TODO, updateTodo);
    yield takeEvery(DELETE_TODO, deleteTodo);
}

export default todoSaga; // 將這些 Saga 函式統一匯出
