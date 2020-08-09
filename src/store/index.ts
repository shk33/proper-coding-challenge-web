import Vue from "vue";
import Vuex from "vuex";
import TodoService from "../services/todo-service";
import { Todo } from "../interfaces/todo";
import { nanoid } from "nanoid";

Vue.use(Vuex);

interface State {
    loading: boolean;
    todos: Array<Todo>;
}

export default new Vuex.Store<State>({
    state: {
        loading: false,
        todos: [],
    },
    mutations: {
        LOADING_TASK(state) {
            state.loading = true;
        },
        COMPLETED_TASK(state) {
            state.loading = false;
        },
        ADD_TODO(state, todo) {
            const { todos } = state;
            state.todos = [todo, ...todos];
            TodoService.saveTodosToLocalStorage(state.todos);
        },
        EDIT_TODO(state, todo) {
            const { todos } = state;
            const indexToUpdate = todos.findIndex(t => t.id === todo.id);
            if (indexToUpdate >= 0) {
                Vue.set(todos, indexToUpdate, todo);
                TodoService.saveTodosToLocalStorage(state.todos);
            }
        },
        REMOVE_TODO(state, todoId) {
            const { todos } = state;
            const indexToRemove = todos.findIndex(t => t.id === todoId);
            if (indexToRemove >= 0) {
                todos.splice(indexToRemove, 1);
                TodoService.saveTodosToLocalStorage(state.todos);
            }
        },
        COMPLETE_TODO(state, todoId) {
            const { todos } = state;
            const todoToComplete = todos.find(t => t.id === todoId);

            if (todoToComplete) {
                todoToComplete.completed = true;
                TodoService.saveTodosToLocalStorage(state.todos);
            }
        },
        ADD_NEW_TODOS(state, todos) {
            state.todos.push(...todos);
            TodoService.saveTodosToLocalStorage(state.todos);
        },
    },
    actions: {
        initStore({ commit }) {
            const todos = TodoService.getTodosFromLocalStorage();
            if (todos) {
                commit("ADD_NEW_TODOS", todos);
            }
        },
        async getNewTodos({ commit }) {
            commit("LOADING_TASK");
            const newTodos = await TodoService.getNewTodos();
            commit("ADD_NEW_TODOS", newTodos);
            commit("COMPLETED_TASK");
        },
        async addTodo({ commit }, title) {
            commit("LOADING_TASK");
            const newTodo = await TodoService.addTodo({
                id: nanoid(),
                title: title,
                completed: false,
            });
            commit("ADD_TODO", newTodo);
            commit("COMPLETED_TASK");
        },
        async editTodo({ commit }, todo) {
            commit("LOADING_TASK");
            await TodoService.editTodo(todo);
            commit("EDIT_TODO", todo);
            commit("COMPLETED_TASK");
        },
        async removeTodo({ commit }, todo) {
            commit("LOADING_TASK");
            await TodoService.removeTodo(todo);
            commit("REMOVE_TODO", todo.id);
            commit("COMPLETED_TASK");
        },
        async completeTodo({ commit }, todo) {
            commit("LOADING_TASK");
            await TodoService.completeTodo(todo);
            commit("COMPLETE_TODO", todo.id);
            commit("COMPLETED_TASK");
        },
        clearTodo({ commit }) {
            commit("CLEAR_TODO");
        },
    },
    getters: {
        todos: state => state.todos.filter((todo) => { return !todo.completed; }),
        completedTodos: state => state.todos.filter((todo) => { return todo.completed; }),
    },
    modules: {},
});
