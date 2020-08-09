<template>
    <div id="get-todo" class="container">
        <input class="form-control"
               v-model="title"
               placeholder="Add your new TODO here...">
        <button class="btn btn-primary" @click="addTodo">Add Todo</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";

@Component
export default class AddTodo extends Vue {
    @Action("addTodo") addTodoAction: any
    @Action("clearTodo") clearTodoAction: any

    private title = "";

    public addTodo() {
        if (this.title) {
            this.addTodoAction(this.title);
            this.title = "";
        }
    }

    get newTodo() {
        return this.$store.getters.newTodo;
    }
}
</script>
