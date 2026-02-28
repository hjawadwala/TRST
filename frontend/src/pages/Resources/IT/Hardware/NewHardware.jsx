import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Form, Label, Input, Button, Alert } from "reactstrap";
import axios from "axios";
import "./Hardware.css";

function NewHardware() {
  // State variables for hardware form
  const [hardwareId, setHardwareId] = useState("");
  const [hardwareName, setHardwareName] = useState("");
  const [hardwareType, setHardwareType] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [model, setModel] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");
  const [memoryGB, setMemoryGB] = useState("");
  const [location, setLocation] = useState("");
  const [lowestApplicationRTO, setLowestApplicationRTO] = useState("");
  const [description, setDescription] = useState(""); // State for description
  const [vendor, setVendor] = useState("");
  const [warrantyExpiration, setWarrantyExpiration] = useState("");
  const [cost, setCost] = useState("");

  // State variables for messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const hardwareData = {
      hardwareId,
      hardwareName,
      hardwareType,
      serialNumber,
      model,
      operatingSystem,
      memoryGB,
      location,
      lowestApplicationRTO,
      description,
      vendor,
      warrantyExpiration,
      cost,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/hardware/create`, hardwareData);
      console.log('Hardware created:', response.data);
      
      // Display success message
      setSuccessMessage('Hardware created successfully!');
      setErrorMessage(''); // Clear any previous error message

      // Optionally reset the form
      resetForm();
      
    } catch (error) {
      console.error('Error creating hardware:', error);
      setErrorMessage('Error creating hardware: ' + (error.response?.data?.error || 'Unknown error'));
      setSuccessMessage(''); // Clear any previous success message
    }
  };

  // Function to reset the form fields
  const resetForm = () => {
    setHardwareId("");
    setHardwareName("");
    setHardwareType("");
    setSerialNumber("");
    setModel("");
    setOperatingSystem("");
    setMemoryGB("");
    setLocation("");
    setLowestApplicationRTO("");
    setDescription(""); // Reset description
    setVendor("");
    setWarrantyExpiration("");
    setCost("");
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>New Hardware Page | TRST</title>
        <meta name="description" content="This is the new hardware page." />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Hardware: New Hardware</div>
            <div className="d-flex align-items-center justify-content-end">
              <div>
                <NavLink className="button3 border-1 button3-changes me-1" to="/hardware" title="Cancel">
                  <RxCross2 className="me-1" style={{ width: "15px", height: "15px" }} />
                  Cancel
                </NavLink>
                <NavLink className="button3 border-1 button3-changes me-1" to="#" title="Save" onClick={handleSubmit}>
                  <FaCheck className="me-1" style={{ width: "15px", height: "15px" }} />
                  Save
                </NavLink>
              </div>
            </div>
          </div>
          <div className="form-content">
            {successMessage && <Alert color="success">{successMessage}</Alert>}
            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit}>
              <div className="row pt-4">
                <div className="col-8">
                  <div className="mb-3">
                    <Label htmlFor="hardwareId" className="form-label">Hardware ID</Label>
                    <Input type="text" id="hardwareId" value={hardwareId} onChange={(e) => setHardwareId(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="hardwareName" className="form-label">Hardware Name</Label>
                    <Input type="text" id="hardwareName" value={hardwareName} onChange={(e) => setHardwareName(e.target.value)} required />
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="hardwareType" className="form-label">Hardware Type</Label>
                    <Input type="select" id="hardwareType" value={hardwareType} onChange={(e) => setHardwareType(e.target.value)}>
                      <option value="">-- Please select --</option>
                      <option value="Cluster">Cluster</option>
                      <option value="Database Instance">Database Instance</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Network">Network</option>
                      <option value="Server">Server</option>
                      <option value="Other">Other</option>
                    </Input>
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="serialNumber" className="form-label">Serial Number</Label>
                    <Input type="text" id="serialNumber" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="model" className="form-label">Model</Label>
                    <Input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="operatingSystem" className="form-label">Operating System</Label>
                    <Input type="text" id="operatingSystem" value={operatingSystem} onChange={(e) => setOperatingSystem(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="memoryGB" className="form-label">Memory (GB)</Label>
                    <Input type="number" id="memoryGB" value={memoryGB} onChange={(e) => setMemoryGB(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="location" className="form-label">Location</Label>
                    <Input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="lowestApplicationRTO" className="form-label">Lowest Application RTO</Label>
                    <Input type="text" id="lowestApplicationRTO" value={lowestApplicationRTO} onChange={(e) => setLowestApplicationRTO(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="description" className="form-label">Description</Label>
                    <textarea
                      id="description"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows="4" // Set the number of rows for the textarea
                    />
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="vendor" className="form-label">Vendor</Label>
                    <Input type="text" id="vendor" value={vendor} onChange={(e) => setVendor(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="warrantyExpiration" className="form-label">Warranty Expiration</Label>
                    <Input type="date" id="warrantyExpiration" value={warrantyExpiration} onChange={(e) => setWarrantyExpiration(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="cost" className="form-label">Cost</Label>
                    <Input type="number" id="cost" value={cost} onChange={(e) => setCost(e.target.value)} />
                  </div>
                  <Button type="submit" className="btn btn-primary">Submit</Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NewHardware;