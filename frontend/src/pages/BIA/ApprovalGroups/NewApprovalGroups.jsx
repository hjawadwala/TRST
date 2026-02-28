import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaPrint, FaRegFilePdf } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaCircleQuestion } from "react-icons/fa6";
import { BiSearchAlt2 } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import axios from "axios";
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
  FormGroup,
  Alert,
} from "reactstrap";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function NewApprovalGroups() {
  const navigate = useNavigate();
  const [approvalGroup, setApprovalGroup] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isToolOpen, setIsToolOpen] = useState(false); // Define isToolOpen state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/approval-groups/create`, {
        approvalGroup,
        groupDescription,
      });
      setSuccess("Approval Group created successfully!");
      // Reset form fields
      setApprovalGroup("");
      setGroupDescription("");

      Toastify({
        text: "Approval Group created successfully!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "#28a745",
        },
      }).showToast();
      navigate("/approval-groups");
    } catch (error) {
      console.error("Full error:", error);
      if (error.response) {
        console.log("Error response:", error.response.data);
        alert(error.response.data.message || "Error creating approval group");
      } else {
        alert("Network error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>New Approval Group Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">
              Approval Group: New Approval Group
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <div>
                <NavLink
                  className="button3 border-1 button3-changes me-1"
                  to="/approval-groups"
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
                  onClick={handleSubmit}
                >
                  Save & New
                </NavLink>
                <NavLink
                  className="button3 border-1 me-3"
                  to="#"
                  title="Save"
                  onClick={handleSubmit}
                >
                  <FaCheck
                    className="me-1"
                    style={{ width: "15px", height: "15px" }}
                    title="Save"
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
          <div className="form-heading">Approval Group Information</div>
          <div className="border-1"></div>
          <Form onSubmit={handleSubmit}>
            <div className="row pt-4">
              <div className="col-6">
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="approvalGroup"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Approval Group
                  </Label>
                  <Input
                    type="text"
                    id="approvalGroup"
                    value={approvalGroup}
                    onChange={(e) => setApprovalGroup(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="groupDescription"
                    className="form-label me-2 fs-15 w-40"
                  >
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
                {/* <Button type="submit" color="primary" disabled={isSubmitting} className="w-100">
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button> */}
              </div>
            </div>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NewApprovalGroups;