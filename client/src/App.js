import Home from "./components/home";
import StatsPage from "./components/statsPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/statsPage/:name" element={<StatsPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
