import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";

export default function App(){
  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />}/>
      </Route>
    </Routes>
  )
}