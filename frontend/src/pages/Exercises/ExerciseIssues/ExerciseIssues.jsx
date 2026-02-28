import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { IoMdArrowDropdown } from "react-icons/io";
import { HiMiniWrench } from "react-icons/hi2";
import { TiPlus } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidEdit } from "react-icons/bi"; // Import BiSolidEdit icon
import { FcSettings } from "react-icons/fc"; // Import FcSettings icon
import { LuTableOfContents, LuClock9 } from "react-icons/lu"; // Import LuTableOfContents and LuClock9 icons
import { FaPrint, FaRegFilePdf, FaColumns, FaHome, FaFilter, FaTrashAlt } from "react-icons/fa"; // Import FaPrint, FaRegFilePdf, FaColumns, FaHome, FaFilter, FaTrashAlt icons
import { IoMdArrowDropright } from "react-icons/io"; // Import IoMdArrowDropright icon
import { ImCopy } from "react-icons/im"; // Import ImCopy icon
import { HiDotsHorizontal } from "react-icons/hi"; // Import HiDotsHorizontal icon
import { LuRefreshCw } from "react-icons/lu"; // Import LuRefreshCw icon
import { TiExport } from "react-icons/ti"; // Import TiExport icon
import "./ExerciseIssues.css"; // Import CSS file

function ExerciseIssues() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false); // State for tool dropdown
  const [isColumnOpen, setIsColumnOpen] = useState(false); // State for column dropdown
  const [exerciseIssues, setExerciseIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectAll, setSelectAll] = useState(false); // State for select all checkbox

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleToolDropDown = () => setIsToolOpen(!isToolOpen);
  const ColumnDropDown = () => setIsColumnOpen(!isColumnOpen);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/exercise-issues`);

        console.log("Full API Response:", response);
        console.log("Response Data:", response.data);

        if (Array.isArray(response.data)) {
          setExerciseIssues(response.data);
        } else {
          console.error("API did not return an array.");
          setExerciseIssues([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle select all checkbox change
  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setExerciseIssues(exerciseIssues.map(issue => ({ ...issue, isSelected: !selectAll })));
  };

  // Handle individual checkbox change
  const handleCheckboxChange = (id) => {
    setExerciseIssues(exerciseIssues.map(issue => issue._id === id ? { ...issue, isSelected: !issue.isSelected } : issue));
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <React.Fragment>
      <Helmet>
        <title>Exercise Issues Page | TRST</title>
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Exercise Issues</div>
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
                  className={`right-auto dropdown-menu ${isToolOpen ? "show" : ""}`}
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
                      Tab Definition
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

        <div className="main-content2 pt-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <span className="header-title">Exercise Issue</span>
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
                    "--vz-dropdown-font-size": "14px",
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
                      <FaColumns className="hw-15 ml-5px" />
                      <ImCopy className="hw-15 ml-5px" />
                    </a>
                  </li>
                  <span className="ms-1">Select Another View...</span>
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
                  <FaColumns className="hw-14" />
                </button>
                <ul
                  className={`dropdown-menu ${isColumnOpen ? "show" : ""}`}
                  aria-labelledby="TollFropdown"
                  style={{
                    "--vz-dropdown-min-width": "15rem",
                    "--vz-dropdown-font-size": "14px",
                  }}
                >
                  <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                    <span className="fw-bold">Columns</span>{" "}
                    <a className="blue">Reset</a>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Exercise Name
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Status
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Start Date/Time
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      End Date/Time
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Updated At
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Updated By
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
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
              <NavLink className="button1 border-1" to="/new-exercise-issues">
                <TiPlus className="hw-20" />
                ExerciseIssue
              </NavLink>
              <button className="button border-1 ms-1">
                <FaTrashAlt className="hw-18" />
              </button>
              <button className="button border-1 ms-1">
                <TiExport className="hw-20" />
              </button>
              <button className="button border-1 ms-1">
                <HiDotsHorizontal className="hw-20" />
              </button>
            </div>
          </div>
          <div className="border-1 mt-2 mb-2"></div>

          <div style={{ width: "90%", overflowX: "auto" }}>
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={exerciseIssues.length > 0 && exerciseIssues.every((issue) => issue.isSelected)}
                      onChange={handleSelectAllChange}
                    />
                  </th>
                  <th>Action</th>
                  <th>Exercise Issue</th>
                  <th>Owners</th>
                  <th>Description</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {exerciseIssues.length > 0 ? (
                  exerciseIssues.map((issue) => (
                    <tr key={issue._id}>
                      <td>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={issue.isSelected || false}
                          onChange={() => handleCheckboxChange(issue._id)}
                        />
                      </td>
                      <td className="text-center">
                        <div className="d-flex align-items-center gap-2 justify-content-center">
                          <button className="btn btn-sm btn-link p-0" title="Edit">
                            <CiEdit style={{ cursor: "pointer", fontSize: "1.2em", color: "green" }} size={18} />
                          </button>
                          <button className="btn btn-sm btn-link p-0" title="Delete">
                            <RiDeleteBin6Line className="text-danger" size={18} />
                          </button>
                        </div>
                      </td>
                      <td>{issue.exerciseIssue || "N/A"}</td>
                      <td>{issue.owners || "N/A"}</td>
                      <td>{issue.description || "N/A"}</td>
                      <td>{new Date(issue.createdAt).toLocaleDateString()}</td>
                      <td>{issue.updatedAt ? new Date(issue.updatedAt).toLocaleDateString() : "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ExerciseIssues;