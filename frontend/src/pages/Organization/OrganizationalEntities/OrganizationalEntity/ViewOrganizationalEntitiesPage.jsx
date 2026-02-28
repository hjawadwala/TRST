import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import BusinessEntityTab from "./BusinessEntityTab";
import EmployeesTab from "./EmployeesTab";
import LocationsTab from "./LocationsTab";
import PlanSection from "./Relationships/PlanSection";
import ApplicationHeader from "./Relationships/applicationSectiontab"; // adjust the path if needed

import "./style.css";
import { Link, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit } from "react-icons/bi";
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
import { FaPrint, FaPencil,FaRegTrashCan, FaTableColumns } from "react-icons/fa6";
import {  FaRegFilePdf, FaTag, FaFilter ,FaSearch} from "react-icons/fa";
import { MdMessage ,MdOutlineKeyboardArrowDown} from "react-icons/md";
import { TiPlus ,TiArrowBack} from "react-icons/ti";
import { ImCopy } from "react-icons/im";
import { HiDotsHorizontal,HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiMenuAlt } from "react-icons/tfi";
import Employees from './Employees';
import { useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GrDetach } from "react-icons/gr";

function ViewOrganizationalEntitiesPage({ entityId }){
  const { id } = useParams(); // Get ID from URL
  const [entity, setEntity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntity = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/organizational-entities/${id}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
  
        // Log the full response to verify its structure
        console.log("Full API Response:", response);
  
        // Directly access data from response.data
        const entityData = response && response.data ? response.data : null;
  
        if (entityData) {
          setEntity(entityData); // Set entity data if found
          console.log("✅ Entity data set:", entityData); // Log the entity data
        } else {
          console.log("❌ No entity data found in response.");
          setEntity(null); // Ensure entity is null if no data
        }
      } catch (error) {
        console.error("❌ Error fetching entity by ID:", error);
        setEntity(null); // Set entity as null on error
      } finally {
        setLoading(false); // Stop loading
      }
    };
  
    if (id) {
      fetchEntity(); // Make sure id is available before calling the API
    }
  
  }, [id]);
  ;
  
  
  
  


  const [key, setKey] = useState("Business Entity Info");
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [isExerciseOpen, setIsExerciseOpen] = useState(false);

  //employess
  
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
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

  return (
    <React.Fragment>
      <Helmet>
        <title>Business Entity Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex mb-3">
            <div className="header-text pe-2">Business Entity : </div>
            <div className="header-text">Accounting & Financial</div>
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
          id="Business Entity Info"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
    {/* <Tab eventKey="Business Entity Info" title="Business Entity Info">
  <div className="container-fluid">
    <div className="form-content">
      <div className="form-heading">Business Entity Information</div>
      <div className="border-1 mb-3"></div>
      <div className="row">
        <div className="col-6">
          <div className="d-flex pb-3">
            <div className="tab-heading">Business Entity</div>
            <div className="tab-title">
              {!loading && entity ? (
                <div>{entity.businessEntity || "N/A"}</div> // Ensure we're rendering a string
              ) : loading ? (
                <div>Loading...</div>
              ) : (
                <div>No Data Available</div>
              )}
            </div>
          </div>
          <div className="d-flex pb-3">
            <div className="tab-heading">Business Entity ID</div>
            <div className="tab-title">
              {!loading && entity ? (
                <div>{entity.businessEntityId || "N/A"}</div> // Ensure we're rendering a string
              ) : loading ? (
                <div>Loading...</div>
              ) : (
                <div>No Data Available</div>
              )}
            </div>
          </div>
          <div className="d-flex pb-3">
            <div className="tab-heading">Business Entity Type</div>
            <div className="tab-title">
              {!loading && entity ? (
                <div>{entity.businessEntityType || "N/A"}</div> // Ensure we're rendering a string
              ) : loading ? (
                <div>Loading...</div>
              ) : (
                <div>No Data Available</div>
              )}
            </div>
          </div>
          <div className="d-flex pb-3">
            <div className="tab-heading">Editor(s)</div>
            <div className="tab-title">
              {!loading && entity ? (
                entity.editors && entity.editors.length > 0 ? (
                  entity.editors.map((editor, index) => (
                    <div key={index}>{editor.fullName}</div> // Render fullName (string) instead of object
                  ))
                ) : (
                  <div>No Editors Available</div>
                )
              ) : loading ? (
                <div>Loading...</div>
              ) : (
                <div>No Data Available</div>
              )}
            </div>
          </div>
          <div className="d-flex pb-3">
            <div className="tab-heading">Description</div>
            <div className="tab-title">
              {!loading && entity ? (
                <div>{entity.description || "N/A"}</div> // Ensure we're rendering a string
              ) : loading ? (
                <div>Loading...</div>
              ) : (
                <div>No Data Available</div>
              )}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex pb-3">
            <div className="tab-heading">Parent Business Entity</div>
            <div className="tab-title">
              {!loading && entity && entity.parentBusinessEntity ? (
                <a href="#" className="text-blue">
                  {entity.businessEntity || "N/A"} 
                </a>
              ) : (
                <div>No Parent Entity Available</div>
              )}
            </div>
          </div>
          <div className="d-flex pb-3">
            <div className="tab-heading">Child Business Entities</div>
            <div className="tab-title">
              {!loading && entity && entity.childBusinessEntities && entity.childBusinessEntities.length > 0 ? (
                entity.childBusinessEntities.map((child, index) => (
                  <div key={index}>
                    <a href="#" className="text-blue">
                      {child.businessEntity || "N/A"}
                    </a>
                  </div>
                ))
              ) : (
                <div>No Child Entities Available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="container-fluid">
    <div className="form-content">
      <div className="form-heading">Business Entity Summary Information</div>
      <div className="border-1 mb-3"></div>
      <div className="row">
        <div className="col-6">
          <div className="d-flex pb-3">
            <div className="tab-heading">Financial Impact - &lt;24 Hours</div>
            <div className="tab-title">$0.00</div>
          </div>
          <div className="d-flex pb-3">
            <div className="tab-heading">Percentage of Company Revenue &lt;24 Hours</div>
            <div className="tab-title"></div>
          </div>
          <div className="d-flex pb-3">
            <div className="tab-heading">Financial - Daily &gt;24 Hours</div>
            <div className="tab-title">$0.00</div>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex pb-3">
            <div className="tab-heading">Plans Assigned</div>
            <div className="tab-title">0</div>
          </div>
          <div className="d-flex pb-3">
            <div className="tab-heading">Staffing Normal Level</div>
            <div className="tab-title">0</div>
          </div>
          <div className="d-flex pb-3">
            <div className="tab-heading">Staffing Work from Home</div>
            <div className="tab-title">0</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</Tab> */}


<Tab eventKey="Business Entity Info" title="Business Entity Info">
  <BusinessEntityTab entity={entity} loading={loading} />
</Tab>

<Tab eventKey="Employees" title="Employees">
  <EmployeesTab
    loading={loading}
    entity={entity}
    isOpen={isOpen}
    toggleDropdown={toggleDropdown}
    isColumnOpen={isColumnOpen}
    ColumnDropDown={ColumnDropDown}
  />
</Tab>

          
        
          {/*  */}
          <Tab eventKey="Locations" title="Locations">
  <LocationsTab entity={entity} loading={loading} />
</Tab>

          <Tab eventKey="Relationships" title="Relationships">
          <div>
      <PlanSection />
    </div>
            <div className="main-content2 pt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="header-title">Processes</span>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded={isOpen}
                      onClick={toggleDropdown}
                    >
                      All Activities
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
                          All Activities
                          <BiSolidEdit className="hw-15 ml-20px" />
                          <FaTableColumns className="hw-15 ml-5px" />
                          <ImCopy className="hw-15 ml-5px" />
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          My Processes
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Staffing Requirements
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Financial Impacts
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          All Processes by RTO
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          All Processes Impacts
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Low To High RTO Activities
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
                          Activity
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Activity RTO
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Activity MTPD
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Business Entity
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Outline the activity steps
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Can the activity be conducted from home
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          If yes, any additional support required
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Activity Employees
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Current Designation/Job Role
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Headcount in Normal Operating Condition
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Frequency (Seasonality)
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Time dependencies (if any)
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
                  <NavLink className="button1 border-1" to="/activity ">
                    <TiPlus className="hw-20" />
                    Activity
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
            {/* </div>
            <ApplicationHeader
  isIncidentOpen={isIncidentOpen}
  isExerciseOpen={isExerciseOpen}
  toggleIncidentDropdown={toggleIncidentDropdown}
  toggleExerciseColumnDropDown={toggleExerciseColumnDropDown}
/>
<div> */}
      <ApplicationHeader  businessEntityId={id}/>
    </div>
          </Tab>
          <Tab eventKey="BIAs" title="BIAs">
            <div className="main-content2 pt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="header-title">
                    Business Impact Assessments (BIAs)
                  </span>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle border-radius-2"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded={isOpen}
                      onClick={toggleDropdown}
                    >
                      All BIAs
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
                          All BIAs
                          <BiSolidEdit className="hw-15 ml-20px" />
                          <FaTableColumns className="hw-15 ml-5px" />
                          <ImCopy className="hw-15 ml-5px" />
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          BIA Scorecard
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          BIAs Completed in Last Year
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          My BIAs
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          My Expired BIAs (Icon Count)
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          All Expired BIAs
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
                          BIA Name
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          status summary
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Department
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Next Update Date
                        </label>
                      </li>
                      <li class="dropdown-checkbox">
                        <label>
                          <input type="checkbox" className="ms-2 me-1" />
                          Updated At
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
                  <NavLink className="button1 border-1" to="/bia ">
                    <TiPlus className="hw-20" />
                    BIA
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
                  <NavLink className="button1 border-1" to="/exercise ">
                    <TiPlus className="hw-20" />
                    Exercise
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
                  <NavLink className="button1 border-1" to="/incident ">
                    <TiPlus className="hw-20" />
                    Incident
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
          <Tab eventKey="System Info" title="System Info">
            <div className="container-fluid">
              <div className="form-content">
                <div className="form-heading">System Information</div>{" "}
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

export default ViewOrganizationalEntitiesPage;
