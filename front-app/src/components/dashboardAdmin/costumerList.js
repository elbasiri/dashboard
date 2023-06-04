import React, { useState, useEffect } from "react";
import axios from 'axios';
import ImageComponent from "./imageComponent";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
          // Update the state or trigger any necessary UI changes
          window.location.reload();
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
          // Update the state or trigger any necessary UI changes
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error unsuspending customer:", error);
        });
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }
  

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2>Customers List</h2>
      {loading ? (
        <div style={{ width: "100%", height: "200px" }}>
          Loading products...
        </div>
      ) : (
        <table className="table text-light bg-dark">
          <thead>
            <tr>
              <th>profile</th>
              <th>customer_id</th>
              <th>username</th>
              <th>password</th>
              <th>email</th>
              <th>shipping_address</th>
              <th>billing_address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <ImageComponent imageName={customer.image} />
                <td>{customer.customer_id}</td>
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
