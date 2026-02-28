import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { LuRefreshCw, LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaPrint } from "react-icons/fa6";
import { FaHome, FaFilter, FaRegFilePdf } from "react-icons/fa";
import { TiExport, TiPlus } from "react-icons/ti";
import { FaRegTrashCan, FaTableColumns } from "react-icons/fa6";
import { ImCopy } from "react-icons/im";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiEdit } from "react-icons/ci"; 
import { RiDeleteBin6Line } from "react-icons/ri";
import Toastify from "toastify-js";
function Exercises() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectAll, setSelectAll] = useState(false); // State for select all checkbox
const [draggedColumn, setDraggedColumn] = useState(null);
const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState(1);
  const itemsPerPage = 10;

  const [columns, setColumns] = useState([
    { id: 'select', label: '', width: 50, draggable: false },
    { id: 'actions', label: 'Actions', width: 100, draggable: false },
    { id: 'exerciseSubject', label: 'Exercise Subject', width: 200, draggable: true },
    { id: 'coordinator', label: 'Coordinator', width: 200, draggable: true },
    { id: 'exerciseType', label: 'Exercise Type', width: 200, draggable: true },
    { id: 'startDateTime', label: 'Start Date/Time', width: 200, draggable: true },
    { id: 'endDateTime', label: 'End Date/Time', width: 200, draggable: true },
    { id: 'businessEntity', label: 'Business Entity', width: 200, draggable: true },
    { id: 'description', label: 'Description', width: 200, draggable: true },
    { id: 'successCriteria', label: 'Success Criteria', width: 200, draggable: true },
    { id: 'participants', label: 'Participants', width: 200, draggable: true },
    { id: 'teams', label: 'Teams', width: 200, draggable: true },
    { id: 'processes', label: 'Processes', width: 200, draggable: true },
    { id: 'locations', label: 'Locations', width: 200, draggable: true },
    { id: 'applications', label: 'Applications', width: 200, draggable: true },
    { id: 'vendors', label: 'Vendors', width: 200, draggable: true },
    { id: 'plans', label: 'Plans', width: 200, draggable: true }
  ]);
  const [visibleColumns, setVisibleColumns] = useState({
    exerciseSubject: true,
    coordinator: true,
    exerciseType: true,
    startDateTime: true,
    endDateTime: true,
    businessEntity: true,
    description: true,
    successCriteria: true,
    participants: true,
    teams: true,
    processes: true,
    locations: true,
    applications: true,
    vendors: true,
    plans: true
  });

  const handlePageInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      const value = e.target.value;
      const numValue = parseInt(value);
      const maxPage = Math.ceil(exercises.length / itemsPerPage);

      if (value === '' || isNaN(numValue) || numValue < 1) {
        setCurrentPage(1);
        setPageInput(1);
      } else if (numValue > maxPage) {
        setCurrentPage(maxPage);
        setPageInput(maxPage);
      } else {
        setCurrentPage(numValue);
        setPageInput(numValue);
      }
    }
  };

  const handlePageInputChange = (e) => {
    const value = e.target.value;
    setPageInput(value);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleToolDropDown = () => {
    setIsToolOpen(!isToolOpen);
  };

  const ColumnDropDown = () => {
    setIsColumnOpen(!isColumnOpen);
  };
   //pagination
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = exercises.slice(indexOfFirstItem, indexOfLastItem);

  // Fetch Exercises Data from API
  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/exercises`);
        const result = await response.json();

        if (response.ok) {
          setExercises(result);
        } else {
          setError(result.message || "Error fetching exercises");
        }
      } catch (error) {
        setError("Network error! Please try again.");
      }
      setLoading(false);
    };

    fetchExercises();
  }, []);

  // Handle select all checkbox change
  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setExercises(exercises.map(exercise => ({ ...exercise, isSelected: !selectAll })));
  };

  // Handle individual checkbox change
  const handleCheckboxChange = (id) => {
    setExercises(exercises.map(exercise => exercise._id === id ? { ...exercise, isSelected: !exercise.isSelected } : exercise));
  };
 //pagination start

const handleFirstPage = () => {
  setCurrentPage(1);
  setPageInput(1);
};

const handlePrevPage = () => {
  setCurrentPage(prev => {
    const newPage = prev - 1;
    setPageInput(newPage);
    return newPage;
  });
};

const handleNextPage = () => {
  setCurrentPage(prev => {
    const newPage = prev + 1;
    setPageInput(newPage);
    return newPage;
  });
};

const handleLastPage = () => {
  const lastPage = Math.ceil(exercises.length / itemsPerPage);
  setCurrentPage(lastPage);
  setPageInput(lastPage);
};

const indexOfLastRow = currentPage * itemsPerPage;
const indexOfFirstRow = indexOfLastRow - itemsPerPage;
const currentRows = exercises.slice(indexOfFirstRow, indexOfLastRow);
const handleRefresh = async () => {
    try {
      const button = document.querySelector('.refresh-button');
      if (button) {
        button.style.transform = 'rotate(360deg)';
      }
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/exercises`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setExercises(data);
      Toastify({
        text: "Data refreshed successfully!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "#28a745",
        },
      }).showToast();
    } catch (error) {
      console.error("Error refreshing data:", error);
      Toastify({
        text: "Error refreshing data",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "#dc3545",
        },
      }).showToast();
    }
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>Exercises Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Exercises</div>
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
              <span className="header-title">Exercise</span>
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
               <button className="button border-1 ms-1 refresh-button" onClick={handleRefresh} title="Refresh data">
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
              <NavLink className="button1 border-1" to="/new-exercises">
                <TiPlus className="hw-20" />
                Exercise
              </NavLink>
              <button className="button border-1 ms-1">
                <FaRegTrashCan className="hw-18" />
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

          {/* Show loading and error messages */}
          {loading && <p>Loading data...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Display data in a table */}
          <div style={{ width: "100%", overflowX: "auto" }}>
            <div style={{ maxHeight: "560px", overflowY: "auto", border: "1px solid #ccc" }}>
              {/*  //pagination start div */}
              <div className="pagination-wrapper">
  <div className="d-flex align-items-center gap-3 p-2 justify-content-between">
    <div className="d-flex align-items-center">
      <button 
        className="btn btn-sm btn-outline-secondary" 
        onClick={handleFirstPage}
        disabled={currentPage === 1}
      >{"<<"}</button>
      
      <button 
        className="btn btn-sm btn-outline-secondary" 
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >{"<"}</button>
      
      <span className="mx-2">Page</span>
      <input
        type="text"
        className="form-control page-input"
        value={pageInput}
        onChange={handlePageInputChange}
        onKeyDown={handlePageInputKeyDown}
        onBlur={handlePageInputKeyDown}
      />
      <span className="mx-2">of {Math.ceil(exercises.length / itemsPerPage)}</span>
      
      <button 
        className="btn btn-sm btn-outline-secondary" 
        onClick={handleNextPage}
        disabled={currentPage === Math.ceil(exercises.length / itemsPerPage)}
      >{">"}</button>
      
      <button 
        className="btn btn-sm btn-outline-secondary" 
        onClick={handleLastPage}
        disabled={currentPage === Math.ceil(exercises.length / itemsPerPage)}
      >{">>"}</button>
    </div>

    <span className="ms-2 fw-bold">
      {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, exercises.length)} of {exercises.length} items
    </span>
  </div>
