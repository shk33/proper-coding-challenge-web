<template>
    <div id="completedTodos-todos">
        <h3>Completed({{completedTodos.length}})</h3>
        <ul class="list-group">
            <li class="list-group-item" v-for="todo in completedTodos" :key="todo.id">
                {{todo.title}}
                <button type="button" @click="remove(todo)" class="btn btn-danger btn-sm">
                    <span class="glyphicon glyphicon-remove-circle"></span> Remove
                </button>
            </li>
        </ul>

    </div>
</template>

<script lang="ts">
import { ActionMethod } from "vuex";
import { Component, Vue } from "vue-property-decorator";
import { Todo } from "../interfaces/todo";
import { Getter, Action } from "vuex-class";

@Component
export default class CompletedTodos extends Vue {
    @Getter("completedTodos") completedTodos!: Array<Todo>
    @Action("removeTodo") removeTodoAction!: ActionMethod

    public remove(todo: Todo) {
        this.removeTodoAction(todo);
    }
}
</script>
