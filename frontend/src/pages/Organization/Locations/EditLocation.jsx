import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

// Icons
import { RxCross2 } from "react-icons/rx";
import { LuTableOfContents, LuClock9 } from "react-icons/lu";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit, BiSearchAlt2, BiRefresh } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { FaCheck } from "react-icons/fa";
import { FaPrint, FaRegFilePdf } from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";
import { Input, Label, Form } from "reactstrap";

import "./Locations.css";
import LoadingSpinner from "../../../Components/Common/LoadingSpinner/LoadingSpinner";

function EditLocation() {
  const { id } = useParams(); // Get location ID from URL
  const navigate = useNavigate();
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isTimeZoneOpen, setIsTimeZoneOpen] = useState(false); // Time Zone dropdown
  const [isStatusOpen, setIsStatusOpen] = useState(false); // Employee Status dropdown
  const [selectedTimeZone, setSelectedTimeZone] = useState(
    "-- Please select --"
  );
  const [selectedStatus, setSelectedStatus] = useState("-- Please select --");
  const [selectedState, setSelectedState] = useState("-- Please select --");
  const [selectedCountry, setSelectedCountry] = useState("-- Please select --");
  const [isStateOpen, setIsStateOpen] = useState(false); // Add missing state toggle
  const [isCountryOpen, setIsCountryOpen] = useState(false); // Add missing state toggle
  const [showModal, setShowModal] = useState(false);
  const [selectedBusinessEntities, setSelectedBusinessEntities] = useState([]);
  const [
    selectedAccessSafetySecurityEquipment,
    setSelectedAccessSafetySecurityEquipment,
  ] = useState("-- Please select --");
  const [
    isAccessSafetySecurityEquipmentOpen,
    setIsAccessSafetySecurityEquipmentOpen,
  ] = useState(false);

  const AccessSafetySecurityEquipmentOptions = [
    "-- Please select --",
    "Automated External Defibrillators (AED)",
    "Badge Access",
    "Burglar Alarm",
    "CCTV Cameras",
    "Fire Alarm",
    "Fire Extinguishers",
    "Front Desk Security",
    "Gated Access",
    "Hand Sanitizer Station",
    "Man Trap",
    "Metal Detectors",
    "Roving Security",
    "Sprinklers",
    "Temperature Station",
    "X-Ray Scanners",
  ];

  const toggleAccessSafetySecurityEquipmentDropdown = () =>
    setIsAccessSafetySecurityEquipmentOpen(
      !isAccessSafetySecurityEquipmentOpen
    );

  const handleSelectAccessSafetySecurityEquipment = (option) => {
    setSelectedAccessSafetySecurityEquipment(option);
    setIsAccessSafetySecurityEquipmentOpen(false);
  };

  const timeZoneOptions = [
    "-- Please select --",
    "ATM",
    "Branch",
    "Cold Site",
    "Corporate Office",
    "Data Center",
    "Distribution Center",
    "Full-Service Branch",
    "Hospital",
    "Hot Site",
    "Manufacturing",
    "Parking Garage",
    "Record Storage",
    "Regional Office",
    "Remote/Work from Home",
    "Retail",
    "Satellite Office",
    "Shared Office",
    "Special Purpose",
    "Terminal",
    "Warehouse",
    "Warm Site",
  ];

  const statusOptions = ["-- Please select --", "Leased", "Owned"];
  const StateOptions = [
    "-- Please select --",
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "District of Columbia",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  const CountryOptions = [
    "-- Please select --",
    "Afghanistan",
    "Alaska",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia",
    "Botswana",
    "Brazil",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cayman Islands",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guam",
    "Guatemala",
    "Guinea",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Korea, North",
    "Korea, South",
    "Kuwait",
    "Kyrgyzstan",
    "Lao Democratic Republic",
    "Latvia",
    "Lebanon",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Malta",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "Saint Lucia",
    "Saint Vincent Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Somalia",
    "South Africa",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vatican",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  // Dropdown toggles
  const toggleToolDropDown = () => setIsToolOpen(!isToolOpen);
  const toggleTimeZoneDropdown = () => setIsTimeZoneOpen((prev) => !prev);
  const toggleStatusDropdown = () => setIsStatusOpen((prev) => !prev);
  const toggleStateDropdown = () => setIsStateOpen((prev) => !prev);
  const toggleCountryDropdown = () => setIsCountryOpen((prev) => !prev);

  // Handle selection
  const handleSelectTimeZone = (option) => {
    setSelectedTimeZone(option);
    setIsTimeZoneOpen(false);
  };

  const handleSelectStatus = (option) => {
    setSelectedStatus(option);
    setIsStatusOpen(false);
  };
  const handleSelectState = (option) => {
    setSelectedState(option);
    setIsStateOpen(false);
  };
  const handleSelectCountry = (option) => {
    setSelectedCountry(option);
    setIsCountryOpen(false);
  };

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentField, setCurrentField] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const openEntityModal = (fieldName) => {
    setCurrentField(fieldName);
    setShowModal(true);
  };

  const handleEntitySelect = (entity) => {
    setSelectedBusinessEntities([
      ...selectedBusinessEntities,
      entity.businessEntity,
    ]);
    setShowModal(false);
  };

  const handleRemoveEntity = (entityToRemove) => {
    setSelectedBusinessEntities(
      selectedBusinessEntities.filter((entity) => entity !== entityToRemove)
    );
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

  // Add these state variables
  const [showBusinessEntityModal, setShowBusinessEntityModal] = useState(false);
  const [showParentLocationModal, setShowParentLocationModal] = useState(false);
  const [showChildLocationModal, setShowChildLocationModal] = useState(false);
  const [showSiteManagerModal, setShowSiteManagerModal] = useState(false);

  const [locations, setLocations] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [businessEntities, setBusinessEntities] = useState([]);

  const [selectedParentLocation, setSelectedParentLocation] = useState(null);
  const [selectedChildLocations, setSelectedChildLocations] = useState([]);
  const [selectedSiteManager, setSelectedSiteManager] = useState(null);

  // Add loading states
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [loadingEntities, setLoadingEntities] = useState(false);

  // Add state for temporary selections
  const [tempChildLocations, setTempChildLocations] = useState([]);
  const [tempBusinessEntities, setTempBusinessEntities] = useState([]);

  // Add state for form data
  const [formData, setFormData] = useState({
    location_name: "",
    location_id: "",
    locationType: "",
    capacity: "",
    capacity_used: "",
    main_phone: "",
    siteOwnership: "",
    siteManager: "",
    accessSafetySecurityEquipment: "",
    street_address_1: "",
    street_address_2: "",
    city: "",
    stateProvince: "",
    zip_postal_code: "",
    country: "",
    businessEntities: [],
    parentLocation: "",
    childLocations: [],
    latitude: "",
    longitude: "",
  });

  // Add state for initial data loading
  const [isLoading, setIsLoading] = useState(true);

  // Fetch location data when component mounts
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/locations/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const locationData = response.data;
        console.log('Fetched location data:', locationData);

        setFormData(prevData => ({
          ...prevData,
          location_name: locationData.locationName || "",
          location_id: locationData.locationId || "",
          capacity: locationData.capacity || "",
          capacity_used: locationData.capacityUsed || "",
          main_phone: locationData.mainPhone || "",
          street_address_1: locationData.streetAddress1 || "",
          street_address_2: locationData.streetAddress2 || "",
          city: locationData.city || "",
          zip_postal_code: locationData.zipPostalCode || "",
          latitude: locationData.latitude || "",
          longitude: locationData.longitude || "",
        }));

        // Set dropdown selections
        setSelectedTimeZone(locationData.locationType || "-- Please select --");
        setSelectedStatus(locationData.siteOwnership || "-- Please select --");
        setSelectedState(locationData.stateProvince || "-- Please select --");
        setSelectedCountry(locationData.country || "-- Please select --");
        setSelectedAccessSafetySecurityEquipment(
          locationData.accessSafetySecurityEquipment || "-- Please select --"
        );

        // Set relationships
        if (locationData.siteManager) {
          setSelectedSiteManager({
            _id: locationData.siteManager._id,
            fullName: `${locationData.siteManager.firstName} ${locationData.siteManager.lastName}`,
          });
        }

        if (locationData.parentLocation) {
          setSelectedParentLocation(locationData.parentLocation);
        }

        if (locationData.childLocations) {
          setSelectedChildLocations(locationData.childLocations);
        }

        // Fetch full business entity details for each ID
        if (locationData.businessEntities && locationData.businessEntities.length > 0) {
          try {
            const entitiesResponse = await axios.get(
              `${process.env.REACT_APP_API_URL}/api/v1/organizational-entities/all`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
                withCredentials: true,
              }
            );

            // Map the full entity details to the IDs we have
            const entityDetails = entitiesResponse.data;
            const formattedEntities = locationData.businessEntities
              .map(entityId => {
                const fullEntity = entityDetails.find(e => e._id === entityId._id);
                return fullEntity ? {
                  _id: fullEntity._id,
                  businessEntity: fullEntity.businessEntity,
                  businessEntityType: fullEntity.businessEntityType
                } : null;
              })
              .filter(Boolean);

            setSelectedBusinessEntities(formattedEntities);
          } catch (error) {
            console.error("Error fetching business entities details:", error);
          }
        }

      } catch (error) {
        console.error("Error fetching location:", error);
        Toastify({
          text: "Error loading location data",
          duration: 3000,
          backgroundColor: "#f44336",
          close: true,
        }).showToast();
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocationData();
  }, [id]);

  // Fetch locations
  const fetchLocations = async () => {
    try {
      setLoadingLocations(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/locations/all`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Debug log
      console.log("Locations API Response:", response.data);

      // Set locations based on response structure
      if (response.data) {
        setLocations(response.data);
      } else if (Array.isArray(response.data)) {
        setLocations(response.data);
      } else {
        setLocations([]);
      }

      // Also set temp locations for modal
      setTempChildLocations([]);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setLocations([]);
    } finally {
      setLoadingLocations(false);
    }
  };

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      setLoadingEmployees(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/employees/all`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log('Employee response:', response.data);

      // Handle the nested employees array in the response
      if (response.data?.employees) {
        setEmployees(response.data.employees);
      } else {
        setEmployees([]);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
    } finally {
      setLoadingEmployees(false);
    }
  };

  // Fetch business entities
  const fetchBusinessEntities = async () => {
    try {
      setLoadingEntities(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/organizational-entities/all`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data) {
        setBusinessEntities(response.data);
      }
    } catch (error) {
      console.error("Error fetching business entities:", error);
      setBusinessEntities([]);
    } finally {
      setLoadingEntities(false);
    }
  };

  // Update handlers for multiple selection
  const handleChildLocationSelect = (location) => {
    setTempChildLocations((prev) => {
      const isSelected = prev.some((item) => item._id === location._id);
      if (isSelected) {
        return prev.filter((item) => item._id !== location._id);
      }
      return [...prev, location];
    });
  };

  const handleBusinessEntitySelect = (entity) => {
    setTempBusinessEntities((prev) => {
      const isAlreadySelected = prev.some((item) => item._id === entity._id);
      if (isAlreadySelected) {
        return prev.filter((item) => item._id !== entity._id);
      }
      return [
        ...prev,
        {
          _id: entity._id,
          businessEntity: entity.businessEntity,
          businessEntityType: entity.businessEntityType,
        },
      ];
    });
  };

  // Add handlers for confirming selections
  const handleConfirmChildLocations = () => {
    setSelectedChildLocations(tempChildLocations);
    setShowChildLocationModal(false);
  };

  const handleConfirmBusinessEntities = () => {
    setSelectedBusinessEntities(tempBusinessEntities);
    setShowBusinessEntityModal(false);
  };

  // Update parent location handler to close modal
  const handleParentLocationSelect = (location) => {
    setSelectedParentLocation(location);
    setShowParentLocationModal(false);
  };

  // Add site manager handler
  const handleSiteManagerSelect = (employee) => {
    setSelectedSiteManager({
      _id: employee._id,
      fullName: `${employee.firstName} ${employee.lastName}`,
      employeeID: employee.employeeID,
      title: employee.title
    });
    setShowSiteManagerModal(false);
  };

  // Site Manager Modal
  const SiteManagerModal = () => (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between align-items-center">
            <h5 className="modal-title">People Selector</h5>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={fetchEmployees}
                title="Refresh"
              >
                <BiRefresh />
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowSiteManagerModal(false)}
                title="Close"
              >
                <RxCross2 />
              </button>
            </div>
          </div>
          <div className="modal-body">
            {loadingEmployees ? (
              <LoadingSpinner />
            ) : !Array.isArray(employees) || employees.length === 0 ? (
              <div className="text-center">No employees found</div>
            ) : (
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Employee ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Preferred Name</th>
                      <th>Title</th>
                      <th>Work Email</th>
                      <th>Work Phone</th>
                      <th>Work Mobile</th>
                      <th>Fax</th>
                      <th>Manager</th>
                      <th>Street Address 1</th>
                      <th>Street Address 2</th>
                      <th>City</th>
                      <th>State/Province</th>
                      <th>ZIP/Postal Code</th>
                      <th>Country</th>
                      <th>Home Phone</th>
                      <th>Personal Mobile</th>
                      <th>Personal Email</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee._id}>
                        <td>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleSiteManagerSelect(employee)}
                          >
                            Select
                          </button>
                        </td>
                        <td>{employee.employeeID || ""}</td>
                        <td>{employee.firstName || ""}</td>
                        <td>{employee.lastName || ""}</td>
                        <td>{employee.preferredName || ""}</td>
                        <td>{employee.title || ""}</td>
                        <td>{employee.workEmailAddress || ""}</td>
                        <td>{employee.workPhone || ""}</td>
                        <td>{employee.workMobilePhone || ""}</td>
                        <td>{employee.fax || ""}</td>
                        <td>
                          {employee.manager
                            ? `${employee.manager.firstName} ${employee.manager.lastName}`
                            : ""}
                        </td>
                        <td>{employee.streetAddress1 || ""}</td>
                        <td>{employee.streetAddress2 || ""}</td>
                        <td>{employee.city || ""}</td>
                        <td>{employee.stateProvince || ""}</td>
                        <td>{employee.zipPostalCode || ""}</td>
                        <td>{employee.country || ""}</td>
                        <td>{employee.homePhoneNumber || ""}</td>
                        <td>{employee.personalMobilePhone || ""}</td>
                        <td>{employee.personalEmailAddress || ""}</td>
                        <td>
                          <span
                            className={`badge ${
                              employee.employeeStatus === "Active"
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {employee.employeeStatus || ""}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Parent Location Modal
  const ParentLocationModal = () => (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between align-items-center">
            <h5 className="modal-title">Locations Selector</h5>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary"
                onClick={fetchLocations}
                title="Refresh"
              >
                <BiRefresh />
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setShowParentLocationModal(false)}
              >
                <RxCross2 />
              </button>
            </div>
          </div>
          <div className="modal-body">
            {loadingLocations ? (
              <div className="text-center">Loading...</div>
            ) : locations.length === 0 ? (
              <div className="text-center">No locations found</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Location Name</th>
                    <th>Location Type</th>
                    <th>Street Address 1</th>
                    <th>Street Address 2</th>
                    <th>City</th>
                    <th>State/Province</th>
                    <th>Zip/Postal Code</th>
                    <th>Country</th>
                    <th>Main Phone</th>
                    <th>Capacity</th>
                    <th>Capacity Used(%)</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>ID</th>
                  </tr>
                </thead>
                <tbody>
                  {locations.map((location) => (
                    <tr key={location._id}>
                      <td>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleParentLocationSelect(location)}
                        >
                          Select
                        </button>
                      </td>
                      <td>{location.locationName || ""}</td>
                      <td>{location.locationType || ""}</td>
                      <td>{location.streetAddress1 || ""}</td>
                      <td>{location.streetAddress2 || ""}</td>
                      <td>{location.city || ""}</td>
                      <td>{location.stateProvince || ""}</td>
                      <td>{location.zipPostalCode || ""}</td>
                      <td>{location.country || ""}</td>
                      <td>{location.mainPhone || ""}</td>
                      <td>{location.capacity || ""}</td>
                      <td>{location.capacityUsed || ""}</td>
                      <td className="coordinate-cell">
                        {location.latitude || ""}
                      </td>
                      <td className="coordinate-cell">
                        {location.longitude || ""}
                      </td>
                      <td>{location.id || ""}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Add these modal components
  const BusinessEntityModal = () => (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between align-items-center">
            <h5 className="modal-title">Business Entities Selector</h5>
            <div className="d-flex gap-2 align-items-center">
              <button
                className="btn btn-outline-secondary"
                onClick={fetchBusinessEntities}
                title="Refresh"
              >
                <BiRefresh />
              </button>
              <button
                className="btn btn-outline-secondary  "
                onClick={() => setShowBusinessEntityModal(false)}
              >
                <RxCross2 />
              </button>
            </div>
          </div>
          <div className="modal-body">
            {loadingEntities ? (
              <div className="text-center">Loading...</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setTempBusinessEntities(businessEntities);
                          } else {
                            setTempBusinessEntities([]);
                          }
                        }}
                        checked={
                          businessEntities.length > 0 &&
                          tempBusinessEntities.length ===
                            businessEntities.length
                        }
                      />
                    </th>
                    <th>Business Entity</th>
                    <th>Business Entity Type</th>
                    <th>Related Locations</th>
                    <th>Parent Business Entity</th>
                    <th>Child Business Entities</th>
                  </tr>
                </thead>
                <tbody>
                  {businessEntities.map((entity) => (
                    <tr key={entity._id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={tempBusinessEntities.some(
                            (item) => item._id === entity._id
                          )}
                          onChange={() => handleBusinessEntitySelect(entity)}
                        />
                      </td>
                      <td>{entity.businessEntity}</td>
                      <td>{entity.businessEntityType}</td>
                      <td>
                        {entity.relatedLocations
                          .map((location) => location.locationName)
                          .join(", ") || ""}
                      </td>
                      <td>
                        {entity.parentBusinessEntity?.businessEntity || "-"}
                      </td>
                      <td>
                        {entity.childBusinessEntities
                          ?.map((c) => c.businessEntity)
                          .join(", ") || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowBusinessEntityModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleConfirmBusinessEntities}
            >
              Done ({tempBusinessEntities.length} selected)
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ChildLocationModal = () => {
    // Filter out the parent location from available child locations
    const availableChildLocations = locations.filter(
      (location) => location._id !== selectedParentLocation?._id
    );

    return (
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h5 className="modal-title">Select Child Locations</h5>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-secondary"
                  onClick={fetchLocations}
                  title="Refresh"
                >
                  <BiRefresh />
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowChildLocationModal(false)}
                >
                  <RxCross2 />
                </button>
              </div>
            </div>
            <div className="modal-body">
              {loadingLocations ? (
                <LoadingSpinner />
              ) : availableChildLocations.length === 0 ? (
                <div className="text-center">No locations available</div>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setTempChildLocations(availableChildLocations);
                            } else {
                              setTempChildLocations([]);
                            }
                          }}
                          checked={
                            availableChildLocations.length > 0 &&
                            tempChildLocations.length ===
                              availableChildLocations.length
                          }
                        />
                      </th>
                      <th>Location Name</th>
                      <th>Location Type</th>
                      <th>Street Address 1</th>
                      <th>Street Address 2</th>
                      <th>City</th>
                      <th>State/Province</th>
                      <th>Zip/Postal Code</th>
                      <th>Country</th>
                      <th>Main Phone</th>
                      <th>Capacity</th>
                      <th>Capacity Used(%)</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                      <th>ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availableChildLocations.map((location) => (
                      <tr key={location._id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={tempChildLocations.some(
                              (item) => item._id === location._id
                            )}
                            onChange={() => handleChildLocationSelect(location)}
                          />
                        </td>
                        <td>{location.locationName || ""}</td>
                        <td>{location.locationType || ""}</td>
                        <td>{location.streetAddress1 || ""}</td>
                        <td>{location.streetAddress2 || ""}</td>
                        <td>{location.city || ""}</td>
                        <td>{location.stateProvince || ""}</td>
                        <td>{location.zipPostalCode || ""}</td>
                        <td>{location.country || ""}</td>
                        <td>{location.mainPhone || ""}</td>
                        <td>{location.capacity || ""}</td>
                        <td>{location.capacityUsed || ""}</td>
                        <td className="coordinate-cell">
                          {/* {isLoadingCoordinates ? (
                        <span className="loading-coordinates">Loading...</span>
                      ) : (
                        <span 
                          className={`coordinate-value ${location.latitude !== '-' ? 'clickable' : ''}`}
                          onClick={() => location.latitude !== '-' && viewOnMap(location.latitude, location.longitude)}
                          title={location.latitude !== '-' ? "Click to view on map" : ""}
                        >
                          {location.latitude}
                        </span>
                      )} */}
                          {location.latitude || ""}
                        </td>
                        <td className="coordinate-cell">
                          {/* {isLoadingCoordinates ? (
                        <span className="loading-coordinates">Loading...</span>
                      ) : (
                        <span 
                          className={`coordinate-value ${location.longitude !== '-' ? 'clickable' : ''}`}
                          onClick={() => location.longitude !== '-' && viewOnMap(location.latitude, location.longitude)}
                          title={location.longitude !== '-' ? "Click to view on map" : ""}
                        >
                          {location.longitude}
                        </span>
                      )} */}
                          {location.longitude || ""}
                        </td>
                        <td>{location.id || ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowChildLocationModal(false);
                  setTempChildLocations([]);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleConfirmChildLocations}
              >
                Done ({tempChildLocations.length} selected)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Update the handleInputChange function to properly set form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convert the field names to match the formData structure
    const fieldName = name.toLowerCase().replace(/\s+/g, '_');
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  // Update the handleSubmit function for editing
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (!formData.location_name || !formData.location_id) {
        Toastify({
          text: "Location Name and Location ID are required",
          duration: 3000,
          backgroundColor: "#f44336",
          close: true,
        }).showToast();
        return;
      }

      const locationData = {
        locationName: formData.location_name,
        locationId: formData.location_id,
        locationType: selectedTimeZone === "-- Please select --" ? "" : selectedTimeZone,
        capacity: formData.capacity ? parseInt(formData.capacity) : "",
        capacityUsed: formData.capacity_used ? parseInt(formData.capacity_used) : "",
        mainPhone: formData.main_phone || "",
        siteOwnership: selectedStatus === "-- Please select --" ? "" : selectedStatus,
        siteManager: selectedSiteManager?._id || "",
        accessSafetySecurityEquipment:
          selectedAccessSafetySecurityEquipment === "-- Please select --"
            ? ""
            : selectedAccessSafetySecurityEquipment,
        streetAddress1: formData.street_address_1 || "",
        streetAddress2: formData.street_address_2 || "",
        city: formData.city || "",
        stateProvince: selectedState === "-- Please select --" ? "" : selectedState,
        zipPostalCode: formData.zip_postal_code || "",
        country: selectedCountry === "-- Please select --" ? "" : selectedCountry,
        businessEntities: selectedBusinessEntities
          .map((entity) => (typeof entity === "object" ? entity._id : entity))
          .filter(Boolean) || [],
        parentLocation: selectedParentLocation?._id || "",
        childLocations: selectedChildLocations
          .map((loc) => (typeof loc === "object" ? loc._id : loc))
          .filter(Boolean) || [],
        latitude: formData.latitude || "",
        longitude: formData.longitude || "",
      };

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/locations/${id}`,
        locationData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        Toastify({
          text: "Location updated successfully!",
          duration: 3000,
          backgroundColor: "#4caf50",
          close: true,
        }).showToast();
        navigate("/locations");
      }
    } catch (error) {
      console.error("Error updating location:", error);
      const errorMessage = error.response?.data?.message || "Failed to update location.Check your all fields.";
      
      Toastify({
        text: errorMessage,
        duration: 5000,
        backgroundColor: "#f44336",
        close: true,
        style: {
          minWidth: '300px',
          maxWidth: '500px',
          wordBreak: 'break-word'
        }
      }).showToast();
    }
  };

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>New Location Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Location: New Location</div>
            <div className="d-flex align-items-center justify-content-end">
              <div>
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => navigate("/locations")}
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
                  title="Create Location"
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
          <div className="form-heading">Location Information</div>
          <div className="border-1"></div>
          <Form>
            <div className="row pt-4">
              <div className="col-6">
                {["Location Name", "Location ID"].map((label, index) => (
                  <div className="mb-3 d-flex align-items-center" key={index}>
                    <Label
                      htmlFor={label}
                      className="form-label me-2 fs-15 w-40"
                    >
                      {label}
                    </Label>
                    <Input
                      type="text"
                      name={label.toLowerCase().replace(" ", "_")}
                      value={formData[label.toLowerCase().replace(" ", "_")]}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder={`Enter ${label}`}
                    />
                  </div>
                ))}
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="locationType"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Location Type{" "}
                  </Label>
                  <div className="dropdown-container position-relative flex-grow-1 w-100">
                    <button
                      onClick={toggleTimeZoneDropdown}
                      className="form-control text-start d-flex justify-content-between align-items-center"
                      type="button"
                    >
                      <span>{selectedTimeZone}</span>
                      <svg
                        className={`ms-2 ${isTimeZoneOpen ? "rotate-180" : ""}`}
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
                    {isTimeZoneOpen && (
                      <div
                        className="position-absolute w-100 mt-1 bg-white border rounded dropdown-menu1"
                        style={{ zIndex: 1000 }}
                      >
                        {timeZoneOptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleSelectTimeZone(option)}
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
                {/* Capacity and Capacity Used */}
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="capacity"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Capacity
                  </Label>
                  <Input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter Capacity"
                  />
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="capacity_used"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Capacity Used
                  </Label>
                  <Input
                    type="number"
                    name="capacity_used"
                    value={formData.capacity_used}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter Capacity Used"
                  />
                </div>

                {/* Latitude and Longitude */}
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="latitude"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Latitude
                  </Label>
                  <Input
                    type="text"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter Latitude"
                  />
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="longitude"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Longitude
                  </Label>
                  <Input
                    type="text"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter Longitude"
                  />
                </div>
              </div>
              <div className="col-6">
                {["Main Phone"].map((label, index) => (
                  <div className="mb-3 d-flex align-items-center" key={index}>
                    <Label
                      htmlFor={label}
                      className="form-label me-2 fs-15 w-40"
                    >
                      {label}
                    </Label>
                    <Input
                      type="tel"
                      name="main_phone"
                      value={formData.main_phone}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter Main Phone"
                    />
                  </div>
                ))}
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="siteOwnership"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Site Ownership
                  </Label>
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
                      <div
                        className="position-absolute w-100 mt-1 bg-white border rounded dropdown-menu1"
                        style={{ zIndex: 1000 }}
                      >
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
                  <Label
                    htmlFor="siteManager"
                    className="form-label me-4 fs-15 w-29 me-4"
                  >
                    Site Manager
                  </Label>
                  <div className="position-relative flex-grow-1">
                    <div className="form-control1 d-flex flex-wrap gap-2">
                      {selectedSiteManager ? (
                        <span className="badge bg-light text-dark d-flex align-items-center">
                          {`${selectedSiteManager.fullName}`}
                          <button
                            type="button"
                            className="btn-close ms-2"
                            style={{ fontSize: "0.5rem" }}
                            onClick={() => setSelectedSiteManager(null)}
                          />
                        </span>
                      ) : (
                        <span className="text-muted">No site manager selected</span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                      setShowSiteManagerModal(true);
                      fetchEmployees();
                    }}
                  >
                    <BiSearchAlt2 />
                  </button>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="locationType"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Access/Safety/Security Equipment{" "}
                  </Label>
                  <div className="dropdown-container position-relative flex-grow-1 w-100">
                    {" "}
                    <button
                      onClick={toggleAccessSafetySecurityEquipmentDropdown}
                      className="form-control text-start d-flex justify-content-between align-items-center"
                      type="button"
                    >
                      <span>{selectedAccessSafetySecurityEquipment}</span>
                      <svg
                        className={`ms-2 ${
                          isAccessSafetySecurityEquipmentOpen
                            ? "rotate-180"
                            : ""
                        }`}
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
                        />{" "}
                      </svg>
                    </button>
                    {isAccessSafetySecurityEquipmentOpen && (
                      <div
                        className="position-absolute w-100 mt-1 bg-white border rounded dropdown-menu1" // Your styling
                        style={{ zIndex: 1000 }}
                      >
                        {AccessSafetySecurityEquipmentOptions.map(
                          (option, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                handleSelectAccessSafetySecurityEquipment(
                                  option
                                )
                              } // Correct function name
                              className="dropdown-item w-100 text-start py-2 px-3" // Your styling
                              type="button"
                            >
                              {option}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>

        <div className="form-content">
          <div className="form-heading">Location and Address Information</div>
          <div className="border-1"></div>
          <Form>
            <div className="row pt-4">
              <div className="col-6">
                {/* Street Address 1 */}
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="street_address_1"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Street Address 1
                  </Label>
                  <Input
                    type="text"
                    name="street_address_1"
                    value={formData.street_address_1}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter Street Address 1"
                  />
                </div>

                {/* Street Address 2 */}
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="street_address_2"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Street Address 2
                  </Label>
                  <Input
                    type="text"
                    name="street_address_2"
                    value={formData.street_address_2}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter Street Address 2"
                  />
                </div>

                {/* City */}
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="city"
                    className="form-label me-2 fs-15 w-40"
                  >
                    City
                  </Label>
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter City"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="State/Province"
                    className="form-label me-2 fs-15 w-40"
                  >
                    State/Province
                  </Label>
                  <div className="dropdown-container position-relative flex-grow-1 w-100">
                    <button
                      onClick={toggleStateDropdown}
                      className="form-control text-start d-flex justify-content-between align-items-center"
                      type="button"
                    >
                      <span>{selectedState}</span>
                      <svg
                        className={`ms-2 ${isStateOpen ? "rotate-180" : ""}`}
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
                    {isStateOpen && (
                      <div
                        className="position-absolute w-100 mt-1 bg-white border rounded dropdown-menu1"
                        style={{ zIndex: 1000 }}
                      >
                        {StateOptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleSelectState(option)}
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
                {["ZIP/Postal Code"].map((label, index) => (
                  <div className="mb-3 d-flex align-items-center" key={index}>
                    <Label
                      htmlFor={label}
                      className="form-label me-2 fs-15 w-40"
                    >
                      {label}
                    </Label>
                    <Input
                      type="text"
                      name="zip_postal_code"
                      value={formData.zip_postal_code}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter ZIP/Postal Code"
                    />
                  </div>
                ))}
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="Country"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Country
                  </Label>
                  <div className="dropdown-container position-relative flex-grow-1 w-100">
                    <button
                      onClick={toggleCountryDropdown}
                      className="form-control text-start d-flex justify-content-between align-items-center"
                      type="button"
                    >
                      <span>{selectedCountry}</span>
                      <svg
                        className={`ms-2 ${isCountryOpen ? "rotate-180" : ""}`}
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
                    {isCountryOpen && (
                      <div
                        className="position-absolute w-100 mt-1 bg-white border rounded dropdown-menu1"
                        style={{ zIndex: 1000 }}
                      >
                        {CountryOptions.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleSelectCountry(option)}
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
              </div>
            </div>
          </Form>
        </div>

        <div className="form-content">
          <div className="form-heading">Relationships </div>
          <div className="border-1"></div>
          <Form>
            <div className="row pt-4">
              <div className="col-6">
                {/* Parent Location */}
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="parentLocation"
                    className="form-label me-4 fs-15 w-29 me-4"
                  >
                    Parent Location
                  </Label>
                  <div className="position-relative flex-grow-1">
                    <div className="form-control1 d-flex flex-wrap gap-2">
                      {selectedParentLocation ? (
                        <span className="badge bg-light text-dark d-flex align-items-center">
                          {selectedParentLocation.locationName}
                          <button
                            type="button"
                            className="btn-close ms-2"
                            style={{ fontSize: "0.5rem" }}
                            onClick={() => setSelectedParentLocation(null)}
                          />
                        </span>
                      ) : (
                        <span className="text-muted">
                          No parent location selected
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                      setShowParentLocationModal(true);
                      fetchLocations();
                    }}
                  >
                    <BiSearchAlt2 />
                  </button>
                </div>

                {/* Child Locations */}
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="childLocations"
                    className="form-label me-4 fs-15 w-29 me-4"
                  >
                    Child Locations
                  </Label>
                  <div className="position-relative flex-grow-1">
                    <div className="form-control1 d-flex flex-wrap gap-2">
                      {selectedChildLocations.length > 0 ? (
                        <>
                          {selectedChildLocations.map((location, index) => (
                            <span
                              key={index}
                              className="badge bg-light text-dark d-flex align-items-center"
                            >
                              {location.locationName}
                              <button
                                type="button"
                                className="btn-close ms-2"
                                style={{ fontSize: "0.5rem" }}
                                onClick={() => {
                                  setSelectedChildLocations((prev) =>
                                    prev.filter(
                                      (loc) => loc._id !== location._id
                                    )
                                  );
                                }}
                              />
                            </span>
                          ))}
                          <button
                            type="button"
                            className="badge bg-light text-danger border-0"
                            onClick={() => setSelectedChildLocations([])}
                          >
                            Clear All
                          </button>
                        </>
                      ) : (
                        <span className="text-muted">
                          No child locations selected
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                      setShowChildLocationModal(true);
                      fetchLocations();
                    }}
                  >
                    <BiSearchAlt2 />
                  </button>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="businessEntities"
                    className="form-label me-2 fs-15 w-29 me-4"
                  >
                    Business Entities
                  </Label>
                  <FaCircleQuestion
                    className="me-2 hw-20"
                    title="Department at this location"
                  />
                  <div className="position-relative flex-grow-1">
                    <div className="form-control1 d-flex flex-wrap gap-2">
                      {selectedBusinessEntities.length > 0 ? (
                        <>
                          {selectedBusinessEntities.map((entity, index) => (
                            <span
                              key={index}
                              className="badge bg-light text-dark d-flex align-items-center"
                            >
                              {entity.businessEntity}
                              <button
                                type="button"
                                className="btn-close ms-2"
                                style={{ fontSize: "0.5rem" }}
                                onClick={() => {
                                  setSelectedBusinessEntities(prev =>
                                    prev.filter(e => e._id !== entity._id)
                                  );
                                }}
                              />
                            </span>
                          ))}
                          <button
                            type="button"
                            className="badge bg-light text-danger border-0"
                            onClick={() => setSelectedBusinessEntities([])}
                          >
                            Clear All
                          </button>
                        </>
                      ) : (
                        <span className="text-muted">
                          No business entities selected
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                      setShowBusinessEntityModal(true);
                      fetchBusinessEntities();
                    }}
                  >
                    <BiSearchAlt2 />
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
        {showModal && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header d-flex justify-content-between align-items-center">
                  <h5 className="modal-title">Select Business Entity</h5>
                  <div className="d-flex gap-2 align-items-center">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => fetchBusinessEntities()}
                      title="Refresh"
                    >
                      <BiRefresh />
                    </button>
                    {/* Remove the close button */}
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowModal(false)}
                      title="Close"
                    >
                      <RxCross2 />
                    </button>
                  </div>
                </div>
                <div className="modal-body">
                  {loading ? (
                    <div className="text-center">Loading...</div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Actions</th>
                            <th>Business Entity</th>
                            <th>Business Entity Type</th>
                            <th>Related Locations</th>
                            <th>Parent Business Entity</th>
                            <th>Child Business Entities</th>
                            <th>Updated At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentEntities.map((entity, index) => (
                            <tr key={index}>
                              <td>
                                <button
                                  className="btn btn-sm btn-primary"
                                  onClick={() => handleEntitySelect(entity)}
                                >
                                  Select
                                </button>
                              </td>
                              <td>{entity.businessEntity}</td>
                              <td>{entity.businessEntityType}</td>
                              <td>{entity.relatedLocations}</td>
                              <td>
                                {entity.parentBusinessEntity?.businessEntity ||
                                  ""}
                              </td>
                              <td>
                                {entity.childBusinessEntities
                                  .map((child) => child.businessEntity)
                                  .join(" | ")}
                              </td>
                              <td>
                                {new Date(entity.updatedAt).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {/* Pagination Controls */}
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </div>
                {/* <div className="modal-footer"> */}
                {/* Remove the close button */}
                {/* <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button> */}

                {/* Add the Select button */}
                {/* <button onClick={handleSelectEntities}>Select</button>
                <button onClick={handleClose}>Close</button> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
      {showSiteManagerModal && <SiteManagerModal />}
      {showParentLocationModal && <ParentLocationModal />}
      {showChildLocationModal && <ChildLocationModal />}
      {showBusinessEntityModal && <BusinessEntityModal />}
      <div className="d-flex justify-content-end mt-4">
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={() => navigate("/locations")}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Create Location
        </button>
      </div>
    </React.Fragment>
  );
}

export default EditLocation;
