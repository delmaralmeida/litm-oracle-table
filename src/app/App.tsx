import { HashRouter } from "react-router-dom";
import { Navbar } from "@/shared";
import AppRouter from "./AppRouter";

function App() {
  return (
    <HashRouter>
      <div className="app">
        <Navbar />
        <AppRouter />
      </div>
    </HashRouter>
  );
}

export default App;
