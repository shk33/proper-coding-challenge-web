<template>
    <div class="home">
        <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand">My Todos</a>
        </nav>
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <AddTodo></AddTodo>
                </div>
            </div>
            <div class="row">
                <div v-show="isLoading" class="col-sm-12">
                    <div class="d-flex justify-content-center">
                        <div class="spinner-border text-success" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>

                <div class="col-sm-6">
                    <CurrentTodos></CurrentTodos>
                </div>
                <div class="col-sm-6">
                    <CompletedTodos></CompletedTodos>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import { State } from "vuex-class";
import AddTodo from "../components/AddTodo.vue";
import CurrentTodos from "../components/CurrentTodos.vue";
import CompletedTodos from "../components/CompletedTodos.vue";

@Component({
    components: {
        AddTodo,
        CurrentTodos,
        CompletedTodos,
    },
})
export default class HomeView extends Vue {
    @State(state => state.loading) isLoading
}
</script>

<style scoped>
.home {
    line-height: 150%;
}
</style>
