import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { projectApi } from "../service/project.service";

const rootReducer = combineReducers({
    [projectApi.reducerPath]: projectApi.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(projectApi.middleware),
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
