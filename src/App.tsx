import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import BoardPage from "./pages/boardPage";

export default function App(){
  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />}/>
        <Route path="/board/:id" element={<BoardPage />}/>
      </Route>
    </Routes>
  )
}