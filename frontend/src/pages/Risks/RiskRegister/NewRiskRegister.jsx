import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Form, Input, Label, Alert, Spinner } from "reactstrap";
import { NavLink } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaPrint, FaRegFilePdf } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaCircleQuestion } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";



function NewRiskRegister() {
  const [isToolOpen, setIsToolOpen] = useState(false);

const toggleToolDropDown = () => {
  setIsToolOpen((prev) => !prev);
};
  // State variables for new dropdowns
  const [isRTOpen, setIsRTOpen] = useState(false);
  const [isDROpen, setIsDROpen] = useState(false);
  const [isRPOpen, setIsRPOpen] = useState(false);

  const [selectedRTO, setSelectedRTO] = useState("-- Please select --");
  const [selectedDR, setSelectedDR] = useState("-- Please select --");
  const [selectedRPO, setSelectedRPO] = useState("-- Please select --");

  const RTOOptions = ["-- Please select --", "1 Hour", "4 Hours", "24 Hours"];
  const DROptions = [
    "-- Please select --",
    "Cloud-Based",
    "On-Premise",
    "Hybrid",
  ];
  const RPOOptions = [
    "-- Please select --",
    "0 Minutes",
    "1 Hour",
    "4 Hours",
    "24 Hours",
  ];

  // Toggle functions
  const toggleRTODropdown = () => setIsRTOpen((prev) => !prev);
  const toggleDRDropdown = () => setIsDROpen((prev) => !prev);
  const toggleRPODropdown = () => setIsRPOpen((prev) => !prev);

  // State for form data
  const [formData, setFormData] = useState({
    riskName: "",
    riskType: "",
    riskOwners: "",
    description: "",
    financialImpact: "",
    actualClosureDate: "",
    likelihood: "",
    impact: "",
    processes: "",
    hardware: "",
    applications: "",
    vendors: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/risk-registers/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Risk Register created successfully!");
        setFormData({
          riskName: "",
          riskType: "",
          riskOwners: "",
          description: "",
          financialImpact: "",
          actualClosureDate: "",
          likelihood: "",
          impact: "",
          processes: "",
          hardware: "",
          applications: "",
          vendors: "",
        });
      } else {
        setErrorMessage(result.message || "Error creating risk register!");
      }
    } catch (error) {
      setErrorMessage("Network error! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>New Risk Register | TRST</title>
        <meta name="description" content="This is the new risk register page description" />
        <meta name="keywords" content="risk, register, new" />
      </Helmet>
      <div className="page-content">
       <div className="main-content1">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="header-text">
                    
                  </div>
                  <div className="d-flex align-items-center justify-content-end">
                    <div>
                      <NavLink
                        className="button3 border-1 button3-changes me-1"
                        to="/risk-register"
                        title="Cancel"
                      >
                        <RxCross2
                          className="me-1"
                          style={{ width: "15px", height: "15px" }}
                        />
                        Cancel
                      </NavLink>
                      <NavLink
                        className="button3 border-1 button3-changes me-1"
                        to="#"
                        title="Save & New"
                      >
                        Save & New
                      </NavLink>
                      <Button type="submit" color="primary" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Save"}
            </Button>
                      
                    </div>
                    <div
                      className="map-action k-widget k-button-group order-1"
                      id="map-action-toggle"
                      role="group"
                    >
                      <span className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                          type="button"
                          id="TollFropdown"
                          data-bs-toggle="dropdown"
                          aria-expanded={isToolOpen}
                          onClick={toggleToolDropDown}
                        >
                          <HiMiniWrench className="hw-16" />
                        </button>
                        <ul
                          className={`right-auto dropdown-menu  ${
                            isToolOpen ? "show" : ""
                          }`}
                          aria-labelledby="TollFropdown"
                        >
                          <li>
                            <a className="dropdown-item" href="#">
                              <BiSolidEdit className="hw-15" /> Design this page
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <FcSettings className="hw-15" /> Object Definition
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <LuTableOfContents className="hw-15" /> Tab Definition
                            </a>
                          </li>
                          <div className="border-1"></div>
                          <li>
                            <a className="dropdown-item" href="#">
                              <FaPrint className="hw-15" /> Print
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              <FaRegFilePdf className="hw-15" /> PDF
                            </a>
                          </li>
                          <div className="border-1"></div>
                          <li>
                            <a className="dropdown-item" href="#">
                              <LuClock9 className="hw-15" /> Page Load Time
                            </a>
                          </li>
                        </ul>
                      </span>
                    </div>
                  </div>
                </div>
              </div>


        <div className="main-content1">
          <div className="header-text">New Risk Register</div>
        </div>
        
        <div className="form-content">
          <Form onSubmit={handleSubmit}>
            <div className="row pt-4">
              <div className="col-6">
                <div className="mb-3">
                  <Label htmlFor="riskName" className="form-label">
                    Risk Name
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="riskName"
                    className="form-control"
                    type="text"
                    value={formData.riskName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <Label htmlFor="riskType" className="form-label">
                    Risk Type
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="riskType"
                    className="form-control"
                    type="select"
                    value={formData.riskType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Please select --</option>
                    <option value="Active Shooter">Active Shooter</option>
                    <option value="Aircraft / Airport Accident">Aircraft / Airport Accident</option>
                    <option value="Arson">Arson</option>
                    <option value="Avalanche">Avalanche</option>
                    <option value="Bomb Threat / Warning">Bomb Threat / Warning</option>
                  </Input>
                </div>
                <div className="mb-3">
                  <Label htmlFor="riskOwners" className="form-label">
                    Risk Owners
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="riskOwners"
                    className="form-control"
                    type="text"
                    value={formData.riskOwners}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <Label htmlFor="description" className="form-label">
                    Description
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="description"
                    className="form-control"
                    type="textarea  "
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <Label htmlFor="financialImpact" className="form-label">
                    Financial Impact
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="financialImpact"
                    className="form-control"
                    type="number"
                    value={formData.financialImpact}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <Label htmlFor="actualClosureDate" className="form-label">
                    Actual Closure Date
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="actualClosureDate"
                    className="form-control"
                    type="date"
                    value={formData.actualClosureDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <Label htmlFor="likelihood" className="form-label">
                    Likelihood
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="likelihood"
                    className="form-control"
                    type="select"
                    value={formData.likelihood}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Please select --</option>
                    <option value="High">High</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Low">Low</option>
                    <option value="Very Low">Very Low</option>
                  </Input>
                </div>
                <div className="mb-3">
                  <Label htmlFor="impact" className="form-label">
                    Impact
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="impact"
                    className="form-control"
                    type="select"
                    value={formData.impact}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Please select --</option>
                    <option value="Catastrophic">Catastrophic</option>
                    <option value="Significant">Significant</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Minor">Minor</option>
                    <option value="No Impact">No Impact</option>
                  </Input>
                </div>
                <div className="mb-3">
                  <Label htmlFor="processes" className="form-label">
                    Processes
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="processes"
                    className="form-control"
                    type="text"
                    value={formData.processes}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <Label htmlFor="hardware" className="form-label">
                    Hardware
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="hardware"
                    className="form-control"
                    type="text"
                    value={formData.hardware}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <Label htmlFor="applications" className="form-label">
                    Applications
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="applications"
                    className="form-control"
                    type="text"
                    value={formData.applications}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <Label htmlFor="vendors" className="form-label">
                    Vendors
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="vendors"
                    className="form-control"
                    type="text"
                    value={formData.vendors}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <Button type="submit" color="primary" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Create Risk Register"}
            </Button>
            {successMessage && <Alert color="success">{successMessage}</Alert>}
            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NewRiskRegister;