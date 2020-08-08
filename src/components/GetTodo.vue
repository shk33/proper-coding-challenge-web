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

@Component
export default class GetTodo extends Vue {
    public getTodo(e) {
        this.$store.dispatch("getTodo", e.target.value);
    }

    public addTodo() {
        this.$store.dispatch("addTodo");
        this.$store.dispatch("clearTodo");
    }

    get newTodo() {
        return this.$store.getters.newTodo;
    }
}
</script>
