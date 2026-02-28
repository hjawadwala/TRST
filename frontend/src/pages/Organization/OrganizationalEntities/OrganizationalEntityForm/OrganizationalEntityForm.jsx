
import React, { useState, useEffect } from "react";
import axios from "axios";  // Assuming you're using Axios for API calls
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

import Toastify from "toastify-js";
import LoadingSpinner from "../../../../Components/Common/LoadingSpinner/LoadingSpinner";
import "toastify-js/src/toastify.css";
import { Form } from "react-bootstrap";
import { Table } from "reactstrap";
import EmployeeModal from './EmployeeModal';
import Employees from './Employees';
// Icons
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaRegFilePdf } from "react-icons/fa6";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit, BiSearchAlt2, BiRefresh } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { FaPrint } from "react-icons/fa6";
import { Input } from "reactstrap";
import "./OrganizationalEntityForm.css";
import LocationSection from "./LocationSection";
import { TiPlus } from "react-icons/ti";
import ApplicationSection from "./ApplicationSection";




// Add this constant at the top of the file after imports
const BUSINESS_ENTITY_TYPES = [
  "Company",
  "Business Unit",
  "Division",
  "Department",
];

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination d-flex justify-content-center align-items-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt; {/* Previous */}
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt; {/* Next */}
      </button>
    </div>
  );
};

const EditOrganizationalEntity = () => {
  const { id } = useParams(); // Get the entity ID from the URL
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    businessEntityType: "",
    businessEntity: "",
    businessEntityId: "",
    editors: [],
    description: "",
    parentBusinessEntity: null,
    childBusinessEntities: [],
    relatedLocations: [],
  });

  // Fetch entity details on component mount
  useEffect(() => {
    const fetchEntityDetails = async () => {
      try {
        const response = await axios.get(
          `/api/v1/organizational-entities/${id}`
        );
        const entityData = response.data.data;

        setInitialValues({
          businessEntityType: entityData.businessEntityType,
          businessEntity: entityData.businessEntity,
          businessEntityId: entityData.businessEntityId || "",
          description: entityData.description || "",
          parentBusinessEntity:
            entityData.parentBusinessEntity?.businessEntity || null,
          childBusinessEntities: entityData.childBusinessEntities.map(
            (child) => child.businessEntity
          ),
          editors: entityData.editors.map((editor) => editor.username),
          relatedLocations:
            entityData.relatedLocations?.map((loc) => loc.locationName) || [],
        });
      } catch (error) {
        console.error("Failed to fetch entity details", error);
      }
    };

    fetchEntityDetails(); // Call the function to fetch entity details
  }, [id]); // Dependency on ID to refetch if it changes

  const [isToolOpen, setIsToolOpen] = useState(false);
  const [formData, setFormData] = useState({
    businessEntityType: "",
    businessEntity: "",
    businessEntityId: "",
    editors: [],
    description: "",
    parentEntity: [],
    childEntities: [],
    relatedLocations: "",
  });
  const [showUserModal, setShowUserModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentField, setCurrentField] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items to show per page
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locations, setLocations] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [tempChildEntities, setTempChildEntities] = useState([]);
const [showEmployeedataModal, setShowEmployeedataModal] = useState(false);

//employess

const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
const [selectedApplicationIds, setSelectedApplicationIds] = useState([]);

const handleSelectedApplications = (ids) => {
  console.log("Selected IDs from ApplicationSection:", ids);
  setSelectedApplicationIds(ids);
};

