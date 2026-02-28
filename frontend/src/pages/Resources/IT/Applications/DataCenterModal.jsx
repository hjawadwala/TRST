import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table, Input } from "reactstrap";
import axios from "axios";

function DataCenterModal({ isOpen, toggle, onSelect }) {
  const [locations, setLocations] = useState([]); // Stores location data
  const [selectedLocations, setSelectedLocations] = useState([]); // Stores selected locations
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (isOpen) {
      fetchLocations();
    }
  }, [isOpen]);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      console.log("🔍 Fetching Data Centers from API...");

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/locations/all`);

      console.log("✅ Full API Response:", response.data);

      if (Array.isArray(response.data)) {
        setLocations(response.data);
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        setLocations(response.data.data);
      } else {
        console.error("❌ Unexpected API format. Response:", response.data);
        setLocations([]);
      }
    } catch (error) {
      console.error("❌ API Fetch Error:", error);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle checkbox selection
  const handleCheckboxChange = (location) => {
    setSelectedLocations((prev) => {
      const isSelected = prev.some((item) => item._id === location._id);
      return isSelected ? prev.filter((item) => item._id !== location._id) : [...prev, location];
    });
  };

  // ✅ Confirm selection and pass both ID and Name to the parent
  const handleConfirmSelection = () => {
    if (selectedLocations.length > 0) {
      const selectedLocationIDs = selectedLocations.map((loc) => loc._id); // IDs for backend
      const selectedLocationNames = selectedLocations.map((loc) => loc.locationName).join(", "); // Names for display

      onSelect({ ids: selectedLocationIDs, names: selectedLocationNames }); // Send both ID & Name
    }
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Select Primary Data Center</ModalHeader>
      <ModalBody>
        {loading ? (
          <p>Loading...</p>
        ) : locations.length > 0 ? (
          <Table hover bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Location Name</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location, index) => (
                <tr key={location._id}>
                  <td>{index + 1}</td>
                  <td>{location.locationName || "N/A"}</td>
                  <td>
                    <Input
                      type="checkbox"
                      checked={selectedLocations.some((item) => item._id === location._id)}
                      onChange={() => handleCheckboxChange(location)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-center text-danger">⚠ No locations available</p>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleConfirmSelection} disabled={selectedLocations.length === 0}>
          Select {selectedLocations.length > 0 && `(${selectedLocations.length})`}
        </Button>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}

export default DataCenterModal;
