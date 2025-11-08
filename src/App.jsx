import { useState} from "react";
import "./App.css";

import Notification from "./components/Notification";
import EmployeesTable from "./components/EmployeesTable";
import useEmployeesProxy from "./components/useEmployeesProxy";
// DB
import employeees from "./database/employeees.json";
import SearchBar from "./components/searchBar";

// THEME
import ThemeProvider from "./components/theme/themeProvider";
import ThemeButton from "./components/theme/themeBtn";


function App() {
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const notify = (msg) => setMessage(msg);

  const { employees, deleteEmployee, valid } = useEmployeesProxy(employeees, notify);

  //  Smart search logic
  const filteredEmployees = employees.filter((emp) => {
    const q = searchQuery.toLowerCase();

    // special search: salary range
    const salaryMatch = q.match(/salary from (\d+) to (\d+)/);
    if (salaryMatch) {
      const min = Number(salaryMatch[1]);
      const max = Number(salaryMatch[2]);
      return emp.salary >= min && emp.salary <= max;
    }

    // --- ID search: e.g. "id: 105"
    const idMatch = q.match(/id:\s*(\d+)/);
    if (idMatch) {
      const id = Number(idMatch[1]);
      return emp.id === id; 
    }

    // general search: matches any value
    return Object.values(emp)
      .join(" ")
      .toLowerCase()
      .includes(q);
  });

  // THEME
  const [theme, setTheme] = useState("dark");


  function ToggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <ThemeProvider>
      <div className="mainContainer">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-4 text-[var(--textC)]">
          Employee Dashboard
        </h1>
        {/* Theme toggle button */}
        <ThemeButton toggleTheme={ToggleTheme} />

        {/* Search */}
        <div className="mb-6 flex w-[50%]">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {/* Table */}
        {filteredEmployees.length > 0 ? (
          <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200">
            <EmployeesTable
              employees={filteredEmployees}
              deleteEmployee={deleteEmployee}
              isvalid={valid}
            />
          </div>
        ) : (
          <span>There’s nothing in the table called that :(</span>
        )}

        {/* Notifications */}
        {message && (
          <div className="mt-6">
            <Notification message={message} onClose={() => setMessage("")} />
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
