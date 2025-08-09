import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProject, CreateProject } from "../type/project.type";

export const projectApi = createApi({
    reducerPath: "projectAPI",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
    tagTypes: ["Project"],
    endpoints: (build) => ({
        getAll: build.query<IProject[], void>({
            // здесь IProject[]
            query: () => ({
                url: `/projects`,
            }),
            providesTags: () => ["Project"],
        }),
        createPost: build.mutation<IProject, CreateProject>({
            // создаём с CreateProject
            query: (post) => ({
                url: `/projects`,
                method: "POST",
                body: post,
            }),
            invalidatesTags: ["Project"],
        }),
        updatePost: build.mutation<IProject, IProject>({
            query: (post) => ({
                url: `/projects/${post.id}`,
                method: "PUT",
                body: post,
            }),
            invalidatesTags: ["Project"],
        }),
        deletePost: build.mutation<IProject, IProject>({
            query: (post) => ({
                url: `/projects/${post.id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Project"],
        }),
    }),
});

export const {
    useCreatePostMutation,
    useGetAllQuery,
    useUpdatePostMutation,
    useDeletePostMutation,
} = projectApi;
