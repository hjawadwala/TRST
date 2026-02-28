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
import { IoIosSearch } from "react-icons/io";
import { FaCircleQuestion } from "react-icons/fa6";
import "./Vendors.css";
import { BiSearchAlt2 } from "react-icons/bi";
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
  FormFeedback,
  Alert,
  Spinner,
} from "reactstrap";
import { TiPlus } from "react-icons/ti";
import axios from 'axios'; // Import Axios

function NewVendor() {
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("-- Please select --");
  const [selectedCountry, setSelectedCountry] = useState("-- Please select --");
  const [selectedStatus, setSelectedStatus] = useState("-- Please select --");
  const [vendor, setVendor] = useState("");
  const [mainPhone, setMainPhone] = useState("");
  const [faxNumber, setFaxNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [vendorManagementContacts, setVendorManagementContacts] = useState("");
  const [serviceTypes, setServiceTypes] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const statusOptions = ["-- Please select --", "Critical", "High", "Medium", "Low", "Not Applicable"];
  const stateOptions = [
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
  const countryOptions = [
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

  const toggleStatusDropdown = () => setIsStatusOpen((prev) => !prev);
  const toggleStateDropdown = () => setIsStateOpen((prev) => !prev);
  const toggleCountryDropdown = () => setIsCountryOpen((prev) => !prev);
  const toggleToolDropDown = () => setIsToolOpen(!isToolOpen);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vendorData = {
      vendor,
      mainPhone,
      faxNumber,
      website,
      criticality: selectedStatus,
      vendorManagementContacts,
      serviceTypes,
      address1,
      address2,
      stateProvince: selectedState,
      country: selectedCountry,
      notes,
    };

    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/vendors/create`, vendorData);
      setSuccessMessage('Vendor created successfully!');
      setError('');
      console.log('Vendor created successfully:', response.data);
      resetForm();
    } catch (error) {
      console.error('Error creating vendor:', error.response || error.message);
      setError('Error creating vendor. Please try again.');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setVendor('');
    setMainPhone('');
    setFaxNumber('');
    setWebsite('');
    setSelectedStatus('-- Please select --');
    setVendorManagementContacts('');
    setServiceTypes('');
    setAddress1('');
    setAddress2('');
    setSelectedState('-- Please select --');
    setSelectedCountry('-- Please select --');
    setNotes('');
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>New Vendor Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Vendor: New Vendor</div>
            <div className="d-flex align-items-center justify-content-end">
              <div>
                <NavLink className="button3 border-1 button3-changes me-1" to="#" title="Cancel">
                  <RxCross2 className="me-1" style={{ width: "15px", height: "15px" }} />
                  Cancel
                </NavLink>
                <NavLink className="button3 border-1 button3-changes me-1" to="#" title="Save & New">
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
          <div className="form-heading">Vendor Information</div>
          <div className="border-1"></div>
          <Form onSubmit={handleSubmit}>
            {successMessage && <Alert color="success" timeout={3000}>{successMessage}</Alert>}
            {error && <Alert color="danger" timeout={3000}>{error}</Alert>}
            <div className="row pt-4">
              <div className="col-6">
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="vendor" className="form-label me-2 fs-15 w-40">Vendor<span className="text-danger">*</span></Label>
                  <Input
                    name="vendor"
                    className="form-control"
                    type="text"
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="mainPhone" className="form-label me-2 fs-15 w-40">Main Phone</Label>
                  <Input
                    name="mainPhone"
                    className="form-control"
                    type="text"
                    value={mainPhone}
                    onChange={(e) => setMainPhone(e.target.value)}
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="faxNumber" className="form-label me-2 fs-15 w-40">Fax Number</Label>
                  <Input
                    name="faxNumber"
                    className="form-control"
                    type="text"
                    value={faxNumber}
                    onChange={(e) => setFaxNumber(e.target.value)}
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="website" className="form-label me-2 fs-15 w-40">Website</Label>
                  <Input
                    name="website"
                    className="form-control"
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="criticality" className="form-label me-2 fs-15 w-40">Criticality</Label>
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
                <div className="mb-3 d-flex">
                  <label htmlFor="vendorManagementContacts" className="form-label fs-15 w-20 me-2 d-flex justify-content-between align-items-center">
                    Vendor Management Contact(s)
                    <FaCircleQuestion className="me-2 hw-20" />
                  </label>
                  <Input
                    name="vendorManagementContacts"
                    className="form-control"
                    type="text"
                    value={vendorManagementContacts}
                    onChange={(e) => setVendorManagementContacts(e.target.value)}
                  />
                </div>
                <div className="mb-3 d-flex">
                  <label htmlFor="serviceTypes" className="form-label fs-15 w-20 me-2 d-flex justify-content-between align-items-center">
                    Service Types
                    <FaCircleQuestion className="me-2 hw-20" />
                  </label>
                  <Input
                    name="serviceTypes"
                    className="form-control"
                    type="text"
                    value={serviceTypes}
                    onChange={(e) => setServiceTypes(e.target.value)}
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
                  <Label htmlFor="address1" className="form-label me-2 fs-15 w-40">Address 1</Label>
                  <Input
                    name="address1"
                    className="form-control"
                    type="text"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="address2" className="form-label me-2 fs-15 w-40">Address 2</Label>
                  <Input
                    name="address2"
                    className="form-control"
                    type="text"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="city" className="form-label me-2 fs-15 w-40">City</Label>
                  <Input
                    name="city"
                    className="form-control"
                    type="text"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="State/Province" className="form-label me-2 fs-15 w-40">State/Province</Label>
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
                      <div className="position-absolute w-100 mt-1 bg-white border rounded dropdown-menu1" style={{ zIndex: 1000 }}>
                        {stateOptions.map((option, index) => (
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
                  <Label htmlFor="zipCode" className="form-label me-2 fs-15 w-40">Zip Code</Label>
                  <Input
                    name="zipCode"
                    className="form-control"
                    type="text"
                  />
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <Label htmlFor="Country" className="form-label me-2 fs-15 w-40">Country</Label>
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
                      <div className="position-absolute w-100 mt-1 bg-white border rounded dropdown-menu1" style={{ zIndex: 1000 }}>
                        {countryOptions.map((option, index) => (
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
          <div className="form-heading">Notes</div>
          <div className="border-1"></div>
          <Form>
            <div className="row pt-4">
              <div className="col-12">
                <Label htmlFor="notes" className="form-label me-2 fs-15 w-40">Notes</Label>
                <Input
                  name="notes"
                  className="form-control"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NewVendor;