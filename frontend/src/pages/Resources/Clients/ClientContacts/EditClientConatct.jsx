import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaPrint, FaRegFilePdf } from "react-icons/fa";
import { TiPlus } from "react-icons/ti";
import { BiSearchAlt2 } from "react-icons/bi";
import { Input, Label, Form } from "reactstrap";
import "./ClientContacts.css";
import ClientModal from "../../../../Components/modals/clientModal/ClientModal";
import ClientQuickCreation from "../../../../Components/modals/clientQuickCreationModal/ClientQuickCreation";
import axios from "axios";
import Toastify from "toastify-js";

function EditClientContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [selectedClients, setSelectedClients] = useState([]);
  const [showQuickCreateModal, setShowQuickCreateModal] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedClientIds, setSelectedClientIds] = useState([]);
  const [formData, setFormData] = useState({
    clients: [],
    firstName: "",
    middleName: "",
    lastName: "",
    emailAddress: "",
    workPhone: "",
    workMobilePhone: "",
    alternatePhone: "",
    fax: "",
    title: "",
  });

  const toggleToolDropDown = () => setIsToolOpen(!isToolOpen);

  const handleClientSelect = (clientOrClients, remove = false) => {
    const clientsArray = Array.isArray(clientOrClients)
      ? clientOrClients
      : [clientOrClients];

    setSelectedClients((prev) => {
      const newSelected = remove
        ? prev.filter((p) => !clientsArray.some((c) => c._id === p._id))
        : [
            ...prev.filter((p) => !clientsArray.some((c) => c._id === p._id)),
            ...clientsArray,
          ];

      setFormData((prevForm) => ({
        ...prevForm,
        clients: newSelected.map((c) => c._id),
      }));

      return newSelected;
    });
  };

  const handleClearAllClients = () => {
    setSelectedClients([]);
    setFormData((prev) => ({
      ...prev,
      clients: [],
    }));
  };
  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    if (checked) {
      setSelectedClientIds(clients.map((client) => client._id));
    } else {
      setSelectedClientIds([]);
    }
  };

  const handleClientCheckboxChange = (clientId) => {
    setSelectedClientIds((prev) => {
      if (prev.includes(clientId)) {
        return prev.filter((id) => id !== clientId);
      } else {
        return [...prev, clientId];
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const fieldName = name
      .replace(/\s+/g, "")
      .replace(/^(.)/, (match) => match.toLowerCase());
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Upadated Data:", formData);

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/client-contacts/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      navigate("/client-contacts");
    } catch (error) {
      console.error("Error updating client contact:", error);
      Toastify({
        text: error.response?.data?.message || "Error Updating client contact",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "#dc3545",
        },
      }).showToast();
    }
  };

  useEffect(() => {
    const fetchContact = async () => {
      try {
        // Fetch the client contact
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/client-contacts/${id}`,
          { withCredentials: true }
        );
        
        const contact = response.data;
        
        // Set form data
        setFormData({
          clients: contact.clients,
          firstName: contact.firstName,
          middleName: contact.middleName,
          lastName: contact.lastName,
          emailAddress: contact.emailAddress,
          workPhone: contact.workPhone,
          workMobilePhone: contact.workMobilePhone,
          alternatePhone: contact.alternatePhone,
          fax: contact.fax,
          title: contact.title
        });
  
        // Fetch full client details for each client ID individually
        if (contact.clients && contact.clients.length > 0) {
          const clientPromises = contact.clients.map(clientId =>
            axios.get(
              `${process.env.REACT_APP_API_URL}/api/v1/clients/${clientId._id}`,
              { withCredentials: true }
            )
          );
  
          const clientsResponses = await Promise.all(clientPromises);
          const formattedClients = clientsResponses.map(response => ({
            _id: response.data._id,
            company: response.data.company
          }));
  
          setSelectedClients(formattedClients);
        }
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contact:", error);
        setLoading(false);
      }
    };
  
    fetchContact();
  }, [id]);

  return (
    <React.Fragment>
      <Helmet>
        <title>New Client Contact Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">
              Client Contact: New Client Contact{" "}
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <div>
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => navigate("/client-contacts")}
                  title="Cancel"
                >
                  <RxCross2
                    className="me-1"
                    style={{ width: "15px", height: "15px" }}
                  />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  title="Create Client Contact"
                >
                  <FaCheck
                    className="me-1"
                    style={{ width: "15px", height: "15px" }}
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
                    aria-expanded={isToolOpen}
                    onClick={toggleToolDropDown}
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
        <div className="form-content">
          <div className="form-heading">Contact Information</div>
          <div className="border-1"></div>
          <Form onSubmit={handleSubmit}>
            <div className="row pt-4">
              <div className="col-6">
                <div className="mb-3 d-flex position-relative">
                  <label
                    htmlFor="editors"
                    className="form-label fs-15 w-20 me-2"
                  >
                    Client
                  </label>
                  <div
                    className="form-control1 d-flex flex-wrap gap-2"
                    style={{
                      minHeight: "38px",
                      border: "1px solid #ced4da",
                      borderRadius: "4px",
                      padding: "6px 12px",
                      backgroundColor: "#fff",
                      position: "relative",
                      flex: 1,
                    }}
                  >
                    {selectedClients.map((client) => (
                      <span key={client._id} className="badge bg-primary">
                        {client.company}
                        <button
                          type="button"
                          className="btn-close ms-2"
                          style={{ fontSize: "0.5rem" }}
                          onClick={() => handleClientSelect(client, true)}
                        />
                      </span>
                    ))}
                    {selectedClients.length === 0 && (
                      <span className="text-muted">No clients selected</span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary border-radius-2 me-1"
                    onClick={() => setShowQuickCreateModal(true)}
                  >
                    <TiPlus className="fs-15" />
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary border-radius-2"
                    onClick={() => setShowClientModal(true)}
                  >
                    <BiSearchAlt2 className="fs-15" />
                  </button>
                </div>
                {["First Name", "Middle Name", "Last Name"].map(
                  (label, index) => (
                    <div className="mb-3 d-flex align-items-center" key={index}>
                      <Label
                        htmlFor={label}
                        className="form-label me-2 fs-15 w-40"
                      >
                        {label}
                      </Label>
                      <Input
                        name={label
                          .replace(/\s+/g, "")
                          .replace(/^(.)/, (match) => match.toLowerCase())}
                        className="form-control"
                        type="text"
                        value={
                          formData[
                            label
                              .replace(/\s+/g, "")
                              .replace(/^(.)/, (match) => match.toLowerCase())
                          ]
                        }
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  )
                )}
                {["Title", "Email Address"].map((label, index) => (
                  <div className="mb-3 d-flex align-items-center" key={index}>
                    <Label
                      htmlFor={label}
                      className="form-label me-2 fs-15 w-40"
                    >
                      {label}
                    </Label>
                    <Input
                      name={label
                        .replace(/\s+/g, "")
                        .replace(/^(.)/, (match) => match.toLowerCase())}
                      className="form-control"
                      type="text"
                      value={
                        formData[
                          label
                            .replace(/\s+/g, "")
                            .replace(/^(.)/, (match) => match.toLowerCase())
                        ]
                      }
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                ))}
              </div>
              <div className="col-6">
                {[
                  "Work Phone",
                  "Work Mobile Phone",
                  "Alternate Phone",
                  "Fax",
                ].map((label, index) => (
                  <div className="mb-3 d-flex align-items-center" key={index}>
                    <Label
                      htmlFor={label}
                      className="form-label me-2 fs-15 w-40"
                    >
                      {label}
                    </Label>
                    <Input
                      name={label
                        .replace(/\s+/g, "")
                        .replace(/^(.)/, (match) => match.toLowerCase())}
                      className="form-control"
                      type="text"
                      value={
                        formData[
                          label
                            .replace(/\s+/g, "")
                            .replace(/^(.)/, (match) => match.toLowerCase())
                        ]
                      }
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          </Form>
        </div>
      </div>

      {/* Client Modal */}
      {showClientModal && (
        <ClientModal
          show={showClientModal}
          onHide={() => setShowClientModal(false)}
          onSelect={(selectedClients) => {
            handleClientSelect(selectedClients);
            setSelectedClientIds(selectedClients.map((client) => client._id));
          }}
          selectAll={selectAll}
          onSelectAll={handleSelectAll}
          selectedClientIds={selectedClientIds}
          onClientCheckboxChange={handleClientCheckboxChange}
        />
      )}

      {showQuickCreateModal && (
        <ClientQuickCreation
          onClose={() => setShowQuickCreateModal(false)}
          onSuccess={(newClient) => {
            setSelectedClients((prev) => [...prev, newClient]);
            setShowQuickCreateModal(false);
          }}
        />
      )}
    </React.Fragment>
  );
}

export default EditClientContact;
