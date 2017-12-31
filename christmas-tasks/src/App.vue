<template>
  <div id="app">
    <img id="logo-tree" src="./assets/christmas-tree.png">
    <h1>Christmas Tasks</h1>
    <Tasks/>
  </div>
</template>

<script>
import Tasks from './components/Tasks'

export default {
  name: 'app',
  components: {
    Tasks
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#logo-tree {
  width: 10%;
}
</style>
