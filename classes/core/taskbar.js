import Task from "~/classes/core/task.js";

export default class Taskbar {
    constructor() {
        this.tasks = [];
        this.element = document.querySelector('#taskbar');

        this.addTask(new Task('/icons/windows.png', '/icons/windows.png', 'Windows', 25));
        this.addTask(new Task('/icons/search_light.ico', '/icons/search_dark.ico', 'Search', 25));
        this.addTask(new Task('/icons/edge.svg', '/icons/edge.svg', 'Edge', 30));
    }

    addTask(task){
        this.tasks.push(task);
    }

    setElement(element) {
        this.element = element;
    }
}