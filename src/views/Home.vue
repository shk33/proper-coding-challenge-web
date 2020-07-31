<template>
    <div class="home">

        <h1>Instructions</h1>

        <p>
            Now that you have the project set up and running, the world is your oyster.
        </p>

        <p>
            For this challenge, use the the publicly available API
            <a href="https://jsonplaceholder.typicode.com/">jsonplaceholder.typicode.com</a> to
            create a little demo app that displays a list of tasks (or todos as the api calls it).
            <br/>
            Hint you are going to need: the <code>/todos</code> endpoint.
        </p>
        <p>
            Be as creative as you would like with the way the app works. Note that while the API does
            support all endpoints it might not permanently alter resources.
        </p>
        <p>
            This challenge is largely to see some of your code and how you approach tasks. This can
            be as wild and as simple as you want it to be.
        </p>
        <p>
            Maybe you can drag and drop tasks to change the order? Maybe you can add sub lists?
        </p>

        <h3>Optional</h3>
        <ul>
            <li>This project is intended to be written in TypeScript, though not a must</li>
            <li>At Proper we use <a href="https://www.npmjs.com/package/vuex-class">vuex-class</a> decorators for easy store access from template. Feel free to use those.</li>
        </ul>
    </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

@Component
export default class HomeView extends Vue {

}
</script>

<style scoped>
.home {
    max-width: 600px;
    line-height: 150%;
}
</style>
