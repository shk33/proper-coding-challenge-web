<template>
    <div id="get-todo" class="container">
        <input class="form-control"
               :value="newTodo"
               @change="getTodo"
               placeholder="Add your new TODO here...">
        <button class="btn btn-primary" @click="addTodo">Add Todo</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action } from "vuex-class";

@Component
export default class GetTodo extends Vue {
    @State(state => state.newTodo) newTodoText!: string
    @Action("addTodo") addTodoAction: any
    @Action("getTodo") getTodoAction: any
    @Action("clearTodo") clearTodoAction: any

    public getTodo(e: Event) {
        this.getTodoAction(e.target.value);
    }

    public addTodo() {
        if (this.newTodoText) {
            this.addTodoAction();
            this.clearTodoAction();
        }
    }

    get newTodo() {
        return this.$store.getters.newTodo;
    }
}
</script>
