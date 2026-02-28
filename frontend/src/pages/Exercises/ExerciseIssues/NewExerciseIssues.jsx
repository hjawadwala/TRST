import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Button, Form, Input, Label, Spinner } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NewExerciseIssues() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    exerciseIssue: "",
    owners: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Submitting form..."); // Debugging
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/exercise-issues/create`,
        formData
      );
      console.log("API Response:", response.data); // Debugging

      toast.success("✅ Exercise Issue created successfully!", { theme: "colored" });
      navigate("/exercise-issues");
    } catch (error) {
      console.error("Error:", error); // Debugging
      toast.error("❌ Error creating Exercise Issue. Please try again.", { theme: "colored" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>New Exercise Issue Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Issue : New Issue </div>
            <div className="d-flex align-items-center justify-content-end">
              <div>
                <Button
                  className="button3 border-1 button3-changes me-1"
                  onClick={() => navigate("/exercise-issues")}
                  title="Cancel"
                >
                  <RxCross2
                    className="me-1"
                    style={{ width: "15px", height: "15px" }}
                  />
                  Cancel
                </Button>
                <Button
                  className="button3 border-1 me-3"
                  type="submit"
                  form="exerciseIssueForm"
                  title="Save"
                >
                  <FaCheck
                    className="me-1"
                    style={{ width: "15px", height: "15px" }}
                  />
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="form-content">
          <div className="form-heading">Recovery Issue Information</div>
          <div className="border-1"></div>
          <Form id="exerciseIssueForm" onSubmit={handleSubmit}>
            <div className="row pt-4">
              <div className="col-8">
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="exerciseIssue"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Exercise Issue <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="exerciseIssue"
                    className="form-control"
                    type="text"
                    value={formData.exerciseIssue}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="owners"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Owners
                  </Label>
                  <Input
                    name="owners"
                    className="form-control"
                    type="text"
                    value={formData.owners}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="description"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Description <span className="text-danger">*</span>
                  </Label>
                  <textarea
                    name="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <Button type="submit" color="primary" disabled={isSubmitting}>
                {isSubmitting ? <Spinner size="sm" /> : "Submit"}
              </Button>
            </div>
          </Form>
        </div>
      </div>

      {/* ✅ ToastContainer with Better Config */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </React.Fragment>
  );
}

export default NewExerciseIssues;