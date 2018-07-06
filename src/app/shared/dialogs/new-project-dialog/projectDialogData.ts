import { ToDoProject } from './../../models/todoProject';

export interface ProjectDialogData {
    projects: ToDoProject[];
    newProjectName: string;
}
