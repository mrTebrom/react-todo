import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    IProject,
    CreateProject,
    ICreateProjectResponse,
} from "../type/project.type";

export const projectApi = createApi({
    reducerPath: "projectAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    tagTypes: ["Project"],
    endpoints: (build) => ({
        getAllProjects: build.query<IProject[], void>({
            // здесь IProject[]
            query: () => ({
                url: `/projects`,
            }),
            providesTags: () => ["Project"],
        }),
        createProject: build.mutation<ICreateProjectResponse, { name: string }>(
            {
                // создаём с CreateProject
                query: (post) => ({
                    url: `/projects`,
                    method: "POST",
                    body: post,
                }),
                invalidatesTags: ["Project"],
            }
        ),
        updateProject: build.mutation<IProject, IProject>({
            query: (post) => ({
                url: `/projects/${post.id}`,
                method: "PUT",
                body: post,
            }),
            invalidatesTags: ["Project"],
        }),
        deleteProject: build.mutation<IProject, IProject>({
            query: (post) => ({
                url: `/projects/${post.id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Project"],
        }),
    }),
});

export const {
    useCreateProjectMutation,
    useGetAllProjectsQuery,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectApi;
