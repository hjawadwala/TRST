import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { TiPlus } from "react-icons/ti";
import { BiSearchAlt2 } from "react-icons/bi";
import { Input, Label, Form, Button, Alert, Spinner } from "reactstrap";
import axios from "axios";
import ActivityModal from "./ActivityModal";
import BCMSiteModal from "./BCMSiteModal";
import PrimaryStaffModal from "./PrimaryStaffModal";
import AlternateStaffModal from "./AlternateStaffModal";
import { Link } from "react-router-dom";
import { HiMiniWrench } from "react-icons/hi2";
import { FaPrint, FaRegFilePdf } from "react-icons/fa";
import { LuClock9 } from "react-icons/lu";
function NewBCMSeatsRequirements() {
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showBCMSiteModal, setShowBCMSiteModal] = useState(false);
  const [showPrimaryStaffModal, setShowPrimaryStaffModal] = useState(false);
  const [showAlternateStaffModal, setShowAlternateStaffModal] = useState(false);

  const [selectedActivity, setSelectedActivity] = useState([]);
  const [selectedBCMSite, setSelectedBCMSite] = useState([]);
  const [selectedPrimaryStaff, setSelectedPrimaryStaff] = useState([]);
  const [selectedAlternateStaff, setSelectedAlternateStaff] = useState([]);
  const [bcmSeatsRequirementsRecovery, setBcmSeatsRequirementsRecovery] = useState("");
  const [bcmSeatsRequirements, setBcmSeatsRequirements] = useState("");
  const [timeOfOperation, setTimeOfOperation] = useState("");
  const [bcmSeatNumber, setBcmSeatNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Dropdown toggles
  const toggleToolDropDown = () => setIsToolOpen(!isToolOpen);
  const toggleTimeZoneDropdown = () => setIsTimeZoneOpen((prev) => !prev);
  const toggleStatusDropdown = () => setIsStatusOpen((prev) => !prev);
  const toggleStateDropdown = () => setIsStateOpen((prev) => !prev);
  const toggleCountryDropdown = () => setIsCountryOpen((prev) => !prev);

  // Handle Selection from Modals
  const handleSelectActivity = (activities) => {
    setSelectedActivity(activities);
    setShowActivityModal(false);
  };

  const handleSelectBCMSite = (sites) => {
    setSelectedBCMSite(sites);
    setShowBCMSiteModal(false);
  };

  const handleSelectPrimaryStaff = (staffList) => {
    setSelectedPrimaryStaff(staffList);
    setShowPrimaryStaffModal(false);
  };

  const handleSelectAlternateStaff = (staffList) => {
    setSelectedAlternateStaff(staffList);
    setShowAlternateStaffModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");
  
    const data = {
      bcmSeatsRequirements,
      bcmSeatsRequirementsRecovery,
      timeOfOperation,
      bcmSeatNumber,
      activities: selectedActivity.map((activity) => activity._id),
      bcmSite: selectedBCMSite.map((site) => site._id),
      primaryCriticalStaff: selectedPrimaryStaff.map((staff) => staff._id),
      alternateCriticalStaff: selectedAlternateStaff.map((staff) => staff._id),
    };
  
    console.log("Submitting data:", data); // Log the data being submitted
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/bcm-seats-requirements/create`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response:", response.data); // Log the response data
      setSuccessMessage("BCM Seats Requirement created successfully!");
      setBcmSeatsRequirements("");
      setBcmSeatsRequirementsRecovery("");
      setTimeOfOperation("");
      setBcmSeatNumber("");
      setSelectedActivity([]);
      setSelectedBCMSite([]);
      setSelectedPrimaryStaff([]);
      setSelectedAlternateStaff([]);
    } catch (error) {
      console.error("Error creating BCM Seats Requirement:", error.response?.data);
      if (error.response) {
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      setError(error.response?.data?.message || "An error occurred while creating BCM Seats Requirement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>New BCM Seats Requirement | TRST</title>
      </Helmet>

      <div className="form-content">
        <div className="form-heading">BCM Seats Requirement Information</div>
        <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Employees: New Employee</div>
            <div className="d-flex align-items-center justify-content-end">
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => navigate("/employees")}
                >
                  Cancel
                </button>
                <button
                title="Create Employee"
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
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
                    <HiMiniWrench style={{ width: "16px", height: "16px" }} />
                  </button>
                  <ul
                    className={`right-auto dropdown-menu  ${
                      isToolOpen ? "show" : ""
                    }`}
                    aria-labelledby="TollFropdown"
                  >
                    {/* <li><a className="dropdown-item" href="#"><BiSolidEdit style={{ width: "15px", height: "15px" }} /> Design this page</a></li>
                                        <li><a className="dropdown-item" href="#"><FcSettings style={{ width: "15px", height: "15px" }} /> Object Definition</a></li>
                                        <li><a className="dropdown-item" href="#"><LuTableOfContents style={{ width: "15px", height: "15px" }} /> Tab Definition</a></li>
                                        <div className="border-1"></div> */}
                    <li>
                      <a className="dropdown-item" href="#">
                        <FaPrint style={{ width: "15px", height: "15px" }} />{" "}
                        Print
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <FaRegFilePdf
                          style={{ width: "15px", height: "15px" }}
                        />{" "}
                        PDF
                      </a>
                    </li>
                    <div className="border-1"></div>
                    <li>
                      <a className="dropdown-item" href="#">
                        <LuClock9 style={{ width: "15px", height: "15px" }} />{" "}
                        Page Load Time
                      </a>
                    </li>
                  </ul>
                </span>
              </div>
            </div>
          </div>
        <Form onSubmit={handleSubmit}>
          <div className="row pt-4">
            <Label className="form-label">BCM Seats Requirements</Label>
            <Input type="text" value={bcmSeatsRequirements} onChange={(e) => setBcmSeatsRequirements(e.target.value)} />

            <Label className="form-label">BCM Seats Requirements Recovery</Label>
            <select
              className="form-control"
              value={bcmSeatsRequirementsRecovery}
              onChange={(e) => setBcmSeatsRequirementsRecovery(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <Label className="form-label">Time of Operation</Label>
            <Input type="text" value={timeOfOperation} onChange={(e) => setTimeOfOperation(e.target.value)} />

            <Label className="form-label">BCM Seat Number</Label>
            <Input type="number" value={bcmSeatNumber} onChange={(e) => setBcmSeatNumber(e.target.value)} />

            <div className="col-8">
              {/* Activities Selection */}
              <div className="mb-3 d-flex">
                <Label className="form-label w-40">Activities</Label>
                <div className="form-control">
                  {Array.isArray(selectedActivity) && selectedActivity.length > 0
                    ? selectedActivity.map((activity) => activity.activity).join(", ")
                    : "No activity selected"}
                </div>
                <Button color="secondary" onClick={() => setShowActivityModal(true)}>
                  <TiPlus className="fs-15" />
                </Button>
              </div>

              {/* BCM Site Selection */}
              <div className="mb-3 d-flex align-items-center">
                <Label className="form-label w-40">BCM Site</Label>
                <div className="form-control d-flex align-items-center">
                  <span>
                    {Array.isArray(selectedBCMSite) && selectedBCMSite.length > 0
                      ? selectedBCMSite.map((site) => site.locationName).join(", ")
                      : "No site selected"}
                  </span>
                </div>
                <Button color="secondary" onClick={() => setShowBCMSiteModal(true)} className="ms-2">
                  <BiSearchAlt2 className="fs-15" />
                </Button>
              </div>

              {/* Primary Critical Staff */}
              <div className="mb-3 d-flex">
                <Label className="form-label w-40">Primary Critical Staff</Label>
                <div className="form-control">
                  {Array.isArray(selectedPrimaryStaff) && selectedPrimaryStaff.length > 0
                    ? selectedPrimaryStaff.map((staff) => `${staff.firstName} ${staff.lastName}`).join(", ")
                    : "No staff selected"}
                </div>
                <Button color="secondary" onClick={() => setShowPrimaryStaffModal(true)}>
                  <TiPlus className="fs-15" />
                </Button>
              </div>

              {/* Alternate Critical Staff */}
              <div className="mb-3 d-flex">
                <Label className="form-label w-40">Alternate Critical Staff</Label>
                <div className="form-control">
                  {Array.isArray(selectedAlternateStaff) && selectedAlternateStaff.length > 0
                    ? selectedAlternateStaff.map((staff) => `${staff.firstName} ${staff.lastName}`).join(", ")
                    : "No staff selected"}
                </div>
                <Button color="secondary" onClick={() => setShowAlternateStaffModal(true)}>
                  <TiPlus className="fs-15" />
                </Button>
              </div>

              {error && <Alert color="danger" timeout={5000}>{error}</Alert>}
              {successMessage && <Alert color="success" timeout={5000}>{successMessage}</Alert>}
              <Button color="primary" type="submit" disabled={loading}>
                {loading ? <Spinner size="sm" /> : "Submit"}
              </Button>
              <Link color="secondary" to="/bcm-seats-requirements" className="ms-2" >
                Cancel
            </Link>
            </div>
          </div>
        </Form>
      </div>

      {/* Modals */}
      <ActivityModal isOpen={showActivityModal} toggle={() => setShowActivityModal(false)} onSelect={handleSelectActivity} />
      <BCMSiteModal isOpen={showBCMSiteModal} toggle={() => setShowBCMSiteModal(false)} onSelect={handleSelectBCMSite} />
      <PrimaryStaffModal isOpen={showPrimaryStaffModal} toggle={() => setShowPrimaryStaffModal(false)} onSelect={handleSelectPrimaryStaff} />
      <AlternateStaffModal isOpen={showAlternateStaffModal} toggle={() => setShowAlternateStaffModal(false)} onSelect={handleSelectAlternateStaff} />
    </React.Fragment>
  );
}

export default NewBCMSeatsRequirements;