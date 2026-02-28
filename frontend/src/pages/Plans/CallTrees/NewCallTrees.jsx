import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { BiSearchAlt2 } from "react-icons/bi";
import { Input, Label, Form } from "reactstrap";
import axios from "axios"; // Import axios
import EmployeedataModal from './EmployeedataModal';
import ClientContactsdataModal from './ClientContactsdataModal.jsx';

function NewCallTrees() {
  const [callTreeName, setCallTreeName] = useState(""); // Call Tree Name
  const [description, setDescription] = useState(""); // Description
  const [employeedata, setEmployeedata] = useState([]); // Selected Employee IDs
  const [employeedataNames, setEmployeedataNames] = useState(""); // Selected Employee Names
  const [clientContactsdata, setClientContactsdata] = useState([]); // Selected Client Contact IDs
  const [clientContactsdataNames, setClientContactsdataNames] = useState(""); // Selected Client Contact Names
  const [vendorContactsdata, setVendorContactsdata] = useState([]); // Selected Vendor Contact IDs
  const [vendorContactsdataNames, setVendorContactsdataNames] = useState(""); // Selected Vendor Contact Names
  const [showEmployeedataModal, setShowEmployeedataModal] = useState(false);
  const [showClientContactsdataModal, setShowClientContactsdataModal] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send to the API
    const data = {
      callTreeName,
      description,
      employees: employeedata,
      clientContacts: clientContactsdata,
      vendorContacts: vendorContactsdata,
    };

    try {
      // Make the API call
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/call-trees/create`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Call Tree created successfully:", response.data);
      alert("Call Tree created successfully!");
    } catch (error) {
      console.error("Error creating Call Tree:", error.response?.data || error.message);
      alert("Failed to create Call Tree. Please try again.");
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>New Call Tree Page | TRST</title>
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Call Tree: New Call Tree</div>
            <div className="d-flex align-items-center justify-content-end">
              <NavLink className="button3 border-1 button3-changes me-1" to="/call-trees" title="Cancel">
                <RxCross2 className="me-1" style={{ width: "15px", height: "15px" }} />
                Cancel
              </NavLink>
              <button className="button3 border-1 me-3" onClick={handleSubmit} title="Save">
                <FaCheck className="me-1" style={{ width: "15px", height: "15px" }} />
                Save
              </button>
            </div>
          </div>
        </div>
        <h5 className="mt-3 mb-3">
          Add the Call Tree name and assign call tree members in the sections below.
        </h5>
        <div className="form-content">
          <Form onSubmit={handleSubmit}>
            <div className="row pt-4">
              <div className="col-8">
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="callTreeName" className="form-label me-2 fs-15 w-40">
                    Call Tree Name <span className="text-danger">*</span>
                  </Label>
                  <Input
                    id="callTreeName"
                    name="callTreeName"
                    className="form-control"
                    type="text"
                    value={callTreeName}
                    onChange={(e) => setCallTreeName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="description" className="form-label me-2 fs-15 w-40">
                    Description <span className="text-danger">*</span>
                  </Label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </Form>
        </div>
        <div className="form-content">
          <div className="form-heading">Select Callers</div>
          <div className="border-1"></div>
          <Form>
            <div className="row pt-4">
              <div className="col-8">
                <div className="mb-3 d-flex">
                  <label htmlFor="employees" className="form-label fs-15 w-20 me-2">
                    Employees
                  </label>
                  <div
                    className="form-control1 d-flex flex-wrap gap-2"
                    style={{
                      minHeight: "38px",
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      backgroundColor: "#fff",
                    }}
                  >
                    {employeedataNames}
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary border-radius-2"
                    onClick={() => setShowEmployeedataModal(true)}
                  >
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>
                <div className="mb-3 d-flex">
                  <label htmlFor="clientContacts" className="form-label fs-15 w-20 me-2">
                    Client Contacts
                  </label>
                  <div
                    className="form-control1 d-flex flex-wrap gap-2"
                    style={{
                      minHeight: "38px",
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      backgroundColor: "#fff",
                    }}
                  >
                    {clientContactsdataNames}
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary border-radius-2"
                    onClick={() => setShowClientContactsdataModal(true)}
                  >
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>

                <div className="mb-3 d-flex">
                  <label htmlFor="clientContacts" className="form-label fs-15 w-20 me-2">
                    vendor Contacts
                  </label>
                  <div
                    className="form-control1 d-flex flex-wrap gap-2"
                    style={{
                      minHeight: "38px",
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      backgroundColor: "#fff",
                    }}
                  >
                   
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary border-radius-2"
                    
                  >
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>
              </div>
            </div>
          </Form>
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

      {/* Client Contacts Modal */}
      <ClientContactsdataModal
        isOpen={showClientContactsdataModal}
        toggle={() => setShowClientContactsdataModal((prev) => !prev)}
        onSelect={({ ids, names }) => {
          setClientContactsdata(ids);
          setClientContactsdataNames(names);
        }}
      />
    </React.Fragment>
  );
}

export default NewCallTrees;