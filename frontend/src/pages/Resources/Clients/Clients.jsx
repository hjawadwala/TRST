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
import { CiEdit } from "react-icons/ci";
import LoadingSpinner from "../../../Components/Common/LoadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
// import "./Clients.css";
import axios from "axios";
import Toastify from "toastify-js";

function Clients() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const itemsPerPage = 10;
  const { layoutMode } = useSelector(state => ({
    layoutMode: state.Layout.layoutMode
  }));

  const [columns, setColumns] = useState([
    { id: 'checkbox', label: '', draggable: false },
    { id: 'actions', label: 'Actions', draggable: false },
    { id: 'company', label: 'Company', draggable: true },
    { id: 'mainPhone', label: 'Main Phone', draggable: true },
    { id: 'website', label: 'Website', draggable: true },
    { id: 'fax', label: 'Fax', draggable: true },
    { id: 'address1', label: 'Address 1', draggable: true },
    { id: 'address2', label: 'Address 2', draggable: true },
    { id: 'city', label: 'City', draggable: true },
    { id: 'stateProvince', label: 'State/Province', draggable: true },
    { id: 'country', label: 'Country', draggable: true },
    { id: 'zipCode', label: 'ZIP Code', draggable: true },
    { id: 'updatedAt', label: 'Updated At', draggable: true }
  ]);

  const [columnWidths, setColumnWidths] = useState({
    checkbox: 40,
    actions: 100,
    company: 200,
    mainPhone: 150,
    website: 200,
    fax: 150,
    address1: 200,
    address2: 200,
    city: 150,
    stateProvince: 150,
    country: 150,
    zipCode: 120,
    updatedAt: 180
  });

  const [visibleColumns, setVisibleColumns] = useState({
    company: true,
    mainPhone: true,
    website: true,
    fax: true,
    address1: true,
    address2: true,
    city: true,
    stateProvince: true,
    country: true,
    zipCode: true,
    updatedAt: true
  });

  const [draggedColumn, setDraggedColumn] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleToolDropDown = () => {
    setIsToolOpen(!isToolOpen);
  };

  const ColumnDropDown = () => {
    setIsColumnOpen(!isColumnOpen);
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => {
      if (id === "all") {
        return prev.length === clients.length ? [] : clients.map((client) => client._id);
      }
      return prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
    });
  };

  const handleEdit = (clientId) => {
    navigate(`/clients/edit/${clientId}`);
  };

  const handleDelete = async (clientId) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/api/v1/clients/${clientId}`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        fetchClients(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    }
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

  const handleBulkDelete = async () => {
    if (checkedItems.length === 0) {
      alert("Please select clients to delete");
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${checkedItems.length} selected clients?`)) {
      try {
        setLoading(true);
        
        // Delete each selected client
        const deletePromises = checkedItems.map(clientId => 
          axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/clients/${clientId}`, {
            withCredentials: true
          })
        );

        await Promise.all(deletePromises);

        // Show success message
        Toastify({
          text: `Successfully deleted ${checkedItems.length} clients`,
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "#28a745",
          },
        }).showToast();

        // Clear selection and refresh list
        setCheckedItems([]);
        fetchClients();
      } catch (error) {
        console.error("Error deleting clients:", error);
        alert(error.response?.data?.message || "Error deleting clients");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleColumnToggle = (columnId) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnId]: !prev[columnId]
    }));
  };

  const resetColumns = () => {
    setVisibleColumns({
      company: true,
      mainPhone: true,
      website: true,
      fax: true,
      address1: true,
      address2: true,
      city: true,
      stateProvince: true,
      country: true,
      zipCode: true,
      updatedAt: true
    });
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/clients/all`, {
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        setClients(data.data);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;
  const currentRows = clients.slice(indexOfFirstRow, indexOfLastRow);

  // Add refresh handler
  const handleRefresh = async () => {
    try {
      const button = document.querySelector('.refresh-button');
      if (button) {
        button.style.transform = 'rotate(360deg)';
      }
      await fetchClients();
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
        <title>Clients Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Client</div>
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
        <div className="main-content2 pt-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <span className="header-title">Clients</span>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-2"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded={isOpen}
                  onClick={toggleDropdown}
                >
                  All Clients Records
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
                      All Client Contacts{" "}
                      <BiSolidEdit className="hw-15 ml-20px" />
                      <FaTableColumns className="hw-15 ml-5px" />
                      <ImCopy className="hw-15 ml-5px" />
                    </a>
                  </li>
                  <span className="ms-1">Select Another View...</span>
                  <li>
                    <a className="dropdown-item" href="#">
                      Clients by Company
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      For Export Only
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
                <FaHome className="hw-16" />
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
                  <FaTableColumns className="hw-16" />
                </button>
                <ul
                  className={`dropdown-menu ${isColumnOpen ? "show" : ""}`}
                  style={{
                    "--vz-dropdown-min-width": "15rem",
                    "--vz-dropdown-font-size": "14px"
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
              <NavLink className="button1 border-1" to="/new-clients">
                <TiPlus className="hw-16" />
                <span>Client</span>
              </NavLink>
              <button 
                className="button border-1 ms-1"
                onClick={handleBulkDelete}
                disabled={checkedItems.length === 0}
                title={checkedItems.length ? `Delete ${checkedItems.length} selected` : "Select clients to delete"}
              >
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
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange("all")}
                    checked={checkedItems.length === clients.length && clients.length > 0}
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
                      // cursor: 'move',
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
              {loading ? (
                <tr>
                  <td colSpan={Object.keys(visibleColumns).length + 2} className="text-center">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : currentRows.map((client) => (
                <tr key={client._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkedItems.includes(client._id)}
                      onChange={() => handleCheckboxChange(client._id)}
                    />
                  </td>
                  <td className="text-center">
                    <div style={{gap: "10px" }} className="d-flex align-items-center justify-content-center">
                      <button
                        className="btn btn-sm btn-link p-0"
                        onClick={() => handleEdit(client._id)}
                        title="Edit"
                      >
                        <CiEdit style={{ cursor: "pointer", fontSize: "1.2em", color:'green' }} size={18} />
                      </button>
                      <button
                        className="btn btn-sm btn-link p-0"
                        onClick={() => handleDelete(client._id)}
                        title="Delete"
                      >
                        <RiDeleteBin6Line className="text-danger" size={18} />
                      </button>
                    </div>
                  </td>
                  {columns.filter(col => col.draggable && visibleColumns[col.id]).map(column => (
                    <td key={`${client._id}-${column.id}`}>
                      {column.id === 'updatedAt' ? 
                        new Date(client[column.id]).toLocaleString() : 
                        client[column.id] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Clients;
