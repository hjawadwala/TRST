import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";
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
import { MdOutlineWatchLater } from "react-icons/md";
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
import { FaCalendarAlt } from "react-icons/fa";

function NewExercises() {
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [exerciseData, setExerciseData] = useState({
    exerciseSubject: "",
    coordinator: "",
    exerciseType: "",
    startDateTime: "",
    businessEntity: "",
    endDateTime: "",
    description: "",
    successCriteria: "",
    participants: "",
    teams: "",
    processes: "",
    locations: "",
    applications: "",
    vendors: "",
    plans: "",
  });

  // **Handle Input Change**
  const handleChange = (e) => {
    setExerciseData({ ...exerciseData, [e.target.name]: e.target.value });
  };

  // **API Call to Create Exercise**
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/exercises/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exerciseData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Exercise created successfully!");
        setExerciseData({
          exerciseSubject: "",
          coordinator: "",
          exerciseType: "",
          startDateTime: "",
          businessEntity: "",
          endDateTime: "",
          description: "",
          successCriteria: "",
          participants: "",
          teams: "",
          processes: "",
          locations: "",
          applications: "",
          vendors: "",
          plans: "",
        });
      } else {
        setErrorMessage(result.message || "Error creating exercise!");
      }
    } catch (error) {
      setErrorMessage("Network error! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = ["-- Please select --", "Full Scale", "Functional", "Location", "Notification", "Plan", "Tabletop", "Third Party"];

  return (
    <React.Fragment>
      <Helmet>
        <title>New Exercise Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Exercise : New Exercise </div>
            <div className="d-flex align-items-center justify-content-end">
              <div>
                <NavLink
                  className="button3 border-1 button3-changes me-1"
                  to="#"
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
                <NavLink className="button3 border-1 me-3" to="#" title="Save">
                  <FaCheck
                    className="me-1"
                    style={{ width: "15px", height: "15px" }}
                  />
                  Save
                </NavLink>
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
                    onClick={() => setIsToolOpen(!isToolOpen)}
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
          <div className="form-heading">Exercise Information</div>
          <div className="border-1"></div>
          <Form onSubmit={handleSubmit}>
            <div className="row pt-4">
              <Row>
                <Col md={6}>
                  <Label>Exercise Subject</Label>
                  <Input
                    type="text"
                    name="exerciseSubject"
                    value={exerciseData.exerciseSubject}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Label>Coordinator</Label>
                  <Input
                    type="text"
                    name="coordinator"
                    value={exerciseData.coordinator}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label>Exercise Type</Label>
                  <Input
                    type="select"
                    name="exerciseType"
                    value={exerciseData.exerciseType}
                    onChange={handleChange}
                    required
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Input>
                </Col>
                <Col md={6}>
                  <Label>Start Date/Time</Label>
                  <Input
                    type="datetime-local"
                    name="startDateTime"
                    value={exerciseData.startDateTime}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label>Business Entity</Label>
                  <Input
                    type="text"
                    name="businessEntity"
                    value={exerciseData.businessEntity}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Label>End Date/Time</Label>
                  <Input
                    type="datetime-local"
                    name="endDateTime"
                    value={exerciseData.endDateTime}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label>Description</Label>
                  <Input
                    type="textarea"
                    name="description"
                    value={exerciseData.description}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Label>Success Criteria</Label>
                  <Input
                    type="textarea"
                    name="successCriteria"
                    value={exerciseData.successCriteria}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label>Participants</Label>
                  <Input
                    type="text"
                    name="participants"
                    value={exerciseData.participants}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Label>Teams</Label>
                  <Input
                    type="text"
                    name="teams"
                    value={exerciseData.teams}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label>Processes</Label>
                  <Input
                    type="text"
                    name="processes"
                    value={exerciseData.processes}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Label>Locations</Label>
                  <Input
                    type="text"
                    name="locations"
                    value={exerciseData.locations}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label>Applications</Label>
                  <Input
                    type="text"
                    name="applications"
                    value={exerciseData.applications}
                    onChange={handleChange}
                    required
                  />
                </Col>
                <Col md={6}>
                  <Label>Vendors</Label>
                  <Input
                    type="text"
                    name="vendors"
                    value={exerciseData.vendors}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Label>Plans</Label>
                  <Input
                    type="text"
                    name="plans"
                    value={exerciseData.plans}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>
              <Button type="submit" color="primary" disabled={loading}>
                {loading ? <Spinner size="sm" /> : "Create Exercise"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NewExercises;