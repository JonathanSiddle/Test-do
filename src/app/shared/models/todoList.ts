import { ToDoItem } from './todoItem';

export class ToDoList {
    constructor(
        public Name: string = '',
        public Owner: string = '',
        public ProjectId: number,
        public id?: number,
        public ListItems?: ToDoItem[]) {}
}
