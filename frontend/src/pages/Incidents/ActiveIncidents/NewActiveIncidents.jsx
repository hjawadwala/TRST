import React, { useState } from "react";
import { Form, Input, Label, Button} from "reactstrap";
import { Link, NavLink } from "react-router-dom"; // Ensure Link is imported
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import ApplicationModal from "./ApplicationModal";
import LocationModal from "./LocationModal";
import PlanModal from "./PlanModal";
import UserModal from "./UserModal";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

function NewActiveIncidents() {

  // Application Modal State
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [selectedApplicationNames, setSelectedApplicationNames] = useState("");
  //location modal
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedLocationNames, setSelectedLocationNames] = useState("");
   //plan modal
   const [showPlanModal, setShowPlanModal] = useState(false);
   const [selectedPlans, setSelectedPlans] = useState([]);
   const [selectedPlanNames, setSelectedPlanNames] = useState("");
   //User modal
   const [showUserModal, setShowUserModal] = useState(false);
   const [selectedUsers, setSelectedUsers] = useState([]);
   const [selectedUserNames, setSelectedUserNames] = useState("");
  // State for form data  
  const [incident, setIncident] = useState("");
  const [incidentDate, setIncidentDate] = useState(""); // Date
  const [incidentTime, setIncidentTime] = useState(""); // Time
  const [incidentDescription, setIncidentDescription] = useState("");
  const [incidentCommander, setIncidentCommander] = useState("");
  const [location, setLocation] = useState("");
  const [application, setApplication] = useState("");
  const [plans, setPlan] = useState("");
  const [process, setProcess] = useState("");
  const [vendors, setVendors] = useState("");
  const [incidentType, setIncidentType] = useState([]); // For multiple selections
  const [severity, setSeverity] = useState("");

  // Define the incident types based on your Mongoose schema
  const incidentTypes = [
    'Accident',
    'Criminal',
    'Cyber Security',
    'Facilities',
    'Fire',
    'HazMat',
    'Infrastructure',
    'Medical',
    'Natural Disaster',
    'Other',
    'Severe Weather',
    'Technology',
    'Workplace Violence'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Combine date and time into a single datetime string
    const combinedDateTime = `${incidentDate}T${incidentTime}`;

    // Ensure that application and plans are arrays of ObjectId (strings)
    const data = {
        incident,
        incidentDate: combinedDateTime, // Send the combined datetime
        incidentType: Array.isArray(incidentType) ? incidentType : [], // Ensure this is an array
        incidentDescription,
        severity,
        incidentCommander: incidentCommander.length > 0 ? [incidentCommander] : undefined, // Use undefined instead of null
        location: location.length > 0 ? [location] : undefined, // Use undefined instead of null
        application: Array.isArray(application) && application.length > 0 ? application : undefined, // Ensure this is an array
        plans: Array.isArray(plans) && plans.length > 0 ? plans : undefined, // Ensure this is an array
        process: Array.isArray(process) && process.length > 0 ? process : undefined, // Ensure this is an array
        vendors: Array.isArray(vendors) && vendors.length > 0 ? vendors : undefined, // Ensure this is an array
    };

    console.log("Data being sent:", data); // Log the data being sent

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/activeincident/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorResponse = await response.json(); // Log the error response
            console.error("Error response:", errorResponse);
            throw new Error(`Network response was not ok: ${errorResponse.message || 'Unknown error'}`);
        }

        const result = await response.json();
        console.log("Success:", result);
        // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
        console.error("Error:", error);
        // Handle error (e.g., show an error message)
    }
};
// Confirm Selection


  return (
    <div className="form-content">

      <div className="form-heading">Incident Information</div>
      <div className="d-flex align-items-center justify-content-between">
                  <div className="header-text">Active Incidents: New Active Incident </div>
                  <div className="d-flex align-items-center justify-content-end">
                    <div>
                      <NavLink className="button3 border-1 button3-changes me-1" to="/active-incidents">
                        <RxCross2 className="me-1" style={{ width: "15px", height: "15px" }} />
                        Cancel
                      </NavLink>
                      <NavLink className="button3 border-1 button3-changes me-1" onClick={handleSubmit} title="Save">
                        Save & New
                      </NavLink>
                      <NavLink className="button3 border-1 me-3" to="#" title="Save">
                        <FaCheck className="me-1" style={{ width: "15px", height: "15px" }} />
                        Save
                      </NavLink>
                    </div>
                  </div>
                </div>
      <div className="border-1"></div>
      <Form onSubmit={handleSubmit}>
        <div className="row pt-4">
          <div className="col-8">
            <div className="mb-3 d-flex align-items-center">
              <Label htmlFor="incident" className="form-label me-2 fs-15 w-40">
                Incident
                <span className="text-danger">*</span>
              </Label>
              <Input
                id="incident"
                type="text"
                value={incident}
                onChange={(e) => setIncident(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 d-flex">
              <Label htmlFor="incidentDate" className="form-label fs-15 w-20 me-2">
                Incident Date
              </Label>
              <Input
                id="incidentDate"
                type="date"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                required
              />
              <button type="button" className="btn btn-secondary border-radius-2 me-1">
                <FaCalendarAlt className="fs-15" />
              </button>
            </div>
            <div className="mb-3 d-flex">
              <Label htmlFor="incidentTime" className="form-label fs-15 w-20 me-2">
                Incident Time
              </Label>
              <Input
                id="incidentTime"
                type="time"
                value={incidentTime}
                onChange={(e) => setIncidentTime(e.target.value)}
                required
              />
              <button type="button" className="btn btn-secondary border-radius-2 me-1">
                <MdOutlineWatchLater className="fs-15" />
              </button>
            </div>
            <div className="mb-3 d-flex align-items-center">
              <Label htmlFor="incidentType" className="form-label me-2 fs-15 w-40">
                Incident Type
              </Label>
              <select
                id="incidentType"
                multiple
                value={incidentType}
                onChange={(e) => {
                  const options = Array.from(e.target.selectedOptions).map(option => option.value);
                  setIncidentType(options);
                }}
                className="form-control"
              >
                {incidentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 d-flex align-items-center">
              <Label htmlFor="incidentDescription" className="form-label me-2 fs-15 w-40">
                Incident Description
              </Label>
              <textarea
                id="incidentDescription"
                className="form-control"
                value={incidentDescription}
                onChange={(e) => setIncidentDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 d-flex align-items-center">
              <Label htmlFor="severity" className="form-label me-2 fs-15 w-40">
                Severity
              </Label>
              <Input
                id="severity"
                type="select"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                required
              >
                <option value="">-- Please select --</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
                <option value="Monitoring">Monitoring</option>
              </Input>
            </div>
            <div className="mb-3 d-flex">
              <Label htmlFor="incidentCommander" className="form-label fs-15 w-20 me-2">
                Incident Commander (ID)
              </Label>
              <Input
                id="incidentCommander"
                type="text"
                value={incidentCommander}
                onChange={(e) => setIncidentCommander(e.target.value)}
              />
              <button type="button" className="btn btn-secondary border-radius-2"
               onClick={() => setShowUserModal(true)}
              >
                <BiSearchAlt2 className="fs-15" />
              </button>
            </div>
            <div className="mb-3 d-flex">
              <Label htmlFor="location" className="form-label fs-15 w-20 me-2">
                Location (ID)
              </Label>
              <Input
                id="location"
                type="text"
                value= {selectedLocationNames}
                onChange={(e) => setLocation(e.target.value)}
              />
             
              <button type="button" className="btn btn-secondary border-radius-2"
             onClick={() => setShowLocationModal(true)}
              >
                <BiSearchAlt2 className="fs-15" />
              </button>
            </div>
            <div className="mb-3 d-flex">
              <Label htmlFor="application" className="form-label fs-15 w-20 me-2">
                Application (ID)
              </Label>
              <Input
                id="application"
                type="text"
                value=   {selectedApplicationNames}
                onChange={(e) => setApplication(e.target.value)}
              />
           
              <button type="button" className="btn btn-secondary border-radius-2"
               onClick={() => setShowApplicationModal(true)}>
                <BiSearchAlt2 className="fs-15" />
              </button>
            </div>
            <div className="mb-3 d-flex">
              <Label htmlFor="plans" className="form-label fs-15 w-20 me-2">
                Plans (ID)
              </Label>
              <Input
                id="plans"
                type="text"
                value={selectedPlanNames}
                onChange={(e) => setPlan(e.target.value)}
              />
              <button type="button" className="btn btn-secondary border-radius-2"
               onClick={() => setShowPlanModal(true)} >
                <BiSearchAlt2 className="fs-15" />
              </button>
            </div>
            <div className="mb-3 d-flex">
              <Label htmlFor="process" className="form-label fs-15 w-20 me-2">
                Process (ID)
              </Label>
              <Input
                id="process"
                type="text"
                value={process}
                onChange={(e) => setProcess(e.target.value)}
              />
              <button type="button" className="btn btn-secondary border-radius-2">
                <BiSearchAlt2 className="fs-15" />
              </button>
            </div>
            <div className="mb-3 d-flex">
              <Label htmlFor="vendors" className="form-label fs-15 w-20 me-2">
                Vendors (ID)
              </Label>
              <Input
                id="vendors"
                type="text"
                value={vendors}
                onChange={(e) => setVendors(e.target.value)}
              />
              <button type="button" className="btn btn-secondary border-radius-2">
                <BiSearchAlt2 className="fs-15" />
              </button>
            </div>
            <Button type="submit">Submit</Button>
            <Link  className="Link1 border-1" to="/active-incidents" >back</Link>
          </div>
        </div>
      </Form>
      <ApplicationModal
    isOpen={showApplicationModal}
    toggle={() => setShowApplicationModal(false)}
    onSelect={(appData) => {
        setSelectedApplications(appData.ids); // Store selected application IDs
        setSelectedApplicationNames(appData.names); // Store selected application names
        setApplication(appData.ids.join(",")); // Store selected application IDs in the application state
    }}
/>
      <LocationModal
        isOpen={showLocationModal}
        toggle={() => setShowLocationModal(false)}
        onSelect={(appData) => {
          setSelectedLocations(appData.ids); 
          setSelectedLocationNames(appData.names);
          setLocation(appData.ids.join(",")); // Store selected application IDs in the application state
        }}
      />
       <PlanModal
        isOpen={showPlanModal}
        toggle={() => setShowPlanModal(false)}
        onSelect={(appData) => {
          setSelectedPlans(appData.ids); 
          setSelectedPlanNames(appData.names);
          setPlan(appData.ids.join(",")); // Store selected application IDs in the application state
        }}
      />

        <UserModal
        isOpen={showUserModal}
        toggle={() => setShowUserModal(false)}
        onSelect={(appData) => {
          setSelectedUsers(appData.ids); 
          setSelectedUserNames(appData.names);
          setUser(appData.ids.join(",")); // Store selected application IDs in the application state
        }}
      />
    </div>
   
  );
}

export default NewActiveIncidents;