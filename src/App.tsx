import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TableLibrary from "./pages/Library";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <HashRouter>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<TableLibrary />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
