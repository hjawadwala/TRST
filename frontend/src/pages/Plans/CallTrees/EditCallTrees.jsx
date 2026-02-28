import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { BiSearchAlt2 } from "react-icons/bi";
import { Input, Label, Form } from "reactstrap";
import axios from "axios";
import EmployeedataModal from "./EmployeedataModal";
import ClientContactsdataModal from "./ClientContactsdataModal.jsx";

function EditCallTrees() {
  const { id } = useParams(); // Get ID from URL
  const navigate = useNavigate(); // For navigation after update

  const [callTreeName, setCallTreeName] = useState("");
  const [description, setDescription] = useState("");
  const [employeedata, setEmployeedata] = useState([]);
  const [employeedataNames, setEmployeedataNames] = useState("");
  const [clientContactsdata, setClientContactsdata] = useState([]);
  const [clientContactsdataNames, setClientContactsdataNames] = useState("");
  const [vendorContactsdata, setVendorContactsdata] = useState([]);
  const [vendorContactsdataNames, setVendorContactsdataNames] = useState("");
  const [showEmployeedataModal, setShowEmployeedataModal] = useState(false);
  const [showClientContactsdataModal, setShowClientContactsdataModal] = useState(false);

  // Fetch old values when the component loads
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/call-trees/${id}`)
      .then((response) => {
        const data = response.data;
        setCallTreeName(data.callTreeName);
        setDescription(data.description);
        setEmployeedata(data.employees);
        setEmployeedataNames(data.employees.map((e) => `${e.firstName} ${e.lastName}`).join(", "));
        setClientContactsdata(data.clientContacts);
        setClientContactsdataNames(data.clientContacts.map((c) => `${c.firstName} ${c.lastName}`).join(", "));
        setVendorContactsdata(data.vendorContacts);
        setVendorContactsdataNames(data.vendorContacts.map((v) => v.vendorName).join(", "));
      })
      .catch((error) => {
        console.error("Error fetching Call Tree:", error);
        alert("Failed to load Call Tree.");
      });
  }, [id]);

  // Handle form submission to update the Call Tree
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      callTreeName,
      description,
      employees: employeedata,
      clientContacts: clientContactsdata,
      vendorContacts: vendorContactsdata,
    };
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/call-trees/edit/${id}`, data, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Call Tree updated successfully!");
      navigate("/call-trees"); // Navigate back to the Call Trees page
    } catch (error) {
      console.error("Error updating Call Tree:", error);
      alert("Failed to update Call Tree.");
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Edit Call Tree | TRST</title>
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Edit Call Tree</div>
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
        <h5 className="mt-3 mb-3">Edit the Call Tree details and members below.</h5>
        <div className="form-content">
          <Form onSubmit={handleSubmit}>
            <div className="row pt-4">
              <div className="col-8">
                <div className="mb-3 d-flex align-items-center">
                  <Label className="form-label me-2 fs-15 w-40">Call Tree Name *</Label>
                  <Input
                    type="text"
                    value={callTreeName}
                    onChange={(e) => setCallTreeName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label className="form-label me-2 fs-15 w-40">Description *</Label>
                  <textarea
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
          <Form onSubmit={handleSubmit}>
            <div className="row pt-4">
              <div className="col-8">
                <div className="mb-3 d-flex">
                  <label className="form-label fs-15 w-20 me-2">Employees</label>
                  <div className="form-control1 d-flex flex-wrap gap-2">{employeedataNames}</div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEmployeedataModal(true)}
                  >
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>
                <div className="mb-3 d-flex">
                  <label className="form-label fs-15 w-20 me-2">Client Contacts</label>
                  <div className="form-control1 d-flex flex-wrap gap-2">{clientContactsdataNames}</div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowClientContactsdataModal(true)}
                  >
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>
                <div className="mb-3 d-flex">
                  <label className="form-label fs-15 w-20 me-2">Vendors  Contacts</label>
                  <div className="form-control1 d-flex flex-wrap gap-2"></div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                   
                  >
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>
              </div>
            </div>
            
          </Form>
        </div>
      </div>
      <EmployeedataModal
        isOpen={showEmployeedataModal}
        toggle={() => setShowEmployeedataModal(!showEmployeedataModal)}
        onSelect={({ ids, names }) => {
          setEmployeedata(ids);
          setEmployeedataNames(names);
        }}
      />
      <ClientContactsdataModal
        isOpen={showClientContactsdataModal}
        toggle={() => setShowClientContactsdataModal(!showClientContactsdataModal)}
        onSelect={({ ids, names }) => {
          setClientContactsdata(ids);
          setClientContactsdataNames(names);
        }}
      />
    </React.Fragment>
  );
}

export default EditCallTrees;