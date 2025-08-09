export interface IProject {
    id: number;
    name: string;
}

export interface CreateProject {
    name: string;
}
export interface ICreateProjectResponse {
    message: string;
    project: IProject;
}
