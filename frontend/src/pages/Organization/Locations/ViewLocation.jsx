
import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { HiMiniWrench } from "react-icons/hi2";
import { BiExport, BiSolidEdit } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import {
  IoMdArrowDropdown,
  IoMdArrowDropright,
  IoMdAttach,
  IoMdArrowRoundBack,
  IoMdArrowRoundForward,
} from "react-icons/io";
import { SiConvertio, SiRclone } from "react-icons/si";
import { LuRefreshCw, LuTableOfContents, LuClock9 } from "react-icons/lu";
import {
  FaPrint,
  FaPencil,
  FaRegTrashCan,
  FaTableColumns,
} from "react-icons/fa6";
import { FaRegFilePdf, FaTag, FaFilter, FaSearch } from "react-icons/fa";
import { MdMessage, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { TiPlus, TiArrowBack } from "react-icons/ti";
import { ImCopy } from "react-icons/im";
import { HiDotsHorizontal, HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiMenuAlt } from "react-icons/tfi";
import { GrDetach } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import RelatedBusinessEntity from "./relatedBusinessEntity";

import { Tabs, Tab } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
function ViewLocation() {








  const { id } = useParams(); // Get ID from the URL
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      console.error("No ID provided, skipping API call.");
      return;
    }
  
    console.log(`Fetching data for location ID: ${id}`);
  
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/locations/${id}`)
      .then((response) => {
        console.log("API Response Data:", response.data);
        setApiData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [id]);
  
  const [key, setKey] = useState("Location Info");
  const [isOpen, setIsOpen] = useState(false);
  const [isVendorOpen, setIsVendorOpen] = useState(false);
  const toggleVendorDropDown = () => {
    setIsVendorOpen(!isVendorOpen);
  };  
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [isExerciseOpen, setIsExerciseOpen] = useState(false);
  const toggleExerciseDropdown = () => {
    setIsExerciseOpen(!isExerciseOpen);
  };
  const [isIncidentOpen, setIsIncidentOpen] = useState(false);
  const toggleIncidentDropdown = () => {
    setIsIncidentOpen(!isIncidentOpen);
  };

  const toggleExerciseColumnDropDown = () => {
    setIsExerciseOpen(!isExerciseOpen);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false); // More descriptive name

  const toggleMenu = () => {
    // More descriptive name
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleToolDropDown = () => {
    setIsToolOpen(!isToolOpen);
  };
  const ColumnDropDown = () => {
    setIsColumnOpen(!isColumnOpen);
  };

  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const togglePlanDropDown = () => {
    setIsPlanOpen(!isPlanOpen);
  };

  const [isPlanColumnOpen, setIsPlanColumnOpen] = useState(false);
  const togglePlanColumnDropDown = () => {
    setIsPlanColumnOpen(!isPlanColumnOpen);
  };

  const [isHardwareOpen, setIsHardwareOpen] = useState(false);
  const toggleHardwareDropDown = () => {
    setIsHardwareOpen(!isHardwareOpen);
  };
  const [isHardwareColumnOpen, setIsHardwareColumnOpen] = useState(false);
  const toggleHardwareColumnDropDown = () => {
    setIsHardwareColumnOpen(!isHardwareColumnOpen);
  };
  const [isVendorColumnOpen, setIsVendorColumnOpen] = useState(false);
  const toggleVendorColumnDropDown = () => {
    setIsVendorColumnOpen(!isVendorColumnOpen);
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>Location Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex mb-3">
            <div className="header-text pe-2">Location :</div>
            <div className="header-text">Head Office</div>
          </div>
          <div className="d-flex justify-content-end">
            <div className="button5 me-1">
              <TiArrowBack />
            </div>
            <div className="button5">
              <IoMdArrowRoundBack />
            </div>
            <div className="button5 me-1">
              <IoMdArrowRoundForward />
            </div>
            <div className="button4 me-1">
              <FaPencil />
            </div>

            <div
              className="map-action k-widget k-button-group order-1"
              id="map-action-toggle"
              data-role="buttongroup"
              role="group"
            >
              <span className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded={isMenuOpen}
                  onClick={toggleMenu}
                >
                  <HiOutlineDotsHorizontal className="wh-16" />{" "}
                </button>
                <ul
                  className={`right-auto dropdown-menu ${
                    isMenuOpen ? "show" : ""
                  }`}
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      <RiDeleteBin6Line className="hw-15 mr-5px" />
                      Delete
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <FaTag className="hw-15 mr-5px" />
                      Tag
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <SiConvertio className="hw-15 mr-5px" />
                      Convert
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <SiRclone className="hw-15 mr-5px" />
                      Clone
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <MdMessage className="hw-15 mr-5px" />
                      Send
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <FaSearch className="hw-15 mr-5px" />
                      Find Duplicates
                    </a>
                  </li>
                </ul>
              </span>
            </div>
            <div
              className="map-action k-widget k-button-group order-1"
              id="map-action-toggle"
              data-role="buttongroup"
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
                  <HiMiniWrench className="wh-16" />
                </button>
                <ul
                  className={`right-auto dropdown-menu ${
                    isToolOpen ? "show" : ""
                  }`}
                  aria-labelledby="TollFropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      <BiSolidEdit className="hw-15 mr-5px" />
                      Design this page
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <FcSettings className="hw-15 mr-5px" />
                      Object Definition
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <LuTableOfContents className="hw-15 mr-5px" />
                      tab Definition
                    </a>
                  </li>
                  <div className="border-1"></div>
                  <li>
                    <a className="dropdown-item" href="#">
                      <FaPrint className="hw-15 mr-5px" />
                      Print
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <FaRegFilePdf className="hw-15 mr-5px" />
                      PDF
                    </a>
                    <div className="border-1"></div>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <LuClock9 className="hw-15 mr-5px" />
                      Page Load Time
                    </a>
                  </li>
                </ul>
              </span>
            </div>
          </div>
        </div>
        <Tabs
          id="Location Info"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="Location Info" title="Location Info">
            <div className="container-fluid">
              <div className="form-content">
                <div className="form-heading">Location Information</div>{" "}
                <div className="border-1 mb-3"></div>
                <div className="row">
                  <div className="col-6">
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Location ID</div>
                      <div className="tab-title"></div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Location Name</div>
                      <div className="tab-title">
                        <a href="" className="text-blue">
                          Head Office
                        </a>
                      </div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Location Type</div>
                      <div className="tab-title">
                        <a href="" className="text-blue">
                          Corporate Office
                        </a>
                      </div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">
                        Access/Safety/Security Equipment
                      </div>
                      <div className="tab-title"></div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Main Phone</div>
                      <div className="tab-title"></div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Site Ownership</div>
                      <div className="tab-title"></div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Site Manager</div>
                      <div className="tab-title"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="form-content">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="form-heading">Address Details</div>
                  <div>
                    <button className="button border-1 ms-1">
                      <MdOutlineKeyboardArrowDown className="hw-20" />
                    </button>
                  </div>
                </div>
                <div className="border-1 mb-3"></div>
                <div className="row">
                  <div className="col-6">
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Street Address 1</div>
                      <div className="tab-title">PO Box 559</div>
                    </div>

                    <div className="d-flex pb-3">
                      <div className="tab-heading">Street Address 2</div>
                      <div className="tab-title"></div>
                    </div>

                    <div className="d-flex pb-3">
                      <div className="tab-heading">City</div>
                      <div className="tab-title">Doha</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex pb-3">
                      <div className="tab-heading">State/Province</div>
                      <div className="tab-title"></div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">ZIP/Postal Code</div>
                      <div className="tab-title"></div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Country</div>
                      <div className="tab-title">Qatar</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="form-content">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="form-heading">Capacity</div>
                  <div>
                    <button className="button border-1 ms-1">
                      <MdOutlineKeyboardArrowDown className="hw-20" />
                    </button>
                  </div>
                </div>
                <div className="border-1 mb-3"></div>
                <div className="row">
                  <div className="col-6">
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Capacity</div>
                      <div className="tab-title"></div>
                    </div>

                    <div className="d-flex pb-3">
                      <div className="tab-heading">Capacity Used (%)</div>
                      <div className="tab-title">0</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Employee Count</div>
                      <div className="tab-title">0</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="form-content">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="form-heading">Map</div>
                  <div>
                    <button className="button border-1 ms-1">
                      <MdOutlineKeyboardArrowDown className="hw-20" />
                    </button>
                  </div>
                </div>

                <div className="border-1 mb-3"></div>
              </div>
            </div>
          </Tab>
          <Tab eventKey="Employees" title="Employees">
            <div className="main-content2 pt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="header-title">People</span>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded={isOpen}
                      onClick={toggleDropdown}
                    >
                      All Active Employees
                      <IoMdArrowDropdown className="hw-20" />
                    </button>
                    <ul
                      className={`dropdown-menu ${isOpen ? "show" : ""}`}
                      aria-labelledby="dropdownMenuButton"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          <TiPlus className="mb-2px hw-15" />
                          Create New View
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <IoMdArrowDropright className="hw-20" />
                          All Active Employees
                          <BiSolidEdit className="hw-15 ml-20px" />
                          <FaTableColumns className="hw-15 ml-5px" />
                          <ImCopy className="hw-15 ml-5px" />
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Employees with Location
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Terminated Employees
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Portal Users
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Employee Contact Details
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Exercise Portal Users
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Notification Recipients
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Export Only
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          All Employees
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Data Migration
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button className="button border-1 ms-1">
                    <LuRefreshCw className="hw-18" />
                  </button>
                  <span className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                      type="button"
                      id="TollFropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded={isColumnOpen}
                      onClick={ColumnDropDown}
                    >
                      <FaTableColumns className="hw-14" />
                    </button>
                    <ul
                      className={`dropdown-menu ${isColumnOpen ? "show" : ""}`}
                      aria-labelledby="TollFropdown"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                        <span className="fw-bold">Columns</span>{" "}
                        <a className="blue">Reset</a>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Employee
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Title
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Employee ID
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Work Email Address
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Work Phone
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Work Mobile Phone
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Personal Mobile Phone
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Department
                        </label>
                      </li>
                    </ul>
                  </span>
                  <button className="button border-1 ms-1">
                    <FaFilter className="hw-15" />
                  </button>
                </div>
                <div>
                  <button
                    className="button border-1 ms-1"
                    title="Attach Employee"
                  >
                    <IoMdAttach className="hw-20" />
                  </button>
                  <button
                    className="button border-1 ms-1 me-1"
                    title="Detach Employee"
                  >
                    <GrDetach className="hw-20" />
                  </button>
                  <NavLink className="button1 border-1" to="/employee">
                    <TiPlus className="hw-20" />
                    Employee
                  </NavLink>
                  <button className="button border-1 ms-1">
                    <FaRegTrashCan className="hw-18" />
                  </button>
                  <button className="button border-1 ms-1">
                    <HiDotsHorizontal className="hw-20" />
                  </button>
                </div>
              </div>
              <div className="border-1 mt-2 mb-2"></div>
            </div>
          </Tab>
          <Tab eventKey="Business Entities" title="Business Entities">
  {apiData && apiData.location ? (
    <RelatedBusinessEntity locationId={apiData.location._id} data={apiData} />
  ) : (
    <p>Loading...</p>
  )}
</Tab>




          <Tab eventKey="Relationships" title="Relationships">
            <div className="main-content2 pt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="header-title">Plans</span>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded={isPlanOpen}
                      onClick={togglePlanDropDown}
                    >
                      All Plans
                      <IoMdArrowDropdown className="hw-20" />
                    </button>
                    <ul
                      className={`dropdown-menu ${isPlanOpen ? "show" : ""}`}
                      aria-labelledby="dropdownMenuButton"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          <TiPlus className="mb-2px hw-15" />
                          Create New View
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <IoMdArrowDropright className="hw-20" />
                          All Plans
                          <BiSolidEdit className="hw-15 ml-20px" />
                          <FaTableColumns className="hw-15 ml-5px" />
                          <ImCopy className="hw-15 ml-5px" />
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          All Business Continuity Plans
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          All Disaster Recovery Plans
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          My Plans
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Update Frequency
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Plan Scorecard
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          All Plans - Exercise
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Plan Templates
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          IT User View
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          All Expired Plans
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          All Plans - Chart Only
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button className="button border-1 ms-1">
                    <LuRefreshCw className="hw-18" />
                  </button>
                  <span className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                      type="button"
                      id="TollFropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded={isPlanColumnOpen}
                      onClick={togglePlanColumnDropDown}
                    >
                      <FaTableColumns className="hw-14" />
                    </button>
                    <ul
                      className={`dropdown-menu ${
                        isPlanColumnOpen ? "show" : ""
                      }`}
                      aria-labelledby="TollFropdown"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                        <span className="fw-bold">Columns</span>{" "}
                        <a className="blue">Reset</a>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Plan Name
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Status
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Plan Type
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Plan Editor(s)
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Plan Leader
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Next Update Date
                        </label>
                      </li>
                    </ul>
                  </span>
                  <button className="button border-1 ms-1">
                    <FaFilter className="hw-15" />
                  </button>
                </div>
                <div>
                  <button
                    className="button border-1 ms-1"
                    title="Attach Employee"
                  >
                    <IoMdAttach className="hw-20" />
                  </button>
                  <button
                    className="button border-1 ms-1 me-1"
                    title="Detach Employee"
                  >
                    <GrDetach className="hw-20" />
                  </button>
                  <button className="button border-1 ms-1">
                    <FaRegTrashCan className="hw-18" />
                  </button>
                  <button className="button border-1 ms-1">
                    <HiDotsHorizontal className="hw-20" />
                  </button>{" "}
                  <button
                    className="button border-1 ms-1 me-1"
                    title="Detach Employee"
                  >
                    <MdOutlineKeyboardArrowDown className="hw-20" />
                  </button>
                </div>
              </div>
              <div className="border-1 mt-2 mb-2"></div>
            </div>
            <div className="main-content2 pt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="header-title">Processes </span>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded={isOpen}
                      onClick={toggleDropdown}
                    >
                      All Process Locations
                      <IoMdArrowDropdown className="hw-20" />
                    </button>
                    <ul
                      className={`dropdown-menu ${isOpen ? "show" : ""}`}
                      aria-labelledby="dropdownMenuButton"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          <TiPlus className="mb-2px hw-15" />
                          Create New View
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <IoMdArrowDropright className="hw-20" />
                          All Process Locations
                          <BiSolidEdit className="hw-15 ml-20px" />
                          <FaTableColumns className="hw-15 ml-5px" />
                          <ImCopy className="hw-15 ml-5px" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button className="button border-1 ms-1">
                    <FaHome className="hw-15" />
                  </button>
                  <button className="button border-1 ms-1">
                    <LuRefreshCw className="hw-18" />
                  </button>
                  <span className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                      type="button"
                      id="TollFropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded={isColumnOpen}
                      onClick={ColumnDropDown}
                    >
                      <FaTableColumns className="hw-14" />
                    </button>
                    <ul
                      className={`dropdown-menu ${isColumnOpen ? "show" : ""}`}
                      aria-labelledby="TollFropdown"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                        <span className="fw-bold">Columns</span>{" "}
                        <a className="blue">Reset</a>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Process Location
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" /># of
                          Dedicated Onsite
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" /># of
                          Dedicated Remote
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" /># of
                          Hybrid
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Minimum # of Staff Required
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Alternate/Backup Locations
                        </label>
                      </li>
                    </ul>
                  </span>
                  <button className="button border-1 ms-1">
                    <FaFilter className="hw-15" />
                  </button>
                </div>
                <div>
                  <NavLink className="button1 border-1" to="/ ">
                    <TiPlus className="hw-20" />
                    Process Location 
                  </NavLink>

                  <button className="button border-1 ms-1">
                    <FaRegTrashCan className="hw-18" />
                  </button>
                  <button className="button border-1 ms-1">
                    <BiExport className="hw-20" />
                  </button>
                  <button className="button border-1 ms-1">
                    <HiDotsHorizontal className="hw-20" />
                  </button>
                </div>
              </div>
              <div className="border-1 mt-2 mb-2"></div>
            </div>
            <div className="main-content2 pt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="header-title">Applications</span>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded={isIncidentOpen}
                      onClick={toggleIncidentDropdown}
                    >
                      All Applications
                      <IoMdArrowDropdown className="hw-20" />
                    </button>
                    <ul
                      className={`dropdown-menu ${
                        isIncidentOpen ? "show" : ""
                      }`}
                      aria-labelledby="dropdownMenuButton"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          <TiPlus className="mb-2px hw-15" />
                          Create New View
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <IoMdArrowDropright className="hw-20" />
                          All Applications
                          <BiSolidEdit className="hw-15 ml-20px" />
                          <FaTableColumns className="hw-15 ml-5px" />
                          <ImCopy className="hw-15 ml-5px" />
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Dependency Map View
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Impact View
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          My Applications
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Application Requiring Updates (Icon Counts)
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          All Applications (Export)
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button className="button border-1 ms-1">
                    <FaHome className="hw-15" />
                  </button>
                  <button className="button border-1 ms-1">
                    <LuRefreshCw className="hw-18" />
                  </button>
                  <span className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                      type="button"
                      id="TollFropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded={isExerciseOpen}
                      onClick={toggleExerciseColumnDropDown}
                    >
                      <FaTableColumns className="hw-14" />
                    </button>
                    <ul
                      className={`dropdown-menu ${
                        isExerciseOpen ? "show" : ""
                      }`}
                      aria-labelledby="TollFropdown"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                        <span className="fw-bold">Columns</span>{" "}
                        <a className="blue">Reset</a>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Application Name
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Application Owner
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          RTO
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          RPO Value
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Aggregate Risk
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Updated At
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Updated By
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          RTO Text
                        </label>
                      </li>
                    </ul>
                  </span>
                  <button className="button border-1 ms-1">
                    <FaFilter className="hw-15" />
                  </button>
                </div>
                <div>
                  <button
                    className="button border-1 ms-1"
                    title="Attach Employee"
                  >
                    <IoMdAttach className="hw-20" />
                  </button>
                  <button
                    className="button border-1 ms-1 me-1"
                    title="Detach Employee"
                  >
                    <GrDetach className="hw-20" />
                  </button>
                  <button className="button border-1 ms-1">
                    <FaRegTrashCan className="hw-18" />
                  </button>
                  <button className="button border-1 ms-1">
                    <HiDotsHorizontal className="hw-20" />
                  </button>{" "}
                  <button className="button border-1 ms-1">
                    <MdOutlineKeyboardArrowDown className="hw-20" />
                  </button>
                </div>
              </div>
              <div className="border-1 mt-2 mb-2"></div>
            </div>
            <div className="main-content2 pt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="header-title">Hardware</span>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded={isHardwareOpen}
                      onClick={toggleHardwareDropDown}
                    >
                      All Hardware
                      <IoMdArrowDropdown className="hw-20" />
                    </button>
                    <ul
                      className={`dropdown-menu ${
                        isHardwareOpen ? "show" : ""
                      }`}
                      aria-labelledby="dropdownMenuButton"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          <TiPlus className="mb-2px hw-15" />
                          Create New View
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <IoMdArrowDropright className="hw-20" />
                          All Hardware
                          <BiSolidEdit className="hw-15 ml-20px" />
                          <FaTableColumns className="hw-15 ml-5px" />
                          <ImCopy className="hw-15 ml-5px" />
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Dependency Map View
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          My Hardware
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button className="button border-1 ms-1">
                    <FaHome className="hw-15" />
                  </button>
                  <button className="button border-1 ms-1">
                    <LuRefreshCw className="hw-18" />
                  </button>
                  <span className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                      type="button"
                      id="TollFropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded={isHardwareColumnOpen}
                      onClick={toggleHardwareColumnDropDown}
                    >
                      <FaTableColumns className="hw-14" />
                    </button>
                    <ul
                      className={`dropdown-menu ${
                        isHardwareColumnOpen ? "show" : ""
                      }`}
                      aria-labelledby="TollFropdown"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                        <span className="fw-bold">Columns</span>{" "}
                        <a className="blue">Reset</a>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Hardware Name
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Status Summary
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Hardware Type
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Description
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Updated At
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Updated By
                        </label>
                      </li>
                    </ul>
                  </span>
                  <button className="button border-1 ms-1">
                    <FaFilter className="hw-15" />
                  </button>
                </div>
                <div>
                  <button
                    className="button border-1 ms-1"
                    title="Attach Employee"
                  >
                    <IoMdAttach className="hw-20" />
                  </button>
                  <button
                    className="button border-1 ms-1 me-1"
                    title="Detach Employee"
                  >
                    <GrDetach className="hw-20" />
                  </button>
                  <button className="button border-1 ms-1">
                    <FaRegTrashCan className="hw-18" />
                  </button>
                  <button className="button border-1 ms-1">
                    <HiDotsHorizontal className="hw-20" />
                  </button>
                  <button className="button border-1 ms-1">
                    <MdOutlineKeyboardArrowDown className="hw-20" />
                  </button>
                </div>
              </div>
              <div className="border-1 mt-2 mb-2"></div>
            </div>
            <div className="main-content2 pt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="header-title">Vendors</span>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded={isVendorOpen}
                      onClick={toggleVendorDropDown}
                    >
                      All Vendors
                      <IoMdArrowDropdown className="hw-20" />
                    </button>
                    <ul
                      className={`dropdown-menu ${isVendorOpen ? "show" : ""}`}
                      aria-labelledby="dropdownMenuButton"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          <TiPlus className="mb-2px hw-15" />
                          Create New View
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <IoMdArrowDropright className="hw-20" />
                          All Vendors
                          <BiSolidEdit className="hw-15 ml-20px" />
                          <FaTableColumns className="hw-15 ml-5px" />
                          <ImCopy className="hw-15 ml-5px" />
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                        Vendors by Criticality
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                        All Critical Vendors
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                        Data Migration
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Update Frequency
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button className="button border-1 ms-1">
                    <FaHome className="hw-15" />
                  </button>
                  <button className="button border-1 ms-1">
                    <LuRefreshCw className="hw-18" />
                  </button>
                  <span className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                      type="button"
                      id="TollFropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded={isVendorColumnOpen}
                      onClick={toggleVendorColumnDropDown}
                    >
                      <FaTableColumns className="hw-14" />
                    </button>
                    <ul
                      className={`dropdown-menu ${
                        isVendorColumnOpen ? "show" : ""
                      }`}
                      aria-labelledby="TollFropdown"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                        <span className="fw-bold">Columns</span>{" "}
                        <a className="blue">Reset</a>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Vendor
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                         Vendor Contacts
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                         Main Phone
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                        Website
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Criticality
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                         Workflow Status
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Count of Agreements
                        </label>
                      </li>
                    </ul>
                  </span>
                  <button className="button border-1 ms-1">
                    <FaFilter className="hw-15" />
                  </button>
                </div>
                <div>
                  <button
                    className="button border-1 ms-1"
                    title="Attach Employee"
                  >
                    <IoMdAttach className="hw-20" />
                  </button>
                  <button
                    className="button border-1 ms-1 me-1"
                    title="Detach Employee"
                  >
                    <GrDetach className="hw-20" />
                  </button>
                  <button className="button border-1 ms-1">
                    <FaRegTrashCan className="hw-18" />
                  </button>
                  <button className="button border-1 ms-1">
                    <HiDotsHorizontal className="hw-20" />
                  </button>
                  <button className="button border-1 ms-1">
                    <MdOutlineKeyboardArrowDown className="hw-20" />
                  </button>
                </div>
              </div>
              <div className="border-1 mt-2 mb-2"></div>
            </div>
          </Tab>
          <Tab eventKey="Recovery Information" title="Recovery Information">
            <div className="main-content2 pt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="header-title">Alternate Power Supply</span>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded={isOpen}
                      onClick={toggleDropdown}
                    >
                      All Alternate Power Supply
                      <IoMdArrowDropdown className="hw-20" />
                    </button>
                    <ul
                      className={`dropdown-menu ${isOpen ? "show" : ""}`}
                      aria-labelledby="dropdownMenuButton"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          <TiPlus className="mb-2px hw-15" />
                          Create New View
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <IoMdArrowDropright className="hw-20" />
                          All Alternate Power Supply
                          <BiSolidEdit className="hw-15 ml-20px" />
                          <FaTableColumns className="hw-15 ml-5px" />
                          <ImCopy className="hw-15 ml-5px" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button className="button border-1 ms-1">
                    <FaHome className="hw-15" />
                  </button>
                  <button className="button border-1 ms-1">
                    <LuRefreshCw className="hw-18" />
                  </button>
                  <span className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                      type="button"
                      id="TollFropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded={isColumnOpen}
                      onClick={ColumnDropDown}
                    >
                      <FaTableColumns className="hw-14" />
                    </button>
                    <ul
                      className={`dropdown-menu ${isColumnOpen ? "show" : ""}`}
                      aria-labelledby="TollFropdown"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                        <span className="fw-bold">Columns</span>{" "}
                        <a className="blue">Reset</a>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Alternate Power Supply
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Type
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Runtime
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Location supported by alternate power
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Vendors
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Updated At
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Updated By
                        </label>
                      </li>
                    </ul>
                  </span>
                  <button className="button border-1 ms-1">
                    <FaFilter className="hw-15" />
                  </button>
                </div>
                <div>
                  <NavLink className="button1 border-1" to="/ ">
                    <TiPlus className="hw-20" />
                    Alternate Power Supply
                  </NavLink>
                  <button className="button border-1 ms-1">
                    <FaRegTrashCan className="hw-18" />
                  </button>
                  <button className="button border-1 ms-1">
                    <HiDotsHorizontal className="hw-20" />
                  </button>
                  <button className="button border-1 ms-1">
                    <MdOutlineKeyboardArrowDown className="hw-20" />
                  </button>
                </div>
              </div>
              <div className="border-1 mt-2 mb-2"></div>
              <div className="main-content2 pt-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <span className="header-title">Supporting Vendors</span>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle border-radius-2"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded={isIncidentOpen}
                        onClick={toggleIncidentDropdown}
                      >
                        All Locations Vendors
                        <IoMdArrowDropdown className="hw-20" />
                      </button>
                      <ul
                        className={`dropdown-menu ${
                          isIncidentOpen ? "show" : ""
                        }`}
                        aria-labelledby="dropdownMenuButton"
                        style={{
                          "--vz-dropdown-min-width": "15rem",
                          "--vz-dropdown-font-size": "14px;",
                        }}
                      >
                        <li>
                          <a className="dropdown-item" href="#">
                            <TiPlus className="mb-2px hw-15" />
                            Create New View
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            <IoMdArrowDropright className="hw-20" />
                            All Locations Vendors
                            <BiSolidEdit className="hw-15 ml-20px" />
                            <FaTableColumns className="hw-15 ml-5px" />
                            <ImCopy className="hw-15 ml-5px" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <button className="button border-1 ms-1">
                      <LuRefreshCw className="hw-18" />
                    </button>
                    <span className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                        type="button"
                        id="TollFropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded={isExerciseOpen}
                        onClick={toggleExerciseColumnDropDown}
                      >
                        <FaTableColumns className="hw-14" />
                      </button>
                      <ul
                        className={`dropdown-menu ${
                          isExerciseOpen ? "show" : ""
                        }`}
                        aria-labelledby="TollFropdown"
                        style={{
                          "--vz-dropdown-min-width": "15rem",
                          "--vz-dropdown-font-size": "14px;",
                        }}
                      >
                        <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                          <span className="fw-bold">Columns</span>{" "}
                          <a className="blue">Reset</a>
                        </li>
                        <li class="dropdown-checkbox">
                          <label>
                            <input type="checkbox" className="ms-2 me-1" />
                            Vendor Name
                          </label>
                        </li>
                        <li class="dropdown-checkbox">
                          <label>
                            <input type="checkbox" className="ms-2 me-1" />
                            Category
                          </label>
                        </li>
                        <li class="dropdown-checkbox">
                          <label>
                            <input type="checkbox" className="ms-2 me-1" />
                            Service Provided
                          </label>
                        </li>
                        <li class="dropdown-checkbox">
                          <label>
                            <input type="checkbox" className="ms-2 me-1" />
                            Updated At
                          </label>
                        </li>
                        <li class="dropdown-checkbox">
                          <label>
                            <input type="checkbox" className="ms-2 me-1" />
                            Updated By
                          </label>
                        </li>
                      </ul>
                    </span>
                    <button className="button border-1 ms-1">
                      <FaFilter className="hw-15" />
                    </button>
                  </div>
                  <div>
                    <NavLink className="button1 border-1" to="/">
                      <TiPlus className="hw-20" />
                      Location Vendor
                    </NavLink>
                    <button className="button border-1 ms-1">
                      <FaRegTrashCan className="hw-18" />
                    </button>
                    <button className="button border-1 ms-1">
                      <HiDotsHorizontal className="hw-20" />
                    </button>
                    <button className="button border-1 ms-1">
                      <MdOutlineKeyboardArrowDown className="hw-20" />
                    </button>
                  </div>
                </div>
                <div className="border-1 mt-2 mb-2"></div>
              </div>
            </div>
          </Tab>
          <Tab
            eventKey="Exercise and Incident History"
            title="Exercise and Incident History"
          >
            <div className="main-content2 pt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="header-title">Exercises</span>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded={isOpen}
                      onClick={toggleDropdown}
                    >
                      All Exercises
                      <IoMdArrowDropdown className="hw-20" />
                    </button>
                    <ul
                      className={`dropdown-menu ${isOpen ? "show" : ""}`}
                      aria-labelledby="dropdownMenuButton"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          <TiPlus className="mb-2px hw-15" />
                          Create New View
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <IoMdArrowDropright className="hw-20" />
                          All Exercises
                          <BiSolidEdit className="hw-15 ml-20px" />
                          <FaTableColumns className="hw-15 ml-5px" />
                          <ImCopy className="hw-15 ml-5px" />
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          My Exercises
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Active Exercises
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Active Exercises (Portal)
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button className="button border-1 ms-1">
                    <LuRefreshCw className="hw-18" />
                  </button>
                  <span className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                      type="button"
                      id="TollFropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded={isColumnOpen}
                      onClick={ColumnDropDown}
                    >
                      <FaTableColumns className="hw-14" />
                    </button>
                    <ul
                      className={`dropdown-menu ${isColumnOpen ? "show" : ""}`}
                      aria-labelledby="TollFropdown"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                        <span className="fw-bold">Columns</span>{" "}
                        <a className="blue">Reset</a>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Exercise Name
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Status
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Start Date/Time
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          End Date/Time
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Updated At
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Updated By
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Created At
                        </label>
                      </li>
                    </ul>
                  </span>
                  <button className="button border-1 ms-1">
                    <FaFilter className="hw-15" />
                  </button>
                </div>
                <div>
                  <button className="button border-1 ms-1">
                    <FaRegTrashCan className="hw-18" />
                  </button>
                  <button className="button border-1 ms-1">
                    <HiDotsHorizontal className="hw-20" />
                  </button>
                  <button className="button border-1 ms-1">
                    <MdOutlineKeyboardArrowDown className="hw-20" />
                  </button>
                </div>
              </div>
              <div className="border-1 mt-2 mb-2"></div>
            </div>{" "}
            <div className="main-content2 pt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="header-title">Incidents</span>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded={isIncidentOpen}
                      onClick={toggleIncidentDropdown}
                    >
                      All Incidents
                      <IoMdArrowDropdown className="hw-20" />
                    </button>
                    <ul
                      className={`dropdown-menu ${
                        isIncidentOpen ? "show" : ""
                      }`}
                      aria-labelledby="dropdownMenuButton"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          <TiPlus className="mb-2px hw-15" />
                          Create New View
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <IoMdArrowDropright className="hw-20" />
                          All Incidents
                          <BiSolidEdit className="hw-15 ml-20px" />
                          <FaTableColumns className="hw-15 ml-5px" />
                          <ImCopy className="hw-15 ml-5px" />
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Active Incidents Only
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Active Exercises (Portal)
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button className="button border-1 ms-1">
                    <LuRefreshCw className="hw-18" />
                  </button>
                  <span className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                      type="button"
                      id="TollFropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded={isExerciseOpen}
                      onClick={toggleExerciseColumnDropDown}
                    >
                      <FaTableColumns className="hw-14" />
                    </button>
                    <ul
                      className={`dropdown-menu ${
                        isExerciseOpen ? "show" : ""
                      }`}
                      aria-labelledby="TollFropdown"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                        <span className="fw-bold">Columns</span>{" "}
                        <a className="blue">Reset</a>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Status Summary
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Incident
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Severity
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Incidents Tupes(s)
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Declaration Time
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Closed Time
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Updated At
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Updated By
                        </label>
                      </li>
                    </ul>
                  </span>
                  <button className="button border-1 ms-1">
                    <FaFilter className="hw-15" />
                  </button>
                </div>
                <div>
                  <button className="button border-1 ms-1">
                    <FaRegTrashCan className="hw-18" />
                  </button>
                  <button className="button border-1 ms-1">
                    <HiDotsHorizontal className="hw-20" />
                  </button>
                  <button className="button border-1 ms-1">
                    <MdOutlineKeyboardArrowDown className="hw-20" />
                  </button>
                </div>
              </div>
              <div className="border-1 mt-2 mb-2"></div>
            </div>
          </Tab>
          <Tab eventKey="Risk Assessments" title="Risk Assessments">
            <div className="main-content2 pt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="header-title">Risk Assessments</span>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded={isOpen}
                      onClick={toggleDropdown}
                    >
                      All Risk/Threat Assessments
                      <IoMdArrowDropdown className="hw-20" />
                    </button>
                    <ul
                      className={`dropdown-menu ${isOpen ? "show" : ""}`}
                      aria-labelledby="dropdownMenuButton"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          <TiPlus className="mb-2px hw-15" />
                          Create New View
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <IoMdArrowDropright className="hw-20" />
                          All Risk/Threat Assessments
                          <BiSolidEdit className="hw-15 ml-20px" />
                          <FaTableColumns className="hw-15 ml-5px" />
                          <ImCopy className="hw-15 ml-5px" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <button className="button border-1 ms-1">
                    <LuRefreshCw className="hw-18" />
                  </button>
                  <span className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                      type="button"
                      id="TollFropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded={isColumnOpen}
                      onClick={ColumnDropDown}
                    >
                      <FaTableColumns className="hw-14" />
                    </button>
                    <ul
                      className={`dropdown-menu ${isColumnOpen ? "show" : ""}`}
                      aria-labelledby="TollFropdown"
                      style={{
                        "--vz-dropdown-min-width": "15rem",
                        "--vz-dropdown-font-size": "14px;",
                      }}
                    >
                      <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                        <span className="fw-bold">Columns</span>{" "}
                        <a className="blue">Reset</a>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Risk/Threat Assessments
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Locations
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Risk Rating
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Risk Score
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Assessment Date
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Updated At
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Updated By
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Workflow Status
                        </label>
                      </li>
                    </ul>
                  </span>
                  <button className="button border-1 ms-1">
                    <FaFilter className="hw-15" />
                  </button>
                </div>
                <div>
                  <NavLink className="button1 border-1" to="/employee">
                    <TiPlus className="hw-20" />
                    Risk/Threat Assessments
                  </NavLink>
                  <button className="button border-1 ms-1">
                    <FaRegTrashCan className="hw-18" />
                  </button>
                  <button className="button border-1 ms-1">
                    <HiDotsHorizontal className="hw-20" />
                  </button>
                </div>
              </div>
              <div className="border-1 mt-2 mb-2"></div>
            </div>
          </Tab>
          <Tab eventKey="Task" title="Task"></Tab>
          <Tab eventKey="System Info" title="System Info">
            <div className="container-fluid">
              <div className="form-content">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="form-heading">System Information</div>
                  <div>
                    <button className="button border-1 ms-1">
                      <MdOutlineKeyboardArrowDown className="hw-20" />
                    </button>
                  </div>
                </div>
                <div className="border-1 mb-3"></div>
                <div className="row">
                  <div className="col-6">
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Created By</div>
                      <div className="tab-title">
                        <a href="" className="text-blue">
                          Maaz Khan
                        </a>
                      </div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Updated By</div>
                      <div className="tab-title">
                        <a href="">Maaz Khan</a>
                      </div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Tags</div>
                      <div className="tab-title"></div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Geo-location Status</div>
                      <div className="tab-title">Passed</div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Latitude</div>
                      <div className="tab-title">25.283540</div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Longitude</div>
                      <div className="tab-title">51.534677</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Created At</div>
                      <div className="tab-title">07/24/2023, 1:55 PM</div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Updated At</div>
                      <div className="tab-title">07/24/2023, 2:02 PM</div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">ID</div>
                      <div className="tab-title">142595113</div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Location Type</div>
                      <div className="tab-title">Corporate Office</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="form-content ">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="form-heading">Audit Trail</div>
                  <div className="d-flex align-items-center justify-content-end">
                    <button className="button border-1 ms-1" title="Show All">
                      <TfiMenuAlt className="hw-20" />
                    </button>
                    <button className="button border-1 ms-1" title="Refresh">
                      <LuRefreshCw className="hw-18" />
                    </button>
                    <button className="button border-1 ms-1">
                      <MdOutlineKeyboardArrowDown className="hw-20" />
                    </button>
                  </div>
                </div>
                <div className="border-1 mb-3"></div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>{" "}
    </React.Fragment>
  );
}

export default ViewLocation;
