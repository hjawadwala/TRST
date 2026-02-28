import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Button, Table } from "reactstrap";

const PlanModal = ({ isOpen, toggle, onSelect }) => {
  const [plans, setPlans] = useState([]);
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedPlans([]); // Clear selections when modal is reopened
      fetchPlans();
    }
  }, [isOpen]);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/plans/all`);
      const result = await response.json();

      console.log("API Response:", result); // Log the entire response

      // Check if the data field exists and is an array
      if (Array.isArray(result.data)) {
        setPlans(result.data); // Set the plans state
        console.log("Plans fetched:", result.data); // Log fetched plans
      } else {
        console.error("Unexpected API response:", result);
        setPlans([]); // Clear plans if the response is not as expected
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      setPlans([]); // Clear plans on error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle Checkbox Selection
  const handleCheckboxChange = (plan) => {
    setSelectedPlans((prev) => {
      const isSelected = prev.some((item) => item._id === plan._id);
      return isSelected
        ? prev.filter((item) => item._id !== plan._id) // Remove if already selected
        : [...prev, plan]; // Add if not selected
    });
  };

  // Confirm Selection
  const handleConfirm = () => {
    const selectedIds = selectedPlans.map((plan) => plan._id);
    const selectedNames = selectedPlans.map((plan) => plan.plan_name).join(", ");
    onSelect({ ids: selectedIds, names: selectedNames }); // Pass data to parent
    toggle(); // Close the modal
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Select Plans</ModalHeader>
      <ModalBody>
        {loading ? (
          <p>Loading plans...</p>
        ) : (
          <Table bordered>
            <thead>
              <tr>
                <th>Select</th>
                <th>Plan Name</th>
                <th>Plan Type</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {plans.length > 0 ? (
                plans.map((plan) => (
                  <tr key={plan._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedPlans.some((item) => item._id === plan._id)}
                        onChange={() => handleCheckboxChange(plan)}
                      />
                    </td>
                    <td>{plan.plan_name}</td>
                    <td>{Array.isArray(plan.plan_type) ? plan.plan_type.join(", ") : "N/A"}</td> {/* Join array for display */}
                    <td>
                      {Array.isArray(plan.planOwner) && plan.planOwner.length > 0
                        ? plan.planOwner.map((owner) => owner.fullName || "N/A").join(", ")
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No plans found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
        <Button color="primary" onClick={handleConfirm} disabled={selectedPlans.length === 0}>
          Confirm Selection
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default PlanModal;