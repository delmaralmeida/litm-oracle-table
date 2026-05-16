import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Collections from "./pages/Collections";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <HashRouter>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/collections" element={<Collections />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
