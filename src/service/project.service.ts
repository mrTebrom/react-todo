import { ProjectError } from "../errors/project.error";
export interface IProject {
    id: number;
    name: string;
}

class ProjectService {
    data: IProject[] = [];

    constructor() {
        this.init();
    }

    // инициализация проекта
    init() {
        const local = localStorage.getItem("projects");
        if (!local) {
            this.data = [];
        } else {
            this.data = JSON.parse(local) as IProject[];
        }
    }

    // Получить все проекты
    get(): IProject[] {
        return this.data;
    }

    // Создать новый проект
    create(name: string): IProject {
        const normalized = name.trim().toLowerCase();
        const exists = this.data.find(
            (item) => item.name.trim().toLowerCase() === normalized
        );
        if (exists) throw new ProjectError(`${name} уже существует!`);

        const newProject: IProject = {
            id: this.generateId(),
            name: normalized,
        };
        this.data.push(newProject);
        this.save();
        return newProject;
    }

    // Обновить проект по id
    update(id: number, name: string): boolean {
        const normalized = name.trim().toLowerCase();
        const exists = this.data.find(
            (item) =>
                item.name.trim().toLowerCase() === normalized && item.id !== id
        );
        if (exists) throw new ProjectError(`${name} уже существует!`);

        const project = this.data.find((p) => p.id === id);
        if (!project) return false;

        project.name = normalized;
        this.save();
        return true;
    }

    // Удалить проект по id
    delete(id: number): boolean {
        const index = this.data.findIndex((p) => p.id === id);
        if (index === -1) return false;
        this.data.splice(index, 1);
        this.save();
        return true;
    }

    // Сохранить данные в localStorage
    private save() {
        localStorage.setItem("projects", JSON.stringify(this.data));
    }

    private generateId(): number {
        if (this.data.length === 0) return 1;
        const ids = this.data.map((item) => item.id);
        const maxId = Math.max(...ids);
        return maxId + 1;
    }
}

export default new ProjectService();
