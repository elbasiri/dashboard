import React, { useState, useEffect } from "react";

const RecentCommand = () => {
  const [commands, setCommands] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/commands")
      .then((response) => response.json())
      .then((data) => {
        setCommands(data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data: " + error);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

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
          // Handle successful response
          console.log("Command deleted successfully");
          // Update the state or trigger any necessary UI changes
          setCommands(commands.filter((command) => command.id !== commandId));
        })
        .catch((error) => {
          // Handle error
          console.error("Error deleting command:", error);
          // Display an error message or handle the error gracefully
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
        // Handle successful response
        console.log("Command status updated successfully");
        // Update the state or trigger any necessary UI changes
        setCommands((prevCommands) => {
          return prevCommands.map((command) => {
            if (command.id === commandId) {
              return {
                ...command,
                status: newStatus,
              };
            }
            return command;
          });
        });
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating command status:", error);
        // Display an error message or handle the error gracefully
      });
  };

  return (
    <div className="container">
      <h2>Commands List</h2>
      {loading ? (
        <div style={{ width: "100%", height: "200px" }}>Loading commands...</div>
      ) : (
        <table className="table text-light bg-dark">
          <thead>
            <tr>
              <th>command_id</th>
              <th>customer_id </th>
              <th>partner_id</th>
              <th>product_id</th>
              <th>quantity</th>
              <th>total_price</th>
              <th>status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {commands.map((command) => (
              <tr key={command.id}>
                <td>{command.id}</td>
                <td>{command.customer_id}</td>
                <td>{command.partner_id}</td>
                <td>{command.product_id}</td>
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
      )}
    </div>
  );
};

export default RecentCommand;
