export class ToDoItem {
    constructor(
        public Name: string = '',
        public Complete: boolean = false,
        public ProjectListId: number,
        public id?: Number) {}
}
