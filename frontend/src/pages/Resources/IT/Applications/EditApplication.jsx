import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Input, Label, Button, Form, Alert } from "reactstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BiSearchAlt2 } from "react-icons/bi";
import ApplicationOwnerModal from "./ApplicationOwnerModal";
import BusinessOwnerModal from "./BusinessOwnerModal";
import BusinessEntityModal from "./BusinessEntityModal";
import DataCenterModal from "./DataCenterModal";
import AlternateDataCenterModal from "./AlternateDataCenterModal";
import VendorModal from "./VendorModal";

function EditApplication() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Form state variables
  const [applicationOwner, setApplicationOwner] = useState([]);
  const [applicationOwnerNames, setApplicationOwnerNames] = useState("");
  const [showApplicationOwnerModal, setShowApplicationOwnerModal] = useState(false);
  const [businessOwner, setBusinessOwner] = useState([]);
  const [businessOwnerNames, setBusinessOwnerNames] = useState("");
  const [showBusinessOwnerModal, setShowBusinessOwnerModal] = useState(false);
  const [businessEntity, setBusinessEntity] = useState([]);
  const [businessEntityNames, setBusinessEntityNames] = useState("");
  const [showBusinessEntityModal, setShowBusinessEntityModal] = useState(false);
  const [primaryDataCenter, setPrimaryDataCenter] = useState([]);
  const [primaryDataCenterNames, setPrimaryDataCenterNames] = useState("");
  const [showDataCenterModal, setShowDataCenterModal] = useState(false);
  const [alternateDataCenter, setAlternateDataCenter] = useState([]);
  const [alternateDataCenterNames, setAlternateDataCenterNames] = useState("");
  const [showAlternateDataCenterModal, setShowAlternateDataCenterModal] = useState(false);
  const [applicationVendor, setApplicationVendor] = useState([]);
  const [applicationVendorNames, setApplicationVendorNames] = useState("");
  const [showVendorModal, setShowVendorModal] = useState(false);

  // Other fields
  const [applicationID, setApplicationID] = useState("");
  const [applicationName, setApplicationName] = useState("");
  const [applicationType, setApplicationType] = useState("");
  const [applicationAlias, setApplicationAlias] = useState("");
  const [applicationURL, setApplicationURL] = useState("");
  const [description, setDescription] = useState("");
  const [hostedType, setHostedType] = useState("");
  const [drStrategy, setDrStrategy] = useState("");
  const [rto, setRTO] = useState("");
  const [rpo, setRPO] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchApplicationData();
  }, [id]);

  const fetchApplicationData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/applications/${id}`);
      const app = response.data;
      setApplicationID(app.applicationID);
      setApplicationName(app.applicationName);
      setApplicationType(app.applicationType);
      setApplicationAlias(app.applicationAlias);
      setApplicationURL(app.applicationURL);
      setDescription(app.description);
      setHostedType(app.hostedType);
      setDrStrategy(app.drStrategy);
      setRTO(app.rto);
      setRPO(app.rpo);
      setApplicationOwner(app.applicationOwner);
      setBusinessOwner(app.businessOwner);
      setBusinessEntity(app.businessEntity);
      setPrimaryDataCenter(app.primaryDataCenter);
      setAlternateDataCenter(app.alternateDataCenter);
      setApplicationVendor(app.applicationVendor);
    } catch (error) {
      console.error("Error fetching application:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

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
      applicationOwner,
      businessOwner,
      businessEntity,
      primaryDataCenter,
      alternateDataCenter,
      applicationVendor,
    };

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/applications/${id}`, formData);
      setSuccessMessage("Application updated successfully!");
      navigate("/applications");
    } catch (error) {
      setErrorMessage("Failed to update application.");
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Edit Application | TRST</title>
      </Helmet>
      <div className="form-content">
        <div className="form-heading">Edit Application</div>
        <div className="border-1"></div>
        <Form onSubmit={handleSubmit}>
          {successMessage && <Alert color="success">{successMessage}</Alert>}
          {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
          <Button tag={Link} to="/applications" className="btn btn-secondary ms-2">
            Cancel
          </Button>
          <div className="mb-3" style={{ width: "50%" }}>
            <Label>Application ID</Label>
            <Input type="text" value={applicationID}  />
          </div>
          <div className="mb-3" style={{ width: "50%" }}>
            <Label>Application Name</Label>
            <Input type="text" value={applicationName} onChange={(e) => setApplicationName(e.target.value)} />
          </div>

          <div className="mb-3" style={{ width: "50%" }}>
        <Label>Application Type</Label>
        <Input type="select" value={applicationType} onChange={(e) => setApplicationType(e.target.value)}>
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

      <div className="mb-3" style={{ width: "50%" }}>
        <Label>Application Alias</Label>
        <Input type="text" value={applicationAlias} onChange={(e) => setApplicationAlias(e.target.value)} />
      </div>

      <div className="mb-3" style={{ width: "50%" }}>
        <Label>Application URL</Label>
        <Input type="text" value={applicationURL} onChange={(e) => setApplicationURL(e.target.value)} />
      </div>

      <div className="mb-3" style={{ width: "50%" }}>
        <Label>Description</Label>
        <Input type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div className="mb-3" style={{ width: "50%" }}>
        <Label>Hosted Type</Label>
        <Input type="select" value={hostedType} onChange={(e) => setHostedType(e.target.value)}>
          <option value="3rd Party Web">3rd Party Web</option>
          <option value="AWS Data Center">AWS Data Center</option>
          <option value="Azure">Azure</option>
          <option value="Co-location">Co-location</option>
          <option value="Internal Owned & Operated Data Center">Internal Owned & Operated Data Center</option>
          <option value="On-prem Vendor Managed">On-prem Vendor Managed</option>
          <option value="Reseller Data Center">Reseller Data Center</option>
        </Input>
      </div>

      <div className="mb-3" style={{ width: "50%" }}>
            <Label>Disaster Recovery Strategy</Label>
            <Input type="select" value={drStrategy} onChange={(e) => setDrStrategy(e.target.value)}>
              <option value="Active/Active">Active/Active</option>
              <option value="Active/Cold Site">Active/Cold Site</option>
              <option value="Active Standby">Active Standby</option>
              <option value="Hybrid">Hybrid</option>
              <option value="No DR Strategy">No DR Strategy</option>
              <option value="Sole Site Restore">Sole Site Restore</option>
            </Input>
          </div>

          <div className="mb-3" style={{ width: "50%" }}>
            <Label>Recovery Time Objective (RTO)</Label>
            <Input type="select" value={rto} onChange={(e) => setRTO(e.target.value)}>
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

          <div className="mb-3" style={{ width: "50%" }}>
            <Label>Recovery Point Objective (RPO)</Label>
            <Input type="select" value={rpo} onChange={(e) => setRPO(e.target.value)}>
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



          
                  {/* Application Owner */}
                  <div className="mb-3 d-flex align-items-center" style={{ width: "50%" }}>
            <Label className="form-label me-2" style={{ width: "40%" }}>
              Application Owner
            </Label>
            <Input type="text" value={applicationOwnerNames} readOnly style={{ flex: 1 }} />
            <Button
              className="btn btn-secondary ms-2"
              onClick={() => setShowApplicationOwnerModal(true)}
            >
              <BiSearchAlt2 className="fs-15" />
            </Button>
          </div>
          
          
          <div className="mb-3 d-flex align-items-center" style={{ width: "50%" }}>
            <Label className="form-label me-2" style={{ width: "40%" }}>
              Business Owner
            </Label>
            <Input type="text" value={businessOwnerNames} readOnly style={{ flex: 1 }} /> {/* ✅ Shows Selected Names */}
            <Button
              className="btn btn-secondary ms-2"
              onClick={() => setShowBusinessOwnerModal(true)}
            >
              <BiSearchAlt2 className="fs-15" />
            </Button>
          </div>
          
          
          
                  {/* Business Entity */}
                  <div className="mb-3 d-flex align-items-center" style={{ width: "50%" }}>
            <Label className="form-label me-2" style={{ width: "40%" }}>
              Business Entity
            </Label>
            <Input type="text" value={businessEntityNames} readOnly style={{ flex: 1 }} />
            <Button
              className="btn btn-secondary ms-2"
              onClick={() => setShowBusinessEntityModal(true)}
            >
              <BiSearchAlt2 className="fs-15" />
            </Button>
          </div>
          
          
                  {/* Primary Data Center */}
                  <div className="mb-3 d-flex align-items-center" style={{ width: "50%" }}>
            <Label className="form-label me-2" style={{ width: "40%" }}>
              Primary Data Center
            </Label>
            <Input type="text" value={primaryDataCenterNames} readOnly style={{ flex: 1 }} />
            <Button
              className="btn btn-secondary ms-2"
              onClick={() => setShowDataCenterModal(true)}
            >
              <BiSearchAlt2 className="fs-15" />
            </Button>
          </div>
          
          
                  {/* Alternate/Failover Data Center */}
                  <div className="mb-3 d-flex align-items-center" style={{ width: "50%" }}>
            <Label className="form-label me-2" style={{ width: "40%" }}>
              Alternate/Failover Data Center
            </Label>
            <Input type="text" value={alternateDataCenterNames} readOnly style={{ flex: 1 }} />
            <Button
              className="btn btn-secondary ms-2"
              onClick={() => setShowAlternateDataCenterModal(true)}
            >
              <BiSearchAlt2 className="fs-15" />
            </Button>
          </div>
          
          {/* Application Vendor */}
          <div className="mb-3 d-flex align-items-center" style={{ width: "50%" }}>
            <Label className="form-label me-2" style={{ width: "40%" }}>
              Application Vendor
            </Label>
            <Input type="text" value={applicationVendorNames} readOnly style={{ flex: 1 }} />
            <Button className="btn btn-secondary ms-2" onClick={() => setShowVendorModal(true)}>
              <BiSearchAlt2 className="fs-15" />
            </Button>
          </div>
          
          <Button type="submit" className="btn btn-primary mt-3">Update Application</Button>
        </Form>
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

export default EditApplication;