//location
  const [locationData, setlocationData] = useState([]); // Selected Employee IDs
  const [locationDataNames, setlocationDataNames] = useState(""); // Selected Employee Names
  const [selectedLocationIds, setSelectedLocationIds] = useState([]); // Store selected location IDs


  const handleEmployeeSelect = (selectedEmployees) => {
    console.log("Selected Employees:", selectedEmployees); // Debugging
    setEmployeedata(selectedEmployees); // Store all selected employee data
  };
 
    

  const [allChildEntitiesSelected, setAllChildEntitiesSelected] =
    useState(false);
  const [currentSelectionType, setCurrentSelectionType] = useState(""); // 'parent' or 'child'
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Validate form
      if (!formData.businessEntityType || !formData.businessEntity) {
        Toastify({
          text: "Business Entity Type and Name are required",
          duration: 3000,
          backgroundColor: "#f44336",
          close: true,
        }).showToast();
        return;
      }

      const payload = {
        businessEntityType: formData.businessEntityType,
        businessEntity: formData.businessEntity,
        businessEntityId: formData.businessEntityId,
        description: formData.description,
        parentBusinessEntity: formData.parentEntity[0] || "",
        editors: formData.editors,
        childBusinessEntities: formData.childEntities || [],
        relatedLocations: selectedLocations.map((loc) => loc.locationId) || [],
        employees: selectedEmployeeIds || [],
        locations: selectedLocationIds || [],
        applications: selectedApplicationIds || [],

      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/organizational-entities/create`,
        payload
      );

      Toastify({
        text: "Entity created successfully!",
        duration: 3000,
        backgroundColor: "#4caf50",
        close: true,
      }).showToast();
      navigate("/organizational-entities");
      setFormData({
        businessEntityType: "",
        businessEntity: "",
        businessEntityId: "",
        editors: [],
        description: "",
        parentEntity: [],
        childEntities: [],
        relatedLocations: "",
        employees: [],
        locations:[],
        applications: []
      });
    } catch (error) {
      console.error("Error saving:", error);
      Toastify({
        text:
          error.response?.data?.message ||
          "Failed to create Business Entity. Check your all fields.",
        duration: 3000,
        backgroundColor: "#f44336",
        close: true,
      }).showToast();
    } finally {
      setLoading(false);
    }
  };

  const toggleToolDropDown = () => {
    setIsToolOpen(!isToolOpen);
  };

  const fetchBusinessEntities = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/organizational-entities/all`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setSearchResults(
        (response.data || []).map((entity) => ({
          ...entity,
          selected: false,
        }))
      );
    } catch (error) {
      console.error("Error fetching business entities:", error);
    } finally {
      setLoading(false);
    }
  };

  const openEntityModal = (fieldName) => {
    setCurrentField(fieldName);
    setShowModal(true);
    fetchBusinessEntities();
  };

  const handleEntitySelect = (entity) => {
    if (currentField === "parentEntity") {
      setFormData({
        ...formData,
        parentEntity: [entity.businessEntity],
        childEntities: formData.childEntities,
      });
    } else if (currentField === "childEntities") {
      setFormData({
        ...formData,
        childEntities: [
          ...new Set([...formData.childEntities, entity.businessEntity]),
        ],
        parentEntity: formData.parentEntity,
      });
    }
    setShowModal(false);
  };

  const handleEntityCheckbox = (entityId) => {
    setSearchResults(
      searchResults.map((entity) =>
        entity._id === entityId
          ? { ...entity, selected: !entity.selected }
          : entity
      )
    );
  };

  const handleSelectAllEntities = (e) => {
    setSearchResults(
      searchResults.map((entity) => ({
        ...entity,
        selected: e.target.checked,
      }))
    );
  };

  const fetchUsers = async () => {
    try {
      setUserLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/users/all`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setUsers(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setUserLoading(false);
    }
  };

  const handleUserSelect = (user) => {
    const newEditors = formData.editors
      ? [...new Set([...formData.editors, user.username])]
      : [user.username];
    setFormData({
      ...formData,
      editors: newEditors,
    });
    setShowUserModal(false);
  };

  const handleUserCheckbox = (userId) => {
    setUsers(
      users.map((user) =>
        user._id === userId ? { ...user, selected: !user.selected } : user
      )
    );
  };

  const handleSelectAllUsers = (e) => {
    setUsers(users.map((user) => ({ ...user, selected: e.target.checked })));
  };

  const handleSelectEntities = () => {
    const selectedEntities = searchResults.filter((entity) => entity.selected);
    setFormData({
      ...formData,
      parentEntity: selectedEntities.map((entity) => entity.businessEntity),
      childEntities: selectedEntities.map((entity) => entity.businessEntity),
    });
    setShowModal(false);
    // Add your logic here to handle the selected entities
    console.log(selectedEntities); // Example: log the selected entities
  };

  const handleClose = () => {
    setShowModal(false);
  };

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the current items to display
  const indexOfLastEntity = currentPage * itemsPerPage;
  const indexOfFirstEntity = indexOfLastEntity - itemsPerPage;
  const currentEntities = searchResults.slice(
    indexOfFirstEntity,
    indexOfLastEntity
  );

  // Calculate total pages
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  // Add location fetching function
  const fetchLocations = async () => {
    try {
      setLocationLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/locations/all`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        console.log("Fetched locations:", response.data);
        setLocations(response.data);
      } else {
        console.error("No locations data in response");
        setLocations([]);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      setLocations([]);
    } finally {
      setLocationLoading(false);
    }
  };

  // Add location selection handlers
  const handleLocationSelect = (location) => {
    setSelectedLocations((prev) => {
      const isAlreadySelected = prev.some((loc) => loc._id === location._id);
      if (isAlreadySelected) {
        return prev.filter((loc) => loc._id !== location._id);
      } else {
        return [
          ...prev,
          {
            _id: location._id,
            locationName: location.locationName,
            locationType: location.locationType,
            locationId: location.locationId,
          },
        ];
      }
    });
  };

  const handleBulkLocationSelection = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedLocations(
        locations.map((location) => ({
          _id: location._id,
          locationName: location.locationName,
          locationType: location.locationType,
          locationId: location.locationId,
        }))
      );
    } else {
      setSelectedLocations([]);
    }
  };

  const handleClearAllLocations = () => {
    setSelectedLocations([]);
  };

  // Add useEffect to fetch locations when modal opens
  useEffect(() => {
    if (showLocationModal) {
      fetchLocations();
    }
  }, [showLocationModal]);

  // Add these handler functions
  const handleChildEntitySelect = (entity) => {
    setTempChildEntities((prev) => {
      const isAlreadySelected = prev.some((item) => item._id === entity._id);
      if (isAlreadySelected) {
        return prev.filter((item) => item._id !== entity._id);
      }
      return [...prev, entity];
    });
  };

  const handleConfirmChildEntities = () => {
    setFormData((prev) => ({
      ...prev,
      childEntities: tempChildEntities.map((entity) => entity.businessEntity),
    }));
    setShowModal(false);
    setTempChildEntities([]);
  };

  const handleParentEntitySelect = (entity) => {
    setFormData((prev) => ({
      ...prev,
      parentEntity: [entity.businessEntity],
    }));
    setShowModal(false);
  };

  



    const [selectedEmployees, setSelectedEmployees] = useState([]); // Stores selected employees
    // // Toggle selection when a checkbox is clicked
    const handleCheckboxChange = (employee) => {
      setSelectedEmployees((prev) => {
        const isSelected = prev.some((item) => item._id === employee._id);
        return isSelected
          ? prev.filter((item) => item._id !== employee._id) // Remove if already selected
          : [...prev, employee]; // Add if not selected
      });
    };
    const [selectedlocations, setSelectedLocationsIds] = useState([]); // Stores selected employees
    const handleCheckboxChangeloc = (location) => {
      setSelectedLocationsIds((prev) => {
        const isSelected = prev.some((item) => item._id === location._id);
        return isSelected
          ? prev.filter((item) => item._id !== location._id) // Remove if already selected
          : [...prev, location]; // Add if not selected
      });
    };
   
  
  return (

    <div className="page-content">

      {/* Header Section */}
      
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h1 className="header-text">Organizational Entity: New Entity

       
        </h1>

        <div className="d-flex align-items-center">
        <div className="d-flex justify-content-end me-2">
            <button
              className="btn btn-secondary me-2"
              onClick={() => navigate("/organizational-entities")}
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
              title="Update Organizational Entity"
            >
              <FaCheck
                className="me-1"
                style={{ width: "15px", height: "15px" }}
              />
              Save
            </button>
          </div>
          {/* Tool Dropdown */}
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="toolDropdown"
              data-bs-toggle="dropdown"
              aria-expanded={isToolOpen}
              onClick={toggleToolDropDown}
            >
              <HiMiniWrench />
            </button>
            <ul
              className={`dropdown-menu right-auto ${isToolOpen ? "show" : ""}`}
              aria-labelledby="toolDropdown"
            >
              <li>
                <a className="dropdown-item" href="#">
                  <BiSolidEdit className="me-2" />
                  Design this page
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <FcSettings className="me-2" />
                  Object Definition
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <LuTableOfContents className="me-2" />
                  Tab Definition
                </a>
              </li>
              <div className="dropdown-divider"></div>
              <li>
                <a className="dropdown-item" href="#">
                  <FaPrint className="me-2" />
                  Print
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <FaRegFilePdf className="me-2" />
                  PDF
                </a>
              </li>
              <div className="dropdown-divider"></div>
              <li>
                <a className="dropdown-item" href="#">
                  <LuClock9 className="me-2" />
                  Page Load Time
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Form Section */}
     
      <div className="form-content">
      <div
  className="d-flex justify-content-between align-items-center mb-3"
  style={{ borderBottom: "1px solid #ccc", paddingBottom: "8px" }}
