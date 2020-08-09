<template>
    <div id="completed-todos">
        <h3>Completed({{completed.length}})</h3>
        <ul class="list-group">
            <li class="list-group-item" v-for="todo in completed" :key="todo.id">
                {{todo.title}}
                <button type="button" @click="remove(todo)" class="btn btn-default btn-sm">
                <span class="glyphicon glyphicon-remove-circle"></span> Remove
                </button>
            </li>
        </ul>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CompletedTodos extends Vue {
    public remove(todo) {
        this.$store.dispatch("removeTodo", todo);
    }

    get completed() {
        return this.$store.getters.completedTodos;
    }
}
</script>
