import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Input, Label, Form } from "reactstrap";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function EditApprovalGroups() {
  const { id } = useParams(); // Get the ID from the route
  const navigate = useNavigate();
  const [planApprovalGroup, setPlanApprovalGroup] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/plan-approval-groups/${id}`);
        console.log("API Response:", response.data); // Debugging
        
        // Change this line
        const { planApprovalGroup, groupDescription } = response.data; // Not response.data.data
        
        setPlanApprovalGroup(planApprovalGroup);
        setGroupDescription(groupDescription);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching plan approval group:", error);
        Toastify({
          text: "Failed to fetch plan approval group.",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "#dc3545",
          },
        }).showToast();
        setLoading(false);
      }
    };
  
    fetchGroup();
  }, [id]);
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/plan-approval-groups/${id}`, {
        planApprovalGroup,
        groupDescription,
      });

      Toastify({
        text: "Plan Approval Group updated successfully!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "#28a745",
        },
      }).showToast();

      navigate("/plan-approval-groups"); // Navigate back to the list page
    } catch (error) {
      console.error("Error updating plan approval group:", error);
      Toastify({
        text: "Failed to update plan approval group.",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "#dc3545",
        },
      }).showToast();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Edit Plan Approval Group | TRST</title>
        <meta name="description" content="Edit an existing plan approval group" />
        <meta name="keywords" content="edit, plan approval group, management" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="header-text">Edit Plan Approval Group</div>
        </div>
        <div className="form-content">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <div className="row pt-4">
                <div className="col-6">
                  <div className="mb-3 d-flex align-items-center">
                    <Label htmlFor="planApprovalGroup" className="form-label me-2 fs-15 w-40">
                      Plan Approval Group
                    </Label>
                    <Input
                      type="text"
                      id="planApprovalGroup"
                      value={planApprovalGroup}
                      onChange={(e) => setPlanApprovalGroup(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 d-flex align-items-center">
                    <Label htmlFor="groupDescription" className="form-label me-2 fs-15 w-40">
                      Group Description
                    </Label>
                    <Input
                      type="text"
                      id="groupDescription"
                      value={groupDescription}
                      onChange={(e) => setGroupDescription(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="button3 border-1 me-3"
                  disabled={isSubmitting}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="button3 border-1"
                  onClick={() => navigate("/plan-approval-groups")}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default EditApprovalGroups;