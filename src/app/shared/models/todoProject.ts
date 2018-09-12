import { ToDoList } from './todoList';

export class ToDoProject {
    constructor(public id: number = 0,
        public Name: string = '',
        public Owner: string = '',
        public Tags: string[] = [],
        public ProjectLists: ToDoList[] = []) {}
}
