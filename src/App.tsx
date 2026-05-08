import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TableLibrary from "./pages/Library";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<TableLibrary />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
