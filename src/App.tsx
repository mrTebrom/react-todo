import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LayoutApp } from "./layout/layout";
import { ProjectPage } from "./pages/project.page";

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutApp />}>
                    <Route path="/project/:id" element={<ProjectPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
