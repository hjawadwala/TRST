import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from "reactstrap";
import axios from "axios";

function BusinessEntityModal({ isOpen, toggle, onSelect }) {
  const [entities, setEntities] = useState([]); // Store fetched business entities
  const [selectedEntities, setSelectedEntities] = useState([]); // Store selected business entities
  const [isLoading, setIsLoading] = useState(false); // Show loading state

  useEffect(() => {
    if (isOpen) {
      fetchOrganizationalEntities();
    }
  }, [isOpen]);

  const fetchOrganizationalEntities = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/organizational-entities/all`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      console.log("✅ API Response:", response.data);
      
      const entityData = Array.isArray(response.data)
        ? response.data
        : response.data?.data;
      
      if (Array.isArray(entityData) && entityData.length > 0) {
        setEntities(entityData);
      } else {
        console.warn("⚠️ No business entities found in API response.");
        setEntities([]);
      }
    } catch (error) {
      console.error("❌ Error fetching business entities:", error);
      setEntities([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle selection when a checkbox is clicked
  const handleCheckboxChange = (entity) => {
    setSelectedEntities((prevSelected) =>
      prevSelected.some((e) => e._id === entity._id)
        ? prevSelected.filter((e) => e._id !== entity._id) // Remove if already selected
        : [...prevSelected, entity] // Add if not selected
    );
  };

  // Handle selection confirmation
  const handleConfirmSelection = () => {
    if (selectedEntities.length > 0) {
      const selectedEntityIDs = selectedEntities.map((entity) => entity._id); // Store IDs for backend
      const selectedEntityNames = selectedEntities.map((entity) => entity.businessEntity).join(", "); // Store names for UI
      
      onSelect({ ids: selectedEntityIDs, names: selectedEntityNames }); // Send both ID & Name
    }
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Select Business Entity</ModalHeader>
      <ModalBody>
        {isLoading ? (
          <p>Loading...</p>
        ) : entities.length > 0 ? (
          <Table striped responsive>
            <thead>
              <tr>
                <th>Select</th>
                <th>Entity Name</th>
                <th>Entity Type</th>
                <th>Business ID</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {entities.map((entity) => (
                <tr key={entity._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedEntities.some((e) => e._id === entity._id)}
                      onChange={() => handleCheckboxChange(entity)}
                    />
                  </td>
                  <td>{entity.businessEntity || "N/A"}</td>
                  <td>{entity.businessEntityType || "N/A"}</td>
                  <td>{entity.businessEntityId || "N/A"}</td>
                  <td>{entity.description || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-center text-danger">❌ No business entities found.</p>
        )}
      </ModalBody>
      <ModalFooter>
        <span className="me-auto">Selected: {selectedEntities.length}</span>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleConfirmSelection} disabled={selectedEntities.length === 0}>
          Select ({selectedEntities.length})
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default BusinessEntityModal;
