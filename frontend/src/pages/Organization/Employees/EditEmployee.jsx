import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { HiMiniWrench } from "react-icons/hi2";
import { LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaPrint, FaRegFilePdf } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import { Input, Label, Form } from "reactstrap";
import "./Employees.css";
import axios from "axios";
import { BiSearchAlt2 } from "react-icons/bi";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import LoadingSpinner from "../../../Components/Common/LoadingSpinner/LoadingSpinner";
import { IoMdArrowDropdown } from "react-icons/io";

function EditEmployee() {
  const { id: employeeId } = useParams();
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
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeesModal, setShowEmployeesModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedEntities, setSelectedEntities] = useState([]);
  const [entityPage, setEntityPage] = useState(1);
  const [entityItemsPerPage] = useState(10);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);

  // State for form inputs
  const [employeeData, setEmployeeData] = useState({
    employeeID: "",
    firstName: "",
    middleName: "",
    lastName: "",
    preferredName: "",
    title: "",
    workEmailAddress: "",
    workPhone: "",
    workMobilePhone: "",
    fax: "",
    manager: "",
    subordinates: [],
    department: [],
    location: [],
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    zipPostalCode: "",
    stateProvince: "",
    country: "",
    homePhoneNumber: "",
    personalMobilePhone: "",
    personalEmailAddress: "",
    employeeStatus: "Active",
  });

  // Add this state for manager selection
  const [selectedManager, setSelectedManager] = useState(null);
  const [showManagerModal, setShowManagerModal] = useState(false);

  const timeZoneOptions = [
    "-- Please select --",
    "GMT - Coordinated Universal Time",
    "GMT - Greenwich Mean Time",
    "GMT - Western European Time",
    "GMT+01 - AIX specific equivalent of Central European Time",
    "GMT+01 - Central European Time",
    "GMT+01 - Irish Summer Time",
    "GMT+01 - Middle European Time Same zone as CET",
    "GMT+01 - West Africa Time",
    "GMT+01 - Western European Daylight Time",
    "GMT+01 - Western European Summer Time",
    "GMT+02 - Central Africa Time",
    "GMT+02 - Central European Daylight Time",
    "GMT+02 - Central European Summer Time (Cf. HAEC)",
    "GMT+02 - Eastern European Time",
    "GMT+02 - Israel Standard Time",
    "GMT+02 - Middle European Saving Time",
    "GMT+02 - South African Standard Time",
    "GMT+03 - Arab Standard Time (Kuwait)",
    "GMT+03 - Arabic Standard Time (Baghdad)",
    "GMT+03 - East Africa Time",
    "GMT+03 - Eastern European Daylight Time",
    "GMT+03 - Eastern European Summer Time",
    "GMT+03 - Israeli Daylight Time",
    "GMT+03 - Moscow Standard Time",
    "GMT+03:30 - Iran Standard Time",
    "GMT+04 - Arabian Standard Time (Abu Dhabi)",
    "GMT+04 - Armenia Time",
    "GMT+04 - Azerbaijan Time",
    "GMT+04 - Georgia Standard Time",
    "GMT+04 - Gulf Standard Time",
    "GMT+04 - Mauritius Time",
    "GMT+04 - Moscow Summer Time",
    "GMT+04 - Réunion Time",
    "GMT+04 - Samara Time",
    "GMT+04 - Seychelles Time",
    "GMT+04:30 - Afghanistan Time",
    "GMT+05 - Armenia Summer Time",
    "GMT+05 - Heard and McDonald Islands Time",
    "GMT+05 - Pakistan Standard Time",
    "GMT+05 - Yekaterinburg Time",
    "GMT+05:30 - Indian Standard Time",
    "GMT+05:30 - Sri Lanka Time",
    "GMT+05:45 - Nepal Time",
    "GMT+06 - Bangladesh Standard Time",
    "GMT+06 - Bhutan Time",
    "GMT+06 - British Indian Ocean Time",
    "GMT+06 - Omsk Time",
    "GMT+06:30 - Cocos Islands Time",
    "GMT+06:30 - Myanmar Standard Time",
    "GMT+07 - Christmas Island Time",
    "GMT+07 - Indochina Time",
    "GMT+07 - Krasnoyarsk Time",
    "GMT+07 - Thailand Standard Time",
    "GMT+08 - ASEAN Common Time",
    "GMT+08 - Australian Western Standard Time",
    "GMT+08 - Brunei Time",
    "GMT+08 - China Standard Time",
    "GMT+08 - China Time",
    "GMT+08 - Hong Kong Time",
    "GMT+08 - Irkutsk Time",
    "GMT+08 - Malaysia Time",
    "GMT+08 - Malaysian Standard Time",
    "GMT+08 - Philippine Standard Time",
    "GMT+08 - Singapore Standard Time",
    "GMT+08 - Singapore Time",
    "GMT+08 - Western Standard Time",
    "GMT+09 - Australian Western Daylight Time",
    "GMT+09 - Japan Standard Time",
    "GMT+09 - Korea Standard Time",
    "GMT+09 - Yakutsk Time",
    "GMT+09:30 - Australian Central Standard Time",
    "GMT+09:30 - Central Standard Time (Australia)",
    "GMT+10 - Australian Eastern Standard Time",
    "GMT+10 - Chamorro Standard Time",
    "GMT+10 - Vladivostok Time",
    "GMT+10:30 - Australian Central Daylight Time",
    "GMT+10:30 - Lord Howe Standard Time",
    "GMT+11 - Australian Eastern Daylight Time",
    "GMT+11 - Magadan Time",
    "GMT+11 - Solomon Islands Time",
    "GMT+11:30 - Norfolk Time",
    "GMT+12 - Fiji Time",
    "GMT+12 - Gilbert Island Time",
    "GMT+12 - Kamchatka Time",
    "GMT+12 - New Zealand Standard Time",
    "GMT+12:45 - Chatham Standard Time",
    "GMT+13 - New Zealand Daylight Time",
    "GMT+13 - Phoenix Island Time",
    "GMT+13:45 - Chatham Daylight Time",
    "GMT+14 -  Line Islands Time",
    "GMT-01 - Azores Standard Time",
    "GMT-01 - Cape Verde Time",
    "GMT-02 - South Georgia and the South Sandwich Islands",
    "GMT-02 - Uruguay Summer Time",
    "GMT-02:30 - Newfoundland Daylight Time",
    "GMT-03 - Argentina Time",
    "GMT-03 - Atlantic Daylight Time",
    "GMT-03 - Brasilia Time",
    "GMT-03 - Chile Summer Time",
    "GMT-03 - Falkland Islands Summer Time",
    "GMT-03 - French Guiana Time",
    "GMT-03 - Uruguay Standard Time",
    "GMT-03:30 - Newfoundland Standard Time",
    "GMT-03:30 - Newfoundland Time",
    "GMT-04 - Atlantic Standard Time",
    "GMT-04 - Bolivia Time",
    "GMT-04 - Chile Standard Time",
    "GMT-04 - Colombia Summer Time",
    "GMT-04 - Eastern Caribbean Time (does not recognise DST)",
    "GMT-04 - Eastern Daylight Time (North America)",
    "GMT-04 - Falkland Islands Time",
    "GMT-04 - Guyana Time",
    "GMT-04:30 - Venezuelan Standard Time",
    "GMT-05 - Central Daylight Time (North America)",
    "GMT-05 - Colombia Time",
    "GMT-05 - Eastern Standard Time (North America)",
    "GMT-05 - Ecuador Time",
    "GMT-06 - Central Standard Time (North America)",
    "GMT-06 - Easter Island Standard Time",
    "GMT-06 - Galapagos Time",
    "GMT-06 - Mountain Daylight Time (North America)",
    "GMT-07 - Mountain Standard Time (North America)",
    "GMT-07 - Pacific Daylight Time&#160;(North America)",
    "GMT-08 - Alaska Daylight Time",
    "GMT-08 - Clipperton Island Standard Time",
    "GMT-08 - Pacific Daylight Time (North America)",
    "GMT-09 - Alaska Standard Time",
    "GMT-09 - Gambier Island Time",
    "GMT-09 - Hawaii-Aleutian Daylight Time",
    "GMT-09:30 - Marquesas Islands Time",
    "GMT-10 - Cook Island Time",
    "GMT-10 - Hawaii Standard Time",
    "GMT-10 - Hawaii-Aleutian Standard Time",
    "GMT-10 -  Tahiti Time",
    "GMT-11 - Samoa Standard Time",
    "GMT-12 -  Baker Island Time",
  ];

  const statusOptions = ["-- Please select --", "Active", "Terminated"];
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

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/employees/all`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      //   console.log("Fetched employees data:", data); // Log the data

      if (Array.isArray(data.data.employees)) {
        setEmployees(data.data.employees); // Set the employees state
      } else {
        console.error("Expected an array but got:", data.data.employees);
        setEmployees([]); // Reset to empty array if not valid
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
    // console.log(employees);
  }, []);

  const handleDepartmentSearch = () => {
    setShowModal(true);
    fetchBusinessEntities();
  };

  const handleEntitySelect = (entity) => {
    setSelectedEntities((prev) => {
      const isAlreadySelected = prev.some((e) => e._id === entity._id);
      if (isAlreadySelected) {
        return prev.filter((e) => e._id !== entity._id);
      } else {
        return [
          ...prev,
          {
            _id: entity._id,
            businessEntity: entity.businessEntity,
            businessEntityType: entity.businessEntityType,
          },
        ];
      }
    });
  };
  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEntities = searchResults.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Calculate total pages
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  // Add page change handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // First, create a mapping object for the fields
  const FIELD_MAPPING = {
    workemailaddress: "workEmailAddress",
    workphone: "workPhone",
    workmobilephone: "workMobilePhone",
    fax: "fax",
  };

  // Update the form fields rendering
  const contactFields = [
    {
      label: "Work Email Address",
      name: "workEmailAddress",
      type: "email",
    },
    {
      label: "Work Phone",
      name: "workPhone",
      type: "tel",
    },
    {
      label: "Work Mobile Phone",
      name: "workMobilePhone",
      type: "tel",
    },
    {
      label: "Fax",
      name: "fax",
      type: "tel",
    },
  ];

  // Update the handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Map form field names to state field names
    const fieldMap = {
      employeeid: "employeeID",
      firstname: "firstName",
      middlename: "middleName",
      lastname: "lastName",
      preferredname: "preferredName",
      workemailaddress: "workEmailAddress",
      workmobilephone: "workMobilePhone",
      workphone: "workPhone",
      fax: "fax",
      streetaddress1: "streetAddress1",
      streetaddress2: "streetAddress2",
      zippostalcode: "zipPostalCode",
      homephonenumber: "homePhoneNumber",
      personalmobilephone: "personalMobilePhone",
      personalemailaddress: "personalEmailAddress",
    };

    // Get the correct field name from the map or use the original name
    const fieldName = fieldMap[name.toLowerCase()] || name;

    // Update the form data
    setEmployeeData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  // Add useEffect to fetch employee data when component mounts
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/employees/${employeeId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        // The employee data is directly in response.data
        const employee = response.data;

        if (!employee) {
          throw new Error("Employee data not found");
        }

        // Set form data
        setEmployeeData({
          employeeID: employee.employeeID || "",
          firstName: employee.firstName || "",
          middleName: employee.middleName || "",
          lastName: employee.lastName || "",
          preferredName: employee.preferredName || "",
          title: employee.title || "",
          workEmailAddress: employee.workEmailAddress || "",
          workPhone: employee.workPhone || "",
          workMobilePhone: employee.workMobilePhone || "",
          fax: employee.fax || "",
          manager: employee.manager?._id || "",
          subordinates:
            employee.subordinates?.map((sub) => ({
              _id: sub._id,
              firstName: sub.firstName,
              lastName: sub.lastName,
              employeeID: sub.employeeID,
            })) || [],
          department: employee.department || [],
          location: employee.location || [],
          streetAddress1: employee.streetAddress1 || "",
          streetAddress2: employee.streetAddress2 || "",
          city: employee.city || "",
          zipPostalCode: employee.zipPostalCode || "",
          stateProvince: employee.stateProvince || "-- Please select --",
          country: employee.country || "-- Please select --",
          homePhoneNumber: employee.homePhoneNumber || "",
          personalMobilePhone: employee.personalMobilePhone || "",
          personalEmailAddress: employee.personalEmailAddress || "",
          employeeStatus: employee.employeeStatus || "Active",
        });

        // Set dropdown values
        setSelectedTimeZone(employee.timeZone || "-- Please select --");
        setSelectedStatus(employee.employeeStatus || "-- Please select --");
        setSelectedState(employee.stateProvince || "-- Please select --");
        setSelectedCountry(employee.country || "-- Please select --");

        // Set manager if exists
        if (employee.manager) {
          setSelectedManager({
            _id: employee.manager._id,
            firstName: employee.manager.firstName,
            lastName: employee.manager.lastName,
            employeeID: employee.manager.employeeID,
          });
        }

        // Set departments if exist
        if (employee.department?.length) {
          setSelectedEntities(
            employee.department.map((dept) => ({
              _id: dept._id,
              businessEntity: dept.businessEntity,
              businessEntityType: dept.businessEntityType,
            }))
          );
        }

        // Set locations if exist
        if (employee.location) {
          // Changed from location?.length since location is an object
          setSelectedLocations([
            {
              _id: employee.location._id,
              locationName: employee.location.locationName,
              locationType: employee.location.locationType,
              locationId: employee.location.locationId,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
        Toastify({
          text: error.message || "Error loading employee data",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "#dc3545",
          },
        }).showToast();
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchEmployeeData();
    }
  }, [employeeId]);

  // Update handleSubmit to use PUT instead of POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create formattedData with all fields, including empty ones
      const formattedData = {
        employeeID: employeeData.employeeID || "",
        firstName: employeeData.firstName || "",
        middleName: employeeData.middleName || "",
        lastName: employeeData.lastName || "",
        preferredName: employeeData.preferredName || "",
        title: employeeData.title || "",
        workEmailAddress: employeeData.workEmailAddress || "",
        workPhone: employeeData.workPhone || "",
        workMobilePhone: employeeData.workMobilePhone || "",
        fax: employeeData.fax || "",
        manager: selectedManager?._id || "",
        subordinates: employeeData.subordinates.map((sub) => sub._id) || [],
        department: selectedEntities.map((dept) => dept._id) || [],
        location: selectedLocations.map((loc) => loc._id) || [],
        streetAddress1: employeeData.streetAddress1 || "",
        streetAddress2: employeeData.streetAddress2 || "",
        city: employeeData.city || "",
        zipPostalCode: employeeData.zipPostalCode || "",
        stateProvince:
          selectedState === "-- Please select --" ? "" : selectedState,
        country:
          selectedCountry === "-- Please select --" ? "" : selectedCountry,
        homePhoneNumber: employeeData.homePhoneNumber || "",
        personalMobilePhone: employeeData.personalMobilePhone || "",
        personalEmailAddress: employeeData.personalEmailAddress || "",
        employeeStatus:
          selectedStatus === "-- Please select --" ? "" : selectedStatus,
        timeZone:
          selectedTimeZone === "-- Please select --" ? "" : selectedTimeZone,
      };

      console.log("Submitting formatted data:", formattedData);

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/employees/${employeeId}`,
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      Toastify({
        text: "Employee updated successfully!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "#28a745",
        },
      }).showToast();
      navigate("/employees");
    } catch (error) {
      console.error("Error updating employee:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Error updating employee. Please try again.";

      Toastify({
        text: errorMessage,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "#dc3545",
        },
      }).showToast();
    }
  };

  // Add handler for manager selection
  const handleManagerSelect = (employee) => {
    setSelectedManager({
      _id: employee._id,
      employeeID: employee.employeeID,
      firstName: employee.firstName,
      lastName: employee.lastName,
    });
    setShowManagerModal(false);

    // Update the employeeData with the selected manager
    setEmployeeData((prev) => ({
      ...prev,
      manager: employee._id,
    }));
  };

  const fetchEmployees = async () => {
    try {
      setUserLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/employees/all`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Fetched employees data:", response.data); // Log the response
      setEmployees(response.data.employees || []); // Ensure this matches the response structure
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setUserLoading(false);
    }
  };

  const handleUserSelect = (user) => {
    const newEditors = [...new Set([...employeeData.editors, user.username])];
    setEmployeeData({
      ...employeeData,
      editors: newEditors,
    });
    setShowEmployeesModal(false);
  };

  const handleSubordinateSelect = (employeeId, isSelected) => {
    const selectedEmployee = employees.find((emp) => emp._id === employeeId);
    if (isSelected && selectedEmployee) {
      setEmployeeData((prev) => ({
        ...prev,
        subordinates: [
          ...prev.subordinates,
          {
            _id: selectedEmployee._id,
            employeeID: selectedEmployee.employeeID,
            firstName: selectedEmployee.firstName,
            lastName: selectedEmployee.lastName,
            fullName: `${selectedEmployee.firstName} ${selectedEmployee.lastName}`,
          },
        ],
      }));
      setShowEmployeesModal(false);
    } else {
      setEmployeeData((prev) => ({
        ...prev,
        subordinates: prev.subordinates.filter((sub) => sub._id !== employeeId),
      }));
    }
  };

  const handleAddSubordinates = () => {
    setEmployeeData((prev) => ({
      ...prev,
      subordinates: [...selectedEmployees],
    }));
    setShowEmployeesModal(false);
  };

  const handleBulkSelection = (e) => {
    const isChecked = e.target.checked;
    // Get only the employees that aren't already selected
    const employeesToAdd = isChecked
      ? employees.filter(
          (emp) => !employeeData.subordinates.some((sub) => sub._id === emp._id)
        )
      : [];

    if (isChecked) {
      // Add only new employees
      setEmployeeData((prev) => ({
        ...prev,
        subordinates: [
          ...prev.subordinates,
          ...employeesToAdd.map((emp) => ({
            _id: emp._id,
            employeeID: emp.employeeID,
            firstName: emp.firstName,
            lastName: emp.lastName,
          })),
        ],
      }));
    } else {
      // Remove all employees
      setEmployeeData((prev) => ({
        ...prev,
        subordinates: [],
      }));
    }
  };

  const EmployeesModal = ({ onClose, employees, onSelect }) => (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between align-items-center">
            <h5 className="modal-title">Select Subordinates</h5>
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={loadEmployees}
                title="Refresh"
              >
                <BiRefresh />
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
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
                      <th>
                        <input
                          type="checkbox"
                          onChange={handleBulkSelection}
                          checked={
                            employees.length > 0 &&
                            employees.every((emp) =>
                              employeeData.subordinates.some(
                                (sub) => sub._id === emp._id
                              )
                            )
                          }
                        />
                      </th>
                      <th>Actions</th>
                      <th>ID</th>
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
                      <th>Department</th>
                      <th>Street Address 1</th>
                      <th>Street Address 2</th>
                      <th>City</th>
                      <th>Zip/Postal Code</th>
                      <th>State/Province</th>
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
                          <input
                            type="checkbox"
                            checked={employeeData.subordinates.some(
                              (sub) => sub._id === employee._id
                            )}
                            onChange={(e) =>
                              handleSubordinateSelect(
                                employee._id,
                                e.target.checked
                              )
                            }
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => {
                              handleSubordinateSelect(employee._id, true);
                              // Modal will close automatically due to the update in handleSubordinateSelect
                            }}
                          >
                            Select
                          </button>
                        </td>
                        <td>{employee._id}</td>
                        <td>{employee.employeeID}</td>
                        <td>{employee.firstName || "-"}</td>
                        <td>{employee.lastName || "-"}</td>
                        <td>{employee.preferredName || "-"}</td>
                        <td>{employee.title || "-"}</td>
                        <td>{employee.workEmailAddress || "-"}</td>
                        <td>{employee.workPhone || "-"}</td>
                        <td>{employee.workMobilePhone || "-"}</td>
                        <td>{employee.fax || "-"}</td>
                        <td>
                          {employee.manager
                            ? `${employee.manager.firstName} ${employee.manager.lastName}`
                            : employee.manager || "-"}
                        </td>
                        <td>{employee.departmentNames?.join(", ") || "-"}</td>
                        <td>{employee.streetAddress1 || "-"}</td>
                        <td>{employee.streetAddress2 || "-"}</td>

                        <td>{employee.city || "-"}</td>
                        <td>{employee.zipPostalCode || "-"}</td>
                        <td>{employee.stateProvince || "-"}</td>
                        <td>{employee.country || "-"}</td>
                        <td>{employee.homePhoneNumber || "-"}</td>
                        <td>{employee.personalMobilePhone || "-"}</td>
                        <td>{employee.personalEmailAddress || "-"}</td>
                        <td>
                          <span
                            className={`badge ${
                              employee.employeeStatus === "Active"
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {employee.employeeStatus || "-"}
                          </span>
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
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClose} // Simply close the modal on Done
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const handleSubordinateClick = (e) => {
    e.preventDefault();
    setShowEmployeesModal(true);
    loadEmployees(); // Refresh employees list when opening modal
  };

  // Add this function to handle clearing all subordinates
  const handleClearAllSubordinates = () => {
    setEmployeeData((prev) => ({
      ...prev,
      subordinates: [],
    }));
  };

  // Add this function to handle clearing all entities
  const handleClearAllEntities = () => {
    setSelectedEntities([]);
  };

  // Add this function to handle bulk entity selection
  const handleBulkEntitySelection = (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      // Add all entities that aren't already selected
      const newEntities = currentEntities
        .filter(
          (entity) =>
            !selectedEntities.some((selected) => selected._id === entity._id)
        )
        .map((entity) => ({
          _id: entity._id,
          businessEntity: entity.businessEntity,
          businessEntityType: entity.businessEntityType,
        }));

      setSelectedEntities((prev) => [...prev, ...newEntities]);
    } else {
      // Remove all visible entities from selection
      setSelectedEntities((prev) =>
        prev.filter(
          (selected) =>
            !currentEntities.some((entity) => entity._id === selected._id)
        )
      );
    }
  };

  // Update the entity pagination component
  const EntityPagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination-container d-flex justify-content-between align-items-center mt-3">
        <div className="pagination-info">
          Showing {(currentPage - 1) * entityItemsPerPage + 1} to{" "}
          {Math.min(currentPage * entityItemsPerPage, searchResults.length)} of{" "}
          {searchResults.length} entries
        </div>
        <ul className="pagination mb-0">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>

          {startPage > 1 && (
            <>
              <li className="page-item">
                <button className="page-link" onClick={() => onPageChange(1)}>
                  1
                </button>
              </li>
              {startPage > 2 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
            </>
          )}

          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(number)}
              >
                {number}
              </button>
            </li>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => onPageChange(totalPages)}
                >
                  {totalPages}
                </button>
              </li>
            </>
          )}

          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    );
  };

  // Update the ManagerModal component
  const ManagerModal = ({ onClose }) => (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between align-items-center">
            <h5 className="modal-title">Select Manager</h5>
            <div className="d-flex gap-2 align-items-center">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={loadEmployees}
                title="Refresh"
              >
                <BiRefresh />
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClose}
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
                      <th>Actions</th>
                      <th>ID</th>
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
                      <th>Department</th>
                      <th>Street Address 1</th>
                      <th>Street Address 2</th>
                      <th>City</th>
                      <th>Zip/Postal Code</th>
                      <th>State/Province</th>
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
                            onClick={() => handleManagerSelect(employee)}
                          >
                            Select
                          </button>
                        </td>
                        <td>{employee._id}</td>
                        <td>{employee.employeeID}</td>
                        <td>{employee.firstName || "-"}</td>
                        <td>{employee.lastName || "-"}</td>
                        <td>{employee.preferredName || "-"}</td>
                        <td>{employee.title || "-"}</td>
                        <td>{employee.workEmailAddress || "-"}</td>
                        <td>{employee.workPhone || "-"}</td>
                        <td>{employee.workMobilePhone || "-"}</td>
                        <td>{employee.fax || "-"}</td>
                        <td>
                          {employee.manager
                            ? `${employee.manager.firstName} ${employee.manager.lastName}`
                            : employee.manager || "-"}
                        </td>
                        <td>{employee.departmentNames?.join(", ") || "-"}</td>
                        <td>{employee.streetAddress1 || "-"}</td>
                        <td>{employee.streetAddress2 || "-"}</td>
                        <td>{employee.city || "-"}</td>
                        <td>{employee.zipPostalCode || "-"}</td>
                        <td>{employee.stateProvince || "-"}</td>
                        <td>{employee.country || "-"}</td>
                        <td>{employee.homePhoneNumber || "-"}</td>
                        <td>{employee.personalMobilePhone || "-"}</td>
                        <td>{employee.personalEmailAddress || "-"}</td>
                        <td>
                          <span
                            className={`badge ${
                              employee.employeeStatus === "Active"
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {employee.employeeStatus || "-"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <EntityPagination
                  currentPage={entityPage}
                  totalPages={Math.ceil(employees.length / entityItemsPerPage)}
                  onPageChange={setEntityPage}
                />
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Update the fetchLocations function
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

      // Check if response has data
      if (response.data) {
        console.log("Fetched locations:", response.data);
        // Set the locations directly from the data array
        setLocations(response.data);
      } else {
        console.error("No locations data in response");
        setLocations([]);
        Toastify({
          text: "No locations found",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "#ffc107",
            color: "#000",
          },
        }).showToast();
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      setLocations([]);
      Toastify({
        text: error.response?.data?.message || "Error fetching locations",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "#ff0000",
          color: "#fff",
        },
      }).showToast();
    } finally {
      setLocationLoading(false);
    }
  };

  // Add this useEffect to fetch locations when the modal opens
  useEffect(() => {
    if (showLocationModal) {
      fetchLocations();
    }
  }, [showLocationModal]);

  // Add location selection handler
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

  // Add bulk location selection handler
  const handleBulkLocationSelection = (e) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      const newLocations = locations
        .filter(
          (location) =>
            !selectedLocations.some((selected) => selected._id === location._id)
        )
        .map((location) => ({
          _id: location._id,
          locationName: location.locationName,
          locationType: location.locationType,
          locationId: location.locationId,
        }));

      setSelectedLocations((prev) => [...prev, ...newLocations]);
    } else {
      setSelectedLocations([]);
    }
  };

  // Add clear all locations handler
  const handleClearAllLocations = () => {
    setSelectedLocations([]);
  };

  // Add this function to handle location search
  const handleLocationSearch = () => {
    setShowLocationModal(true);
    fetchLocations();
  };

  // Add this useEffect to monitor selectedEmployees changes
  useEffect(() => {
    console.log("Selected Employees updated:", selectedEmployees);
  }, [selectedEmployees]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Edit Employee | TRST</title>
        <meta name="description" content="Edit employee details" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Employees: Edit Employee</div>
            <div className="d-flex align-items-center justify-content-end">
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => navigate("/employees")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Save Employee
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
                    <HiMiniWrench style={{ width: "16px", height: "16px" }} />
                  </button>
                  <ul
                    className={`right-auto dropdown-menu  ${
                      isToolOpen ? "show" : ""
                    }`}
                    aria-labelledby="TollFropdown"
                  >
                    {/* <li><a className="dropdown-item" href="#"><BiSolidEdit style={{ width: "15px", height: "15px" }} /> Design this page</a></li>
                                        <li><a className="dropdown-item" href="#"><FcSettings style={{ width: "15px", height: "15px" }} /> Object Definition</a></li>
                                        <li><a className="dropdown-item" href="#"><LuTableOfContents style={{ width: "15px", height: "15px" }} /> Tab Definition</a></li>
                                        <div className="border-1"></div> */}
                    <li>
                      <a className="dropdown-item" href="#">
                        <FaPrint style={{ width: "15px", height: "15px" }} />{" "}
                        Print
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <FaRegFilePdf
                          style={{ width: "15px", height: "15px" }}
                        />{" "}
                        PDF
                      </a>
                    </li>
                    <div className="border-1"></div>
                    <li>
                      <a className="dropdown-item" href="#">
                        <LuClock9 style={{ width: "15px", height: "15px" }} />{" "}
                        Page Load Time
                      </a>
                    </li>
                  </ul>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="form-content">
          <div className="form-heading">Work Contact Information</div>
          <div className="border-1"></div>
          <Form onSubmit={handleSubmit}>
            <div className="row pt-4">
              <div className="col-6">
                {[
                  { label: "Employee ID", name: "employeeID" },
                  { label: "First Name", name: "firstName" },
                  { label: "Middle Name", name: "middleName" },
                  { label: "Last Name", name: "lastName" },
                  { label: "Preferred Name", name: "preferredName" },
                  { label: "Title", name: "title" },
                ].map((field, index) => (
                  <div className="mb-3 d-flex align-items-center" key={index}>
                    <Label
                      htmlFor={field.name}
                      className="form-label me-2 fs-15 w-40"
                    >
                      {field.label}
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      className="form-control"
                      type="text"
                      value={employeeData[field.name] || ""}
                      onChange={handleChange}
                    />
                  </div>
                ))}
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="timezone"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Time Zone
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
              </div>
              <div className="col-6">
                {contactFields.map((field, index) => (
                  <div className="mb-3 d-flex align-items-center" key={index}>
                    <Label
                      htmlFor={field.name}
                      className="form-label me-2 fs-15 w-40"
                    >
                      {field.label}
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      className="form-control"
                      type={field.type}
                      value={employeeData[field.name] || ""}
                      onChange={handleChange}
                    />
                  </div>
                ))}
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="manager"
                    className="form-label fs-15 w-29 me-4"
                  >
                    Manager
                  </Label>
                  <div className="position-relative flex-grow-1">
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
                      {selectedManager ? (
                        <span
                          className="badge bg-light text-dark d-flex align-items-center"
                          style={{
                            padding: "5px 10px",
                            margin: "2px",
                            border: "1px solid #ddd",
                            borderRadius: "3px",
                          }}
                        >
                          {`${selectedManager.firstName} ${selectedManager.lastName}`}
                          <button
                            type="button"
                            className="btn-close ms-2"
                            style={{
                              fontSize: "0.5rem",
                              padding: "0.25rem",
                              opacity: "0.5",
                            }}
                            onClick={() => {
                              setSelectedManager(null);
                              setEmployeeData((prev) => ({
                                ...prev,
                                manager: "",
                              }));
                            }}
                            title="Remove"
                          ></button>
                        </span>
                      ) : (
                        <span
                          className="text-muted"
                          style={{ fontSize: "0.875rem" }}
                        >
                          No manager selected
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary border-radius-2 ms-2"
                    onClick={() => {
                      setShowManagerModal(true);
                      loadEmployees();
                    }}
                  >
                    <BiSearchAlt2 />
                  </button>
                </div>

                <div className="mb-3 d-flex align-items-center position-relative">
                  <Label
                    htmlFor="subordinates"
                    className="form-label fs-15 w-29 me-4"
                  >
                    Subordinates
                  </Label>
                  <div className="flex-grow-1">
                    <div
                      className="form-control1 d-flex flex-wrap gap-2"
                      style={{
                        minHeight: "38px",
                        border: "1px solid #ced4da",
                        borderRadius: "4px",
                        padding: "6px 12px",
                        backgroundColor: "#fff",
                        position: "relative",
                      }}
                    >
                      {employeeData.subordinates.map((subordinate, index) => (
                        <span
                          key={index}
                          className="badge bg-light text-dark d-flex align-items-center"
                          style={{
                            padding: "5px 10px",
                            margin: "2px",
                            border: "1px solid #ddd",
                            borderRadius: "3px",
                          }}
                        >
                          {`${subordinate.firstName} ${subordinate.lastName}`}
                          <button
                            type="button"
                            className="btn-close ms-2"
                            style={{ fontSize: "0.5rem" }}
                            onClick={() => {
                              setEmployeeData((prev) => ({
                                ...prev,
                                subordinates: prev.subordinates.filter(
                                  (sub) => sub._id !== subordinate._id
                                ),
                              }));
                            }}
                          />
                        </span>
                      ))}
                      {employeeData.subordinates.length === 0 && (
                        <span className="text-muted">
                          No subordinates selected
                        </span>
                      )}
                      {employeeData.subordinates.length > 0 && (
                        <button
                          type="button"
                          className="btn btn-link text-danger position-absolute"
                          onClick={handleClearAllSubordinates}
                          style={{
                            right: "8px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            padding: "0",
                            fontSize: "0.8rem",
                          }}
                        >
                          <RxCross2 />
                        </button>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary border-radius-2 ms-2"
                    onClick={() => {
                      setShowEmployeesModal(true);
                      loadEmployees();
                    }}
                  >
                    <BiSearchAlt2 />
                  </button>
                </div>

                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="employeeStatus"
                    className="form-label me-2 fs-15 w-40"
                  >
                    Employee Status
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
              </div>
            </div>
          </Form>
        </div>

        <div className="form-content">
          <div className="form-heading">Organization</div>
          <div className="border-1"></div>
          <Form>
            <div className="row pt-4">
              <div className="col-6">
                <div className="mb-3 d-flex align-items-center position-relative">
                  <Label
                    htmlFor="locations"
                    className="form-label fs-15 w-29 me-4"
                  >
                    Locations
                  </Label>
                  <div className="flex-grow-1">
                    <div
                      className="form-control1 d-flex flex-wrap gap-2"
                      style={{
                        minHeight: "38px",
                        border: "1px solid #ced4da",
                        borderRadius: "4px",
                        padding: "6px 12px",
                        backgroundColor: "#fff",
                        position: "relative",
                      }}
                    >
                      {selectedLocations.map((location, index) => (
                        <span
                          key={index}
                          className="badge bg-light text-dark d-flex align-items-center"
                          style={{
                            padding: "5px 10px",
                            margin: "2px",
                            border: "1px solid #ddd",
                            borderRadius: "3px",
                          }}
                        >
                          {location.locationName}
                          <button
                            type="button"
                            className="btn-close ms-2"
                            style={{ fontSize: "0.5rem" }}
                            onClick={() => {
                              setSelectedLocations((prev) =>
                                prev.filter((loc) => loc._id !== location._id)
                              );
                            }}
                          />
                        </span>
                      ))}
                      {selectedLocations.length === 0 && (
                        <span className="text-muted">
                          No locations selected
                        </span>
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
                            fontSize: "0.8rem",
                          }}
                        >
                          <RxCross2 />
                        </button>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => setShowLocationModal(true)}
                  >
                    <BiSearchAlt2 />
                  </button>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3 d-flex align-items-center position-relative">
                  <Label
                    htmlFor="department"
                    className="form-label fs-15 w-29 me-4"
                  >
                    Department
                  </Label>
                  <div className="d-flex position-relative flex-grow-1">
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
                        marginRight: "8px", // Add margin to separate from search button
                      }}
                    >
                      {selectedEntities.length > 0 ? (
                        <>
                          {selectedEntities.map((entity, index) => (
                            <span
                              key={index}
                              className="badge bg-light text-dark d-flex align-items-center"
                              style={{
                                padding: "5px 10px",
                                margin: "2px",
                                border: "1px solid #ddd",
                                borderRadius: "3px",
                                backgroundColor: "#f8f9fa",
                              }}
                            >
                              {entity.businessEntity}
                              <button
                                type="button"
                                className="btn-close ms-2"
                                style={{
                                  fontSize: "0.5rem",
                                  padding: "0.25rem",
                                  opacity: "0.5",
                                }}
                                onClick={() => {
                                  setSelectedEntities((prev) =>
                                    prev.filter((e) => e._id !== entity._id)
                                  );
                                }}
                                title="Remove"
                              />
                            </span>
                          ))}
                          {selectedEntities.length > 0 && (
                            <button
                              type="button"
                              className="btn btn-link text-danger position-absolute"
                              onClick={handleClearAllEntities}
                              style={{
                                right: "8px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                padding: "0",
                                fontSize: "0.8rem",
                              }}
                            >
                              <RxCross2 />
                            </button>
                          )}
                        </>
                      ) : (
                        <span
                          className="text-muted"
                          style={{ fontSize: "0.875rem" }}
                        >
                          No departments selected
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary border-radius-2"
                      onClick={handleDepartmentSearch}
                      style={{ minWidth: "38px" }} // Ensure consistent button width
                    >
                      <BiSearchAlt2 />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>

        <div className="form-content">
          <div className="form-heading">Personal Contact Information</div>
          <div className="border-1"></div>
          <Form>
            <div className="row pt-4">
              <div className="col-6">
                {[
                  { label: "Street Address 1", name: "streetAddress1" },
                  { label: "Street Address 2", name: "streetAddress2" },
                  { label: "City", name: "city" },
                  { label: "ZIP/Postal Code", name: "zipPostalCode" },
                ].map((field, index) => (
                  <div className="mb-3 d-flex align-items-center" key={index}>
                    <Label
                      htmlFor={field.name}
                      className="form-label me-2 fs-15 w-40"
                    >
                      {field.label}
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      className="form-control"
                      type="text"
                      value={employeeData[field.name] || ""}
                      onChange={handleChange}
                    />
                  </div>
                ))}
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="stateProvince"
                    className="form-label fs-15 w-29 me-4"
                  >
                    State/Province
                  </Label>
                  <div className="dropdown-container position-relative flex-grow-1">
                    <button
                      onClick={toggleStateDropdown}
                      className="form-control text-start d-flex justify-content-between align-items-center"
                      type="button"
                    >
                      <span>{selectedState}</span>
                      <IoMdArrowDropdown />
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
                <div className="mb-3 d-flex align-items-center">
                  <Label
                    htmlFor="country"
                    className="form-label fs-15 w-29 me-4"
                  >
                    Country
                  </Label>
                  <div className="dropdown-container position-relative flex-grow-1">
                    <button
                      onClick={toggleCountryDropdown}
                      className="form-control text-start d-flex justify-content-between align-items-center"
                      type="button"
                    >
                      <span>{selectedCountry}</span>
                      <IoMdArrowDropdown />
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

              <div className="col-6">
                {[
                  {
                    label: "Home Phone Number",
                    name: "homePhoneNumber",
                    type: "tel",
                  },
                  {
                    label: "Personal Mobile Phone",
                    name: "personalMobilePhone",
                    type: "tel",
                  },
                  {
                    label: "Personal Email Address",
                    name: "personalEmailAddress",
                    type: "email",
                  },
                ].map((field, index) => (
                  <div className="mb-3 d-flex align-items-center" key={index}>
                    <Label
                      htmlFor={field.name}
                      className="form-label me-2 fs-15 w-40"
                    >
                      {field.label}
                    </Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      className="form-control"
                      type={field.type}
                      value={employeeData[field.name] || ""}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Form>
        </div>
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
                    onClick={fetchBusinessEntities}
                    title="Refresh"
                  >
                    <BiRefresh />
                  </button>
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
                  <LoadingSpinner />
                ) : (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>
                            <input
                              type="checkbox"
                              onChange={handleBulkEntitySelection}
                              checked={
                                currentEntities.length > 0 &&
                                currentEntities.every((entity) =>
                                  selectedEntities.some(
                                    (selected) => selected._id === entity._id
                                  )
                                )
                              }
                            />
                          </th>
                          <th>Actions</th>
                          <th>ID</th>
                          <th>Business Entity</th>
                          <th>Business Entity Type</th>
                          <th>Related Locations</th>
                          <th>Parent Business Entity</th>
                          <th>Child Business Entities</th>
                          <th>Updated At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentEntities.map((entity) => (
                          <tr key={entity._id}>
                            <td>
                              <input
                                type="checkbox"
                                checked={selectedEntities.some(
                                  (selected) => selected._id === entity._id
                                )}
                                onChange={() => handleEntitySelect(entity)}
                              />
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => {
                                  handleEntitySelect(entity);
                                  setShowModal(false);
                                }}
                              >
                                Select
                              </button>
                            </td>
                            <td>{entity._id}</td>
                            <td>{entity.businessEntity}</td>
                            <td>{entity.businessEntityType}</td>
                            <td>
                              {entity.relatedLocations
                                .map((location) => location.locationName)
                                .join(", ") || ""}
                            </td>
                            <td>
                              {entity.parentBusinessEntity?.businessEntity ||
                                "-"}
                            </td>
                            <td>
                              {entity.childBusinessEntities
                                ?.map((c) => c.businessEntity)
                                .join(", ") || "-"}
                            </td>
                            <td>
                              {new Date(entity.updatedAt).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <EntityPagination
                      currentPage={entityPage}
                      totalPages={Math.ceil(
                        searchResults.length / entityItemsPerPage
                      )}
                      onPageChange={setEntityPage}
                    />
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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowModal(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEmployeeModal && selectedEmployee && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between align-items-center">
                <h5 className="modal-title">Employee Details</h5>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowEmployeeModal(false)}
                  title="Close"
                >
                  <RxCross2 />
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Employee ID:</strong> {selectedEmployee.employeeID}
                </p>
                <p>
                  <strong>Name:</strong> {selectedEmployee.firstName}{" "}
                  {selectedEmployee.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {selectedEmployee.workEmailAddress}
                </p>
                <p>
                  <strong>Title:</strong> {selectedEmployee.title}
                </p>
                <p>
                  <strong>Status:</strong> {selectedEmployee.employeeStatus}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEmployeesModal && (
        <EmployeesModal
          onClose={() => setShowEmployeesModal(false)}
          employees={employees}
          onSelect={handleSubordinateSelect}
        />
      )}
      {showManagerModal && (
        <ManagerModal onClose={() => setShowManagerModal(false)} />
      )}
      {showLocationModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between align-items-center">
                <h5 className="modal-title">Select Location</h5>
                <div className="d-flex gap-2 align-items-center">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={fetchLocations}
                    title="Refresh"
                  >
                    <BiRefresh />
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
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
                                locations.every((location) =>
                                  selectedLocations.some(
                                    (selected) => selected._id === location._id
                                  )
                                )
                              }
                            />
                          </th>
                          <th>Actions</th>
                          <th>ID</th>
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
                            <td>
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => {
                                  handleLocationSelect(location);
                                  setShowLocationModal(false);
                                }}
                              >
                                Select
                              </button>
                            </td>
                            <td>{location._id}</td>
                            <td>{location.locationId}</td>
                            <td>{location.locationName}</td>
                            <td>{location.locationType}</td>
                            <td>{location.mainPhone || "-"}</td>
                            <td>{location.capacity || "-"}</td>
                            <td>{location.capacityUsed || "0"}</td>
                            <td>{location.siteOwnership || "-"}</td>
                            <td>
                              {location.accessSafetySecurityEquipment || "-"}
                            </td>
                            <td>{location.streetAddress1 || "-"}</td>
                            <td>{location.streetAddress2 || "-"}</td>
                            <td>{location.city || "-"}</td>
                            <td>{location.stateProvince || "-"}</td>
                            <td>{location.zipPostalCode || "-"}</td>
                            <td>{location.country || "-"}</td>
                            <td>
                              {location.parentLocation?.locationName || "-"}
                            </td>
                            <td>
                              {location.childLocations
                                ?.map((child) => child.locationName)
                                .join(", ") || "-"}
                            </td>
                            <td>
                              {location.businessEntities
                                ?.map((entity) => entity.businessEntity)
                                .join(", ") || "-"}
                            </td>
                            <td>{location.latitude || "-"}</td>
                            <td>{location.longitude || "-"}</td>
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
                    <EntityPagination
                      currentPage={entityPage}
                      totalPages={Math.ceil(
                        locations.length / entityItemsPerPage
                      )}
                      onPageChange={setEntityPage}
                    />
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowLocationModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowLocationModal(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default EditEmployee;
