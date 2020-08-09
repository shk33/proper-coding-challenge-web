<template>
    <li class="list-group-item">
        <span v-show="!isEditing" >{{todo.title}}</span>
        <div v-show="isEditing" class="input-group input-group-sm mb-3">
            <input
                v-model="newTitle"
                type="text"
                class="form-control"
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
            >
                <div class="input-group-append">
                <button @click="edit" class="btn btn-outline-success" type="button">Modify</button>
                <button @click="cancelEdit" class="btn btn-outline-danger" type="button">Cancel</button>
            </div>
        </div>
        <div class="btn-group" v-show="!isEditing">
            <button v-if="!todo.completed" type="button" @click="showEditForm" class="btn btn-primary btn-sm">
                <span class="glyphicon glyphicon-edit"></span> Edit
            </button>
            <button v-if="!todo.completed" type="button" @click="complete" class="btn btn-success btn-sm">
                <span class="glyphicon glyphicon-ok-circle"></span> Complete
            </button>
            <button type="button" @click="remove" class="btn btn-danger btn-sm">
                <span class="glyphicon glyphicon-remove-circle"></span> Remove
            </button>
        </div>
    </li>
</template>

<script lang="ts">
import { ActionMethod } from "vuex";
import { Component, Vue, Prop } from "vue-property-decorator";
import { Todo } from "../interfaces/todo";
import { Action } from "vuex-class";

@Component
export default class TodoItem extends Vue {
    @Prop({ required: true }) readonly todo!: Todo

    @Action("editTodo") editTodoAction!: ActionMethod
    @Action("completeTodo") completeTodoAction!: ActionMethod
    @Action("removeTodo") removeTodoAction!: ActionMethod

    private isEditing = false;
    private newTitle = "";

    public showEditForm() {
        this.isEditing = true;
        this.newTitle = this.todo.title;
    }

    public cancelEdit() {
        this.isEditing = false;
        this.newTitle = "";
    }

    public edit() {
        if (this.newTitle) {
            this.editTodoAction({
                id: this.todo.id,
                title: this.newTitle,
                completed: false,
            });
            this.isEditing = false;
            this.newTitle = "";
        }
    }

    public complete() {
        this.completeTodoAction(this.todo);
    }

    public remove() {
        this.removeTodoAction(this.todo);
    }
}
</script>
<style>
    .btn-group{
        float: right;
    }
</style>
