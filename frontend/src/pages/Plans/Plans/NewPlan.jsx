import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Input, Label } from "reactstrap";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaPrint, FaRegFilePdf } from "react-icons/fa";
import { BiSearchAlt2 } from "react-icons/bi";
import EmployeedataModal from './EmployeedataModal';
import PlanEditorsModal from './PlanEditorsModal';
import BusinessEntityModal from "./BusinessEntityModal";
import LocationsModal from "./LocationsModal";
import ApplicationsModal from "./ApplicationsModal";

function NewPlan() {
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Select Record Template");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [employeedata, setEmployeedata] = useState([]);
  const [employeedataNames, setEmployeedataNames] = useState("");
  const [showEmployeedataModal, setShowEmployeedataModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
//
const [PlanEditors, setPlanEditors] = useState([]); // Stores selected IDs
const [PlanEditorsNames, setPlanEditorsNames] = useState(""); // Stores selected names
const [showPlanEditorsModal, setShowPlanEditorsModal] = useState(false);
  // Business Entity
  const [businessEntity, setBusinessEntity] = useState([]); // Stores selected IDs
  const [businessEntityNames, setBusinessEntityNames] = useState(""); // Stores selected names
  const [showBusinessEntityModal, setShowBusinessEntityModal] = useState(false);
  // loctaions
  const [Locations, setLocations] = useState([]); // Stores selected IDs
  const [LocationsNames, setLocationsNames] = useState(""); // Stores selected names
  const [showLocationsModal, setShowLocationsModal] = useState(false);
  // Application
  const [Applications, setApplications] = useState([]); // Stores selected IDs
  const [ApplicationsNames, setApplicationsNames] = useState(""); // Stores selected names
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);



  
  // New state for form data
  const [formData, setFormData] = useState({
    plan_name: '',
    plan_leader: '',
    plan_editors: '',
    plan_type: '',
    business_entity: '',
    location: '',
    application: '',
    process: '',
    hardware: ''
  });

  const statusOptions = [
    "Select Record Template",
    "Business Continuity Plan",
    "Application Recovery Plan",
    "Crisis Management Plan",
    "Custom Plan",
    "Cyber Incident Response Plan",
    "Data Center Recovery Plan",
    "Emergency Response Plan",
    "Infrastructure Recovery Plan",
    "Pandemic Response Plan",
  ];

  const toggleStatusDropdown = () => setIsStatusOpen((prev) => !prev);
  const handleSelectStatus = (option) => {
    setSelectedStatus(option);
    setIsStatusOpen(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Prepare the data to be sent
    const planData = {
      plan_name: formData.plan_name,
      plan_leader: employeedata.length > 0 ? employeedata : null,
      plan_editors: formData.plan_editors.split(',').map(editor => editor.trim()).filter(editor => editor).length > 0 
        ? formData.plan_editors.split(',').map(editor => editor.trim()).filter(editor => editor) 
        : null,
      plan_type: selectedStatus,
      business_entity: formData.business_entity.split(',').map(entity => entity.trim()).filter(entity => entity).length > 0 
        ? formData.business_entity.split(',').map(entity => entity.trim()).filter(entity => entity) 
        : null,
      location: formData.location.split(',').map(loc => loc.trim()).filter(loc => loc).length > 0 
        ? formData.location.split(',').map(loc => loc.trim()).filter(loc => loc) 
        : null,
      process: formData.process.split(',').map(proc => proc.trim()).filter(proc => proc).length > 0 
        ? formData.process.split(',').map(proc => proc.trim()).filter(proc => proc) 
        : null,
      application: formData.application.split(',').map(app => app.trim()).filter(app => app).length > 0 
        ? formData.application.split(',').map(app => app.trim()).filter(app => app) 
        : null,
      hardware: formData.hardware.split(',').map(hw => hw.trim()).filter(hw => hw).length > 0 
        ? formData.hardware.split(',').map(hw => hw.trim()).filter(hw => hw) 
        : null,
    };

    console.log('Form submitted with data:', JSON.stringify(planData, null, 2)); // Log the data being sent

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/plans/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(planData),
      });

      const data = await response.json(); // Parse the response as JSON

      if (!response.ok) {
        console.error('Error response:', data); // Log the error response
        throw new Error(data.message || 'Network response was not ok');
      }

      // If successful, set the success message
      setSuccessMessage('Plan created successfully!');
      setErrorMessage(null); // Clear any previous error messages
      console.log('Success:', data); // Log success response
    } catch (error) {
      console.error('Error:', error.message); // Log any errors
      setErrorMessage(error.message); // Set the error message
      setSuccessMessage(null); // Clear any previous success messages
    }
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>New Plan Page | TRST</title>
      </Helmet>
      <div className="page-content">
       
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Plan: New Plan</div>
            <div className="d-flex align-items-center justify-content-end">
              <div className="d-flex align-items-center me-2">
                <div className="dropdown-container position-relative flex-grow-1 w-100">
                  <button
                    onClick={toggleStatusDropdown}
                    className="form-control text-start d-flex justify-content-between align-items-center"
                  >
                    <span>{selectedStatus}</span>
                    <svg
                      className={`ms-2 ${isStatusOpen ? "rotate-180" : ""}`}
                      style={{ width: "12px", height: "12px" }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isStatusOpen && (
                    <div className="position-absolute w-100 mt-1 bg-white border rounded dropdown-menu1">
                      {statusOptions.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleSelectStatus(option)}
                          className="dropdown-item w-100 text-start py-2 px-3"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <NavLink
                  className="button3 border-1 button3-changes me-1"
                  to="/plans"
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
                  onClick={handleSubmit}
                  title="Save & New"
                >
                  Save & New
                </NavLink>
                <button className="button3 border-1 me-3" onClick={handleSubmit} title="Save">
                  <FaCheck
                    className="me-1"
                    style={{ width: "15px", height: "15px" }}
                    title="Save"
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
                    aria-expanded="false"
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
        <div className="border-1 mt-3"></div>
  {/* Success and Error Messages */}
  {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <div className="form-content">
          <div className="form-heading">Plan Information</div>
          <div className="border-1"></div>
          <h5>{selectedStatus} Details</h5>
          <div className="border-1 mt-3"></div>
          <div className="row pt-4">
            <div className="col-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-3 d-flex align-items-center">
                  <Label className="form-label me-2 w-40">Plan Name<span className="text-danger">*</span></Label>
                  <Input name="plan_name" className="form-control" type="text" value={formData.plan_name} onChange={handleInputChange} required />
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Label className="form-label me-2 w-40">Plan Leader</Label>
                  <Input name="plan_leader" className="form-control" type="text" value={employeedataNames} onChange={handleInputChange}  />
              
              
                  <button type="button" className="btn btn-secondary border-radius-2" onClick={() => setShowEmployeedataModal(true)}>
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Label className="form-label me-2 w-40">Plan Editors</Label>
                  <Input name="plan_editors" className="form-control" type="text"       value={PlanEditorsNames} readOnly style={{ flex: 1 }} onChange={handleInputChange} />
                  <button type="button" className="btn btn-secondary border-radius-2">
                    <BiSearchAlt2 className="fs-15"
                     onClick={() => setShowPlanEditorsModal(true)}
                      />
                  </button>
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Label className="form-label me-2 w-40">Plan Type <span className="text-danger">*</span></Label>
                  <select
                    name="plan_type"
                    className="form-control"
                    value={selectedStatus}
                    onChange={(e) => handleSelectStatus(e.target.value)}
                  >
                    {statusOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="border-1 mt-3"></div>
                <div className="mb-3 d-flex align-items-center">
                  <Label className="form-label me-2 w-40">Business Entity</Label>
                  <Input name="business_entity" className="form-control" type="text"
                   value={businessEntityNames} readOnly style={{ flex: 1 }}  />
                  <button type="button" className="btn btn-secondary border-radius-2">
                    <BiSearchAlt2 className="fs-15"
                     onClick={() => setShowBusinessEntityModal(true)} />
                  </button>
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Label className="form-label me-2 w-40">Location</Label>
                  <Input name="location" className="form-control" type="text" value={LocationsNames} readOnly style={{ flex: 1 }} onChange={handleInputChange} />
                  <button type="button" className="btn btn-secondary border-radius-2"
                  onClick={() => setShowLocationsModal(true)}
                 >
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>
                <div className="border-1"></div>
                {(selectedStatus === "Application Recovery Plan" || selectedStatus === "Custom Plan" || selectedStatus === "Infrastructure Recovery Plan") && (
                  <div className="mb-3 d-flex align-items-center">
                    <Label className="form-label me-2 w-40">Application</Label>
                    <Input name="application" className="form-control" type="text"  value={ApplicationsNames} readOnly style={{ flex: 1 }}  />
                    <button type="button" className="btn btn-secondary border-radius-2" >
                      <BiSearchAlt2 className="fs-15"
                             onClick={() => setShowApplicationsModal(true)}
                      />
                    </button>
                  </div>
                )}

                {(selectedStatus === "Business Continuity Plan" || selectedStatus === "Custom Plan") && (
                  <div className="mb-3 d-flex align-items-center">
                    <Label className="form-label me-2 w-40">Process</Label>
                    <Input name="process" className="form-control" type="text" value={formData.process} onChange={handleInputChange} />
                    <button type="button" className="btn btn-secondary border-radius-2">
                      <BiSearchAlt2 className="fs-15" />
                    </button>
                  </div>
                )}

                <div className="border-1"></div>
                {(selectedStatus === "Custom Plan" || selectedStatus === "Infrastructure Recovery Plan") && (
                  <div className="mb-3 d-flex align-items-center">
                    <Label className="form-label me-2 w-40">Hardware</Label>
                    <Input name="hardware" className="form-control" type="text" value={formData.hardware} onChange={handleInputChange} />
                    <button type="button" className="btn btn-secondary border-radius-2">
                      <BiSearchAlt2 className="fs-15" />
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Employee Modal */}
      <EmployeedataModal
        isOpen={showEmployeedataModal}
        toggle={() => setShowEmployeedataModal((prev) => !prev)}
        onSelect={({ ids, names }) => {
          setEmployeedata(ids);
          setEmployeedataNames(names);
        }}
      />

<PlanEditorsModal
  isOpen={showPlanEditorsModal}
  toggle={() => setShowPlanEditorsModal(false)}
  onSelect={(ownerData) => {
    setPlanEditors(ownerData.ids); // ✅ Store IDs for backend
    setPlanEditorsNames(ownerData.names); // ✅ Store Names for display
  }}
/>
<BusinessEntityModal
  isOpen={showBusinessEntityModal}
  toggle={() => setShowBusinessEntityModal(false)}
  onSelect={(entityData) => {
    setBusinessEntity(entityData.ids); // Store selected IDs
    setBusinessEntityNames(entityData.names); // Display selected names
  }}
/>

<LocationsModal
  isOpen={showLocationsModal}
  toggle={() => setShowLocationsModal(false)}
  onSelect={(locationData) => {
    setLocations(locationData.ids); // Store selected IDs
    setLocationsNames(locationData.names); // Display selected names
  }}
/>


<ApplicationsModal
  isOpen={showApplicationsModal}
  toggle={() => setShowApplicationsModal(false)}
  onSelect={(locationData) => {
    setApplications(locationData.ids); // Store selected IDs
    setApplicationsNames(locationData.names); // Display selected names
  }}
/>

    </React.Fragment>
  );
}

export default NewPlan;