import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { LuRefreshCw, LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaPrint } from "react-icons/fa6";
import { FaHome, FaFilter, FaRegFilePdf, FaSearch } from "react-icons/fa";
import { TiExport, TiPlus } from "react-icons/ti";
import { FaRegTrashCan, FaTableColumns } from "react-icons/fa6";
import { ImCopy } from "react-icons/im";
import { HiDotsHorizontal } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
import axios from "axios";
import LoadingSpinner from "../../../../Components/Common/LoadingSpinner/LoadingSpinner";
import "./ClientContacts.css";
import Toastify from "toastify-js";

function ClientContacts() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [columns, setColumns] = useState([
    { id: 'select', label: '', width: 50, draggable: false },
    { id: 'actions', label: 'Actions', width: 100, draggable: false },
    { id: 'clientContacts', label: 'Client Contacts', width: 200, draggable: true },
    { id: 'title', label: 'Title', width: 250, draggable: true },
    { id: 'emailAddress', label: 'Email Address', width: 200, draggable: true },
    { id: 'workMobilePhone', label: 'Work Mobile Phone', width: 200, draggable: true },
    { id: 'workPhone', label: 'Work Phone', width: 150, draggable: true },
    { id: 'alternatePhone', label: 'Alternate Phone', width: 150, draggable: true },
  ]);
  const [visibleColumns, setVisibleColumns] = useState({
    clientContacts: true,
    title: true,
    emailAddress: true,
    workMobilePhone: true,
    workPhone: true,
    alternatePhone: true
  });
  const navigate = useNavigate();
  const [columnWidths, setColumnWidths] = useState({});
  const [draggedColumn, setDraggedColumn] = useState(null);
  const [showClientModal, setShowClientModal] = useState(false);
  const [selectedClients, setSelectedClients] = useState([]);

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/client-contacts/all`, {
        withCredentials: true
      });
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
    // Initialize visible columns based on the columns state
    const initialVisibleColumns = {};
    columns.forEach(column => {
      initialVisibleColumns[column.id] = true;
    });
    setVisibleColumns(initialVisibleColumns);
  }, []);

  // Column handlers
  const handleColumnToggle = (columnId) => {
    setVisibleColumns(prev => ({ ...prev, [columnId]: !prev[columnId] }));
  };

  const resetColumns = () => {
    setVisibleColumns({
      clientContacts: true,
      title: true,
      emailAddress: true,
      workMobilePhone: true,
      workPhone: true,
      alternatePhone: true
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

  // Resize handlers
  const handleResizeStart = (e, columnId) => {
    e.preventDefault();
    
    const startX = e.pageX;
    const startWidth = columnWidths[columnId] || columns.find(col => col.id === columnId).width;

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

  // Selection handlers
  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    setSelectedContacts(e.target.checked ? currentContacts.map(c => c._id) : []);
  };

  const handleSelect = (contactId) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId) 
        : [...prev, contactId]
    );
  };

  // Pagination
  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;
  const filteredContacts = (contacts || []).filter(contact => 
    `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.emailAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentContacts = filteredContacts.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleNextPage = () => setCurrentPage(prev => prev + 1);
  const handlePrevPage = () => setCurrentPage(prev => prev - 1);
  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(Math.ceil(filteredContacts.length / itemsPerPage));

  // Delete handlers
  const handleDelete = async (contactId) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/client-contacts/${contactId}`, {
        withCredentials: true
      });
      setContacts(prev => prev.filter(contact => contact._id !== contactId));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleDeleteSelected = async () => {
    if (window.confirm("Are you sure you want to delete selected contacts?")) {
      try {
        await Promise.all(
          selectedContacts.map(id => 
            axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/client-contacts/${id}`, {
              withCredentials: true
            })
          )
        );
        setContacts(prev => prev.filter(contact => !selectedContacts.includes(contact._id)));
        setSelectedContacts([]);
        setSelectAll(false);
      } catch (error) {
        console.error("Error deleting contacts:", error);
      }
    }
  };

  const handleClientSelect = (client) => {
    setSelectedClients(prev => {
      if (prev.some(c => c._id === client._id)) {
        return prev.filter(c => c._id !== client._id);
      }
      return [...prev, client];
    });
  };

  const handleClearAllClients = () => {
    setSelectedClients([]);
  };

  const handleEditClick = (contactId) => {
    navigate(`/client-contacts/edit/${contactId}`);
  };
  const handleDeleteClick = async (contactId) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/api/v1/client-contacts/${contactId}`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        fetchContacts(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    }
  };

  const handleRefresh = async () => {
    try {
      const button = document.querySelector('.refresh-button');
      if (button) {
        button.style.transform = 'rotate(360deg)';
      }
      await fetchContacts();
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

  const ColumnDropDown = () => {
    setIsColumnOpen(!isColumnOpen);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Client Contacts | TRST</title>
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Client Contacts</div>
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
                  onClick={() => setIsToolOpen(!isToolOpen)}
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
        <div className="main-content2 pt-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <span className="header-title">Client Contacts </span>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-2"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded={isOpen}
                  onClick={() => setIsOpen(!isOpen)}
                >
                All  Client Contacts <IoMdArrowDropdown className="hw-20" />
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
                      All Client Contacts <BiSolidEdit className="hw-15 ml-20px" />
                      <FaTableColumns className="hw-15 ml-5px" />
                      <ImCopy className="hw-15 ml-5px" />
                    </a>
                  </li>
                  <span className="ms-1">Select Another View...</span>
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
              <button className="button border-1 ms-1">
                <FaFilter className="hw-15" />
              </button>
            </div>
            <div>
              <NavLink className="button1 border-1" to="/new-client-contact">
                <TiPlus className="hw-20" />
                Client Contact
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
        </div>
        <div className="border-1 mt-2 mb-2"></div>
      
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="table-responsive">
              {/* Pagination */}
              {filteredContacts.length > 4 && (
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
                        if (page > 0 && page <= Math.ceil(filteredContacts.length / itemsPerPage)) {
                          handlePageChange(page);
                        }
                      }}
                    />
                    <span className="mx-2">of {Math.ceil(filteredContacts.length / itemsPerPage)}</span>
                    <button 
                      className="btn btn-sm btn-outline-secondary" 
                      onClick={handleNextPage}
                      disabled={currentPage === Math.ceil(filteredContacts.length / itemsPerPage)}
                    >{">"}</button>
                    <button 
                      className="btn btn-sm btn-outline-secondary" 
                      onClick={handleLastPage}
                      disabled={currentPage === Math.ceil(filteredContacts.length / itemsPerPage)}
                    >{">>"}</button>
                  </div>
                  <span className="ms-2 fw-bold">
                    {indexOfFirstRow + 1} - {Math.min(indexOfLastRow, filteredContacts.length)} of {filteredContacts.length} items
                  </span>
                </div>
              </div>
            )}
            <table className="table table-hover">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>
                    <input
                      type="checkbox"
                      checked={selectedContacts.length === currentContacts.length && currentContacts.length > 0}
                      onChange={handleSelectAll}
                      className="form-check-input"
                    />
                  </th>
                  <th style={{ width: '100px' }} className="text-center">Actions</th>
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
                {currentContacts.map((contact) => (
                  <tr key={contact._id} className={selectedContacts.includes(contact._id) ? 'selected-row' : ''}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedContacts.includes(contact._id)}
                        onChange={() => handleSelect(contact._id)}
                        className="form-check-input"
                      />
                    </td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-2 justify-content-center">
                        <button
                          className="btn btn-sm btn-link p-0"
                          onClick={() => handleEditClick(contact._id)}
                        >
                          <CiEdit style={{ cursor: "pointer", fontSize: "1.2em", color:'green' }} size={18} />
                        </button>
                        <button
                          className="btn btn-sm btn-link p-0"
                          onClick={() => handleDelete(contact._id)}
                          title="Delete"
                        >
                          <RiDeleteBin6Line className="text-danger" size={18} />
                        </button>
                      </div>
                    </td>
                    {columns.filter(col => col.id !== 'select' && col.id !== 'actions' && visibleColumns[col.id]).map(column => (
                      <td key={column.id}>
                        {column.id === 'clientContacts' && `${contact.firstName} ${contact.lastName}`}
                        {column.id === 'title' && contact.title}
                        {column.id === 'emailAddress' && contact.emailAddress}
                        {column.id === 'workMobilePhone' && contact.workMobilePhone}
                        {column.id === 'workPhone' && contact.workPhone}
                        {column.id === 'alternatePhone' && contact.alternatePhone}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

          
          </div>
          
        )}
      </div>
      
    </React.Fragment>
  );
}

export default ClientContacts;
