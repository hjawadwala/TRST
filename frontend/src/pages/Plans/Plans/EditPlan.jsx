
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { NavLink, useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Input, Label } from "reactstrap";
import { BiSearchAlt2 } from "react-icons/bi";
import EmployeedataModal from './EmployeedataModal';

function EditPlan() {
  const { id } = useParams(); // Get the ID from the URL
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Select Record Template");
  const [employeedata, setEmployeedata] = useState([]);
  const [employeedataNames, setEmployeedataNames] = useState("");
  const [showEmployeedataModal, setShowEmployeedataModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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

  // Fetch existing plan data when the component mounts
  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/plans/${id}`);
        const data = await response.json();
        if (response.ok) {
          setFormData({
            plan_name: data.plan_name || '',
            plan_leader: Array.isArray(data.plan_leader) ? data.plan_leader.join(', ') : '', // Check if it's an array
            plan_editors: Array.isArray(data.plan_editors) ? data.plan_editors.join(', ') : '', // Check if it's an array
            plan_type: data.plan_type || '',
            business_entity: Array.isArray(data.business_entity) ? data.business_entity.join(', ') : '', // Check if it's an array
            location: Array.isArray(data.location) ? data.location.join(', ') : '', // Check if it's an array
            application: Array.isArray(data.application) ? data.application.join(', ') : '', // Check if it's an array
            process: Array.isArray(data.process) ? data.process.join(', ') : '', // Check if it's an array
            hardware: Array.isArray(data.hardware) ? data.hardware.join(', ') : '', // Check if it's an array
          });
          setSelectedStatus(data.plan_type || 'Select Record Template');
          setEmployeedata(Array.isArray(data.plan_leader) ? data.plan_leader : []); // Default to an empty array if not an array
        } else {
          throw new Error(data.message || 'Failed to fetch plan data');
        }
      } catch (error) {
        console.error('Error fetching plan data:', error);
        setErrorMessage(error.message);
      }
    };

    fetchPlanData();
  }, [id]);

  // Function to fetch updated plan data
  const fetchUpdatedPlanData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/plans/${id}`);
      const data = await response.json();
      if (response.ok) {
        setFormData({
          plan_name: data.plan_name || '',
          plan_leader: Array.isArray(data.plan_leader) ? data.plan_leader.join(', ') : '', // Check if it's an array
          plan_editors: Array.isArray(data.plan_editors) ? data.plan_editors.join(', ') : '', // Check if it's an array
          plan_type: data.plan_type || '',
          business_entity: Array.isArray(data.business_entity) ? data.business_entity.join(', ') : '', // Check if it's an array
          location: Array.isArray(data.location) ? data.location.join(', ') : '', // Check if it's an array
          application: Array.isArray(data.application) ? data.application.join(', ') : '', // Check if it's an array
          process: Array.isArray(data.process) ? data.process.join(', ') : '', // Check if it's an array
          hardware: Array.isArray(data.hardware) ? data.hardware.join(', ') : '', // Check if it's an array
        });
        setSelectedStatus(data.plan_type || 'Select Record Template');
        setEmployeedata(Array.isArray(data.plan_leader) ? data.plan_leader : []); // Default to an empty array if not an array
      } else {
        throw new Error(data.message || 'Failed to fetch updated plan data');
      }
    } catch (error) {
      console.error('Error fetching updated plan data:', error);
      setErrorMessage(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    // Prepare the data to be sent
    const planData = {
      plan_name: formData.plan_name,
      plan_leader: employeedata.length > 0 ? employeedata : null,
      plan_editors: formData.plan_editors.split(',').map(editor => editor.trim()).filter(editor => editor.length > 0).length > 0 
        ? formData.plan_editors.split(',').map(editor => editor.trim()).filter(editor => editor.length > 0) 
        : null,
      plan_type: selectedStatus,
      business_entity: formData.business_entity.split(',').map(entity => entity.trim()).filter(entity => entity.length > 0).length > 0 
        ? formData.business_entity.split(',').map(entity => entity.trim()).filter(entity => entity.length > 0) 
        : null,
      location: formData.location.split(',').map(loc => loc.trim()).filter(loc => loc.length > 0).length > 0 
        ? formData.location.split(',').map(loc => loc.trim()).filter(loc => loc.length > 0) 
        : null,
      process: formData.process.split(',').map(proc => proc.trim()).filter(proc => proc.length > 0).length > 0 
        ? formData.process.split(',').map(proc => proc.trim()).filter(proc => proc.length > 0) 
        : null,
      application: formData.application.split(',').map(app => app.trim()).filter(app => app.length > 0).length > 0 
        ? formData.application.split(',').map(app => app.trim()).filter(app => app.length > 0) 
        : null,
      hardware: formData.hardware.split(',').map(hw => hw.trim()).filter(hw => hw.length > 0).length > 0 
        ? formData.hardware.split(',').map(hw => hw.trim()).filter(hw => hw.length > 0) 
        : null,
    };
  
    console.log('Plan data to be sent:', planData); // Log the data being sent
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/plans/update/${id}`, {
        method: 'PUT', // Use PUT for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(planData),
      });
  
      // Check if the response is OK
      if (!response.ok) {
        const errorText = await response.text(); // Get the response text
        console.error('Error response:', errorText); // Log the error response
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json(); // Parse the response as JSON
  
      // If successful, set the success message
      setSuccessMessage('Plan updated successfully!');
      setErrorMessage(null); // Clear any previous error messages
      console.log('Success:', data); // Log success response
  
      // Fetch the updated plan data
      await fetchUpdatedPlanData();
    } catch (error) {
      console.error('Error:', error.message); // Log any errors
      setErrorMessage(error.message); // Set the error message
      setSuccessMessage(null); // Clear any previous success messages
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Edit Plan Page | TRST</title>
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Plan: Edit Plan</div>
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
                <button className="button3 border-1 me-3" onClick={handleSubmit} title="Save">
                  <FaCheck
                    className="me-1"
                    style={{ width: "15px", height: "15px" }}
                    title="Save"
                  />
                  Save
                </button>
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
                  <Input name="plan_leader" className="form-control" type="text" value={formData.plan_leader} onChange={handleInputChange}  />
                  {employeedataNames}
                  <button type="button" className="btn btn-secondary border-radius-2" onClick={() => setShowEmployeedataModal(true)}>
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Label className="form-label me-2 w-40">Plan Editors</Label>
                  <Input name="plan_editors" className="form-control" type="text" value={formData.plan_editors} onChange={handleInputChange} />
                  <button type="button" className="btn btn-secondary border-radius-2">
                    <BiSearchAlt2 className="fs-15" />
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
                  <Input name="business_entity" className="form-control" type="text" value={formData.business_entity} onChange={handleInputChange} />
                  <button type="button" className="btn btn-secondary border-radius-2">
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Label className="form-label me-2 w-40">Location</Label>
                  <Input name="location" className="form-control" type="text" value={formData.location} onChange={handleInputChange} />
                  <button type="button" className="btn btn-secondary border-radius-2" onClick={() => setShowEmployeedataModal(true)}>
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>
                <div className="border-1"></div>
                {(selectedStatus === "Application Recovery Plan" || selectedStatus === "Custom Plan" || selectedStatus === "Infrastructure Recovery Plan") && (
                  <div className="mb-3 d-flex align-items-center">
                    <Label className="form-label me-2 w-40">Application</Label>
                    <Input name="application" className="form-control" type="text" value={formData.application} onChange={handleInputChange} />
                    <button type="button" className="btn btn-secondary border-radius-2" onClick={() => setShowEmployeedataModal(true)}>
                      <BiSearchAlt2 className="fs-15" />
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
    </React.Fragment>
  );
}

export default EditPlan;