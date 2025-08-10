import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ITask, CreateTask } from "../type/task.type";

export const taskApi = createApi({
    reducerPath: "taskAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    tagTypes: ["Task"],
    endpoints: (build) => ({
        getTasksByProject: build.query<ITask[], number>({
            query: (projectId) => `/tasks/project/${projectId}`,
            providesTags: ["Task"],
        }),
        getOneTask: build.query<ITask, number>({
            query: (id) => `/tasks/${id}`,
            providesTags: ["Task"],
        }),
        createTask: build.mutation<ITask, CreateTask>({
            query: (task) => ({
                url: `/tasks`,
                method: "POST",
                body: task,
            }),
            invalidatesTags: ["Task"],
        }),
        updateTask: build.mutation<ITask, ITask>({
            query: (task) => ({
                url: `/tasks/${task.id}`,
                method: "PATCH",
                body: task,
            }),
            invalidatesTags: ["Task"],
        }),
        deleteTask: build.mutation<void, number>({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Task"],
        }),
    }),
});

export const {
    useGetTasksByProjectQuery,
    useGetOneTaskQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = taskApi;
