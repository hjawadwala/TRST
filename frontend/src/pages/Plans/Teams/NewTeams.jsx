import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";

import { Input, Label, Form, Button, Spinner } from "reactstrap";
import { BiSearchAlt2 } from "react-icons/bi";
import ApplicationModal from "./ApplicationModal";
import UserSearchModal from "./UserSearchModal";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaPrint, FaRegFilePdf } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { FaCircleQuestion } from "react-icons/fa6";
function NewTeams() {
  const [plan, setPlan] = useState("");
  const [applications, setApplications] = useState([]);
  const [team, setTeam] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [teamType, setTeamType] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);

  const toggleToolDropDown = () => {
    setIsToolOpen((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.info("Submitting team creation request...");
    const data = {
      plan,
      applications: applications.map((app) => app._id),
      team,
      teamDescription,
      teamType,
      teamMembers: teamMembers.map((member) => member._id),
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/teams/create`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Team created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while creating the team.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>New Team | TRST</title>
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">New Team</div>
                 <div className="d-flex align-items-center justify-content-end">
                          <div>
                            <NavLink
                              className="button3 border-1 button3-changes me-1"
                              to="/teams"
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
                              to="#" title="Save" onClick={handleSubmit}
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
          <div className="form-heading">Team Information</div>
          <Form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Label>Plan</Label>
              <Input
                type="text"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                placeholder="Enter Plan Name"
                
              />
            </div>
            <div className="mb-3">
              <Label>Applications</Label>
              <div className="d-flex">
                <Input
                  type="text"
                  value={applications.map((app) => app.applicationName).join(", ")}
                  readOnly
                />
                <Button color="secondary" onClick={() => setShowApplicationModal(true)}>
                  <BiSearchAlt2 className="fs-15" />
                </Button>
              </div>
            </div>
            <div className="mb-3">
              <Label>Team</Label>
              <Input
                type="text"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                placeholder="Enter Team Name"
                required
              />
            </div>
            <div className="mb-3">
              <Label>Team Description</Label>
              <Input
                type="textarea"
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
                placeholder="Enter Team Description"
                required
              />
            </div>
            <div className="mb-3">
              <Label>Team Type</Label>
              <Input
                type="select"
                value={teamType}
                onChange={(e) => setTeamType(e.target.value)}
                required
              >
                <option value="">-- Please select --</option>
                <option value="Facility Managers">Facility Managers</option>
                <option value="First Responder">First Responder</option>
                <option value="Recovery">Recovery</option>
                <option value="Restoration">Restoration</option>
              </Input>
            </div>
            <div className="mb-3">
              <Label>Team Members</Label>
              <div className="d-flex">
                <Input
                  type="text"
                  value={teamMembers.map((member) => `${member.firstName} ${member.lastName}`).join(", ")}
                  readOnly
                />
                <Button color="secondary" onClick={() => setShowEmployeeModal(true)}>
                  <BiSearchAlt2 className="fs-15" />
                </Button>
              </div>
            </div>
            <Button color="primary" type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Submit"}
            </Button>
          </Form>
        </div>
      </div>
      <ApplicationModal
        isOpen={showApplicationModal}
        toggle={() => setShowApplicationModal(false)}
        onSelect={(selectedApplications) => setApplications(selectedApplications)}
      />
      <UserSearchModal
        isOpen={showEmployeeModal}
        toggle={() => setShowEmployeeModal(false)}
        onSelectUsers={(selectedUsers) => setTeamMembers(selectedUsers)}
      />
      <ToastContainer />
    </React.Fragment>
  );
}

export default NewTeams;