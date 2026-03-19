import React, { useEffect, useState } from "react";
import EmployeeCard from "./EmployeeCard";
import SearchBar from "./SearchBar";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const data = await response.json();
        setEmployees(data);
      } catch {
        setError("Failed to load employees ");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) => {
    const term = searchTerm.toLowerCase();
    return (
      employee.name.toLowerCase().includes(term) ||
      employee.email.toLowerCase().includes(term)
    );
  });

  if (loading) return <h2>Loading employees...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="container">
      <h1>Employee Directory</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="card-container">
        {filteredEmployees.slice(0, 6).map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>

      {filteredEmployees.length === 0 && <p>No employees found.</p>}

      <button onClick={() => window.print()}>Print Employee Cards</button>
    </div>
  );
};

export default Home;
