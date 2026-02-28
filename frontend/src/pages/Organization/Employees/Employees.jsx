import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import LoadingSpinner from "../../../Components/Common/LoadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Employees.css";


function Employees() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const { layoutMode } = useSelector(state => ({
    layoutMode: state.Layout.layoutMode
  }));
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    employee: true,
    firstName: true,
    lastName: true,
    employeeID: true,
    workEmailAddress: true,
    homePhoneNumber: true,
    workMobilePhone: true,
    workPhone: true,
    personalMobilePhone: true,
    department: true,
    portalUser: true,
    portalLoginName: true,
    updatedAt: true,
    updatedBy: true
  });

  const [columns, setColumns] = useState([
    { id: 'checkbox', label: '', draggable: false },
    { id: 'actions', label: 'Actions', draggable: false },
    { id: 'id', label: 'ID', draggable: true },
    { id: 'employee', label: 'Employee', draggable: true },
    { id: 'firstName', label: 'First Name', draggable: true },
    { id: 'lastName', label: 'Last Name', draggable: true },
    { id: 'employeeID', label: 'Employee ID', draggable: true },
    { id: 'workEmailAddress', label: 'Work Email Address', draggable: true },
    { id: 'homePhoneNumber', label: 'Home Phone Number', draggable: true },
    { id: 'workMobilePhone', label: 'Work Mobile Phone', draggable: true },
    { id: 'workPhone', label: 'Work Phone', draggable: true },
    { id: 'personalMobilePhone', label: 'Personal Mobile Phone', draggable: true },
    { id: 'department', label: 'Department', draggable: true },
    { id: 'portalUser', label: 'Portal User', draggable: true },
    { id: 'portalLoginName', label: 'Portal Login Name', draggable: true },
    { id: 'updatedAt', label: 'Updated At', draggable: true },
    { id: 'updatedBy', label: 'Updated By', draggable: true }
  ]);

  const [draggedColumn, setDraggedColumn] = useState(null);

  // Add this state for column widths
  const [columnWidths, setColumnWidths] = useState({
    checkbox: 40,
    actions: 100,
    id: 150,
    employee: 200,
    firstName: 150,
    lastName: 150,
    employeeID: 120,
    workEmailAddress: 200,
    homePhoneNumber: 200,
    workMobilePhone: 200,
    workPhone: 150,
    personalMobilePhone: 200,
    department: 200,
    portalUser: 120,
    portalLoginName: 150,
    updatedAt: 180,
    updatedBy: 150
  });

  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleToolDropDown = () => {
    setIsToolOpen(!isToolOpen);
  };
  const ColumnDropDown = () => {
    setIsColumnOpen(!isColumnOpen);
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/employees/all`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched employees data:', data); // Log the data

      if (Array.isArray(data.data.employees)) {
        setEmployees(data.data.employees); // Set the employees state
      } else {
        console.error("Expected an array but got:", data.data.employees);
        setEmployees([]); // Reset to empty array if not valid
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };
  // console.log("Employees state:", employees); // Log the employees state

  const handleEdit = (employeeId) => {
    navigate(`/employees/edit/${employeeId}`);
  };

  const handleDelete = async (employeeId) => {
    if (window.confirm(`Are you sure you want to delete this employee?`)) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/api/v1/employees/${employeeId}`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        loadEmployees(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => {
      if (id === "all") {
        return prev.length === employees.length
          ? []
          : employees.map((employee) => employee._id);
      }
      return prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
    });
  };

  const handleBulkDelete = async () => {
    if (checkedItems.length === 0) return;

    if (
      window.confirm(
        `Are you sure you want to delete ${checkedItems.length} selected item(s)?`
      )
    ) {
      try {
        // Delete all checked items
        await Promise.all(
          checkedItems.map((id) =>
            axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/employees/${id}`, {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            })
          )
        );

        // Clear checked items and refresh the list
        setCheckedItems([]);
        loadEmployees(); // Refresh the employee list
      } catch (error) {
        console.error("Error deleting employees:", error);
      }
    }
  };

  const handleRefresh = () => {
    loadEmployees();
  };

  const handlePageInputChange = (e) => {
    const value = e.target.value;
    setPageInput(value);
    
    if (e.key === 'Enter' || e.type === 'blur') {
      const numValue = parseInt(value);
      const maxPage = Math.ceil(employees.length / itemsPerPage);
      
      if (value === '' || isNaN(numValue) || numValue < 1) {
        setCurrentPage(1);
        setPageInput(1);
      }
      else if (numValue > maxPage) {
        setCurrentPage(maxPage);
        setPageInput(maxPage);
      }
      else {
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
    const lastPage = Math.ceil(employees.length / itemsPerPage);
    setCurrentPage(lastPage);
    setPageInput(lastPage);
  };

  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;
  const currentRows = employees.slice(indexOfFirstRow, indexOfLastRow);

  const handleColumnToggle = (columnName) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnName]: !prev[columnName]
    }));
  };

  const resetColumns = () => {
    setVisibleColumns({
      id: true,
      employee: true,
      firstName: true,
      lastName: true,
      employeeID: true,
      workEmailAddress: true,
      homePhoneNumber: true,
      workMobilePhone: true,
      workPhone: true,
      personalMobilePhone: true,
      department: true,
      portalUser: true,
      portalLoginName: true,
      updatedAt: true,
      updatedBy: true
    });
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

  // Add resize handlers
  const handleResizeStart = (e, columnId) => {
    e.preventDefault();
    
    const startX = e.pageX;
    const startWidth = columnWidths[columnId];

    const handleMouseMove = (moveEvent) => {
      const newWidth = Math.max(50, startWidth + (moveEvent.pageX - startX));
      setColumnWidths(prev => ({
        ...prev,
        [columnId]: newWidth
      }));
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedEmployees(employees.map(emp => emp._id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelect = (employeeId) => {
    setSelectedEmployees(prev => {
      if (prev.includes(employeeId)) {
        return prev.filter(id => id !== employeeId);
      } else {
        return [...prev, employeeId];
      }
    });
  };

  const handleDeleteSelected = async () => {
    if (window.confirm('Are you sure you want to delete selected employees?')) {
      try {
        await Promise.all(
          selectedEmployees.map(id => 
            axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/employees/${id}`, {
              withCredentials: true
            })
          )
        );
        loadEmployees();
        setSelectedEmployees([]);
        setSelectAll(false);
      } catch (error) {
        console.error('Error deleting employees:', error);
      }
    }
  };
