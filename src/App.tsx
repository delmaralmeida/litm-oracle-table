import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TableLibrary from "./pages/Library";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<TableLibrary />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
