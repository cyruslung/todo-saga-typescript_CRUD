import {
    SET_TODOS,
    FETCH_TODOS,
    ADD_TODO,
    UPDATE_TODO,
    EDIT_TODO_CHANGE,
    TOGGLE_EDIT,
    DELETE_TODO,
} from "../constants";

export const fetchTodos = () => ({ // 只用於觸發從後端獲取待辦事項列表的操作
    type: FETCH_TODOS,
});

export const addTodo = (title: string) => ({ // 用於添加新的待辦事項到 store 中
    type: ADD_TODO,
    payload: { title },
});

export const updateTodo = (id: any, todo: { title: any; completed: boolean; }) => { // 用於更新特定的待辦事項
    return { type: UPDATE_TODO, payload: { id, todo }, };
};

export const editTodoChange = (id: any, title: any, value: any) => { // 用於更新特定待辦事項的編輯內容，根據傳入的 id 找到對應的待辦事項，並將 title 參數和 value 參數應用到該待辦事項
    return { type: EDIT_TODO_CHANGE, payload: { id, title, value } };
};

export const toggleEdit = (id: any) => { // 用於切換特定待辦事項的編輯狀態
    return { type: TOGGLE_EDIT, payload: id };
};

export const deleteTodo = (id: any) => ({ // 用於刪除特定的待辦事項
    type: DELETE_TODO,
    payload: { id },
});
