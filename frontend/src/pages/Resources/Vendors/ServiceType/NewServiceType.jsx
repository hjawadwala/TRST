import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaPrint, FaRegFilePdf } from "react-icons/fa";
import "./ServiceType.css";
import { Input, Label, Form } from "reactstrap";
import  Toastify  from "toastify-js";
import axios from "axios";

function NewServiceType() {
  const navigate = useNavigate();
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isTimeZoneOpen, setIsTimeZoneOpen] = useState(false); // Time Zone dropdown
  const [isStatusOpen, setIsStatusOpen] = useState(false); // Employee Status dropdown

  const [isHostelOpen, setIsHostelOpen] = useState(false); // Employee Status dropdown

  const [selectedStatus, setSelectedStatus] = useState("-- Please select --");
  const statusOptions = ["-- Please select --", "No", "Yes"];

  const [selectedHostel, setSelectedHostel] = useState("-- Please select --");
  const hostelOptions = ["-- Please select --", "No", "No"];
  const toggleStatusDropdown = () => setIsStatusOpen((prev) => !prev);
  const toggleHostelDropdown = () => setIsHostelOpen((prev) => !prev);

  const [formData, setFormData] = useState({
    serviceType: "",
  });

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/service-types/create`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      Toastify({
        text: "Service Type created successfully!",
        duration: 3000,
        backgroundColor: "#4caf50",
        close: true,
      }).showToast();
      navigate("/service-types");
      setFormData({
        serviceType: "",
      });
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  const toggleToolDropDown = () => setIsToolOpen(!isToolOpen);
  const handleSelectStatus = (option) => {
    setSelectedStatus(option);
    setIsStatusOpen(false);
  };
  const handleSelecthostel = (option) => {
    setSelectedHostel(option);
    setIsHostelOpen(false);
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>New Service Type Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Service Type: New Service Type </div>
            <div className="d-flex align-items-center justify-content-end">
              <div>
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => navigate("/service-types")}
                  title="Cancel"
                >
                  <RxCross2
                    className="me-1"
                    style={{ width: "15px", height: "15px" }}
                  />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  title="Update Organizational Entity"
                >
                  <FaCheck
                    className="me-1"
                    style={{ width: "15px", height: "15px" }}
                  />
                  Save
                </button>
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
          <div className="form-heading">Service Type Information </div>
          <div className="border-1"></div>
          <Form onSubmit={handleSubmit}>
            <div className="row pt-4">
              <div className="col-6">
                {["Service Type"].map((label, index) => (
                  <div className="mb-3 d-flex align-items-center" key={index}>
                    <Label
                      htmlFor={label}
                      className="form-label me-2 fs-15 w-40"
                    >
                      {label}
                    </Label>
                    <Input
                      name="serviceType"
                      className="form-control"
                      type="text"
                      value={formData.serviceType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          serviceType: e.target.value,
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NewServiceType;