const handleView = (employeeId) => {
  navigate(`/employees/view/${employeeId}`);
};
  return (
    <React.Fragment>
      <Helmet>
        <title>Employees Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content" data-bs-theme={layoutMode}>
        <div className="maincontent">
          <div className="main-content1">
            <div className="d-flex align-items-center justify-content-between">
              <div className="header-text">Employees</div>
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
                        <BiSolidEdit
                          style={{
                            width: "15px",
                            height: "15px",
                            marginRight: "5px",
                          }}
                        />
                        Design this page
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <FcSettings
                          style={{
                            width: "15px",
                            height: "15px",
                            marginRight: "5px",
                          }}
                        />
                        Object Definition
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <LuTableOfContents
                          style={{
                            width: "15px",
                            height: "15px",
                            marginRight: "5px",
                          }}
                        />
                        tab Definition
                      </a>
                    </li>
                    <div className="border-1"></div>
                    <li>
                      <a className="dropdown-item" href="#">
                        <FaPrint
                          style={{
                            width: "15px",
                            height: "15px",
                            marginRight: "5px",
                          }}
                        />
                        Print
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <FaRegFilePdf
                          style={{
                            width: "15px",
                            height: "15px",
                            marginRight: "5px",
                          }}
                        />
                        PDF
                      </a>
                      <div className="border-1"></div>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <LuClock9
                          style={{
                            width: "15px",
                            height: "15px",
                            marginRight: "5px",
                          }}
                        />
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
                <span className="header-title">Business Entity List </span>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle border-radius-2"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded={isOpen}
                    onClick={toggleDropdown}
                  >
                    All Employees <IoMdArrowDropdown className="hw-20" />
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
                        <TiPlus
                          style={{
                            width: "15px",
                            height: "15px",
                            marginBottom: "2px",
                          }}
                        />
                        Create New View
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        <IoMdArrowDropright className="hw-20" />
                        All Employees{" "}
                        <BiSolidEdit
                          style={{
                            width: "15px",
                            height: "15px",
                            marginLeft: "20px",
                          }}
                        />
                        <FaTableColumns
                          style={{
                            width: "15px",
                            height: "15px",
                            marginLeft: "5px",
                          }}
                        />
                        <ImCopy
                          style={{
                            width: "15px",
                            height: "15px",
                            marginLeft: "5px",
                          }}
                        />
                      </a>
                    </li>
                    <span className="ms-1">Select Another View...</span>
                    <li>
                      <a className="dropdown-item" href="#">
                        All Active Employees
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
                        Data Migration
                      </a>
                    </li>
                  </ul>
                </div>
                <button className="button border-1 ms-1">
                  <FaHome className="hw-15" />
                </button>
                <button
                  className="button border-1 ms-1"
                  onClick={handleRefresh}
                  style={{ border: 'none', cursor: 'pointer' }}
                >
                  <LuRefreshCw className="hw-15" />
                </button>
                <span className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                    type="button"
                    id="columnDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded={isColumnOpen}
                    onClick={ColumnDropDown}
                  >
                    <FaTableColumns className="hw-14" />
                  </button>
                  <ul style={{'--vz-dropdown-min-width': '13rem'}} className={`dropdown-menu ${isColumnOpen ? "show" : ""}`}>
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
              <div className="d-flex align-items-center">
                <NavLink className="button1 border-1" to="/new-employee">
                  <TiPlus className="hw-20" />
                  Employees
                </NavLink>
                <button
                  className="button border-1 ms-1"
                  style={{
                    opacity: selectedEmployees.length > 0 ? 1 : 0.5,
                    cursor: selectedEmployees.length > 0 ? "pointer" : "default",
                  }}
                  onClick={handleDeleteSelected}
                  disabled={selectedEmployees.length === 0}
                >
                  <FaRegTrashCan className="hw-20" />
                </button>
                <button className="button border-1 ms-1">
                  <TiExport className="hw-20" />
                </button>
                <button className="button border-1 ms-1">
                  <HiDotsHorizontal className="hw-20" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="border-1 mb-2 mt-2"></div>

        <div className="table-container">
          {loading && <LoadingSpinner />}
          
          {employees.length > itemsPerPage && (
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
                    onKeyDown={handlePageInputChange}
                    onBlur={handlePageInputChange}
                  />
                  <span className="mx-2">of {Math.ceil(employees.length / itemsPerPage)}</span>
                  <button 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(employees.length / itemsPerPage)}
                  >{">"}</button>
                  <button 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={handleLastPage}
                    disabled={currentPage === Math.ceil(employees.length / itemsPerPage)}
                  >{">>"}</button>
                </div>
                <span className="ms-2 fw-bold">
                  {indexOfFirstRow + 1} - {Math.min(indexOfLastRow, employees.length)} of {employees.length} items
                </span>
              </div>
            </div>
          )}

          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="form-check-input"
                    />
                  </th>
                  <th style={{ width: '100px' }} className="text-center">Actions</th>
                  {columns.filter(col => col.draggable && visibleColumns[col.id]).map(column => (
                    <th
                      key={column.id}
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, column)}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, column)}
                      style={{ 
                        width: `${columnWidths[column.id]}px`,
                        position: 'relative'
                      }}
                    >
                      {column.label}
                      <div
                        className="resize-handle"
                        onMouseDown={(e) => handleResizeStart(e, column.id)}
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentRows.map((employee) => (
                  <tr 
                    key={employee._id}
                    className={selectedEmployees.includes(employee._id) ? 'selected-row' : ''}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(employee._id)}
                        onChange={() => handleSelect(employee._id)}
                        className="form-check-input"
                      />
                    </td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-2 justify-content-center">
                        <button
                          className="btn btn-sm btn-link p-0"
                          onClick={() => handleEdit(employee._id)}
                          title="Edit"
                        >
                          <CiEdit style={{ cursor: "pointer", fontSize: "1.2em", color:'green' }} size={18} />
                        </button>
                        <button
                          className="btn btn-sm btn-link p-0"
                          onClick={() => handleDelete(employee._id)}
                          title="Delete"
                        >
                          <RiDeleteBin6Line className="text-danger" size={18} />
                        </button>
                      </div>
                    </td>
                    {columns.filter(col => col.draggable && visibleColumns[col.id]).map(column => (
                      <td key={`${employee._id}-${column.id}`}>
                        {column.id === 'id' && employee._id}
                        {column.id === 'firstName' && employee.firstName}
                        <NavLink to={`/employees/view/${employee._id}`}>
  {column.id === 'employee' && `${employee.firstName} ${employee.lastName}`}
</NavLink>
                        
                        {column.id === 'firstName' && employee.firstName}
                        {column.id === 'lastName' && employee.lastName}
                        {column.id === 'employeeID' && employee.employeeID}
                        {column.id === 'workEmailAddress' && (employee.workEmailAddress || "-")}
                        {column.id === 'homePhoneNumber' && (employee.homePhoneNumber || "-")}
                        {column.id === 'workMobilePhone' && (employee.workMobilePhone || "-")}
                        {column.id === 'workPhone' && (employee.workPhone || "-")}
                        {column.id === 'personalMobilePhone' && (employee.personalMobilePhone || "-")}
                        {column.id === 'department' && (employee.departmentNames?.join(", ") || "-")}
                        {column.id === 'portalUser' && (
                          <span className={`badge ${employee.portalUser ? 'bg-success' : 'bg-secondary'}`}>
                            {employee.portalUser ? "Yes" : "No"}
                          </span>
                        )}
                        {column.id === 'portalLoginName' && (employee.portalLoginName || "-")}
                        {column.id === 'updatedAt' && (
                          employee.updatedAt ? 
                          new Date(employee.updatedAt).toLocaleString() : 
                          "-"
                        )}
                        {column.id === 'updatedBy' && (employee.updatedBy || "-")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {employees.length > itemsPerPage && (
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
                    onKeyDown={handlePageInputChange}
                    onBlur={handlePageInputChange}
                  />
                  <span className="mx-2">of {Math.ceil(employees.length / itemsPerPage)}</span>
                  <button 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(employees.length / itemsPerPage)}
                  >{">"}</button>
                  <button 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={handleLastPage}
                    disabled={currentPage === Math.ceil(employees.length / itemsPerPage)}
                  >{">>"}</button>
                </div>
                <span className="ms-2 fw-bold">
                  {indexOfFirstRow + 1} - {Math.min(indexOfLastRow, employees.length)} of {employees.length} items
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Employees;