import React, { useState, useEffect } from "react";
import axios from 'axios';
import ImageComponent from "./imageComponent";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/customers");
      setCustomers(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data: " + error.message);
    }
  };

  const handleSuspend = (customer_id) => {
    const confirmSuspension = window.confirm(
      "Are you sure you want to suspend this user?"
    );
    if (confirmSuspension) {
      fetch(`http://127.0.0.1:8000/api/customers/${customer_id}/suspend`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error suspending customer");
          }
          console.log("Customer suspended successfully");
          fetchCustomers(); // Refresh the customer list after suspension
        })
        .catch((error) => {
          console.error("Error suspending customer:", error);
        });
    }
  };

  const handleUnsuspend = (customer_id) => {
    const confirmSuspension = window.confirm(
      "Are you sure you want to unsuspend this user?"
    );
    if (confirmSuspension) {
      fetch(`http://127.0.0.1:8000/api/customers/${customer_id}/unsuspend`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error unsuspending customer");
          }
          console.log("Customer unsuspended successfully");
          fetchCustomers(); // Refresh the customer list after unsuspension
        })
        .catch((error) => {
          console.error("Error unsuspending customer:", error);
        });
    }
  };

  const handleDelete = async (customer_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/customers/${customer_id}`);
        console.log("Customer deleted successfully");
        fetchCustomers(); // Refresh the customer list after deletion
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredCustomers = customers.filter((customer) => {
      return (
        customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredCustomers(filteredCustomers);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      // Reverse the sort direction if the same column is clicked again
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set the new sort column and default sort direction to ascending
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  let displayedCustomers = searchTerm ? filteredCustomers : customers;

  if (sortColumn) {
    const sortedCustomers = [...displayedCustomers];

    sortedCustomers.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue < bValue) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

    displayedCustomers = sortedCustomers;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2>Customers List</h2>
      <div>
        <input
          type="text"
          className="form-control"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {loading ? (
        <div style={{ width: "100%", height: "200px" }}>
          Loading customers...
        </div>
      ) : (
        <table className="table text-light bg-dark">
          <thead>
            <tr>
              <th>profile</th>
              <th onClick={() => handleSort("username")}>username</th>
              <th onClick={() => handleSort("password")}>password</th>
              <th onClick={() => handleSort("email")}>email</th>
              <th onClick={() => handleSort("shipping_address")}>shipping_address</th>
              <th onClick={() => handleSort("billing_address")}>billing_address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedCustomers.map((customer, index) => (
              <tr key={index}>
                <ImageComponent imageName={customer.image} />
                <td>{customer.username}</td>
                <td>{customer.password}</td>
                <td>{customer.email}</td>
                <td>{customer.shipping_address}</td>
                <td>{customer.billing_address}</td>
                <td>
                  {customer.suspended ? (
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleUnsuspend(customer.customer_id)}
                    >
                      Unsuspend
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleSuspend(customer.customer_id)}
                    >
                      Suspend
                    </button>
                  )}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(customer.customer_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerList;
