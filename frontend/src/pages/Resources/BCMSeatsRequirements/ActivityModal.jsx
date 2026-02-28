import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table, Input } from "reactstrap";
import axios from "axios";

function ActivityModal({ isOpen, toggle, onSelect }) {
  const [activities, setActivities] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]); // ✅ Store selected activities
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchActivities();
    }
  }, [isOpen]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/activities`);

      let activityData = [];
      if (Array.isArray(response.data)) {
        activityData = response.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        activityData = response.data.data;
      } else {
        console.error("❌ Unexpected API response format:", response.data);
      }

      activityData.sort((a, b) => (a.activity?.localeCompare(b.activity || "") || 0));
      setActivities(activityData);
    } catch (error) {
      console.error("❌ API Error:", error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle checkbox selection
  const handleCheckboxChange = (activity) => {
    setSelectedActivities((prev) => {
      const isSelected = prev.find((item) => item._id === activity._id);
      if (isSelected) {
        return prev.filter((item) => item._id !== activity._id);
      } else {
        return [...prev, activity];
      }
    });
  };

  // ✅ Confirm selection and pass selected activities to parent
  const handleConfirmSelection = () => {
    onSelect(selectedActivities);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Select Activities</ModalHeader>
      <ModalBody>
        {loading ? (
          <p>Loading...</p>
        ) : activities.length > 0 ? (
          <Table hover bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Select</th>
                <th>Activity Name</th>
                <th>BIA</th>
                <th>Plan</th>
                <th>Outline Steps</th>
                <th>Business Entity</th>
                <th>Process Editor</th>
                <th>RTO</th>
                <th>Activity MTPD</th>
                <th>Activity RTO</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={activity._id || index}>
                  <td>{index + 1}</td>
                  <td>
                    <Input
                      type="checkbox"
                      checked={selectedActivities.some((item) => item._id === activity._id)}
                      onChange={() => handleCheckboxChange(activity)}
                    />
                  </td>
                  <td>{activity.activity || "N/A"}</td>
                  <td>{activity.bia || "N/A"}</td>
                  <td>{activity.plan || "N/A"}</td>
                  <td>{activity.outlineSteps || "N/A"}</td>
                  <td>{activity.businessEntity || "N/A"}</td>
                  <td>{activity.processEditor || "N/A"}</td>
                  <td>{activity.rto || "N/A"}</td>
                  <td>{activity.activityMtpd || "N/A"}</td>
                  <td>{activity.activityRto || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Table bordered>
            <thead>
              <tr>
                <th className="text-center text-danger">⚠ No activities available</th>
              </tr>
            </thead>
          </Table>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleConfirmSelection} disabled={selectedActivities.length === 0}>
          Select {selectedActivities.length > 0 && `(${selectedActivities.length})`}
        </Button>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ActivityModal;
