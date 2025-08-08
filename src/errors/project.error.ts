export class ProjectError extends Error {
    constructor(name: string) {
        super("Проект с именем " + name + " уже существует");
        this.name = "ProjectError";
    }
}
