import { ToDoProject } from './../../models/todoProject';

export class ProjectDialogData {
    constructor(
    public projects: ToDoProject[],
    public projectName: string,
    public editMode: boolean) {}
}
