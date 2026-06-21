import { Routes, Route } from "react-router-dom";
import Home from "@/features/tables/pages/TablesRoller/TablesRoller";
import { Tables, TableShow, TableCreate, TableEdit } from "@/features/tables";
import Collections from "@/features/collections/pages/Collections";

function AppRouter() {
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        
        <Route path="/tables" element={<Tables />} />
        <Route path="/tables/new" element={<TableCreate />} />
        <Route path="/tables/:id" element={<TableShow />} />
        <Route path="/tables/:id/edit" element={<TableEdit />} />
      </Routes>
    </main>
  );
}

export default AppRouter;
