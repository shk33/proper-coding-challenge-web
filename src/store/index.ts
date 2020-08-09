import Vue from "vue";
import Vuex from "vuex";
import TodoService from "../services/todo-service";
import { Todo } from "../interfaces/todo";
import { nanoid } from "nanoid";

Vue.use(Vuex);

interface State {
    loading: boolean;
    todos: Array<Todo>;
    newTodo: string;
}

export default new Vuex.Store<State>({
    state: {
        loading: false,
        todos: [],
        newTodo: "",
    },
    mutations: {
        LOADING_TASK(state) {
            state.loading = true;
        },
        COMPLETED_TASK(state) {
            state.loading = false;
        },
        GET_TODO(state, todo) {
            state.newTodo = todo;
        },
        ADD_TODO(state, todo) {
            state.todos.push(todo);
        },
        EDIT_TODO(state, todo) {
            const todos = state.todos;
            todos.splice(todos.indexOf(todo), 1);
            state.todos = todos;
            state.newTodo = todo.title;
        },
        REMOVE_TODO(state, todoId) {
            const { todos } = state;
            const indexToRemove = todos.findIndex(t => t.id === todoId);
            if (indexToRemove >= 0) {
                todos.splice(indexToRemove, 1);
            }
        },
        COMPLETE_TODO(state, todoId) {
            const { todos } = state;
            const todoToComplete = todos.find(t => t.id === todoId);

            if (todoToComplete) {
                todoToComplete.completed = true;
            }
        },
        CLEAR_TODO(state) {
            state.newTodo = "";
        },
        ADD_NEW_TODOS(state, todos) {
            state.todos.push(...todos);
        },
    },
    actions: {
        async getNewTodos({ commit }) {
            commit("LOADING_TASK");
            const newTodos = await TodoService.getNewTodos();
            commit("ADD_NEW_TODOS", newTodos);
            commit("COMPLETED_TASK");
        },
        getTodo({ commit }, todo) {
            commit("GET_TODO", todo);
        },
        async addTodo({ commit, state }) {
            commit("LOADING_TASK");
            const newTodo = await TodoService.addTodo({
                id: nanoid(),
                title: state.newTodo,
                completed: false,
            });
            commit("ADD_TODO", newTodo);
            commit("COMPLETED_TASK");
        },
        editTodo({ commit }, todo) {
            commit("EDIT_TODO", todo);
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
        newTodo: state => state.newTodo,
        todos: state => state.todos.filter((todo) => { return !todo.completed; }),
        completedTodos: state => state.todos.filter((todo) => { return todo.completed; }),
    },
    modules: {},
});
