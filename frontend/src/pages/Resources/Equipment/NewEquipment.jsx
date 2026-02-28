import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaPrint, FaRegFilePdf } from "react-icons/fa";
import { BiSearchAlt2 } from "react-icons/bi";
import { TiPlus } from "react-icons/ti";
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
  Alert,
  Spinner,
} from "reactstrap";
import axios from 'axios';
import UserSearchModal from "./UserSearchModal";

function NewEquipment() {
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("-- Please select --");
  const [equipment, setEquipment] = useState("");
  const [equipmentType, setEquipmentType] = useState("Yes");
  const [modelName, setModelName] = useState("");
  const [vendors, setVendors] = useState([]);
  const [description, setDescription] = useState("");
  const [biaEquipmentDependency, setBiaEquipmentDependency] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const statusOptions = ["-- Please select --", "No", "Yes"];
  const toggleStatusDropdown = () => setIsStatusOpen((prev) => !prev);
  const toggleToolDropDown = () => setIsToolOpen(!isToolOpen);
  const handleSelectStatus = (option) => {
    setSelectedStatus(option);
    setIsStatusOpen(false);
  };

  const handleSelectVendors = (selectedVendors) => {
    setVendors(selectedVendors);
  };

  const handleRemoveVendor = (vendorId) => {
    setVendors(vendors.filter((vendor) => vendor._id !== vendorId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Submitting Equipment:", {
      equipment,
      equipmentType,
      modelName,
      vendors,
      description,
      biaEquipmentDependency,
    });
  
    const equipmentData = {
      equipment,
      equipmentType,
      modelName,
      vendors: vendors.map(v => v._id),  // ✅ Send only vendor IDs
      description,
      biaEquipmentDependency,
    };
  
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/equipment/Ecreate`, equipmentData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("✅ API Response:", response.data); // ✅ Check if API returns success
      setSuccessMessage("Equipment created successfully!");
      setError("");  // ✅ Clear any previous errors
      resetForm();
    } catch (err) {
      console.error("❌ Error response:", err.response?.data);
      setError(err.response?.data?.message || "An error occurred while creating equipment.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEquipment("");
    setSelectedStatus("-- Please select --");
    setModelName("");
    setVendors([]);
    setDescription("");
    setBiaEquipmentDependency("");
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen); // Toggle function for modal

  return (
    <React.Fragment>
      <Helmet>
        <title>New Equipment Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Equipment: New Equipment</div>
            <div className="d-flex align-items-center justify-content-end">
              <div>
                <NavLink className="button3 border-1 button3-changes me-1" to="/equipment">
                  <RxCross2 className="me-1" style={{ width: "15px", height: "15px" }} />
                  Cancel
                </NavLink>
                <NavLink className="button3 border-1 button3-changes me-1" to="#" title="Save">
                  Save & New
                </NavLink>
                <NavLink className="button3 border-1 me-3" to="#" title="Save" onClick={handleSubmit}>
                  <FaCheck className="me-1" style={{ width: "15px", height: "15px" }} />
                  Save
                </NavLink>
              </div>
              <div className="map-action k-widget k-button-group order-1" id="map-action-toggle" role="group">
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
                  <ul className={`right-auto dropdown-menu ${isToolOpen ? "show" : ""}`} aria-labelledby="TollFropdown">
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
          <div className="form-heading">Equipment Information</div>
          <div className="border-1"></div>
          <Form onSubmit={handleSubmit}>
            {successMessage && <Alert color="success" timeout={3000}>{successMessage}</Alert>}
            {error && <Alert color="danger" timeout={3000}>{error}</Alert>}
            <div className="row pt-4">
              <div className="col-8">
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="equipment" className="form-label me-2 fs-15 w-40">Equipment</Label>
                  <Input
                    name="equipment"
                    className="form-control"
                    type="text"
                    value={equipment}
                    onChange={(e) => setEquipment(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="equipmentType" className="form-label me-2 fs-15 w-40">Equipment Type</Label>
                  <div className="dropdown-container position-relative flex-grow-1 w-100">
                    <button
                      onClick={toggleStatusDropdown}
                      className="form-control text-start d-flex justify-content-between align-items-center"
                      type="button"
                    >
                      <span>{selectedStatus}</span>
                      <svg
                        className={`ms-2 ${isStatusOpen ? "rotate-180" : ""}`}
                        style={{ width: "12px", height: "12px" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {isStatusOpen && (
                      <div className="position-absolute w-100 mt-1 bg-white border rounded dropdown-menu1" style={{ zIndex: 1000 }}>
                        {statusOptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleSelectStatus(option)}
                            className="dropdown-item w-100 text-start py-2 px-3"
                            type="button"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="modelName" className="form-label me-2 fs-15 w-40">Model Name</Label>
                  <Input
                    name="modelName"
                    className="form-control"
                    type="text"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="vendors" className="form-label me-2 fs-15 w-40">Vendor(s)</Label>
                  <Input
                    name="vendors"
                    className="form-control"
                    type="text"
                    value={vendors.map(v => v.vendor).join(", ")}
                    readOnly
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-secondary border-radius-2"
                    onClick={toggleModal}
                  >
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="description" className="form-label me-2 fs-15 w-40">Description</Label>
                  <textarea
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="biaEquipmentDependency" className="form-label me-2 fs-15 w-40">BIA Equipment Dependency</Label>
                  <Input
                    name="biaEquipmentDependency"
                    className="form-control"
                    type="text"
                    value={biaEquipmentDependency}
                    onChange={(e) => setBiaEquipmentDependency(e.target.value)}
                    required
                  />
                </div>
                {vendors.length > 0 && (
                  <div className="mb-3">
                    <Label className="form-label me-2 fs-15 w-40">Selected Vendors</Label>
                    <ul>
                      {vendors.map((vendor) => (
                        <li key={vendor._id}>
                          {vendor.vendor}
                          <button
                            type="button"
                            className="btn btn-danger btn-sm ms-2"
                            onClick={() => handleRemoveVendor(vendor._id)}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {error && <Alert color="danger">{error}</Alert>}
                {successMessage && <Alert color="success">{successMessage}</Alert>}
                <Button type="submit" color="primary" disabled={loading}>
                  {loading ? <Spinner size="sm" /> : "Submit"}
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <UserSearchModal isOpen={isModalOpen} toggle={toggleModal} onSelectVendors={handleSelectVendors} />
    </React.Fragment>
  );
}

export default NewEquipment;