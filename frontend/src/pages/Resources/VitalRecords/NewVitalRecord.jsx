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
import { IoIosSearch } from "react-icons/io";
import { FaCircleQuestion } from "react-icons/fa6";
import "./VitalRecords.css";
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
import axios from "axios"; // Import axios for API calls
import { TiPlus } from "react-icons/ti";
import UserSearchModal from "./UserSearchModal"; // Correct the import statement

function NewVitalRecord() {
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false); // Vital Record Type dropdown
  const [selectedStatus, setSelectedStatus] = useState("-- Please select --");
  const statusOptions = [
    "-- Please select --",
    "Customer",
    "Distribution",
    "Finance",
    "Access",
    "Facilities/Blueprints",
    "IT/Data Center",
    "Inventory",
    "Medical",
    "Retail",
    "Safety",
    "Security",
  ];
  const toggleStatusDropdown = () => setIsStatusOpen((prev) => !prev);
  const toggleToolDropDown = () => setIsToolOpen(!isToolOpen);
  const handleSelectStatus = (option) => {
    setSelectedStatus(option);
    setIsStatusOpen(false);
  };

  // State variables for form fields
  const [vitalRecordName, setVitalRecordName] = useState('');
  const [description, setDescription] = useState('');
  const [owners, setOwners] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleSelectUsers = (selectedEmployees) => {
    setOwners(selectedEmployees);
    toggleModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Prepare the data to be sent
    const vitalRecordData = {
      vitalRecordName,
      vitalRecordType: selectedStatus,
      description,
      owners: owners.map((owner) => owner._id), // Store only the IDs of the selected employees
      updatedBy: "60d0fe4f5311236168a109ca" // Replace with a valid ObjectId from your User collection
    };

    console.log('Submitting vital record data:', vitalRecordData); // Log the data being sent

    try {
      // Make the API call
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/vital/create`, vitalRecordData);
      setSuccessMessage('Vital Record created successfully!');
      setErrorMessage(''); // Clear any previous error messages
      console.log('Vital Record created successfully:', response.data);
      resetForm(); // Reset the form after successful submission
    } catch (error) {
      console.error('Error creating vital record:', error.response || error.message);
      setErrorMessage('Error creating vital record. Please try again.');
      setSuccessMessage(''); // Clear any previous success messages
    }
  };

  const resetForm = () => {
    setVitalRecordName('');
    setSelectedStatus('-- Please select --');
    setDescription('');
    setOwners([]);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>New Vital Record Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Vital Record: New Vital Record </div>
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
                  title="Save"
                >
                  Save & New
                </NavLink>
                <NavLink className="button3 border-1 me-3" to="#" title="Save" onClick={handleSubmit}>
                  <FaCheck className="me-1" style={{ width: "15px", height: "15px" }} title="Save" />
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
          <div className="form-heading">Vital Record Information</div>
          <div className="border-1"></div>
          <Form onSubmit={handleSubmit}>
            {successMessage && <Alert color="success">{successMessage}</Alert>}
            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
            <div className="row pt-4">
              <div className="col-8">
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="vitalRecordName"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Vital Record Name
                  </Label>
                  <Input
                    name="text"
                    className="form-control"
                    type="text"
                    value={vitalRecordName}
                    onChange={(e) => setVitalRecordName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="vitalRecordType"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Vital Record Type
                  </Label>
                  <div className="dropdown-container position-relative flex-grow-1 w-100">
                    <button
                      onClick={toggleStatusDropdown}
                      className="form-control text-start d-flex justify-content-between align-items-center"
                      type="button"
                    >
                      <span>{selectedStatus}</span>
                      <svg
                        className={`ms-2 ${isStatusOpen ? "rotate-180" : ""}`}
                        style={{ width: "12px", height: "12px" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {isStatusOpen && (
                      <div
                        className="position-absolute w-100 mt-1 bg-white border rounded dropdown-menu1"
                        style={{ zIndex: 1000 }}
                      >
                        {statusOptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleSelectStatus(option)}
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
                  <Label
                    htmlFor="description"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Description
                  </Label>
                  <textarea
                    name="text"
                    className="form-control"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3 d-flex">
                  <label
                    htmlFor="owner"
                    className="form-label fs-15 w-20 me-2 justify-content-between d-flex align-items-center"
                  >
                    Owner
                    <FaCircleQuestion className="me-2 hw-20" />
                  </label>
                  <div
                    className="form-control1 d-flex flex-wrap gap-2"
                    style={{
                      minHeight: "38px",
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      backgroundColor: "#fff",
                    }}
                  >
                    {owners.map((owner) => (
                      <span key={owner._id} className="badge bg-primary me-1">
                        {owner.firstName} {owner.lastName}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary border-radius-2"
                    onClick={toggleModal}
                  >
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <UserSearchModal isOpen={isModalOpen} toggle={toggleModal} onSelectUsers={handleSelectUsers} />
    </React.Fragment>
  );
}

export default NewVitalRecord;