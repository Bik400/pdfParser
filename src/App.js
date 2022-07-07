import { BrowserRouter, Routes, Route } from "react-router-dom";
import FileUpload from "./components/FileUpload.js";
import Dashboard from "./components/Dashboard.js";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FileUpload/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;