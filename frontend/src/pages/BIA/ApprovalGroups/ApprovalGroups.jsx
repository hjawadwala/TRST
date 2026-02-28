import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { LuRefreshCw, LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaPrint, FaHome, FaFilter, FaRegFilePdf } from "react-icons/fa";
import { TiExport, TiPlus } from "react-icons/ti";
import { FaRegTrashCan, FaTableColumns } from "react-icons/fa6";
import { ImCopy } from "react-icons/im";
import { HiDotsHorizontal } from "react-icons/hi";
import axios from "axios";
import { Table, Alert } from "reactstrap";
import { CiEdit } from "react-icons/ci"; 
import { RiDeleteBin6Line } from "react-icons/ri";
import Toastify from "toastify-js";

function ApprovalGroups() {
  // State Management
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [approvalGroups, setApprovalGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectAll, setSelectAll] = useState(false); // State for select all checkbox
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  //drag and drop
  const [columnWidths, setColumnWidths] = useState({});
    const [draggedColumn, setDraggedColumn] = useState(null);
    const [showClientModal, setShowClientModal] = useState(false);
    const [selectedClients, setSelectedClients] = useState([]);
  //fied selection names
  const [columns, setColumns] = useState([
    { id: 'select', label: '', width: 50, draggable: false },
    { id: 'actions', label: 'Actions', width: 100, draggable: false },
    { id: 'approvalGroup', label: 'Approval Group', width: 200, draggable: true },
    { id: 'groupDescription', label: 'Group Description', width: 250, draggable: true },
    { id: 'createdAt', label: 'Created At', width: 200, draggable: true },
    { id: 'updatedAt', label: 'Updated At', width: 200, draggable: true },
  ]);
  const [visibleColumns, setVisibleColumns] = useState({
    approvalGroup: true,
    groupDescription: true,
    createdAt: true,
    updatedAt: true,
  });

  // Fetch Data from API
  const fetchApprovalGroups = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/approval-groups`);
      if (response.data && Array.isArray(response.data.data)) {
        setApprovalGroups(response.data.data);
      } else if (response.data && Array.isArray(response.data)) {
        setApprovalGroups(response.data);
      } else {
        console.warn("⚠️ Unexpected response format:", response.data);
        setApprovalGroups([]);
      }
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setError("Failed to fetch approval groups. Check the API.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApprovalGroups();
  }, []);

  // Handle select all checkbox change
  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setApprovalGroups(approvalGroups.map(group => ({ ...group, isSelected: !selectAll })));
  };

  // Handle individual checkbox change
  const handleCheckboxChange = (id) => {
    setApprovalGroups(approvalGroups.map(group => group._id === id ? { ...group, isSelected: !group.isSelected } : group));
  };

  const handleRefresh = async () => {
    try {
      const button = document.querySelector('.refresh-button');
      if (button) {
        button.style.transform = 'rotate(360deg)';
      }
      await fetchApprovalGroups();
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

  // Column handlers
  const handleColumnToggle = (columnId) => {
    setVisibleColumns(prev => ({ ...prev, [columnId]: !prev[columnId] }));
  };

  const resetColumns = () => {
    setVisibleColumns({
      approvalGroup: true,
      groupDescription: true,
      createdAt: true,
      updatedAt: true,
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

  // Pagination
  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;
  const filteredApprovalGroups = approvalGroups.filter(group =>
    group.approvalGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.groupDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentApprovalGroups = filteredApprovalGroups.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleNextPage = () => setCurrentPage(prev => prev + 1);
  const handlePrevPage = () => setCurrentPage(prev => prev - 1);
  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(Math.ceil(filteredApprovalGroups.length / itemsPerPage));
  const ColumnDropDown = () => {
    setIsColumnOpen(!isColumnOpen);
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>Approval Groups Page | TRST</title>
        <meta name="description" content="Approval Groups management page." />
        <meta name="keywords" content="approval, groups, management, react" />
      </Helmet>

      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Approval Groups</div>
            <div className="map-action k-widget k-button-group order-1">
              <span className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                  type="button"
                  aria-expanded={isToolOpen}
                  onClick={() => setIsToolOpen(!isToolOpen)}
                >
                  <HiMiniWrench className="wh-16" />
                </button>
                <ul className={`right-auto dropdown-menu ${isToolOpen ? "show" : ""}`}>
                  <li><a className="dropdown-item" href="#"><BiSolidEdit className="hw-15 mr-5px" /> Design this page</a></li>
                  <li><a className="dropdown-item" href="#"><FcSettings className="hw-15 mr-5px" /> Object Definition</a></li>
                  <li><a className="dropdown-item" href="#"><LuTableOfContents className="hw-15 mr-5px" /> Tab Definition</a></li>
                  <li><a className="dropdown-item" href="#"><FaPrint className="hw-15 mr-5px" /> Print</a></li>
                  <li><a className="dropdown-item" href="#"><FaRegFilePdf className="hw-15 mr-5px" /> PDF</a></li>
                  <li><a className="dropdown-item" href="#"><LuClock9 className="hw-15 mr-5px" /> Page Load Time</a></li>
                </ul>
              </span>
            </div>
          </div>
        </div>

        <div className="main-content2 pt-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <span className="header-title">BIA Approval Groups</span>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-2"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  All Approval Groups <IoMdArrowDropdown className="hw-20" />
                </button>
                <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
                  <li><a className="dropdown-item" href="#"><TiPlus className="mb-2px hw-15" /> Create New View</a></li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <IoMdArrowDropright className="hw-20" /> All Approval Groups <BiSolidEdit className="hw-15 ml-20px" />
                    </a>
                  </li>
                </ul>
              </div>
              <button className="button border-1 ms-1"><FaHome className="hw-15" /></button>
              <button 
                className="button border-1 ms-1 refresh-button"
                onClick={handleRefresh}
                title="Refresh data"
              >
                <LuRefreshCw className="hw-18" />
              </button>
              <span className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                  type="button"
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
              <button className="button border-1 ms-1"><FaFilter className="hw-15" /></button>
            </div>
            <div>
              <NavLink className="button1 border-1" to="/new-approval-groups">
                <TiPlus className="hw-20" /> Approval Group
              </NavLink>
              <button className="button border-1 ms-1"><FaRegTrashCan className="hw-18" /></button>
              <button className="button border-1 ms-1"><TiExport className="hw-20" /></button>
              <button className="button border-1 ms-1"><HiDotsHorizontal className="hw-20" /></button>
            </div>
          </div>

          <div className="border-1 mt-2 mb-2"></div>
          
          <div style={{ width: "100%", overflowX: "auto" }}>
            <div style={{ maxHeight: "590px", overflowY: "auto", border: "1px solid #ccc" }}>
            {filteredApprovalGroups.length > itemsPerPage && (
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
                              if (page > 0 && page <= Math.ceil(filteredApprovalGroups.length / itemsPerPage)) {
                                handlePageChange(page);
                              }
                            }}
                          />
                          <span className="mx-2">of {Math.ceil(filteredApprovalGroups.length / itemsPerPage)}</span>
                          <button 
                            className="btn btn-sm btn-outline-secondary" 
                            onClick={handleNextPage}
                            disabled={currentPage === Math.ceil(filteredApprovalGroups.length / itemsPerPage)}
                          >{">"}</button>
                          <button 
                            className="btn btn-sm btn-outline-secondary" 
                            onClick={handleLastPage}
                            disabled={currentPage === Math.ceil(filteredApprovalGroups.length / itemsPerPage)}
                          >{">>"}</button>
                        </div>
                        <span className="ms-2 fw-bold">
                          {indexOfFirstRow + 1} - {Math.min(indexOfLastRow, filteredApprovalGroups.length)} of {filteredApprovalGroups.length} items
                        </span>
                      </div>
                    </div>
                  )}
              {loading ? (
                <div>Loading...</div>
              ) : (
                <>
                
                  <div className="d-flex justify-content-between mb-2"></div>
                  <table className="table table-hover" style={{ minWidth: "100px" }}>
                    
                    <thead>
                      <tr>
                        <th className="sticky-col" style={{ width: "30px" }}>
                          <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} />
                        </th>
                        <th style={{ width: "70px" }} className="text-center">Actions</th>
                        
                        {/* {columns.filter(col => visibleColumns[col.id]).map(column => (
                          <th key={column.id} style={{ width: column.width }}>{column.label}</th>
                        ))} */}
                         {columns
                    .filter(col => col.id !== 'select' && col.id !== 'actions' && visibleColumns[col.id])
                    .map(column => (
                      <th 
                        key={column.id}
                        style={{ 
                          width: columnWidths[column.id] || column.width,
                          position: 'relative'
                        }}
                        draggable={column.draggable}
                        onDragStart={(e) => handleDragStart(e, column)}
                        onDragOver={(e) => handleDragOver(e)}
                        onDrop={(e) => handleDrop(e, column)}
                        onDragEnd={handleDragEnd}
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <span>{column.label}</span>
                          {column.id !== 'select' && column.id !== 'actions' && (
                            <div className="d-flex align-items-center">
                              <div
                                className="resize-handle"
                                onMouseDown={(e) => handleResizeStart(e, column.id)}
                              />
                            </div>
                          )}
                        </div>
                      </th>
                    ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentApprovalGroups.map((row) => (
                        <tr key={row._id}>
                          <td>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={row.isSelected || false}
                              onChange={() => handleCheckboxChange(row._id)}
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
                          {visibleColumns.approvalGroup && <td>{row.approvalGroup}</td>}
                          {visibleColumns.groupDescription && <td>{row.groupDescription}</td>}
                          {visibleColumns.createdAt && <td>{new Date(row.createdAt).toLocaleString()}</td>}
                          {visibleColumns.updatedAt && <td>{new Date(row.updatedAt).toLocaleString()}</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ApprovalGroups;