import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { FaCheck, FaPrint, FaRegFilePdf } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit, BiSearchAlt2 } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { LuTableOfContents, LuClock9 } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { FaCircleQuestion } from "react-icons/fa6";
import "./VendorContract.css";
import { SlCalender } from "react-icons/sl";
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
import axios from "axios";

function NewVendorContract() {
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isTimeZoneOpen, setIsTimeZoneOpen] = useState(false); // Time Zone dropdown
  const [isStatusOpen, setIsStatusOpen] = useState(false); // Employee Status dropdown
  const [isHostelOpen, setIsHostelOpen] = useState(false); // Employee Status dropdown
  const [selectedStatus, setSelectedStatus] = useState("-- Please select --");
  const statusOptions = ["-- Please select --", "No", "Yes"];
  const [selectedHostel, setSelectedHostel] = useState("-- Please select --");
  const hostelOptions = ["-- Please select --", "No", "No"];
  const [formData, setFormData] = useState({
    vendor: "",
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    workPhone: "",
    workMobilePhone: "",
    alternatePhone: "",
    fax: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const toggleStatusDropdown = () => setIsStatusOpen((prev) => !prev);
  const toggleHostelDropdown = () => setIsHostelOpen((prev) => !prev);
  const toggleToolDropDown = () => setIsToolOpen(!isToolOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    console.log("Submitting form data:", formData);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/vendor-contacts/create`,
        formData
      );
      setSuccess("Vendor contact created successfully!");
    } catch (err) {
      console.error("Error creating vendor contact:", err);
      setError("Failed to create vendor contact.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>New Vendor Contact Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Vendor Contact: New Vendor Contact</div>
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
          <div className="form-heading"> Contact Information</div>
          <div className="border-1"></div>
          <Form onSubmit={handleSubmit}>
            <div className="row pt-4">
              <div className="col-6">
                <div className="mb-3 d-flex">
                  <label
                    htmlFor="vendor"
                    className="form-label fs-15 w-20 me-2"
                  >
                    Vendor <span className="text-danger">*</span>
                  </label>
                  <Input
                    name="vendor"
                    className="form-control"
                    type="text"
                    value={formData.vendor}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary border-radius-2"
                  >
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="firstName"
                    className="form-label me-2 fs-15 w-40"
                  >
                    First Name
                  </Label>
                  <Input
                    name="firstName"
                    className="form-control"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="lastName"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Last Name <span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="lastName"
                    className="form-control"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="title"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Title
                  </Label>
                  <Input
                    name="title"
                    className="form-control"
                    type="text"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="email"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Email Address
                  </Label>
                  <Input
                    name="email"
                    className="form-control"
                    type="text"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="workPhone"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Work Phone
                  </Label>
                  <Input
                    name="workPhone"
                    className="form-control"
                    type="text"
                    value={formData.workPhone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="workMobilePhone"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Work Mobile Phone
                  </Label>
                  <Input
                    name="workMobilePhone"
                    className="form-control"
                    type="text"
                    value={formData.workMobilePhone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="alternatePhone"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Alternate Phone
                  </Label>
                  <Input
                    name="alternatePhone"
                    className="form-control"
                    type="text"
                    value={formData.alternatePhone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="fax"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Fax
                  </Label>
                  <Input
                    name="fax"
                    className="form-control"
                    type="text"
                    value={formData.fax}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <Button type="submit" color="primary" disabled={loading}>
                {loading ? <Spinner size="sm" /> : "Save"}
              </Button>
            </div>
            {error && <Alert color="danger" timeout={3000}>{error}</Alert>}
            {success && <Alert color="success" timeout={3000}>{success}</Alert>}
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NewVendorContract;