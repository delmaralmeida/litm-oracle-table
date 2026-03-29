import { tables } from "./data/tables";
import OracleTable from "./components/OracleTable/OracleRoller";

function App() {
  return (
    <div className="app">
      <h1>Legend in The Mist - Solo Oracle Tables</h1>

      {tables.map(table => (
        <OracleTable key={table.id} table={table} />
      ))}
    </div>
  );
}

export default App;