>
  <div className="form-heading">Organizational Entity Information</div>

  <button
    className="btn btn-outline-secondary toggle-btn"
    onClick={() => setIsOpen(!isOpen)}
    title={isOpen ? "Collapse Form" : "Expand Form"}
    style={{
      fontSize: "1.2rem",
      padding: "4px 10px",
      height: "36px",
      lineHeight: "1",
    }}
  >
    {isOpen ? "−" : <TiPlus />}
  </button>
</div>

       
        {isOpen && (
        <div className="row">
          <div className="border-1 mb-3"></div>
        
        <div className="d-flex justify-content-end mt-3 gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
            title="Update Organizational Entity"
          >
            <FaCheck className="me-1" style={{ width: "15px", height: "15px" }} />
            Save
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/organizational-entities")}
            title="Cancel"
          >
            <RxCross2 className="me-1" style={{ width: "15px", height: "15px" }} />
            Cancel
          </button>
          </div>
          <div className="border-1 mb-3"></div>
          <div className="col-9">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 d-flex">
                <label
                  htmlFor="businessEntityType"
                  className="form-label label w-20"
                >
                  Business Entity Type <span className="text-danger">*</span>
                </label>
                <select
                  id="businessEntityType"
                  name="businessEntityType"
                  value={formData.businessEntityType}
                  onChange={handleChange}
                  className="form-select1"
                  required
                >
                  <option value="">-- Please select --</option>
                  {BUSINESS_ENTITY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3 d-flex">
                <label
                  htmlFor="businessEntity"
                  className="form-label label w-20"
                >
                  Organizational Entity <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="businessEntity"
                  name="businessEntity"
                  value={formData.businessEntity}
                  onChange={handleChange}
                  className="form-control1"
                  required
                />
              </div>
              <div className="mb-3 d-flex">
                <label
                  htmlFor="businessEntityId"
                  className="form-label label w-20"
                >
                  Organizational Entity ID
                </label>
                <input
                  type="text"
                  id="businessEntityId"
                  name="businessEntityId"
                  value={formData.businessEntityId || ""}
                  onChange={handleChange}
                  className="form-control1"
                />
              </div>
              <div className="mb-3 d-flex position-relative">
                <label htmlFor="editors" className="form-label label w-20">
                  Editors
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
                    flex: 1
                  }}
                >
                  {formData.editors.map((editor, index) => (
                    <span
                      key={index}
                      className="badge bg-light text-dark d-flex align-items-center"
                      style={{
                        padding: "5px 10px !important",
                        margin: "2px !important",
                        border: "1px solid #ddd !important",
                        borderRadius: "3px !important",
                        backgroundColor: "#f8f9fa !important",
                      }}
                    >
                      {editor}
                      <button
                        type="button"
                        className="btn-close ms-2"
                        style={{ fontSize: "0.5rem" }}
                        onClick={() => {
                          const newEditors = formData.editors.filter(
                            (e) => e !== editor
                          );
                          setFormData({
                            ...formData,
                            editors: newEditors,
                          });
                        }}
                      ></button>
                    </span>
                  ))}
                  {formData.editors.length === 0 && (
                    <span className="text-muted">No editors selected</span>
                  )}
                  {formData.editors.length > 0 && (
                    <button
                      type="button"
                      className="btn btn-link text-danger position-absolute"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          editors: [],
                        });
                      }}
                      style={{ 
                        right: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        padding: "0",
                        fontSize: "0.8rem"
                      }}
                    >
                      <RxCross2 />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  className="btn btn-secondary border-radius-2"
                  onClick={() => {
                    setShowUserModal(true);
                    fetchUsers();
                  }}
                >
                  <BiSearchAlt2 />
                </button>
              </div>
              <div className="mb-3 d-flex">
                <label htmlFor="description" className="form-label label w-20">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control1"
                  rows="3"
                ></textarea>
              </div>
              
              <div className="border-1"></div>

              {/* Relationships */}
              <h2 className="mt-4 mb-3">Relationships</h2>
              <div className="mb-3 d-flex position-relative">
                <label htmlFor="parentEntity" className="form-label label w-20">
                  Parent Organizational Entity <span className="text-danger">*</span>
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
                    flex: 1
                  }}
                >
                  {formData.parentEntity.map((entity, index) => (
                    <span
                      key={index}
                      className="badge bg-light text-dark d-flex align-items-center"
                      style={{
                        padding: "5px 10px !important",
                        margin: "2px !important",
                        border: "1px solid #ddd !important",
                        borderRadius: "3px !important",
                      }}
                    >
                      {entity}
                      <button
                        type="button"
                        className="btn-close ms-2"
                        style={{ fontSize: "0.5rem" }}
                        onClick={() => {
                          const newParentEntity = formData.parentEntity.filter(
                            (e) => e !== entity
                          );
                          setFormData({
                            ...formData,
                            parentEntity: newParentEntity,
                          });
                        }}
                      ></button>
                    </span>
                  ))}
                  {formData.parentEntity.length === 0 && (
                    <span className="text-muted">No parent entity selected</span>
                  )}
                  {formData.parentEntity.length > 0 && (
                    <button
                      type="button"
                      className="btn btn-link text-danger position-absolute"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          parentEntity: [],
                        });
                      }}
                      style={{ 
                        right: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        padding: "0",
                        fontSize: "0.8rem"
                      }}
                    >
                      <RxCross2 />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setCurrentSelectionType("parent");
                    setShowModal(true);
                    fetchBusinessEntities();
                  }}
                >
                  <BiSearchAlt2 />
                </button>
              </div>
              <div className="mb-3 d-flex position-relative">
                <label htmlFor="childEntities" className="form-label label w-20">
                  Child Organizational Entities
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
                    flex: 1
                  }}
                >
                  {formData.childEntities.map((entity, index) => (
                    <span
                      key={index}
                      className="badge bg-light text-dark d-flex align-items-center"
                      style={{
                        padding: "5px 10px !important",
                        margin: "2px !important",
                        border: "1px solid #ddd !important",
                        borderRadius: "3px !important",
                      }}
                    >
                      {entity}
                      <button
                        type="button"
                        className="btn-close ms-2"
                        style={{ fontSize: "0.5rem" }}
                        onClick={() => {
                          const newChildEntities = formData.childEntities.filter(
                            (e) => e !== entity
                          );
                          setFormData({
                            ...formData,
                            childEntities: newChildEntities,
                          });
                        }}
                      ></button>
                    </span>
                  ))}
                  {formData.childEntities.length === 0 && (
                    <span className="text-muted">No child entities selected</span>
                  )}
                  {formData.childEntities.length > 0 && (
                    <button
                      type="button"
                      className="btn btn-link text-danger position-absolute"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          childEntities: [],
                        });
                      }}
                      style={{ 
                        right: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        padding: "0",
                        fontSize: "0.8rem"
                      }}
                    >
                      <RxCross2 />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setCurrentSelectionType("child");
                    setShowModal(true);
                    fetchBusinessEntities();
                  }}
                >
                  <BiSearchAlt2 />
                </button>
              </div>
              <div className="mb-3 d-flex position-relative">
                <label htmlFor="relatedLocations" className="form-label label w-20">
                  Related Locations
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
                    flex: 1
                  }}
                >
                  {selectedLocations.map((location, index) => (
                    <span
                      key={index}
                      className="badge bg-light text-dark d-flex align-items-center"
                      style={{
                        padding: "5px 10px !important",
                        margin: "2px !important",
                        border: "1px solid #ddd !important",
                        borderRadius: "3px !important",
                      }}
                    >
                      {location.locationName}
                      <button
                        type="button"
                        className="btn-close ms-2"
                        style={{ fontSize: "0.5rem" }}
                        onClick={() => {
                          const newLocations = selectedLocations.filter(
                            (l) => l._id !== location._id
                          );
                          setSelectedLocations(newLocations);
                        }}
                      ></button>
                    </span>
                  ))}
                  {selectedLocations.length === 0 && (
                    <span className="text-muted">No locations selected</span>
                  )}
                  {selectedLocations.length > 0 && (
                    <button
                      type="button"
                      className="btn btn-link text-danger position-absolute"
                      onClick={() => setSelectedLocations([])}
                      style={{ 
                        right: "8px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        padding: "0",
                        fontSize: "0.8rem"
                      }}
                    >
                      <RxCross2 />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowLocationModal(true);
                    fetchLocations();
                  }}
                >
                  <BiSearchAlt2 />
                </button>
              </div> 
              
             
            </form>
          </div>
        </div>
        )}
 
      </div>

      {/* employess */}
      <Employees setSelectedEmployeeIds={setSelectedEmployeeIds} />
 <div>
     
      <LocationSection setSelectedLocationIds={setSelectedLocationIds} />
      
      <ApplicationSection setSelectedApplicationIds={handleSelectedApplications} />
          
    </div>
         
      


      
  
      {/* Business Entity Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between align-items-center">
                <h5 className="modal-title">
                  {currentSelectionType === "parent"
                    ? "Select Parent Entity"
                    : "Select Child Entities"}
                </h5>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary mb-2"
                    onClick={fetchBusinessEntities}
                    title="Refresh"
                  >
                    <BiRefresh />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary mb-2"
                    onClick={() => setShowModal(false)}
                    title="Close"
                  >
                    <RxCross2 />
                  </button>
                </div>
              </div>
              <div className="modal-body">
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>
                            {currentSelectionType === "child" ? (
                              <input
                                type="checkbox"
                                onChange={(e) => {
                                  setAllChildEntitiesSelected(e.target.checked);
                                  if (e.target.checked) {
                                    setTempChildEntities(searchResults);
                                  } else {
                                    setTempChildEntities([]);
                                  }
                                }}
                                checked={allChildEntitiesSelected}
                              />
                            ) : (
                              "Action"
                            )}
                          </th>
                          <th>Business Entity</th>
                          <th>Business Entity Type</th>
                          <th>Related Locations</th>
                          <th>Parent Business Entity</th>
                          <th>Child Business Entities</th>
                          <th>Updated At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResults.map((entity) => (
                          <tr key={entity._id}>
                            <td>
                              {currentSelectionType === "child" ? (
                                <input
                                  type="checkbox"
                                  checked={tempChildEntities.some(
                                    (item) => item._id === entity._id
                                  )}
                                  onChange={() =>
                                    handleChildEntitySelect(entity)
                                  }
                                />
                              ) : (
                                <button
                                  className="btn btn-sm btn-primary"
                                  onClick={() =>
                                    handleParentEntitySelect(entity)
                                  }
                                >
                                  Select
                                </button>
                              )}
                            </td>
                            <td>{entity.businessEntity}</td>
                            <td>{entity.businessEntityType}</td>
                            <td>
                              {entity.relatedLocations
                                .map((location) => location.locationName)
                                .join(", ") || ""}
                            </td>
                            <td>
                              {entity.parentBusinessEntity?.businessEntity ||
                                ""}
                            </td>
                            <td>
                              {entity.childBusinessEntities
                                ?.map((child) => child.businessEntity)
                                .join(" | ") || ""}
                            </td>
                            <td>
                              {new Date(entity.updatedAt).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                {currentSelectionType === "child" && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleConfirmChildEntities}
                  >
                    Done ({tempChildEntities.length} selected)
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showUserModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between align-items-center">
                <h5 className="modal-title">Select Users</h5>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary mb-2"
                    onClick={() => fetchUsers()}
                    title="Refresh"
                  >
                    <BiRefresh />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary mb-2"
                    onClick={() => setShowUserModal(false)}
                    title="Close"
                  >
                    <RxCross2 />
                  </button>
                </div>
              </div>
              <div className="modal-body">
                {userLoading ? (
                  <div className="text-center">Loading...</div>
                ) : (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>
                            <input
                              type="checkbox"
                              onChange={handleSelectAllUsers}
                              checked={
                                users.length > 0 &&
                                users.every((user) => user.selected)
                              }
                            />
                          </th>
                          <th>User</th>
                          <th>User Role</th>
                          <th>Login Name</th>
                          <th>Last Login Time</th>
                          <th>Employee Record</th>
                          <th>Updated At</th>
                          <th>Updated By</th>
                          <th>Workflow Status</th>
                          <th>ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user._id}>
                            <td>
                              <input
                                type="checkbox"
                                checked={user.selected}
                                onChange={() => handleUserCheckbox(user._id)}
                              />
                            </td>
                            <td>{user.fullName}</td>
                            <td>{user.role}</td>
                            <td>{user.username}</td>
                            <td>
                              {new Date(user.lastLoginAt).toLocaleString(
                                "en-US",
                                {
                                  month: "2-digit",
                                  day: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </td>
                            <td></td>
                            <td>
                              {new Date(user.updatedAt).toLocaleString(
                                "en-US",
                                {
                                  month: "2-digit",
                                  day: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </td>
                            <td>{user.updatedBy?.fullName}</td>
                            <td>{user.workflowStatus}</td>
                            <td>{user._id}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="text-muted mt-2">
                      1 - {users.length} of {users.length} items
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    const selectedUsers = users.filter((user) => user.selected);
                    const newEditors = [
                      ...formData.editors,
                      ...selectedUsers.map((user) => user.fullName),
                    ];
                    setFormData({
                      ...formData,
                      editors: [...new Set(newEditors)],
                    });
                    setShowUserModal(false);
                    setUsers(
                      users.map((user) => ({ ...user, selected: false }))
                    );
                  }}
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
   

      {/* Add Location Modal */}
      {showLocationModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between align-items-center">
                <h5 className="modal-title">Select Locations</h5>
                <div className="d-flex gap-2 align-items-center">
                  <button
                    type="button"
                    className="btn btn-outline-secondary mb-2"
                    onClick={fetchLocations}
                    title="Refresh"
                  >
                    <BiRefresh />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary mb-2"
                    onClick={() => setShowLocationModal(false)}
                    title="Close"
                  >
                    <RxCross2 />
                  </button>
                </div>
              </div>
              <div className="modal-body">
                {locationLoading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>
                            <input
                              type="checkbox"
                              onChange={handleBulkLocationSelection}
                              checked={
                                locations.length > 0 &&
                                selectedLocations.length === locations.length
                              }
                            />
                          </th>
                          <th>Location ID</th>
                          <th>Location Name</th>
                          <th>Location Type</th>
                          <th>Main Phone</th>
                          <th>Capacity</th>
                          <th>Capacity Used</th>
                          <th>Site Ownership</th>
                          <th>Access/Safety/Security Equipment</th>
                          <th>Street Address 1</th>
                          <th>Street Address 2</th>
                          <th>City</th>
                          <th>State/Province</th>
                          <th>ZIP/Postal Code</th>
                          <th>Country</th>
                          <th>Parent Location</th>
                          <th>Child Locations</th>
                          <th>Business Entities</th>
                          <th>Latitude</th>
                          <th>Longitude</th>
                          <th>Created At</th>
                          <th>Updated At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {locations.map((location) => (
                          <tr key={location._id}>
                            <td>
                              <input
                                type="checkbox"
                                checked={selectedLocations.some(
                                  (selected) => selected._id === location._id
                                )}
                                onChange={() => handleLocationSelect(location)}
                              />
                            </td>
                            <td>{location.locationId || ""}</td>
                            <td>{location.locationName || ""}</td>
                            <td>{location.locationType || ""}</td>
                            <td>{location.mainPhone || ""}</td>
                            <td>{location.capacity || ""}</td>
                            <td>{location.capacityUsed || ""}</td>
                            <td>{location.siteOwnership || ""}</td>
                            <td>
                              {location.accessSafetySecurityEquipment || ""}
                            </td>
                            <td>{location.streetAddress1 || ""}</td>
                            <td>{location.streetAddress2 || ""}</td>
                            <td>{location.city || ""}</td>
                            <td>{location.stateProvince || ""}</td>
                            <td>{location.zipPostalCode || ""}</td>
                            <td>{location.country || ""}</td>
                            <td>
                              {location.parentLocation?.locationName || ""}
                            </td>
                            <td>
                              {location.childLocations
                                ?.map((child) => child.locationName)
                                .join(", ") || "-"}
                            </td>
                            <td>
                              {location.businessEntities
                                ?.map((entity) => entity.businessEntity)
                                .join(", ") || ""}
                            </td>
                            <td>{location.latitude || ""}</td>
                            <td>{location.longitude || ""}</td>
                            <td>
                              {new Date(location.createdAt).toLocaleString()}
                            </td>
                            <td>
                              {new Date(location.updatedAt).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
              
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowLocationModal(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
        
      )}
    </div>
    
  );
};

export default EditOrganizationalEntity;
