import { ToDoItem } from './todoItem';

export class ToDoList {
    constructor(public Id: number, public Name: string, public Owner: string, public Items: ToDoItem[]) {}
}
