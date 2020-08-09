<template>
    <div id="completedTodos-todos">
        <h3>Completed({{completedTodos.length}})</h3>
        <ul class="list-group">
            <TodoItem v-for="todo in completedTodos" :key="todo.id" :todo="todo"></TodoItem>
        </ul>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Todo } from "../interfaces/todo";
import { Getter } from "vuex-class";
import TodoItem from "./TodoItem.vue";

@Component({
    components: {
        TodoItem,
    },
})
export default class CompletedTodos extends Vue {
    @Getter("completedTodos") completedTodos!: Array<Todo>
}
</script>
