import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, NavLink } from "react-router-dom";
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

function RiskAssessments() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [riskAssessments, setRiskAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectAll, setSelectAll] = useState(false); // State for select all checkbox

 
  const [columns, setColumns] = useState([
    { id: "riskThreatAssessment", label: "Risk/Threat Assessment", draggable: true },
    { id: "editors", label: "Editors", draggable: true },
    { id: "assessmentDate", label: "Risk Assessment Date", draggable: true },
    { id: "facilitator", label: "Facilitator", draggable: true },
    { id: "locations", label: "Locations", draggable: true },
  ]);
  
 const [visibleColumns, setVisibleColumns] = useState({
  riskThreatAssessment: true,
  editors: true,
  assessmentDate: true,
  facilitator: true,
  locations: true,
  });
const [draggedColumn, setDraggedColumn] = useState(null);
 // Column handlers
 const handleColumnToggle = (columnId) => {
  setVisibleColumns(prev => ({ ...prev, [columnId]: !prev[columnId] }));
};

const resetColumns = () => {
  setVisibleColumns({
    riskThreatAssessment: true,
  editors: true,
  assessmentDate: true,
  facilitator: true,
  locations: true,
  });
};

  // Drag and drop handlers
  const handleDragStart = (e, column) => {
    if (!column.draggable) return;
    setDraggedColumn(column);
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedColumn(null);
  };

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page
  };

  const paginatedRiskAssessments = riskAssessments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(riskAssessments.length / itemsPerPage);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    if (!draggedColumn || !targetColumn.draggable) return;

    const newColumns = [...columns];
    const draggedIdx = columns.findIndex(col => col.id === draggedColumn.id);
    const targetIdx = columns.findIndex(col => col.id === targetColumn.id);

    newColumns.splice(draggedIdx, 1);
    newColumns.splice(targetIdx, 0, draggedColumn);

    setColumns(newColumns);
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

  const fetchRiskAssessments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/risk-assessments`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setRiskAssessments(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleRefresh = async () => {
    try {
      document.querySelector(".refresh-button").classList.add("rotate");
      await fetchRiskAssessments();
      Toastify({ text: "Data refreshed successfully!", duration: 3000, gravity: "top", position: "right", style: { background: "#28a745" } }).showToast();
    } catch {
      Toastify({ text: "Error refreshing data", duration: 3000, gravity: "top", position: "right", style: { background: "#dc3545" } }).showToast();
    } finally {
      setTimeout(() => document.querySelector(".refresh-button").classList.remove("rotate"), 500);
    }
  };

  // Handle select all checkbox change
  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setRiskAssessments(riskAssessments.map(assessment => ({ ...assessment, isSelected: !selectAll })));
  };

  // Handle individual checkbox change
  const handleCheckboxChange = (id) => {
    setRiskAssessments(riskAssessments.map(assessment => assessment._id === id ? { ...assessment, isSelected: !assessment.isSelected } : assessment));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Risk Assessments | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Risk Assessments</div>
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
                <FaHome className="hw-15" />
              </button>
              <button className="button border-1 ms-1 refresh-button" onClick={handleRefresh} title="Refresh data">
                             <LuRefreshCw className="hw-18" />
                           </button>
                 <span className="dropdown">
                              <button
                                className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                                type="button"
                                onClick={() => setIsColumnOpen(!isColumnOpen)}
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
                                  <span className="fw-bold">Columns</span>
                                  <a className="blue" onClick={resetColumns} style={{ cursor: 'pointer' }}>Reset</a>
                                </li>
                                {columns.filter(col => col.draggable).map(column => (
                                  <li key={column.id} className="dropdown-checkbox">
                                    <label>
                                      <input
                                        type="checkbox"
                                        className="ms-2 me-1"
                                        checked={visibleColumns[column.id]}
                                        onChange={() => handleColumnToggle(column.id)}
                                      />
                                      {column.label}
                                    </label>
                                  </li>
                                ))}
                              </ul>
                            </span>
              <button className="button border-1 ms-1">
                <FaFilter className="hw-15" />
              </button>
            </div>
            <div>
              <NavLink className="button1 border-1" to="/new-risk-assessments">
                <TiPlus className="hw-20" />
                Risk/Threat Assessments
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

          {/* /* Show loading and error messages */} 
                {loading && <p>Loading data...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {/* /* Display data in a table */ }
                      <div style={{ width: "100%", overflowX: "auto" }}>
                      <div style={{ height: "500px", overflowY: "auto", border: "1px solid #ccc" }}>
                        <table className="table table-bordered mt-3" style={{ minWidth: "2800px", height: "300px" }}>
                        <thead>
                          <tr>
                          <th className="sticky-col">
                            <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} />
                          </th>
                          <th className="sticky-col" style={{ width: "10%", overflowX: "auto" }}>Action</th>
                          {columns.filter(col => visibleColumns[col.id]).map(column => (
                            <th
                            key={column.id}
                            style={{ width: column.width }}
                            draggable={column.draggable}
                            onDragStart={(e) => handleDragStart(e, column)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, column)}
                            onDragEnd={handleDragEnd}
                            >
                            {column.label}
                            </th>
                          ))}
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedRiskAssessments.length > 0 ? (
                          paginatedRiskAssessments.map((assessment) => (
                            <tr key={assessment._id}>
                            <td className="sticky-col">
                              <input
                              type="checkbox"
                              className="form-check-input"
                              checked={assessment.isSelected || false}
                              onChange={() => handleCheckboxChange(assessment._id)}
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
                            {visibleColumns.riskThreatAssessment && <td>{assessment.riskThreatAssessment}</td>}
                            {visibleColumns.editors && <td>{assessment.editors}</td>}
                            {visibleColumns.assessmentDate && <td>{formatDate(assessment.assessmentDate)}</td>}
                            {visibleColumns.facilitator && <td>{assessment.facilitator}</td>}
                            {visibleColumns.locations && <td>{assessment.locations}</td>}
                            {visibleColumns.respondents && <td>{assessment.respondents}</td>}
                            {visibleColumns.updatedAt && <td>{formatDate(assessment.updatedAt)}</td>}
                            </tr>
                          ))
                          ) : (
                          <tr>
                            <td colSpan="10" className="text-center">
                            No data available
                            </td>
                          </tr>
                          )}
                        </tbody>
                        </table>
                      </div>
                      </div>

                      {/* Pagination controls */}
          {riskAssessments.length > itemsPerPage && (
            <div className="pagination-wrapper">
              <div className="d-flex align-items-center gap-3 p-2 justify-content-between">
                <div className="d-flex align-items-center">
                  <button 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                  >{"<<"}</button>
                  <button 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >{"<"}</button>
                  <span className="mx-2">Page</span>
                  <input
                    type="text"
                    className="form-control page-input"
                    value={currentPage}
                    onChange={(e) => handlePageChange(Number(e.target.value))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handlePageChange(Number(e.target.value));
                      }
                    }}
                    onBlur={(e) => {
                      const page = Number(e.target.value);
                      if (page > 0 && page <= totalPages) {
                        handlePageChange(page);
                      }
                    }}
                  />
                  <span className="mx-2">of {totalPages}</span>
                  <button 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >{">"}</button>
                  <button 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                  >{">>"}</button>
                </div>
                <div>
                  <span>Items per page:</span>
                  <select
                    className="form-select"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
            </div>
          )}
   
        </div>
      </div>
    </React.Fragment>
  );
}

export default RiskAssessments;