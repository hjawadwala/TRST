import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaPrint, FaRegFilePdf } from "react-icons/fa";
import { BiSearchAlt2 } from "react-icons/bi";
import { FaCircleQuestion } from "react-icons/fa6";
import axios from "axios";
import {
  Input,
  Label,
  Form,
  Alert,
} from "reactstrap";
import { TiPlus } from "react-icons/ti";
import "./Activities.css";
import BIAmodel from "./BIAmodel"; // ✅ CORRECT for default export





function NewActivities() {
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isRTOpen, setIsRTOpen] = useState(false);
  const [isDROpen, setIsDROpen] = useState(false);
  const [isRPOpen, setIsRPOpen] = useState(false);
//model open for BIA

  const [bia, setBia] = useState("");
  const [plan, setPlan] = useState("");
  const [activity, setActivity] = useState("");
  const [outlineTheActivitySteps, setOutlineTheActivitySteps] = useState("");
  const [businessEntity, setBusinessEntity] = useState("");
  const [processEditor, setProcessEditor] = useState("");
  const [rto, setRTO] = useState("-- Please select --");
  const [activityMTPD, setActivityMTPD] = useState("-- Please select --");
  const [activityRTO, setActivityRTO] = useState("-- Please select --");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const RTOOptions = ["-- Please select --", "15 Mins", "1 Hour", "0.5 Hours", "2 Hrs", "3 Hrs"];
  const MTPDOptions = ["-- Please select --", "2 Hrs", "4 Hrs", "8 Hrs", "12 Hrs"];
  const RPOOptions = ["-- Please select --", "2 Hrs", "4 Hrs", "8 Hrs", "12 Hrs"];

  const toggleToolDropDown = () => setIsToolOpen(!isToolOpen);
  const toggleRTODropdown = () => setIsRTOpen(!isRTOpen);
  const toggleDRDropdown = () => setIsDROpen(!isDROpen);
  const toggleRPODropdown = () => setIsRPOpen(!isRPOpen);



  const [biaModelIds, setBiaModelIds] = useState([]); // ✅ good
  const [biaModelNames, setBiaModelNames] = useState(""); 
  const [showBIAmodel, setShowBIAmodel] = useState(false);
  

  const handleSelectRTO = (option) => {
    setRTO(option);
    setIsRTOpen(false);
  };

  const handleSelectDR = (option) => {
    setActivityRTO(option);
    setIsDROpen(false);
  };

  const handleSelectRPO = (option) => {
    setActivityMTPD(option);
    setIsRPOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const newActivity = {
      bia,
      plan,
      activity,
      outlineSteps: outlineTheActivitySteps, // Update field name
      businessEntity,
      processEditor,
      rto,
      activityMtpd: activityMTPD, // Update field name
      activityRto: activityRTO, // Update field name
    };

    console.log("Submitting new activity:", newActivity);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/activities/create`, newActivity);
      setSuccess("Activity created successfully!");
      console.log("API Response:", response.data);
    } catch (error) {
      setError("Failed to create activity. Please try again.");
      console.error("API Error:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>New Activity Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Activity: New Activity</div>
            <div className="d-flex align-items-center justify-content-end">
              <div>
                <NavLink className="button3 border-1 button3-changes me-1" to="/activities" title="Cancel">
                  <RxCross2 className="me-1" style={{ width: "15px", height: "15px" }} />
                  Cancel
                </NavLink>
                <NavLink className="button3 border-1 button3-changes me-1" to="#" title="Save & New">
                  Save & New
                </NavLink>
                <NavLink className="button3 border-1 me-3" to="#" title="Save" onClick={handleSubmit}>
                  <FaCheck className="me-1" style={{ width: "15px", height: "15px" }} title="Save" />
                  Save
                </NavLink>
              </div>
              <div className="map-action k-widget k-button-group order-1" id="map-action-toggle" role="group">
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
                  <ul className={`right-auto dropdown-menu ${isToolOpen ? "show" : ""}`} aria-labelledby="TollFropdown">
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
          <div className="form-heading">Process Information </div>
          <div className="border-1"></div>
          <Form onSubmit={handleSubmit}>
            <div className="row pt-4">
              <div className="col-8">
                {error && <Alert color="danger">{error}</Alert>}
                {success && <Alert color="success">{success}</Alert>}
                <div className="mb-3 d-flex">
                  <label htmlFor="bia" className="form-label fs-15 w-20 me-2">
                    BIA
                  </label>
                 
                    <Input
                      name="bia"
                      className="form-control"
                      type="text"
                      placeholder="Enter BIA"
                      value={bia}
                      onChange={(e) => setBia(e.target.value)}
                    />
                 
                  <button type="button" className="btn btn-secondary border-radius-2"
                   onClick={() => setShowBIAmodel(true)}
                  >
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>
                <div className="mb-3 d-flex">
                  <label htmlFor="plan" className="form-label fs-15 w-20 me-2">
                    Plan
                  </label>
                  
                    <Input
                      name="plan"
                      className="form-control"
                      type="text"
                      placeholder="Enter Plan"
                      value={plan}
                      onChange={(e) => setPlan(e.target.value)}
                    />
             
                  <button type="button" className="btn btn-secondary border-radius-2">
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="activity" className="form-label me-2 fs-15 w-40">
                    Activity
                    <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="activity"
                    className="form-control"
                    type="text"
                    placeholder="Enter Activity"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="outlineTheActivitySteps" className="form-label me-2 fs-15 w-40">
                    Outline the activity steps
                  </Label>
                  <textarea
                    name="outlineTheActivitySteps"
                    className="form-control"
                    type="text"
                    placeholder="Enter Outline the activity steps"
                    value={outlineTheActivitySteps}
                    onChange={(e) => setOutlineTheActivitySteps(e.target.value)}
                  />
                </div>
                <div className="mb-3 d-flex">
                  <label htmlFor="business-entity" className="form-label fs-15 w-20 me-2">
                    Business Entity
                  </label>
                 
                    <Input
                      name="business-entity"
                      className="form-control"
                      type="text"
                      placeholder="Enter Business Entity"
                      value={businessEntity}
                      onChange={(e) => setBusinessEntity(e.target.value)}
                    />
                 
                  <button type="button" className="btn btn-secondary border-radius-2">
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>
                <div className="mb-3 d-flex">
                  <label htmlFor="process-editor" className="form-label fs-15 w-20 me-2">
                    Process Editor
                    <span className="text-danger">*</span>
                  </label>
                 
                    <Input
                      name="process-editor"
                      className="form-control"
                      type="text"
                      placeholder="Enter Process Editor"
                      value={processEditor}
                      onChange={(e) => setProcessEditor(e.target.value)}
                    />
              
                  <button type="button" className="btn btn-secondary border-radius-2">
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="rto" className="form-label me-2 fs-15 w-40 d-flex align-items-center justify-content-between">
                    RTO
                    <FaCircleQuestion className="me-2 hw-20" />
                  </Label>
                  <div className="dropdown-container position-relative flex-grow-1 w-100">
                    <button
                      onClick={toggleRTODropdown}
                      className="form-control text-start d-flex justify-content-between align-items-center"
                      type="button"
                    >
                      <span>{rto}</span>
                      <svg
                        className={`ms-2 ${isRTOpen ? "rotate-180" : ""}`}
                        style={{ width: "12px", height: "12px" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isRTOpen && (
                      <div className="position-absolute w-100 mt-1 bg-white border rounded dropdown-menu1" style={{ zIndex: 1000 }}>
                        {RTOOptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleSelectRTO(option)}
                            className="dropdown-item w-100 text-start py-2 px-3"
                            type="button"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="activity mtpd" className="form-label me-2 fs-15 w-40">
                    Activity MTPD
                  </Label>
                  <div className="dropdown-container position-relative flex-grow-1 w-100">
                    <button
                      onClick={toggleRPODropdown}
                      className="form-control text-start d-flex justify-content-between align-items-center"
                      type="button"
                    >
                      <span>{activityMTPD}</span>
                      <svg
                        className={`ms-2 ${isRPOpen ? "rotate-180" : ""}`}
                        style={{ width: "12px", height: "12px" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isRPOpen && (
                      <div className="position-absolute w-100 mt-1 bg-white border rounded dropdown-menu1" style={{ zIndex: 1000 }}>
                        {MTPDOptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleSelectRPO(option)}
                            className="dropdown-item w-100 text-start py-2 px-3"
                            type="button"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="activity rto" className="form-label me-2 fs-15 w-40">
                    Activity RTO
                  </Label>
                  <div className="dropdown-container position-relative flex-grow-1 w-100">
                    <button
                      onClick={toggleDRDropdown}
                      className="form-control text-start d-flex justify-content-between align-items-center"
                      type="button"
                    >
                      <span>{activityRTO}</span>
                      <svg
                        className={`ms-2 ${isDROpen ? "rotate-180" : ""}`}
                        style={{ width: "12px", height: "12px" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isDROpen && (
                      <div className="position-absolute w-100 mt-1 bg-white border rounded dropdown-menu1" style={{ zIndex: 1000 }}>
                        {RPOOptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleSelectDR(option)}
                            className="dropdown-item w-100 text-start py-2 px-3"
                            type="button"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>


      <BIAmodel
  isOpen={showBIAmodel}
  toggle={() => setShowBIAmodel(false)}
  onSelect={({ ids, names }) => {
    setBiaModelIds(ids);
    setBiaModelNames(names);
  }}
/>

    </React.Fragment>
  );
}

export default NewActivities;