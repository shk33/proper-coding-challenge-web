import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

interface State {
    foo: boolean;
}

export default new Vuex.Store<State>({
    state: {
        foo: true,
    },
    mutations: {},
    actions: {},
    modules: {},
});
