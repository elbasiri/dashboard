import React from "react";
import { useState,useEffect } from "react";
import axios from 'axios';
import ImageComponent from "./imageComponent";

const PartnerList = () => {
  const [partners, setPartners] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (error) {
    return <div>Error: {error}</div>;
  }


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
        // Handle successful response
        console.log('Partner suspended successfully');
        window.location.reload()
        // Update the state or trigger any necessary UI changes
      })
      .catch(error => {
        // Handle error
        console.error('Error suspending partner:', error);
        // Display an error message or handle the error gracefully
      });}
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
        // Handle successful response
        console.log('Partner unsuspended successfully');
        window.location.reload()
        // Update the state or trigger any necessary UI changes
      })
      .catch(error => {
        // Handle error
        console.error('Error unsuspending partner:', error);
        // Display an error message or handle the error gracefully
      });}
  };

  const handleDelete = async (partner_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this partner?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/partners/${partner_id}`);
        console.log("partner deleted successfully");
        fetchPartners(); // Refresh the customer list after deletion
      } catch (error) {
        console.error("Error deleting partner:", error);
      }
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }





  return (
    <div className="container">
      <h2>Partners List</h2>
      {loading ? (
        <div style={{ width: "100%", height: "200px" }}>Loading partners...</div>
      ) : (
      <table className="table text-light bg-dark">
        <thead>
          <tr>
            <th>profile</th>
          <th>partner_id</th>
            <th>username</th>
            <th>password</th>
            <th>email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { 
          partners.map((partner,index) => (
            <tr key={index}>
              <ImageComponent imageName={partner.image} />
              <td>{partner.partner_id}</td>
              <td>{partner.username}</td>
              <td>{partner.password}</td>
              <td>{partner.email}</td>
              <td>
              {partner.suspended ? (
  <button className="btn btn-warning mx-3" onClick={handleUnsuspend.bind(null, partner.partner_id)}>Unsuspend</button>
) : (
  <button className="btn btn-warning mx-3" onClick={handleSuspend.bind(null, partner.partner_id)}>Suspend</button>
)}
              {/* <Link style={{marginRight:'50px'}} to={`/partners/${partner.partner_id}`} className="btn btn-warning">Suspend Partner Account</Link> */}
              <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(partner.partner_id)}
                  >
                    Delete
                  </button>
              </td>
            </tr>
          ))
          }
        </tbody>
      </table> )}
    </div>
  );
};

export default PartnerList;
