import axios from "axios";
import { Todo } from "../interfaces/todo";
import { nanoid } from "nanoid";

const TODO_API_URL = "https://jsonplaceholder.typicode.com/todos";
const TODO_LOCAL_STORAGE_KEY = "todos";

export default class TodoService {
    static getTodosFromLocalStorage() {
        const todos = JSON.parse(localStorage.getItem(TODO_LOCAL_STORAGE_KEY) || "[]");
        return todos;
    }

    static saveTodosToLocalStorage(todos: Array<Todo>) {
        localStorage.setItem(TODO_LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }

    static async getNewTodos() {
        const response = await axios.get(TODO_API_URL, {
            params: {
                _limit: 20,
            },
        });
        const newTodos = response.data.map((t: Todo) => ({
            id: nanoid(),
            title: t.title,
            completed: false,
        }));

        return newTodos;
    }

    static async addTodo(todo: Todo) {
        const response = await axios.post(TODO_API_URL, {
            title: todo.title,
            completed: false,
        });
        const newTodo = response.data;
        return { ...newTodo, id: nanoid() };
    }

    static async editTodo(todo: Todo) {
        await axios.patch(`${TODO_API_URL}/${todo.id}`, {
            title: todo.title,
            completed: todo.completed,
        });
    }

    static async removeTodo(todo: Todo) {
        await axios.delete(`${TODO_API_URL}/${todo.id}`);
    }

    static async completeTodo(todo: Todo) {
        await axios.patch(`${TODO_API_URL}/${todo.id}`, {
            completed: true,
        });
    }
}
