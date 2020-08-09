<template>
    <div id="current-todos" class="container">
        <h3 v-if="todos.length > 0">Current({{todos.length}})</h3>
        <div v-else>
            <h3>There are no TODOS in your list yet</h3>
            <p>What if I just generate a bunch of new tasks for you?</p>
            <p>Like the idea? Yeah. Just push the button</p>
            <button type="button" @click="generateTodos()" class="btn btn-success btn-sm">
                <span class="glyphicon glyphicon-ok-circle"></span> Give me some tasks to do
            </button>
        </div>
        <ul class="list-group">
            <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo"></TodoItem>
        </ul>
    </div>
</template>

<script lang="ts">
import { ActionMethod } from "vuex";
import { Component, Vue } from "vue-property-decorator";
import { Todo } from "../interfaces/todo";
import { Getter, Action } from "vuex-class";
import TodoItem from "./TodoItem.vue";

@Component({
    components: {
        TodoItem,
    },
})
export default class CurrentTodos extends Vue {
    @Getter("todos") todos!: Array<Todo>
    @Action("getNewTodos") getNewTodosAction!: ActionMethod

    public generateTodos() {
        this.getNewTodosAction();
    }
}
</script>
<style>
    .btn-group{
        float: right;
    }
</style>
