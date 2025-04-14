import { Routes, Route } from "react-router-dom";
import './App.css'
import { Dashboard } from "./pages/dashboard";



function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
