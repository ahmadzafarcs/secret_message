import { BrowserRouter, Routes, Route } from "react-router-dom"
import GlobalLayout from "./components/GlobalLayout"
import Create from "./components/Create"
import View from "./components/View"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<GlobalLayout />}>
          <Route path="/" element={<Create />} />
          <Route path="/view/:id" element={<View />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}