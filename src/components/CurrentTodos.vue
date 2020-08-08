<template>
    <div id="current-todos" class="container">
        <h3 v-if="todos.length > 0">Current({{todos.length}})</h3>
        <h3 v-else>There are no TODOS in your list yet</h3>
        <ul class="list-group">
            <li class="list-group-item" v-for="todo in todos" :key="todo.id">
                {{todo.title}}
                <div class="btn-group">
                    <button type="button" @click="edit(todo)" class="btn btn-default btn-sm">
                    <span class="glyphicon glyphicon-edit"></span> Edit
                    </button>
                    <button type="button" @click="complete(todo)" class="btn btn-default btn-sm">
                    <span class="glyphicon glyphicon-ok-circle"></span> Complete
                    </button>
                    <button type="button" @click="remove(todo)" class="btn btn-default btn-sm">
                    <span class="glyphicon glyphicon-remove-circle"></span> Remove
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CurrentTodos extends Vue {
    public edit(todo) {
        this.$store.dispatch("editTodo", todo);
    }

    public complete(todo) {
        this.$store.dispatch("completeTodo", todo);
    }

    public remove(todo) {
        this.$store.dispatch("removeTodo", todo);
    }

    get todos() {
        return this.$store.getters.todos;
    }
}
</script>
<style>
    .btn-group{
        float: right;
    }
</style>