</div>

              {/*  //pagination end div */}
              <table className="table table-bordered mt-3" style={{ minWidth: "2800px" }}>
                <thead>
                  <tr>
                    <th className="sticky-col">
                      <input
                        type="checkbox"
                        checked={exercises.length > 0 && exercises.every((exercise) => exercise.isSelected)}
                        onChange={handleSelectAllChange}
                      />
                    </th>
                    <th className="sticky-col">Action</th>
                    <th>Exercise Subject</th>
                    <th>Coordinator</th>
                    <th>Exercise Type</th>
                    <th>Start Date/Time</th>
                    <th>End Date/Time</th>
                    <th>Business Entity</th>
                    <th>Description</th>
                    <th>Success Criteria</th>
                    <th>Participants</th>
                    <th>Teams</th>
                    <th>Processes</th>
                    <th>Locations</th>
                    <th>Applications</th>
                    <th>Vendors</th>
                    <th>Plans</th>
                  </tr>
                </thead>
                <tbody>
  {currentRows.length > 0 ? (
    currentRows.map((exercise) => (
      <tr key={exercise._id}>
        <td className="sticky-col">
          <input
            type="checkbox"
            className="form-check-input"
            checked={exercise.isSelected || false}
            onChange={() => handleCheckboxChange(exercise._id)}
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
        <td>{exercise.exerciseSubject}</td>
        <td>{exercise.coordinator}</td>
        <td>{exercise.exerciseType}</td>
        <td>{new Date(exercise.startDateTime).toLocaleString()}</td>
        <td>{new Date(exercise.endDateTime).toLocaleString()}</td>
        <td>{exercise.businessEntity}</td>
        <td>{exercise.description}</td>
        <td>{exercise.successCriteria}</td>
        <td>{exercise.participants}</td>
        <td>{exercise.teams}</td>
        <td>{exercise.processes}</td>
        <td>{exercise.locations}</td>
        <td>{exercise.applications}</td>
        <td>{exercise.vendors}</td>
        <td>{exercise.plans}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="17" className="text-center">
        No data available
      </td>
    </tr>
  )}
</tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Exercises;