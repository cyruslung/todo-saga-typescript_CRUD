import {
    SET_TODOS,
    FETCH_TODOS,
    ADD_TODO,
    UPDATE_TODO,
    EDIT_TODO_CHANGE,
    TOGGLE_EDIT,
    DELETE_TODO,
} from "../constants";

interface Todo {
    id: number;
    title: string;
    completed: boolean;
    editing: boolean;
}

interface TodoState {
    todos: Todo[];
}

const initialState: TodoState = { // 定義初始狀態
    todos: [],
};

const todoReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case SET_TODOS: // 更新待辦事項列表
            return { ...state, todos: action.payload.todos };

        case UPDATE_TODO:
            const updatedTodos = state.todos.map((todo: Todo) => {
                if (todo.id === action.payload.id) {
                    return { ...todo, completed: action.payload.todo.completed };
                }
                return todo;
            });
            return { ...state, todos: updatedTodos };


        case EDIT_TODO_CHANGE:
            // 找到要編輯的待辦事項索引
            const editIndex = state.todos.findIndex((todo: Todo) => todo.id === action.payload.id);
            if (editIndex !== -1) {
                // 更新待辦事項的編輯內容
                // state.todos[editIndex].title = action.payload.value; 不建議的寫法
                const newTodos = [...state.todos];
                newTodos[editIndex] = { ...newTodos[editIndex], title: action.payload.title };
                return { ...state, todos: newTodos };
            }
            return state; // 返回更新後 todos 陣列的新狀態

        case TOGGLE_EDIT:
            // 找到要切換編輯狀態的待辦事項索引
            const toggleIndex = state.todos.findIndex((todo: Todo) => todo.id === action.payload);
            if (toggleIndex !== -1) {
                // 切換待辦事項的編輯狀態
                // state.todos[toggleIndex].editing = !state.todos[toggleIndex].editing; 不建議的寫法
                const newTodos = [...state.todos];
                newTodos[toggleIndex] = { ...newTodos[toggleIndex], editing: !newTodos[toggleIndex].editing };
                return { ...state, todos: newTodos };
            }
            return { ...state }; // 如果動作類型未匹配到任何一個 case，則返回當前的狀態。

        default:
            return state;
    }
};

export default todoReducer;

// 這樣的更新將確保我們的 reducer 在處理動作時返回新的狀態物件，而不會修改原始狀態物件，以符合 Redux 的不可變性原則