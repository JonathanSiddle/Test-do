export class ToDoProject {
    constructor(public id: number = 0,
        public Name: string = '',
        public Owner: string = '',
        public Tags: string[] = []) {}
}

/**
 * Fucntion will take projects and return a array of tags with
 * the total number of each across projects.
 * @param projects List of ToDoProjects as input
 * @returns Array of tags as string with number in paraenthasis e.g. Shopping (5).
 */
export function getListOfTagsForProjects(projects: ToDoProject[]): string[] {
    const tagsAndCount = new Map<string, number>();

    projects.forEach(p => p.Tags.forEach(t => tagsAndCount.set(t, 0)));
    projects.forEach(p => p.Tags.forEach(t => {
        const count = tagsAndCount.get(t);
        tagsAndCount.set(t, count + 1);
    }));

    const tagsCountString: string[] = [];
    tagsAndCount.forEach((k, v) => tagsCountString.push(k + ' (' + v + ')'));
    return tagsCountString;
}
