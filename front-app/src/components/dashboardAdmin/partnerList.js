import React, { useState, useEffect } from "react";
import axios from 'axios';
import ImageComponent from "./imageComponent";

const PartnerList = () => {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/partners");
      setPartners(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data: " + error.message);
    }
  };

  const handleSuspend = (partner_id) => {
    const confirmSuspension = window.confirm(
      "Are you sure you want to suspend this user?"
    );
    if (confirmSuspension) {
      fetch(`http://127.0.0.1:8000/api/partners/${partner_id}/suspend`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error suspending partner');
          }
          console.log('Partner suspended successfully');
          fetchPartners(); // Refresh the partner list after suspension
        })
        .catch(error => {
          console.error('Error suspending partner:', error);
        });
    }
  };

  const handleUnsuspend = (partner_id) => {
    const confirmSuspension = window.confirm(
      "Are you sure you want to unsuspend this user?"
    );
    if (confirmSuspension) {
      fetch(`http://127.0.0.1:8000/api/partners/${partner_id}/unsuspend`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error unsuspending partner');
          }
          console.log('Partner unsuspended successfully');
          fetchPartners(); // Refresh the partner list after unsuspension
        })
        .catch(error => {
          console.error('Error unsuspending partner:', error);
        });
    }
  };

  const handleDelete = async (partner_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this partner?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/partners/${partner_id}`);
        console.log("Partner deleted successfully");
        fetchPartners(); // Refresh the partner list after deletion
      } catch (error) {
        console.error("Error deleting partner:", error);
      }
    }
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredPartners = partners.filter((partner) => {
      return (
        partner.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredPartners(filteredPartners);
  };

  const sortedPartners = [...filteredPartners.length > 0 ? filteredPartners : partners];

  if (sortColumn) {
    sortedPartners.sort((a, b) => {
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
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2>Partners List</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {loading ? (
        <div style={{ width: "100%", height: "200px" }}>Loading partners...</div>
      ) : (
        <table className="table text-light bg-dark">
          <thead>
            <tr>
              <th>profile</th>
              <th onClick={() => handleSort("username")}>
                username {sortColumn === "username" && <i className={`fa fa-sort-${sortDirection}`} />}
              </th>
              <th onClick={() => handleSort("password")}>
                password {sortColumn === "password" && <i className={`fa fa-sort-${sortDirection}`} />}
              </th>
              <th onClick={() => handleSort("email")}>
                email {sortColumn === "email" && <i className={`fa fa-sort-${sortDirection}`} />}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedPartners.map((partner, index) => (
              <tr key={index}>
                <ImageComponent imageName={partner.image} />
                <td>{partner.username}</td>
                <td>{partner.password}</td>
                <td>{partner.email}</td>
                <td>
                  {partner.suspended ? (
                    <button className="btn btn-warning mx-3" onClick={() => handleUnsuspend(partner.partner_id)}>
                      Unsuspend
                    </button>
                  ) : (
                    <button className="btn btn-warning mx-3" onClick={() => handleSuspend(partner.partner_id)}>
                      Suspend
                    </button>
                  )}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(partner.partner_id)}
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

export default PartnerList;
