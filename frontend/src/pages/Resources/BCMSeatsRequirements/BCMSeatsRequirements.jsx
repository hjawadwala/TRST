import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiSolidEdit } from "react-icons/bi";
import { ImCopy } from "react-icons/im";
import { LuRefreshCw, LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaRegFilePdf, FaTag, FaFilter, FaSearch } from "react-icons/fa";
import { GrDetach } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { HiDotsHorizontal, HiOutlineDotsHorizontal } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom"; // For Edit Navigation
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci"; 
import {
  IoMdArrowDropdown,
  IoMdArrowDropright,
  IoMdAttach,
  IoMdArrowRoundBack,
  IoMdArrowRoundForward,
} from "react-icons/io";
import { TiPlus, TiArrowBack } from "react-icons/ti";
import {
  FaPrint,
  FaPencil,
  FaRegTrashCan,
  FaTableColumns,
} from "react-icons/fa6";

function BCMSeatsRequirements() {
  const [bcmSeats, setBcmSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use for redirecting on edit

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/v1/bcm-seats-requirements/all`)
      .then((response) => {
        console.log("✅ Full API Response:", response.data);
  
        // ✅ Use `response.data` directly since it's already an array
        if (Array.isArray(response.data)) {
          console.log("✅ Setting BCM Seats Data:", response.data);
          setBcmSeats(response.data);
        } else {
          console.error("❌ API did not return an expected array:", response.data);
          setBcmSeats([]); // Prevent crashes
        }
      })
      .catch((error) => {
        console.error("❌ Error fetching data:", error.response?.data || error.message);
        setBcmSeats([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  
  

  // ✅ Handle Edit
  const handleEdit = (id) => {
    if (!id) {
      console.error("❌ Error: No ID found for edit");
      return;
    }
    console.log(`Navigating to edit page for ID: ${id}`);
    navigate(`"/bcm-seats-requirements/edit/${id}`); // ✅ Redirect to edit page
  };
  // ✅ Handle Delete
 

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
  
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/bcm-seats-requirements/delete/${id}`);
      console.log("✅ Delete Success:", response.data);
      setBcmSeats(prevSeats => prevSeats.filter(seat => seat._id !== id)); // Remove from state
    } catch (error) {
      console.error("❌ Delete Error:", error.response?.data || error.message);
      alert("Failed to delete the record.");
    }
  };
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
    <div>
<div className="form-content">
<h3> BCM Seats Requirement</h3>
          <Link to="/new-bcm-seats-requirement" className="btn "></Link>
    
      <div className="main-content2 pt-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <span className="header-title">
                      BCM Seats Requirement
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
                          All BCM
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
                      <NavLink className="button1 border-1" to="/new-bcm-seats-requirement ">
                        <TiPlus className="hw-20" />
                        BCM Seats Requirement
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
         
          {loading ? <p>Loading...</p> : error ? <p className="text-danger">{error}</p> : (
            <div className="table-responsive">
              <table className="table table-bordered" style={{ width: "100%", minWidth: "1200px" }}>
                <thead className="thead-dark">
                  <tr>
                    <th style={{ width: "15%" }}>Actions</th>
                    <th>BCM Seats Requirement</th>
                    <th>Activities</th>
                    <th>Seats Required for Recovery</th>
                    <th>Time of Operations</th>
                    <th>BCM Seat Number</th>
                    <th>BCM Site</th>
                    <th>Primary Staff</th>
                    <th>Alternate Staff</th>
                  </tr>
                </thead>
                <tbody>
      {bcmSeats && bcmSeats.length > 0 ? (
        bcmSeats.map((record, index) => (
          <tr key={index}>
    
    <td>
    <Link to={`/bcm-seats-requirements/edit/${record._id}`} >
      <CiEdit
        style={{
          cursor: "pointer",
          fontSize: "1.2em",
          color: "green",
            marginRight: "20px",
        }}
        size={18}

      />
    </Link>
    
    
                          <button onClick={() => handleDelete(record._id)} >
                             <RiDeleteBin6Line
                                            className="text-danger"
                                            size={18}
                                          /> 
                          </button>
                        </td>
            <td>{record.bcmSeatsRequirements || "N/A"}</td>
            <td>
              {record.activities?.length > 0
                ? record.activities.map(a => a.bia || "N/A").join(", ")
                : "N/A"}
            </td>
            <td>{record.bcmSeatsRequirementsRecovery || "N/A"}</td>
            <td>{record.timeOfOperation || "N/A"}</td>
            <td>{record.bcmSeatNumber || "N/A"}</td>
            <td>{record.bcmSite?.locationName || "N/A"}</td>
            <td>
              {record.primaryCriticalStaff?.length > 0
                ? record.primaryCriticalStaff.map(s => `${s.firstName} ${s.lastName}`).join(", ")
                : "N/A"}
            </td>
            <td>
              {record.alternateCriticalStaff?.length > 0
                ? record.alternateCriticalStaff.map(s => `${s.firstName} ${s.lastName}`).join(", ")
                : "N/A"}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="9" className="text-center text-danger">
            No data found.
          </td>
        </tr>
      )}
    </tbody>
    
              </table>
            </div>
          )}
        </div>

    </div>
  
    
  );
}

export default BCMSeatsRequirements;
