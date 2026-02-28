import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table, Input } from "reactstrap";
import axios from "axios";

function VendorModal({ isOpen, toggle, onSelect }) {
  const [vendors, setVendors] = useState([]); // Stores vendor data
  const [selectedVendors, setSelectedVendors] = useState([]); // Stores selected vendors
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (isOpen) {
      fetchVendors();
    }
  }, [isOpen]);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      console.log("🔍 Fetching vendors...");
  
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/vendors`, {
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("✅ API Response:", response.data); // Debug API response
  
      if (Array.isArray(response.data)) {
        setVendors(response.data); // ✅ If response is a direct array
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        setVendors(response.data.data); // ✅ If response is wrapped in `data`
      } else {
        console.error("❌ Unexpected API format:", response.data);
        setVendors([]); // Set to empty array on error
      }
    } catch (error) {
      console.error("❌ API Fetch Error:", error);
      setVendors([]);
    } finally {
      setLoading(false);
    }
  };
  
  
  

  // ✅ Handle checkbox selection
  const handleCheckboxChange = (vendor) => {
    setSelectedVendors((prev) => {
      const isSelected = prev.some((item) => item._id === vendor._id);
      return isSelected ? prev.filter((item) => item._id !== vendor._id) : [...prev, vendor];
    });
  };

  // ✅ Confirm selection and pass selected vendor names & IDs
  const handleConfirmSelection = () => {
    const selectedIds = selectedVendors.map((vendor) => vendor._id);
    const selectedNames = selectedVendors.map((vendor) => vendor.vendor).join(", ");
  
    onSelect(selectedIds, selectedNames); // ✅ Send IDs & Names
    toggle();
  };
  

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Select Application Vendor</ModalHeader>
      <ModalBody>
        {loading ? (
          <p>Loading...</p>
        ) : vendors.length > 0 ? (
          <Table hover bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Vendor Name</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
  {vendors.map((vendor, index) => (
    <tr key={vendor._id}>
      <td>{index + 1}</td>
      <td>{vendor.vendor || "N/A"}</td> {/* ✅ Display Vendor Name */}
      <td>
        <Input
          type="checkbox"
          checked={selectedVendors.some((v) => v._id === vendor._id)}
          onChange={() => handleCheckboxChange(vendor)}
        />
      </td>
    </tr>
  ))}
</tbody>

          </Table>
        ) : (
          <p className="text-center text-danger">⚠ No vendors available</p>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleConfirmSelection} disabled={selectedVendors.length === 0}>
          Select {selectedVendors.length > 0 && `(${selectedVendors.length})`}
        </Button>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}

export default VendorModal;
