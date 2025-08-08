import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Layout } from './layout/layout';

export const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
      </Route>
    </Routes>
  </BrowserRouter>
}
