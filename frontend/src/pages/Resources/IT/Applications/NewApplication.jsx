import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Input, Label, Button, Form } from "reactstrap";
import ApplicationOwnerModal from "./ApplicationOwnerModal";
import BusinessOwnerModal from "./BusinessOwnerModal";
import BusinessEntityModal from "./BusinessEntityModal";
import DataCenterModal from "./DataCenterModal";
import AlternateDataCenterModal from "./AlternateDataCenterModal";
import VendorModal from "./VendorModal"; // ✅ Ensure correct path
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { BiSearchAlt2 } from 'react-icons/bi';
import axios from "axios";
import { Alert } from "reactstrap";

function NewApplication() {
  // Form state variables
  const [applicationOwner, setApplicationOwner] = useState([]);
  const [applicationOwnerNames, setApplicationOwnerNames] = useState(""); // Stores selected names
  const [showApplicationOwnerModal, setShowApplicationOwnerModal] = useState(false);
  
const [businessOwner, setBusinessOwner] = useState([]); // Stores selected IDs
const [businessOwnerNames, setBusinessOwnerNames] = useState(""); // Stores selected names
const [showBusinessOwnerModal, setShowBusinessOwnerModal] = useState(false);
// Business Entity
const [businessEntity, setBusinessEntity] = useState([]); // Stores selected IDs
const [businessEntityNames, setBusinessEntityNames] = useState(""); // Stores selected names
const [showBusinessEntityModal, setShowBusinessEntityModal] = useState(false);
// Data Center
const [primaryDataCenter, setPrimaryDataCenter] = useState([]); // Stores selected IDs
const [primaryDataCenterNames, setPrimaryDataCenterNames] = useState(""); // Stores selected names
const [showDataCenterModal, setShowDataCenterModal] = useState(false);
// Alternate Data Center
const [alternateDataCenter, setAlternateDataCenter] = useState([]); // Stores selected IDs
const [alternateDataCenterNames, setAlternateDataCenterNames] = useState(""); // Stores selected names
const [showAlternateDataCenterModal, setShowAlternateDataCenterModal] = useState(false);
//
const [applicationVendor, setApplicationVendor] = useState([]);
const [applicationVendorNames, setApplicationVendorNames] = useState("");
const [showVendorModal, setShowVendorModal] = useState(false);



  //other fields
  const [applicationID, setApplicationID] = useState("");
  const [applicationName, setApplicationName] = useState("");
  const [applicationType, setApplicationType] = useState(""); // Multi-select
  const [applicationAlias, setApplicationAlias] = useState("");
  const [applicationURL, setApplicationURL] = useState("");
  const [description, setDescription] = useState("");
  const [hostedType, setHostedType] = useState("");
  const [drStrategy, setDrStrategy] = useState("");
  const [rto, setRTO] = useState("");
  const [rpo, setRPO] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Show loading state
  
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setLoading(true);
  
    const formData = {
      applicationID,
      applicationName,
      applicationType,
      applicationAlias,
      applicationURL,
      description,
      hostedType,
      drStrategy,
      rto,
      rpo,
      applicationOwner: applicationOwner.length > 0 ? applicationOwner : [], // ✅ Allow multiple selections
      businessOwner: businessOwner.length > 0 ? businessOwner : [],
      businessEntity: businessEntity.length > 0 ? businessEntity : [],
      primaryDataCenter: primaryDataCenter.length > 0 ? primaryDataCenter : [],
      alternateDataCenter: alternateDataCenter.length > 0 ? alternateDataCenter : [],
      applicationVendor: applicationVendor.length > 0 ? applicationVendor : [], // ✅ If empty, send null

    };
  
    console.log("📤 Submitting Application Data:", formData);
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/applications/create`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      console.log("✅ Success:", response.data);
      setSuccessMessage(response.data.message || "Application created successfully!");
      
      resetForm(); // ✅ Reset form after success
  
    } catch (error) {
      console.error("❌ API Error:", error);
  
      if (error.response) {
        console.log("🛑 Error Response:", error.response.data);
        setErrorMessage(error.response.data.message || "Failed to create application.");
      } else if (error.request) {
        setErrorMessage("❌ No response from server. Please check your connection.");
      } else {
        setErrorMessage("⚠ Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>New Application | TRST</title>
      </Helmet>
     <div className="page-content">
             <div className="main-content1">
               <div className="d-flex align-items-center justify-content-between">
                 <div className="header-text">Application: New Application</div>
                 <div className="d-flex align-items-center justify-content-end">
                   <div>
                     <NavLink className="button3 border-1 button3-changes me-1" to="/applications" title="Cancel">
                       <RxCross2 className="me-1" style={{ width: "15px", height: "15px" }} />
                       Cancel
                     </NavLink>
                     <button type="submit" className="button3 border-1 button3-changes me-1" title="Save" onClick={handleSubmit}>
                       <FaCheck className="me-1" style={{ width: "15px", height: "15px" }} />
                      Save
                    </button>
                   </div>
                 </div>
                 </div>
                 <div className="form-content">
                   <div className="form-heading">Application Information </div>
                   <div className="border-1"></div>
                     {/* Success Message */}
      {successMessage && <Alert color="success">{successMessage}</Alert>}
      
      {/* Error Message */}
      {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                   <form onSubmit={handleSubmit}>
                          <div className="row pt-4">
                            <div className="col-6">
                            
                              <div className="mb-3 d-flex align-items-center">
                                <Label htmlFor="company" className="form-label me-2 fs-15 w-40">
                                Application Name<span className="text-danger">*</span>
                                </Label>
                                <Input
                                  name="company"
                                  className="form-control"
                                  type="text"
                                  value={applicationName} onChange={(e) => setApplicationName(e.target.value)}
                                />
                              </div>
                              <div className="mb-3 d-flex align-items-center">
                                <Label htmlFor="website" className="form-label me-2 fs-15 w-40">
                                Application ID
                                </Label>
                                <Input
                                  name="website"
                                  className="form-control"
                                  type="text"
                                  value={applicationID} onChange={(e) => setApplicationID(e.target.value)}
                                />
                              </div>
                            </div>
                              <div className="col-6">
                                <div className="mb-3 d-flex align-items-center">
                                  <Label htmlFor="mainPhone" className="form-label me-2 fs-15 w-40">
                                  Application Type
                                  </Label>
                                  <Input 
                                  type="select" 
                                  value={applicationType || ""} // ✅ Ensure it's a string
                                  onChange={(e) => setApplicationType(e.target.value)} // ✅ Store as a string
                                  >
                                  <option value="">Select Application Type</option>
                                  <option value="3rd Party Web">3rd Party Web</option>
                                  <option value="Acquisition">Acquisition</option>
                                  <option value="COTS - Commercial Off The Shelf">COTS - Commercial Off The Shelf</option>
                                  <option value="COTS - Customized">COTS - Customized</option>
                                  <option value="Custom Developed In-House">Custom Developed In-House</option>
                                  <option value="Custom Developed By Vendor">Custom Developed By Vendor</option>
                                  <option value="Custom Used Web">Custom Used Web</option>
                                  </Input>
                                </div>
                                <div className="mb-3 d-flex align-items-center">
                                  <Label htmlFor="fax" className="form-label me-2 fs-15 w-40">
                                  Hosted Type
                                  </Label>
                                  <Input type="select" value={hostedType} onChange={(e) => setHostedType(e.target.value)}>
                                  <option value="">Select Hosted Type</option>
                                    <option value="3rd Party Web">3rd Party Web</option>
                                    <option value="AWS Data Center">AWS Data Center</option>
                                    <option value="Azure">Azure</option>
                                    <option value="Co-location">Co-location</option>
                                    <option value="Internal Owned & Operated Data Center">Internal Owned & Operated Data Center</option>
                                    <option value="On-prem Vendor Managed">On-prem Vendor Managed</option>
                                    <option value="Reseller Data Center">Reseller Data Center</option>
                                  </Input>
                                </div>
                              </div>
                    
                                <div className="col-6">
                                  <div className="mb-3 d-flex align-items-center">
                                    <Label htmlFor="mainPhone" className="form-label me-2 fs-15 w-40">
                                    Application Alias
                                    </Label>
                                    <Input
                                      name="mainPhone"
                                      className="form-control"
                                      type="text"
                                      value={applicationAlias} onChange={(e) => setApplicationAlias(e.target.value)}
                                    />
                                  </div>
                                
                                </div>

                                <div className="col-6">
                                  <div className="mb-3 d-flex align-items-center">
                                    <Label htmlFor="mainPhone" className="form-label me-2 fs-15 w-40">
                                    Application URL
                                    </Label>
                                    <Input
                                      name="mainPhone"
                                      className="form-control"
                                      type="text"
                                      value={applicationURL} onChange={(e) => setApplicationURL(e.target.value)}
                                    />
                                  </div>
                                
                                </div>
                   
                  
                  
                                  <div className="col-6">
                                      <div className="mb-3 d-flex align-items-center">
                                        <Label htmlFor="mainPhone" className="form-label me-2 fs-15 w-40">
                                        Description
                                        </Label>
                                        <Input
                                          name="mainPhone"
                                          className="form-control"
                                          type="textarea" value={description} onChange={(e) => setDescription(e.target.value)}
                                      
                                        />
                                      </div>
                                  
                                    </div>
                            
                            </div>
                            </form>
                    <div className="border-1"></div>
                    <div className="form-heading">Application Contacts
                    </div>
                    <div className="border-1"></div>
                    <form onSubmit={handleSubmit}>
                      <div className="row pt-4">
                            <div className="col-6">
                                  <div className="mb-3 d-flex align-items-center">
                                    <Label htmlFor="company" className="form-label me-2 fs-15 w-40">
                                    Application Owner
                                    </Label>
                                    <Input
                                      name="company"
                                      className="form-control"
                                      type="text"
                                      value={applicationOwnerNames}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-secondary border-radius-2"
                                        onClick={() => setShowApplicationOwnerModal(true)}
                                      >
                                        <BiSearchAlt2 className="fs-15"
                                      
                                          />
                                      </button>
                                  </div>
                                  <div className="mb-3 d-flex align-items-center">
                                    <Label htmlFor="website" className="form-label me-2 fs-15 w-40">
                                    Application Vendor(s)
                                    </Label>
                                    <Input
                                      name="website"
                                      className="form-control"
                                      type="text"
                                      value={applicationVendorNames}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-secondary border-radius-2"
                                        onClick={() => setShowVendorModal(true)}
                                      >
                                        <BiSearchAlt2 className="fs-15"
                                      
                                          />
                                      </button>
                                  </div>
                              
                              </div>
                                <div className="col-6">
                                  <div className="mb-3 d-flex align-items-center">
                                    <Label htmlFor="mainPhone" className="form-label me-2 fs-15 w-40">
                                    Business Owner
                                    </Label>
                                    <Input
                                      name="mainPhone"
                                      className="form-control"
                                      type="text"
                                      value={businessOwnerNames} readOnly style={{ flex: 1 }}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-secondary border-radius-2"
                                        onClick={() => setShowBusinessOwnerModal(true)}
                                      >
                                        <BiSearchAlt2 className="fs-15"
                                      
                                          />
                                      </button>
                                  </div>
                                  <div className="mb-3 d-flex align-items-center">
                                    <Label htmlFor="fax" className="form-label me-2 fs-15 w-40">
                                    Business Entity
                                    </Label>
                                    <Input
                                      name="fax"
                                      className="form-control"
                                      type="text"
                                      value={businessEntityNames} readOnly style={{ flex: 1 }}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-secondary border-radius-2"
                                        onClick={() => setShowBusinessEntityModal(true)}
                                      >
                                        <BiSearchAlt2 className="fs-15"
                                      
                                          />
                                      </button>
                                  </div>
                                </div>
                      </div>
                    </form>
                    {/* Recovery Objectives & Capability*/}
                    <div className="border-1"></div>
                    <div className="form-heading">Recovery Objectives & Capability

                    </div>
                    <div className="border-1"></div>
                    <form onSubmit={handleSubmit}>
                    <div className="row pt-4">
                    <div className="col-6">
                      <div className="mb-3 d-flex align-items-center">
                        <Label htmlFor="company" className="form-label me-2 fs-15 w-40">
                        RTO
                        </Label>
                        <Input type="select" value={rto || ""} onChange={(e) => setRTO(e.target.value)}>
                          <option value="">Select RTO</option>
                          <option value="15 min">15 min</option>
                          <option value="0.5 hour">0.5 hour</option>
                          <option value="1 hour">1 hour</option>
                          <option value="2 hours">2 hours</option>
                          <option value="3 hours">3 hours</option>
                          <option value="6 hours">6 hours</option>
                          <option value="1 day">1 day</option>
                          <option value="7 days">7 days</option>
                          <option value="Week 2">Week 2</option>
                        </Input>
                        
                      </div>
                      <div className="mb-3 d-flex align-items-center">
                        <Label htmlFor="website" className="form-label me-2 fs-15 w-40">
                        RPO
                        </Label>
                        <Input type="select" value={rpo || ""} onChange={(e) => setRPO(e.target.value)}>
                          <option value="">Select RPO</option>
                          <option value="15 min">15 min</option>
                          <option value="0.5 hour">0.5 hour</option>
                          <option value="1 hour">1 hour</option>
                          <option value="2 hours">2 hours</option>
                          <option value="3 hours">3 hours</option>
                          <option value="6 hours">6 hours</option>
                          <option value="1 day">1 day</option>
                          <option value="7 days">7 days</option>
                          <option value="Week 2">Week 2</option>
                        </Input>

                      </div>
                    </div>
                    <div className="col-6">
                      <div className="mb-3 d-flex align-items-center">
                        <Label htmlFor="mainPhone" className="form-label me-2 fs-15 w-40">
                       
                        DR Strategy
                        </Label>
                        <Input type="select" value={drStrategy} onChange={(e) => setDrStrategy(e.target.value)}>
                        <option value="">Select DR Strategy</option>
                          <option value="Active/Active">Active/Active</option>
                          <option value="Active/Cold Site">Active/Cold Site</option>
                          <option value="Active Standby">Active Standby</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="No DR Strategy">No DR Strategy</option>
                          <option value="Sole Site Restore">Sole Site Restore</option>
                        </Input>
                        
                      </div>
                      
                    </div>
                    </div>
                    </form>
                    {/* Location */}
                    <div className="border-1"></div>
                    <div className="form-heading">Location </div>
                    <form onSubmit={handleSubmit}>
                    <div className="row pt-4">
                    <div className="col-6">
                      <div className="mb-3 d-flex align-items-center">
                        <Label htmlFor="company" className="form-label me-2 fs-15 w-40">
                        Primary Data Center
                        </Label>
                        <Input
                          name="company"
                          className="form-control"
                          type="text"
                          value={primaryDataCenterNames}
                        />
                         <button
                            type="button"
                            className="btn btn-secondary border-radius-2"
                            onClick={() => setShowDataCenterModal(true)}
                          >
                            <BiSearchAlt2 className="fs-15"
                           
                              />
                          </button>
                      </div>
                     
                    </div>
                    <div className="col-6">
                      <div className="mb-3 d-flex align-items-center">
                        <Label htmlFor="mainPhone" className="form-label me-2 fs-15 w-40">
                        Alternate/Failover Data Center
                        </Label>
                        <Input
                          name="mainPhone"
                          className="form-control"
                          type="text"
                          value={alternateDataCenterNames} readOnly style={{ flex: 1 }}
                        />
                         <button
                            type="button"
                            className="btn btn-secondary border-radius-2"
                            onClick={() => setShowAlternateDataCenterModal(true)}
                          >
                            <BiSearchAlt2 className="fs-15"
                           
                              />
                          </button>
                      </div>
                      
                    </div>
                    </div>
                    </form>
                    
                   
                  {/* end location */}
                 </div>
                 
                 </div>
                 
               </div> 
               
               
      {/* Modal Components */}
      <ApplicationOwnerModal
  isOpen={showApplicationOwnerModal}
  toggle={() => setShowApplicationOwnerModal(false)}
  onSelect={(ownerData) => {
    setApplicationOwner(ownerData.ids); // Store selected IDs
    setApplicationOwnerNames(ownerData.names); // Display selected names
  }}
/>
<BusinessOwnerModal
  isOpen={showBusinessOwnerModal}
  toggle={() => setShowBusinessOwnerModal(false)}
  onSelect={(ownerData) => {
    setBusinessOwner(ownerData.ids); // ✅ Store IDs for backend
    setBusinessOwnerNames(ownerData.names); // ✅ Store Names for display
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
<DataCenterModal
  isOpen={showDataCenterModal}
  toggle={() => setShowDataCenterModal(false)}
  onSelect={(locationData) => {
    setPrimaryDataCenter(locationData.ids); // Store selected IDs
    setPrimaryDataCenterNames(locationData.names); // Display selected names
  }}
/>

<AlternateDataCenterModal
  isOpen={showAlternateDataCenterModal}
  toggle={() => setShowAlternateDataCenterModal(false)}
  onSelect={(locationData) => {
    setAlternateDataCenter(locationData.ids); // Store selected IDs
    setAlternateDataCenterNames(locationData.names); // Display selected names
  }}
/>
{/* Vendor Selection Modal */}
<VendorModal
  isOpen={showVendorModal}
  toggle={() => setShowVendorModal(false)}
  onSelect={(ids, names) => {
    setApplicationVendor(ids); // ✅ Store IDs
    setApplicationVendorNames(names); // ✅ Show Names
  }}
  />
    </React.Fragment>
  );
}
export default NewApplication;
