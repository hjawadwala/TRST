import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
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
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  Alert,
  Spinner,
} from "reactstrap";
import { TiPlus } from "react-icons/ti";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NewRiskAssessments() {
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false); // Employee Status dropdown
  const [isHostelOpen, setIsHostelOpen] = useState(false); // Employee Status dropdown

  const [selectedStatus, setSelectedStatus] = useState("-- Please select --");
  const statusOptions = ["-- Please select --", "No", "Yes"];

  const [selectedHostel, setSelectedHostel] = useState("-- Please select --");
  const hostelOptions = ["-- Please select --", "No", "No"];
  const toggleStatusDropdown = () => setIsStatusOpen((prev) => !prev);
  const toggleHostelDropdown = () => setIsHostelOpen((prev) => !prev);

  const toggleToolDropDown = () => setIsToolOpen(!isToolOpen);
  const handleSelectStatus = (option) => {
    setSelectedStatus(option);
    setIsStatusOpen(false);
  };
  const handleSelecthostel = (option) => {
    setSelectedHostel(option);
    setIsHostelOpen(false);
  };

  // State for form data
  const [formData, setFormData] = useState({
    assessmentName: "",
    editors: "",
    locations: "",
    assessmentDate: null,
    facilitator: "",
    respondents: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, assessmentDate: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/risk-assessments/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Risk Assessment created successfully!");
        setFormData({
          assessmentName: "",
          editors: "",
          locations: "",
          assessmentDate: null,
          facilitator: "",
          respondents: "",
        });
      } else {
        setErrorMessage(result.message || "Error creating risk assessment!");
      }
    } catch (error) {
      setErrorMessage("Network error! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reference for DatePicker
  const datePickerRef = useRef(null);

  return (
    <React.Fragment>
      <Helmet>
        <title>New Risk/Threat Assessment Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
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
          <div className="form-heading">Risk/Threat Assessment Information</div>
          <div className="border-1"></div>
          <Form onSubmit={handleSubmit}>
            <div className="row pt-4">
              <div className="col-6">
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="assessmentName"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Risk/Threat Assessment
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="riskThreatAssessment"
                    className="form-control"
                    type="text"
                    value={formData.riskThreatAssessment}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 d-flex">
                  <label
                    htmlFor="editors"
                    className="form-label fs-15 w-20 me-2"
                  >
                    Editor(s)
                    <span className="text-danger">*</span>
                  </label>
                  <Input
                    name="editors"
                    className="form-control"
                    type="text"
                    value={formData.editors}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-secondary border-radius-2"
                  >
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>
                <div className="mb-3 d-flex">
                  <label
                    htmlFor="locations"
                    className="form-label fs-15 w-20 me-2"
                  >
                    Locations
                  </label>
                  <Input
                    name="locations"
                    className="form-control"
                    type="text"
                    value={formData.locations}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-secondary border-radius-2"
                  >
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3 d-flex">
                  <label
                    htmlFor="assessmentDate"
                    className="form-label fs-15 w-20 me-2"
                  >
                    Assessment Date
                  </label>
                  <DatePicker
                    ref={datePickerRef}
                    selected={formData.assessmentDate}
                    onChange={handleDateChange}
                    dateFormat="MM/dd/yyyy"
                    className="form-control"
                    placeholderText="Select a date"
                  />
                  <button
                    type="button"
                    className="btn btn-secondary border-radius-2"
                    onClick={() => datePickerRef.current.setOpen(true)}
                  >
                    <SlCalender className="fs-15" />
                  </button>
                </div>
                <div className="mb-3 d-flex">
                  <label
                    htmlFor="facilitator"
                    className="form-label fs-15 w-20 me-2"
                  >
                    Facilitator
                  </label>
                  <Input
                    name="facilitator"
                    className="form-control"
                    type="text"
                    value={formData.facilitator}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-secondary border-radius-2"
                  >
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>
                <div className="mb-3 d-flex">
                  <label
                    htmlFor="respondents"
                    className="form-label fs-15 w-20 me-2"
                  >
                    Respondent(s)
                  </label>
                  <Input
                    name="respondents"
                    className="form-control"
                    type="text"
                    value={formData.respondents}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-secondary border-radius-2"
                  >
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>
              </div>
            </div>
            {successMessage && <Alert color="success">{successMessage}</Alert>}
            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NewRiskAssessments;