import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaCheck, FaPrint, FaRegFilePdf } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { LuTableOfContents, LuClock9 } from "react-icons/lu";
// import "./Clients.css";
import {
  Input,
  Label,
  Form,
} from "reactstrap";
import axios from "axios";
import Toastify from "toastify-js";

function EditClient() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isTimeZoneOpen, setIsTimeZoneOpen] = useState(false); // Time Zone dropdown
  const [isStatusOpen, setIsStatusOpen] = useState(false); // Employee Status dropdown
  const [isStateOpen, setIsStateOpen] = useState(false); // Add missing state toggle
  const [isCountryOpen, setIsCountryOpen] = useState(false); // Add missing state toggle
  const [selectedState, setSelectedState] = useState("-- Please select --");
  const [selectedCountry, setSelectedCountry] = useState("-- Please select --");
  const [isHostelOpen, setIsHostelOpen] = useState(false); // Employee Status dropdown

  const [selectedStatus, setSelectedStatus] = useState("-- Please select --");
  const statusOptions = ["-- Please select --", "No", "Yes"];

  const [selectedHostel, setSelectedHostel] = useState("-- Please select --");
  const hostelOptions = ["-- Please select --", "No", "No"];
  const toggleStatusDropdown = () => setIsStatusOpen((prev) => !prev);
  const toggleHostelDropdown = () => setIsHostelOpen((prev) => !prev);
  const toggleStateDropdown = () => setIsStateOpen((prev) => !prev);
  const toggleCountryDropdown = () => setIsCountryOpen((prev) => !prev);
  const toggleToolDropDown = () => setIsToolOpen(!isToolOpen);
  const handleSelectStatus = (option) => {
    setSelectedStatus(option);
    setIsStatusOpen(false);
  };
  const handleSelecthostel = (option) => {
    setSelectedHostel(option);
    setIsHostelOpen(false);
  };
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
  const handleSelectState = (option) => {
    setSelectedState(option);
    setIsStateOpen(false);
    setFormData(prev => ({
      ...prev,
      stateProvince: option === "-- Please select --" ? "" : option
    }));
  };
  const handleSelectCountry = (option) => {
    setSelectedCountry(option);
    setIsCountryOpen(false);
    setFormData(prev => ({
      ...prev,
      country: option === "-- Please select --" ? "" : option
    }));
  };

  const [formData, setFormData] = useState({
    company: "",
    website: "",
    mainPhone: "",
    fax: "",
    address1: "",
    address2: "",
    city: "",
    stateProvince: "",
    country: "",
    zipCode: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/clients/${id}`,
          {
            withCredentials: true
          }
        );

        const clientData = response.data;
        
        setFormData({
          company: clientData.company || "",
          website: clientData.website || "",
          mainPhone: clientData.mainPhone || "",
          fax: clientData.fax || "",
          address1: clientData.address1 || "",
          address2: clientData.address2 || "",
          city: clientData.city || "",
          stateProvince: clientData.stateProvince || "",
          country: clientData.country || "",
          zipCode: clientData.zipCode || ""
        });

        setSelectedState(clientData.stateProvince || "-- Please select --");
        setSelectedCountry(clientData.country || "-- Please select --");

      } catch (error) {
        console.error("Error fetching client:", error);
        alert(error.response?.data?.message || "Error fetching client details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchClient();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      if (!formData.company) {
        alert("Company name is required");
        return;
      }
      
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/v1/clients/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      );

      Toastify({
        text: "Client updated successfully!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "#28a745",
        },
      }).showToast();
      navigate("/clients");
    } catch (error) {
      console.error("Error updating client:", error);
      if (error.response) {
        alert(error.response.data.message || "Error updating client");
      } else {
        alert("Network error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Edit Client | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Client: Edit Client</div>
            <div className="d-flex align-items-center justify-content-end">
              <div>
              <button
                  className="btn btn-secondary me-2"
                  onClick={() => navigate("/clients")}
                  title="Cancel"
                >
                  <RxCross2
                    className="me-1"
                    style={{ width: "15px", height: "15px" }}
                  />
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  disabled={loading}
                  title="Update Client"
                >
                  <FaCheck
                    className="me-1"
                    style={{ width: "15px", height: "15px" }}
                  />
                  {loading ? "Saving..." : "Update"}
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
          <div className="form-heading">Client Information </div>
          <div className="border-1"></div>
          <Form>
            <div className="row pt-4">
              <div className="col-6">
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="company" className="form-label me-2 fs-15 w-40">
                    Company<span className="text-danger">*</span>
                  </Label>
                  <Input
                    name="company"
                    className="form-control"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="website" className="form-label me-2 fs-15 w-40">
                    Website
                  </Label>
                  <Input
                    name="website"
                    className="form-control"
                    type="text"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="mainPhone" className="form-label me-2 fs-15 w-40">
                    Main Phone
                  </Label>
                  <Input
                    name="mainPhone"
                    className="form-control"
                    type="text"
                    value={formData.mainPhone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="fax" className="form-label me-2 fs-15 w-40">
                    Fax
                  </Label>
                  <Input
                    name="fax"
                    className="form-control"
                    type="text"
                    value={formData.fax}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </Form>
        </div>
        <div className="form-content">
          <div className="form-heading">Address Details</div>
          <div className="border-1"></div>
          <Form>
            <div className="row pt-4">
              <div className="col-6">
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="address1" className="form-label me-2 fs-15 w-40">
                    Address 1
                  </Label>
                  <Input
                    name="address1"
                    className="form-control"
                    type="text"
                    value={formData.address1}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="address2" className="form-label me-2 fs-15 w-40">
                    Address 2
                  </Label>
                  <Input
                    name="address2"
                    className="form-control"
                    type="text"
                    value={formData.address2}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="city" className="form-label me-2 fs-15 w-40">
                    City
                  </Label>
                  <Input
                    name="city"
                    className="form-control"
                    type="text"
                    value={formData.city}
                    onChange={handleInputChange}
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
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="zipCode" className="form-label me-2 fs-15 w-40">
                    Zip Code
                  </Label>
                  <Input
                    name="zipCode"
                    className="form-control"
                    type="text"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EditClient;
