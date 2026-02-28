import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from "reactstrap";
import axios from "axios";

function PlanModal({ isOpen, toggle, onSelect }) {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if (isOpen) {
      // Fetch plans when the modal opens
      const fetchPlans = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/plans`);
          setPlans(response.data.data); // Assuming the response contains a `data` field
        } catch (error) {
          console.error("Error fetching plans:", error);
        }
      };
      fetchPlans();
    }
  }, [isOpen]);

  const handleSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleSubmit = () => {
    onSelect(selectedPlan);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Select Plan</ModalHeader>
      <ModalBody>
        {plans.length > 0 ? (
          plans.map((plan) => (
            <div key={plan._id} className="d-flex align-items-center mb-2">
              <Input
                type="radio"
                name="plan"
                onChange={() => handleSelect(plan)}
              />
              <span className="ms-2">{plan.name}</span>
            </div>
          ))
        ) : (
          <p>No plans found.</p>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Select
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default PlanModal;