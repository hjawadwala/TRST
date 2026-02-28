import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Button, Table } from "reactstrap";

const ApplicationsModal = ({ isOpen, toggle, onSelect }) => {
  const [applications, setApplications] = useState([]);
  const [selectedApps, setSelectedApps] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedApps([]);
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
        console.error("Unexpected response:", result);
        setApplications([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (app) => {
    setSelectedApps((prev) => {
      const isSelected = prev.some((item) => item._id === app._id);
      return isSelected
        ? prev.filter((item) => item._id !== app._id)
        : [...prev, app];
    });
  };

  const handleConfirm = () => {
    onSelect(selectedApps);
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
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedApps.some((a) => a._id === app._id)}
                        onChange={() => handleCheckboxChange(app)}
                      />
                    </td>
                    <td>{app.applicationName}</td>
                    <td>{app.applicationType}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">No applications found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
        <Button
          color="primary"
          onClick={handleConfirm}
          disabled={selectedApps.length === 0}
        >
          Confirm Selection
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default ApplicationsModal;
