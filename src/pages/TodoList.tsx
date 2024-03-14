"use client"

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleEdit,
    editTodoChange
} from "../actions/todoActions";

const TodoList: React.FC = () => {
    const [newTodo, setNewTodo] = useState(""); // 輸入框的值
    const todos = useSelector((state: any) => state.todos.todos); // 從 store 中獲取 todos 狀態，包含了待辦事項的數據
    const dispatch = useDispatch(); // 獲取 dispatch 函式，用於分發動作到 store

    const handleInputChange = (e: any) => {
        setNewTodo(e.target.value); // 更新 newTodo 狀態，反映輸入框值的變化
    };

    const handleAddTodo = () => {
        dispatch(addTodo(newTodo)); // 將新的待辦事項添加到 store 中
        setNewTodo(""); // 將 newTodo 狀態重置為空字串
        setTimeout(() => {
            window.location.reload(); // 重新加载页面
        }, 500);
    };

    const handleUpdateTodo = (id: any, title: any, completed: any) => {
        console.log("handleUpdateTodo", id, title, completed);
        dispatch(updateTodo(id, { title, completed: !completed })); // 將特定待辦事項的完成狀態反轉，同時保留標題不變。我們將待辦事項的 id、標題和完成狀態作為參數傳遞
    };

    const handleDeleteTodo = (id: any) => {
        dispatch(deleteTodo(id)); // 從 store 中刪除特定的待辦事項
    };

    // 處理編輯待辦事項的變更
    const handleEditTodoChange = (id: any, title: any, value: any) => {
        dispatch(editTodoChange(id, title, value)); // 將特定待辦事項的編輯內容進行更新。將待辦事項的 id、標題和變化的值作為參數傳遞
    };

    // 切換待辦事項的編輯狀態
    const handleToggleEdit = (id: any) => {
        // // 找到相應的待辦事項物件
        // const todo = todos.find((item) => item.id === id);
        // if (todo) {
        //     // 先觸發更新待辦事項，包含標題和完成狀態
        //     dispatch(updateTodo(id, { completed: todo.completed, title: todo.title }));
        // }

        // 再切換編輯狀態
        dispatch(toggleEdit(id));
    };

    useEffect(() => {
        dispatch(fetchTodos()); // 在組件首次渲染和 dispatch 函式改變時獲取最新的待辦事項列表
    }, [dispatch]);

    return (
        <div className="p-4 rounded-lg">
            <h2 className="text-4xl font-bold mb-4 text-[#0075ff]">To-Do List</h2>
            <div className="flex h-12 mb-5">
                <input
                    type="text"
                    value={newTodo}
                    onChange={handleInputChange}
                    className="h-full w-full grow p-2 rounded mb-2 mr-3"
                />
                <button
                    onClick={handleAddTodo}
                    className="flex-none w-36 bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                >
                    Add Todo
                </button>
            </div>
            <ul>
                {todos.map((todo: any) => (
                    <li key={todo.id} className="flex items-center mb-4 pl-4 border-b border-dashed border-gray-400 pb-4">

                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleUpdateTodo(todo.id, todo.title, todo.completed)}
                            className="mr-2 todoInput"
                        />

                        {/* 用條件判斷來切換顯示狀態 */}
                        {todo.editing ? (
                            <input
                                type="text"
                                value={todo.title}
                                onChange={(e) => handleEditTodoChange(todo.id, e.target.value, todo.title)}
                                className="border border-gray-300 rounded p-1"
                            />
                        ) : (
                            <span className={`text-xl ${todo.completed ? 'line-through' : ''}`}>
                                {todo.title}
                            </span>
                        )}
                        <button
                            onClick={() => handleDeleteTodo(todo.id)}
                            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded ml-auto transition"
                        >
                            Delete
                        </button>

                        {/* 新增更新按鈕，用於切換編輯狀態 */}
                        <button
                            onClick={() => handleToggleEdit(todo.id)}
                            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded ml-2 transition"
                        >
                            {todo.editing ? 'Save' : 'Edit'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
