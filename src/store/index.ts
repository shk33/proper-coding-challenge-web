import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

interface Todo {
    id: String,
    title: String,
    completed: boolean
}

interface State {
    foo: boolean;
    todos: Array<Todo>,
    newTodo: String
}

export default new Vuex.Store<State>({
    state: {
        foo: true,
        todos: [],
        newTodo: ''
    },
    mutations: {},
    actions: {},
    modules: {},
});
