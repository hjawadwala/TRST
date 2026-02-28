import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from "reactstrap";
import axios from "axios";
import PropTypes from 'prop-types';

const UserSearchModal = ({ isOpen, toggle, onSelectVendors = () => {} }) => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendors, setSelectedVendors] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchVendors();
    }
  }, [isOpen]);

  const fetchVendors = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/vendors`);
      console.log("Fetched vendors (raw response):", response);
      console.log("Fetched vendors (data):", response?.data || response);
      if (Array.isArray(response.data)) {
        setVendors(response.data);
        console.log("Vendors state updated:", response.data);
      } else if (Array.isArray(response)) {
        setVendors(response);
        console.log("Vendors state updated:", response);
      } else {
        console.error("Unexpected response format:", response);
        setVendors([]);
      }
    } catch (error) {
      console.error("Error fetching vendors:", error.response?.data || error.message);
      setVendors([]);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectVendor = (vendor) => {
    setSelectedVendors((prevSelected) => {
      if (prevSelected.some((v) => v._id === vendor._id)) {
        return prevSelected.filter((v) => v._id !== vendor._id);
      } else {
        return [...prevSelected, vendor];
      }
    });
  };

  const handleDone = () => {
    onSelectVendors(selectedVendors);
    toggle();
  };

  const filteredVendors = vendors.filter((vendor) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (vendor.vendor?.toLowerCase() || "").includes(searchTermLower) ||
      (vendor.mainPhone?.toLowerCase() || "").includes(searchTermLower) ||
      (vendor.faxNumber?.toLowerCase() || "").includes(searchTermLower) ||
      (vendor.website?.toLowerCase() || "").includes(searchTermLower) ||
      (vendor.criticality?.toLowerCase() || "").includes(searchTermLower) ||
      (vendor.vendorManagementContacts?.toLowerCase() || "").includes(searchTermLower) ||
      (vendor.serviceTypes?.toLowerCase() || "").includes(searchTermLower) ||
      (vendor.address1?.toLowerCase() || "").includes(searchTermLower) ||
      (vendor.address2?.toLowerCase() || "").includes(searchTermLower) ||
      (vendor.stateProvince?.toLowerCase() || "").includes(searchTermLower) ||
      (vendor.country?.toLowerCase() || "").includes(searchTermLower) ||
      (vendor.notes?.toLowerCase() || "").includes(searchTermLower)
    );
  });

  console.log("Filtered vendors:", filteredVendors);

  return (
    <Modal isOpen={isOpen} toggle={toggle} style={{ maxWidth: "90%" }}>
      <ModalHeader toggle={toggle}>Select Vendor</ModalHeader>
      <ModalBody>
        <Input
          type="text"
          placeholder="Search vendors..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="table-responsive" style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Actions</th>
                <th>ID</th>
                <th>Vendor</th>
                <th>Main Phone</th>
                <th>Fax Number</th>
                <th>Website</th>
                <th>Criticality</th>
                <th>Vendor Management Contacts</th>
                <th>Service Types</th>
                <th>Address 1</th>
                <th>Address 2</th>
                <th>State/Province</th>
                <th>Country</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.length > 0 ? (
                filteredVendors.map((vendor) => (
                  <tr key={vendor._id} onClick={() => handleSelectVendor(vendor)}>
                    <td>
                      <Button color="primary">
                        {selectedVendors.some((v) => v._id === vendor._id) ? "Deselect" : "Select"}
                      </Button>
                    </td>
                    <td>{vendor._id}</td>
                    <td>{vendor.vendor}</td>
                    <td>{vendor.mainPhone}</td>
                    <td>{vendor.faxNumber}</td>
                    <td>{vendor.website}</td>
                    <td>{vendor.criticality}</td>
                    <td>{vendor.vendorManagementContacts}</td>
                    <td>{vendor.serviceTypes}</td>
                    <td>{vendor.address1}</td>
                    <td>{vendor.address2}</td>
                    <td>{vendor.stateProvince}</td>
                    <td>{vendor.country}</td>
                    <td>{vendor.notes}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="14" className="text-center">No vendors found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleDone}>
          Done
        </Button>
      </ModalFooter>
    </Modal>
  );
};

UserSearchModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  onSelectVendors: PropTypes.func.isRequired,
};

export default UserSearchModal;