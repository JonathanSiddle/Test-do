import { ToDoList } from './todoList';

export class ProjectLists {
    constructor(
        public id: Number = 0,
        public Lists: Array<ToDoList>) {}
}
