import { BrowserRouter, Routes, Route } from "react-router-dom"

import { LayoutApp } from './layout/layout';

export const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<LayoutApp />}>
      </Route>
    </Routes>
  </BrowserRouter>
}
