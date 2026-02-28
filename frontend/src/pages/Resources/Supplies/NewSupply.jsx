import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FaCheck } from "react-icons/fa";
import { NavLink } from "react-router-dom"; // Import NavLink for navigation
import axios from "axios";

function NewSupply() {
  const [supplyName, setSupplyName] = useState("");
  const [description, setDescription] = useState("");
  const [vendors, setVendors] = useState(""); // Ensure this is defined
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Ensure this is defined

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // API call to create a new supply
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/supplies/create`, {
        supplyName,
        description,
        vendors, // Use 'vendors' instead of 'vendor'
      });
      setSuccessMessage("Supply created successfully!"); // Set success message
      setErrorMessage(""); // Clear any previous error message
      // Clear the form fields
      setSupplyName("");
      setDescription("");
      setVendors("");
    } catch (error) {
      setErrorMessage("Failed to create supply. Please try again."); // Set error message
      setSuccessMessage(""); // Clear any previous success message
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>New Supply Page | TRST</title>
        <meta name="description" content="Create a new supply" />
      </Helmet>
      <div style={{ padding: "20px", backgroundColor: "#f8f9fa" }}>
        <div style={{ background: "white", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", padding: "20px" }}>
          <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Create New Supply</div>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="supplyName">Supply Name</label>
              <input
                type="text"
                id="supplyName"
                value={supplyName}
                onChange={(e) => setSupplyName(e.target.value)}
                required
                style={{ padding: "10px", border: "1px solid #ced4da", borderRadius: "4px", width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ padding: "10px", border: "1px solid #ced4da", borderRadius: "4px", width: "100%" }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="vendors">Vendors</label>
              <input
                type="text"
                id="vendors"
                value={vendors}
                onChange={(e) => setVendors(e.target.value)} // Ensure this updates the state
                style={{ padding: "10px", border: "1px solid #ced4da", borderRadius: "4px", width: "100%" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button type="submit" style={{ backgroundColor: "#007bff", color: "white", padding: "10px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                <FaCheck /> Create Supply
              </button>
              <NavLink to="/supplies" style={{ textDecoration: "none" }}>
                <button type="button" style={{ backgroundColor: "#dc3545", color: "white", padding: "10px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                  Cancel
                </button>
              </NavLink>
            </div>
          </form>
          {successMessage && <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#d4edda", color: "#155724", borderRadius: "4px" }}>{successMessage}</div>}
          {errorMessage && <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#f8d7da", color: "#721c24", borderRadius: "4px" }}>{errorMessage}</div>}
        </div>
      </div>
    </React.Fragment>
  );
}

export default NewSupply;