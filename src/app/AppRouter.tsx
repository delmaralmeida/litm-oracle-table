import { Routes, Route } from "react-router-dom";
import Home from "@/features/tables/pages/TablesRoller";
import { Tables } from "@/features/tables";
import { Collections } from "@/features/collections";

function AppRouter() {
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/collections" element={<Collections />} />
      </Routes>
    </main>
  );
}

export default AppRouter;
