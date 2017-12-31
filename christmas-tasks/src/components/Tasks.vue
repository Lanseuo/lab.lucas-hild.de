<template>
  <div id="tasks">
    <input v-model="newTask" v-on:keyup.enter="addTask" type="text" placeholder="New Task">

    <h3>Uncompleted Tasks</h3>

    <ul>
      <li v-for="task in tasks" v-if="task.completed == false" :class="{ 'completed': task.completed }">
        <svg class="checkbox" @click="completeTask(task)" v-if="task.completed" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>

        <svg class="checkbox" @click="completeTask(task)" v-else="" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
        <span @dblclick="editTask(task)">{{ task.description }}</span>

        <svg @click="deleteTask(task)" class="delete-button" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </li>
    </ul>

    <h3>Completed Tasks</h3>

    <ul>
      <li v-for="task in tasks" v-if="task.completed" :class="{ 'completed': task.completed }">
        <svg class="checkbox" @click="completeTask(task)" v-if="task.completed" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>

        <svg class="checkbox" @click="completeTask(task)" v-else="" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
        <span @dblclick="editTask(task)">{{ task.description }}</span>

        <svg @click="deleteTask(task)" class="delete-button" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'tasks',

    data() {
      return {
        tasks: [],
        newTask: undefined,
      }
    },

    methods: {
      completeTask(task) {
        // Toggle completed
        task.completed = !task.completed

        this.saveTasks()
      },

      addTask() {
        console.log(this)
        this.tasks.push({
          description: this.newTask,
          completed: false
        })

        this.newTask = ''

        this.saveTasks()
      },

      deleteTask(task) {
        var index = this.tasks.indexOf(task)
        if (index > -1) {
          this.tasks.splice(index, 1);
        }

        this.saveTasks()
      },

      editTask(task) {
        // Unfocus element
        var inputField = document.createElement('input');
        inputField.setAttribute('id', 'blur-hack');
        inputField.setAttribute('style', 'position: absolute; opacity: 0;');
        document.getElementById('app').appendChild(inputField);
        document.getElementById('blur-hack').focus();

        var taskDescription = prompt('Edit task', task.description)
        if (taskDescription) {
          task.description =  taskDescription
        }

        this.saveTasks();
      },

      saveTasks() {
        // Save tasks to localStorage
        var stringTasks = JSON.stringify(this.tasks)
        localStorage.setItem('tasks', stringTasks)
      }
    },

    created() {
      // Get tasks from localStorage
      var stringTasks = localStorage.getItem('tasks')
      if (JSON.parse(stringTasks)) {
        this.tasks = JSON.parse(stringTasks)
      } else {
        this.tasks = []
      }
    }
  }
</script>

<style>
  ul {
    list-style-type: none;
    text-align: left;
    margin: 30px auto;
    display: block;
    width: 95%;
    max-width: 400px;
    padding-left:0;
  }

  li {
    position: relative;
  }

  .completed {
    color: rgb(122, 122, 122)
  },

  .checkbox {
    position: absolute;
    top: 50%;
    bottom: 50%;
    transform: translate(-50%, -50%);
    line-height: 80px;
    fill: rgb(140, 140, 140);
  }

  .checkbox:hover {

    /*color: rgb(140, 140, 140);*/
  }

  .delete-button {
    position: absolute;
    right: 0;
    fill: rgb(140, 140, 140);
  }

  .delete-button:hover {
    fill: rgb(194, 53, 103);
  }

  input {
    text-align: center;
  }
</style>
