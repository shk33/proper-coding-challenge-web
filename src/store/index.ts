import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

interface State {
    foo: boolean;
    todos: Array<Todo>;
    newTodo: string;
}

const TODO_API_URL = "https://jsonplaceholder.typicode.com/todos";

export default new Vuex.Store<State>({
    state: {
        foo: true,
        todos: [],
        newTodo: "",
    },
    mutations: {
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
            const response = await axios.get(TODO_API_URL, {
                params: {
                    _limit: 20,
                },
            });
            const newTodos = response.data.map(t => ({
                id: t.id,
                title: t.title,
                completed: false,
            }));
            commit("ADD_NEW_TODOS", newTodos);
        },
        getTodo({ commit }, todo) {
            commit("GET_TODO", todo);
        },
        async addTodo({ commit, state }) {
            const response = await axios.post(TODO_API_URL, {
                title: state.newTodo,
                completed: false,
            });
            const newTodo = response.data;
            commit("ADD_TODO", newTodo);
        },
        editTodo({ commit }, todo) {
            commit("EDIT_TODO", todo);
        },
        async removeTodo({ commit }, todo) {
            await axios.delete(`${TODO_API_URL}/${todo.id}`);
            commit("REMOVE_TODO", todo.id);
        },
        async completeTodo({ commit }, todo) {
            const response = await axios.patch(`${TODO_API_URL}/${todo.id}`, {
                completed: true,
            });
            const completedTodo = response.data;
            commit("COMPLETE_TODO", completedTodo.id);
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
