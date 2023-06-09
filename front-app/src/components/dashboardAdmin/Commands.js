import React, { useState, useEffect } from "react";

const RecentCommand = () => {
  const [commands, setCommands] = useState([]);
  const [filteredCommands, setFilteredCommands] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    fetchCommands();
  }, []);

  const fetchCommands = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/commands");
      const data = await response.json();
      setCommands(data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data: " + error.message);
    }
  };

  const handleDelete = (commandId) => {
    const confirmDeletion = window.confirm("Are you sure you want to delete this command?");
    if (confirmDeletion) {
      fetch(`http://127.0.0.1:8000/api/commands/${commandId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error deleting command");
          }
          console.log("Command deleted successfully");
          fetchCommands(); // Refresh the command list after deletion
        })
        .catch((error) => {
          console.error("Error deleting command:", error);
        });
    }
  };

  const handleStatusChange = (commandId, newStatus) => {
    const payload = {
      status: newStatus,
    };

    fetch(`http://127.0.0.1:8000/api/commands/${commandId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating command status");
        }
        console.log("Command status updated successfully");
        fetchCommands(); // Refresh the command list after status update
      })
      .catch((error) => {
        console.error("Error updating command status:", error);
      });
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredCommands = commands.filter((command) => {
      return (
        command.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        command.partner_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        command.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        command.quantity.toString().includes(searchTerm.toLowerCase()) ||
        command.total_price.toString().includes(searchTerm.toLowerCase()) ||
        command.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredCommands(filteredCommands);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  let displayedCommands = searchTerm ? filteredCommands : commands;

  if (sortColumn) {
    displayedCommands.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1;
      } else if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2>Commands List</h2>
      {loading ? (
        <div style={{ width: "100%", height: "200px" }}>Loading commands...</div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Search commands"
            value={searchTerm}
            onChange={handleSearch}
          />
          <table className="table text-light bg-dark">
            <thead>
              <tr>
                <th onClick={() => handleSort("customer_name")}>Customer</th>
                <th onClick={() => handleSort("partner_name")}>Partner</th>
                <th onClick={() => handleSort("product_name")}>Product</th>
                <th onClick={() => handleSort("quantity")}>Quantity</th>
                <th onClick={() => handleSort("total_price")}>Total Price</th>
                <th onClick={() => handleSort("status")}>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedCommands.map((command) => (
                <tr key={command.id}>
                  <td>{command.customer_name}</td>
                  <td>{command.partner_name}</td>
                  <td>{command.product_name}</td>
                  <td>{command.quantity}</td>
                  <td>{command.total_price}</td>
                  <td>{command.status}</td>
                  <td>
                    <button onClick={() => handleDelete(command.id)} className="btn btn-danger">
                      Delete
                    </button>
                    <select
                      value={command.status}
                      onChange={(e) => handleStatusChange(command.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentCommand;
