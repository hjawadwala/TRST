import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from "reactstrap";
import axios from "axios";

function ApplicationOwnerModal({ isOpen, toggle, onSelect }) {
  const [owners, setOwners] = useState([]);
  const [selectedOwners, setSelectedOwners] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchOwners();
    }
  }, [isOpen]);

  const fetchOwners = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/users/all`, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data && Array.isArray(response.data.data)) {
        setOwners(response.data.data);
      } else {
        setOwners([]);
      }
    } catch (error) {
      console.error("Error fetching owners:", error);
      setOwners([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (owner) => {
    setSelectedOwners((prev) =>
      prev.some((o) => o._id === owner._id)
        ? prev.filter((o) => o._id !== owner._id)
        : [...prev, owner]
    );
  };

  // ✅ On confirm, store both the ID and Name
  const handleConfirmSelection = () => {
    if (selectedOwners.length > 0) {
      const selectedOwnerIDs = selectedOwners.map((owner) => owner._id); // IDs for backend
      const selectedOwnerNames = selectedOwners.map((owner) => owner.fullName || owner.name).join(", "); // Names for display
      
      onSelect({ ids: selectedOwnerIDs, names: selectedOwnerNames }); // Send both ID & Name
    }
    toggle(); // Close modal
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Select Application Owner</ModalHeader>
      <ModalBody>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Table striped responsive>
            <thead>
              <tr>
                <th>Select</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {owners.length > 0 ? (
                owners.map((owner) => (
                  <tr key={owner._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedOwners.some((o) => o._id === owner._id)}
                        onChange={() => handleCheckboxChange(owner)}
                      />
                    </td>
                    <td>{owner.fullName || owner.name || "N/A"}</td>
                    <td>{owner.username || "N/A"}</td>
                    <td>{owner.email || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No owners found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </ModalBody>
      <ModalFooter>
        <span className="me-auto">Selected: {selectedOwners.length}</span>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleConfirmSelection} disabled={selectedOwners.length === 0}>
          Select ({selectedOwners.length})
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ApplicationOwnerModal;
