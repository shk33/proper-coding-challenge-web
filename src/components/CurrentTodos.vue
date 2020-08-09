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
            <li class="list-group-item" v-for="todo in todos" :key="todo.id">
                <span v-show="editingTodoId !== todo.id || !isEditing" >{{todo.title}}</span>
                <div v-show="editingTodoId === todo.id" class="input-group input-group-sm mb-3">
                    <input
                        v-model="newText"
                        type="text"
                        class="form-control"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                    >
                     <div class="input-group-append">
                        <button @click="edit(todo)" class="btn btn-outline-success" type="button">Modify</button>
                        <button @click="cancelEdit" class="btn btn-outline-danger" type="button">Cancel</button>
                    </div>
                </div>
                <div class="btn-group" v-show="editingTodoId !== todo.id || !isEditing">
                    <button type="button" @click="showEditForm(todo)" class="btn btn-primary btn-sm">
                        <span class="glyphicon glyphicon-edit"></span> Edit
                    </button>
                    <button type="button" @click="complete(todo)" class="btn btn-success btn-sm">
                        <span class="glyphicon glyphicon-ok-circle"></span> Complete
                    </button>
                    <button type="button" @click="remove(todo)" class="btn btn-danger btn-sm">
                        <span class="glyphicon glyphicon-remove-circle"></span> Remove
                    </button>
                </div>
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
export default class CurrentTodos extends Vue {
    @Getter("todos") todos!: Array<Todo>
    @Action("getNewTodos") getNewTodosAction!: ActionMethod
    @Action("editTodo") editTodoAction!: ActionMethod
    @Action("completeTodo") completeTodoAction!: ActionMethod
    @Action("removeTodo") removeTodoAction!: ActionMethod

    private isEditing = false;
    private editingTodoId = "";
    private newText = "";

    public showEditForm(todo: Todo) {
        this.isEditing = true;
        this.editingTodoId = todo.id;
        this.newText = todo.title;
    }

    public cancelEdit() {
        this.isEditing = false;
        this.editingTodoId = "";
        this.newText = "";
    }

    public edit(todo: Todo) {
        if (this.newText) {
            this.editTodoAction({
                id: todo.id,
                title: this.newText,
                completed: false,
            });
            this.isEditing = false;
            this.editingTodoId = "";
            this.newText = "";
        }
    }

    public complete(todo: Todo) {
        this.completeTodoAction(todo);
    }

    public remove(todo: Todo) {
        this.removeTodoAction(todo);
    }

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
