import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Button, Table } from "reactstrap";

const ApplicationModal = ({ isOpen, toggle, onSelect }) => {
  const [applications, setApplications] = useState([]);
  const [selectedApps, setSelectedApps] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedApps([]); // Clear selections when modal is reopened
      fetchApplications();
    }
  }, [isOpen]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/applications/getall`);
      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        setApplications(result.data);
      } else {
        console.error("Unexpected API response:", result);
        setApplications(Array.isArray(result.data) ? result.data : []);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Checkbox Selection
  const handleCheckboxChange = (app) => {
    setSelectedApps((prev) => {
      const isSelected = prev.some((item) => item._id === app._id);
      return isSelected
        ? prev.filter((item) => item._id !== app._id) // Remove if already selected
        : [...prev, app]; // Add if not selected
    });
  };

  // Confirm Selection
  const handleConfirm = () => {
    console.log("Selected Applications:", selectedApps); // Debug selected applications
    onSelect(selectedApps); // Pass the selected applications as an array
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Select Applications</ModalHeader>
      <ModalBody>
        {loading ? (
          <p>Loading applications...</p>
        ) : (
          <Table bordered>
            <thead>
              <tr>
                <th>Select</th>
                <th>Application Name</th>
                <th>Application Type</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(applications) && applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedApps.some((item) => item._id === app._id)}
                        onChange={() => handleCheckboxChange(app)}
                      />
                    </td>
                    <td>{app.applicationName}</td>
                    <td>{app.applicationType}</td>
                    <td>
                      {app.applicationOwner?.map((owner) => owner.fullName || "N/A").join(", ")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
        <Button color="primary" onClick={handleConfirm} disabled={selectedApps.length === 0}>
          Confirm Selection
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default ApplicationModal;
