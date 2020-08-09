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
        ADD_TODO(state) {
            state.todos.push({
                id: "Fixed",
                title: state.newTodo,
                completed: false,
            });
        },
        EDIT_TODO(state, todo) {
            const todos = state.todos;
            todos.splice(todos.indexOf(todo), 1);
            state.todos = todos;
            state.newTodo = todo.title;
        },
        REMOVE_TODO(state, todo) {
            const todos = state.todos;
            todos.splice(todos.indexOf(todo), 1);
        },
        COMPLETE_TODO(state, todo) {
            todo.completed = !todo.completed;
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
        addTodo({ commit }) {
            commit("ADD_TODO");
        },
        editTodo({ commit }, todo) {
            commit("EDIT_TODO", todo);
        },
        removeTodo({ commit }, todo) {
            commit("REMOVE_TODO", todo);
        },
        completeTodo({ commit }, todo) {
            commit("COMPLETE_TODO", todo);
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
