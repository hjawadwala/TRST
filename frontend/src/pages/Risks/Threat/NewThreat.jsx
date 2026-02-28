import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Form, Label, Button, Spinner, Alert, Input } from "reactstrap";
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

function NewRisk() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isToolOpen, setIsToolOpen] = useState(false); // State for tool dropdown

  // **Form State**
  const [formData, setFormData] = useState({
    threat: "",
    threatType: "",
    weight: "",
    likelihood: "",
    impact: "",
    mitigatingControls: "",
    controlDescription: "",
  });

  // **Dropdown Options**
  const threatTypeOptions = ["Man-Made", "Natural", "Political", "Technology/Infrastructure"];
  const likelihoodOptions = ["High", "Moderate", "Low", "Very Low", "Not Applicable"];
  const impactOptions = ["Catastrophic", "Significant", "Moderate", "Minor", "No Impact"];
  const mitigatingControlsOptions = ["Complete", "Nearly Complete", "Significant", "Moderate", "Minor", "None"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/threats/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Threat created successfully!");
        setFormData({
          threat: "",
          threatType: "",
          weight: "",
          likelihood: "",
          impact: "",
          mitigatingControls: "",
          controlDescription: "",
        });
      } else {
        setErrorMessage(result.message || "Error creating threat!");
      }
    } catch (error) {
      setErrorMessage("Network error! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleToolDropDown = () => {
    setIsToolOpen(!isToolOpen);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>New Risk Page | TRST</title>
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">
              Risk/Threat Assessment: New Risk/Threat Assessment
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <div>
                <NavLink
                  className="button3 border-1 button3-changes me-1"
                  to="/risk-assessments"
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
                <Button
                  className="button3 border-1 me-3"
                  title="Save"
                  onClick={handleSubmit}
                >
                  <FaCheck
                    className="me-1"
                    style={{ width: "15px", height: "15px" }}
                  />
                  Save
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
        <div className="form-content">
          <div className="form-heading">Threat Information</div>
          {successMessage && <Alert color="success">{successMessage}</Alert>}
          {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <div className="row pt-4">
              <div className="col-8">
                <Label>Threat</Label>
                <Input type="text" name="threat" value={formData.threat} onChange={handleChange} required />

                <Label>Threat Type</Label>
                <Input type="select" name="threatType" value={formData.threatType} onChange={handleChange} required>
                  <option value="">-- Please select --</option>
                  {threatTypeOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Input>

                <Label>Weight</Label>
                <Input type="number" name="weight" value={formData.weight} onChange={handleChange} required />

                <Label>Likelihood</Label>
                <Input type="select" name="likelihood" value={formData.likelihood} onChange={handleChange} required>
                  <option value="">-- Please select --</option>
                  {likelihoodOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Input>

                <Label>Impact</Label>
                <Input type="select" name="impact" value={formData.impact} onChange={handleChange} required>
                  <option value="">-- Please select --</option>
                  {impactOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Input>

                <Label>Mitigating Controls</Label>
                <Input type="select" name="mitigatingControls" value={formData.mitigatingControls} onChange={handleChange} required>
                  <option value="">-- Please select --</option>
                  {mitigatingControlsOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </Input>

                <Label>Control Description</Label>
                <Input type="textarea" name="controlDescription" value={formData.controlDescription} onChange={handleChange} required />
              </div>
            </div>
            {/* <Button type="submit" color="primary" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Create Threat"}
            </Button> */}
           
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NewRisk;