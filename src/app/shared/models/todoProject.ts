import { ToDoList } from './todoList';

export class ToDoProject {
    constructor
        (public Name: string = '',
        public Owner: string = '',
        public Tags: string[] = [],
        public id?: number,
        public ProjectLists?: ToDoList[]
        ) {}
}
