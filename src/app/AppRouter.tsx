import { Routes, Route } from "react-router-dom";
import Home from "@/features/tables/pages/TablesRoller/TablesRoller";
import { Tables, TableShow, TableCreate, TableEdit } from "@/features/tables";
import {
  Collections,
  CollectionCreate,
  CollectionShow,
  CollectionEdit,
} from "@/features/collections/pages";

function AppRouter() {
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<Home />} />
 
        <Route path="/tables" element={<Tables />} />
        <Route path="/tables/new" element={<TableCreate />} />
        <Route path="/tables/:id" element={<TableShow />} />
        <Route path="/tables/:id/edit" element={<TableEdit />} />
 
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/new" element={<CollectionCreate />} />
        <Route path="/collections/:id" element={<CollectionShow />} />
        <Route path="/collections/:id/edit" element={<CollectionEdit />} />
      </Routes>
    </main>
  );
}

export default AppRouter;
