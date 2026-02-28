import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { LuRefreshCw, LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaPrint, FaHouse, FaFilter, FaRegFilePdf, FaRegTrashCan, FaTableColumns } from "react-icons/fa6";
import { TiExport, TiPlus } from "react-icons/ti";
import { ImCopy } from "react-icons/im";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiEdit } from "react-icons/ci"; 
import { RiDeleteBin6Line } from "react-icons/ri";
import Toastify from "toastify-js";

function BIA() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [biaData, setBiaData] = useState([]);  // Store API data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectAll, setSelectAll] = useState(false); // State for select all checkbox
  const [draggedColumn, setDraggedColumn] = useState(null);
  //pagination
 const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState(1);
  const itemsPerPage = 10;

  const [columns, setColumns] = useState([
    { id: 'select', label: '', width: 50, draggable: false },
    { id: 'actions', label: 'Actions', width: 100, draggable: false },
    { id: 'department', label: 'Department', width: 200, draggable: true },
    { id: 'biaEditor', label: 'BIA Editor', width: 200, draggable: true },
    { id: 'division', label: 'Division', width: 200, draggable: true },
    { id: 'approvalGroup', label: 'Approval Group', width: 200, draggable: true },
    { id: 'group', label: 'Group', width: 200, draggable: true },
    { id: 'respondents', label: 'Respondents', width: 200, draggable: true },
    { id: 'generalManager', label: 'General Manager', width: 200, draggable: true },
    { id: 'bcmChampionPrimary', label: 'BCM Champion (Primary)', width: 200, draggable: true },
    { id: 'bcmChampionSecondary', label: 'BCM Champion (Secondary)', width: 200, draggable: true },
    { id: 'normalWorkingHours', label: 'Normal Working Hours', width: 200, draggable: true },
    { id: 'workBacklog', label: 'Work Backlog', width: 200, draggable: true },
    { id: 'financialImpact24H', label: 'Financial Impact 2-4H', width: 200, draggable: true },
    { id: 'financialImpact1D24H', label: 'Financial Impact 1D', width: 200, draggable: true },
    { id: 'financialImpact2D', label: 'Financial Impact 2D', width: 200, draggable: true },
    { id: 'financialImpact3D', label: 'Financial Impact 3D', width: 200, draggable: true },
    { id: 'financialImpact1W', label: 'Financial Impact 1W', width: 200, draggable: true },
    { id: 'regulatoryImpact2D', label: 'Regulatory Impact 2D', width: 200, draggable: true },
    { id: 'regulatoryImpact3D', label: 'Regulatory Impact 3D', width: 200, draggable: true },
    { id: 'regulatoryImpact1W', label: 'Regulatory Impact 1W', width: 200, draggable: true },
    { id: 'reputationalImpact02H', label: 'Reputational Impact 0-2H', width: 200, draggable: true },
    { id: 'reputationalImpact24H', label: 'Reputational Impact 2-4H', width: 200, draggable: true },
    { id: 'reputationalImpact1W', label: 'Reputational Impact 1W', width: 200, draggable: true },
    { id: 'reputationalImpact3D', label: 'Reputational Impact 3D', width: 200, draggable: true },
    { id: 'legalImpact02H', label: 'Legal Impact 0-2H', width: 200, draggable: true },
    { id: 'legalImpact24H', label: 'Legal Impact 2-4H', width: 200, draggable: true },
    { id: 'legalImpact1D24H', label: 'Legal Impact 1D', width: 200, draggable: true },
    { id: 'legalImpact2D', label: 'Legal Impact 2D', width: 200, draggable: true },
    { id: 'legalImpact3D', label: 'Legal Impact 3D', width: 200, draggable: true },
    { id: 'legalImpact1W', label: 'Legal Impact 1W', width: 200, draggable: true }
  ]);

  const [visibleColumns, setVisibleColumns] = useState({
    department: true,
    biaEditor: true,
    division: true,
    approvalGroup: true,
    group: true,
    respondents: true,
    generalManager: true,
    bcmChampionPrimary: true,
    bcmChampionSecondary: true,
    normalWorkingHours: true,
    workBacklog: true,
    financialImpact24H: true,
    financialImpact1D24H: true,
    financialImpact2D: true,
    financialImpact3D: true,
    financialImpact1W: true,
    regulatoryImpact2D: true,
    regulatoryImpact3D: true,
    regulatoryImpact1W: true,
    reputationalImpact02H: true,
    reputationalImpact24H: true,
    reputationalImpact1W: true,
    reputationalImpact3D: true,
    legalImpact02H: true,
    legalImpact24H: true,
    legalImpact1D24H: true,
    legalImpact2D: true,
    legalImpact3D: true,
    legalImpact1W: true
  });

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleToolDropDown = () => setIsToolOpen(!isToolOpen);
  const ColumnDropDown = () => setIsColumnOpen(!isColumnOpen);

  const resetColumns = () => {
    setVisibleColumns({
      department: true,
      biaEditor: true,
      division: true,
      approvalGroup: true,
      group: true,
      respondents: true,
      generalManager: true,
      bcmChampionPrimary: true,
      bcmChampionSecondary: true,
      normalWorkingHours: true,
      workBacklog: true,
      financialImpact24H: true,
      financialImpact1D24H: true,
      financialImpact2D: true,
      financialImpact3D: true,
      financialImpact1W: true,
      regulatoryImpact2D: true,
      regulatoryImpact3D: true,
      regulatoryImpact1W: true,
      reputationalImpact02H: true,
      reputationalImpact24H: true,
      reputationalImpact1W: true,
      reputationalImpact3D: true,
      legalImpact02H: true,
      legalImpact24H: true,
      legalImpact1D24H: true,
      legalImpact2D: true,
      legalImpact3D: true,
      legalImpact1W: true
    });
  };
  //pagination
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = biaData.slice(indexOfFirstItem, indexOfLastItem);
  // Fetch API data when the component mounts
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/bia-dashboards`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setBiaData(data); 
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Handle select all checkbox change
  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setBiaData(biaData.map(bia => ({ ...bia, isSelected: !selectAll })));
  };

  // Handle individual checkbox change
  const handleCheckboxChange = (id) => {
    setBiaData(biaData.map(bia => bia._id === id ? { ...bia, isSelected: !bia.isSelected } : bia));
  };

  // Column handlers
  const handleColumnToggle = (columnId) => {
    setVisibleColumns(prev => ({ ...prev, [columnId]: !prev[columnId] }));
  };

  const handleDragStart = (e, column) => {
    if (!column.draggable) return;
    setDraggedColumn(column);
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedColumn(null);
  };

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
  const handleRefresh = async () => {
    try {
      const button = document.querySelector('.refresh-button');
      if (button) {
        button.style.transform = 'rotate(360deg)';
      }
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/bia-dashboards`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setBiaData(data);
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
  //pagination start
  const handlePageInputChange = (e) => {
    const value = e.target.value;
    setPageInput(value);
  };

  const handlePageInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      const value = e.target.value;
      const numValue = parseInt(value);
      const maxPage = Math.ceil(biaData.length / itemsPerPage);

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
    const lastPage = Math.ceil(biaData.length / itemsPerPage);
    setCurrentPage(lastPage);
    setPageInput(lastPage);
  };

  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;
  const currentRows = biaData.slice(indexOfFirstRow, indexOfLastRow);
   //pagination end
  return (
    <React.Fragment>
      <Helmet>
        <title>BIA | TRST</title>
      </Helmet>

      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">BIA</div>
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
              <span className="header-title">BIA Information</span>
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
                      All BIAs <BiSolidEdit className="hw-15 ml-20px" />
                      <FaTableColumns className="hw-15 ml-5px" />
                      <ImCopy className="hw-15 ml-5px" />
                    </a>
                  </li>
                  <span className="ms-1">Select Another View...</span>
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
                <FaHouse className="hw-15" />
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
              <NavLink className="button1 border-1" to="/new-bia">
                <TiPlus className="hw-20" />
                BIA
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
          <div style={{ width: "100%", overflowX: "auto" }}>
            <div style={{ maxHeight: "590px", overflowY: "auto", border: "1px solid #ccc" }}>
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
      <span className="mx-2">of {Math.ceil(biaData.length / itemsPerPage)}</span>
      
      <button 
        className="btn btn-sm btn-outline-secondary" 
        onClick={handleNextPage}
        disabled={currentPage === Math.ceil(biaData.length / itemsPerPage)}
      >{">"}</button>
      
      <button 
        className="btn btn-sm btn-outline-secondary" 
        onClick={handleLastPage}
        disabled={currentPage === Math.ceil(biaData.length / itemsPerPage)}
      >{">>"}</button>
    </div>

    <span className="ms-2 fw-bold">
      {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, biaData.length)} of {biaData.length} items
    </span>
  </div>
</div>
 {/*  //pagination end div */}
              <table className="table table-bordered mt-3" style={{ minWidth: "2600px" }}>
                <thead>
                  <tr>
                    <th style={{ width: "40px" }}>
                      <input
                        type="checkbox"
                        checked={biaData.length > 0 && biaData.every((bia) => bia.isSelected)}
                        onChange={handleSelectAllChange}
                        className="form-check-input"
                      />
                    </th>
                    <th style={{ width: "100px" }} className="text-center">Actions</th>
                    {columns.filter(col => visibleColumns[col.id]).map(column => (
                      <th
                        key={column.id}
                        style={{ width: column.width }}
                        draggable={column.draggable}
                        onDragStart={(e) => handleDragStart(e, column)}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, column)}
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
  {currentRows.length > 0 ? (
    currentRows.map((bia) => (
      <tr key={bia._id}>
        <td>
          <input
            type="checkbox"
            className="form-check-input"
            checked={bia.isSelected || false}
            onChange={() => handleCheckboxChange(bia._id)}
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
        {columns.filter(col => visibleColumns[col.id]).map(column => (
          <td key={column.id}>{bia[column.id]}</td>
        ))}
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={columns.length} className="text-center">
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

export default BIA;
