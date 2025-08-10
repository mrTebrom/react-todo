export interface ITask {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    updateAt: string;
}

export interface CreateTask {
    title: string;
    description?: string;
}
