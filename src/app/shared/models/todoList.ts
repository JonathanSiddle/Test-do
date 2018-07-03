import { ToDoItem } from './todoItem';

export class ToDoList {
    constructor(public Id: number = 0,
        public Name: string = '',
        public Owner: string = '',
        public Items: ToDoItem[] = Array<ToDoItem>()) {}
}