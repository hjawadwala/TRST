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

      console.log("API Response:", result); // Log the entire response

      // Check if the data field exists and is an array
      if (Array.isArray(result.data)) {
        setApplications(result.data); // Set the applications state
        console.log("Applications fetched:", result.data); // Log fetched applications
      } else {
        console.error("Unexpected API response:", result);
        setApplications([]); // Clear applications if the response is not as expected
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      setApplications([]); // Clear applications on error
    } finally {
      setLoading(false); // Stop loading
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
    const selectedIds = selectedApps.map((app) => app._id);
    const selectedNames = selectedApps.map((app) => app.applicationName).join(", ");
    onSelect({ ids: selectedIds, names: selectedNames }); // Pass data to parent
    toggle(); // Close the modal
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
              {applications.length > 0 ? (
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
                    <td>{app.applicationType.join(", ")}</td> {/* Join array for display */}
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