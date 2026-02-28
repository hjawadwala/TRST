import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, NavLink } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
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
import "./Locations.css";
import LoadingSpinner from "../../../Components/Common/LoadingSpinner/LoadingSpinner";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Locations() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [isLoadingCoordinates, setIsLoadingCoordinates] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { layoutMode } = useSelector(state => ({
    layoutMode: state.Layout.layoutMode
  }));
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  
  // Calculate pagination values safely with nullish coalescing
  const itemsPerPage = 10;
  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;
  const currentRows = rows?.slice(indexOfFirstRow, indexOfLastRow) || [];

  // Add these states at the top
  const [columns, setColumns] = useState([
    { id: 'checkbox', label: '', draggable: false },
    { id: 'actions', label: 'Actions', draggable: false },
    { id: 'locationName', label: 'Location Name', draggable: true },
    { id: 'locationType', label: 'Location Type', draggable: true },
    { id: 'streetAddress1', label: 'Street Address 1', draggable: true },
    { id: 'streetAddress2', label: 'Street Address 2', draggable: true },
    { id: 'city', label: 'City', draggable: true },
    { id: 'stateProvince', label: 'State/Province', draggable: true },
    { id: 'zipPostalCode', label: 'ZIP/Postal Code', draggable: true },
    { id: 'country', label: 'Country', draggable: true },
    { id: 'mainPhone', label: 'Main Phone', draggable: true },
    { id: 'capacity', label: 'Capacity', draggable: true },
    { id: 'capacityUsed', label: 'Capacity Used(%)', draggable: true },
    { id: 'latitude', label: 'Latitude', draggable: true },
    { id: 'longitude', label: 'Longitude', draggable: true },
    { id: 'locationId', label: 'ID', draggable: true }
  ]);

  const [columnWidths, setColumnWidths] = useState({
    checkbox: 50,
    actions: 100,
    locationName: 200,
    locationType: 150,
    streetAddress1: 200,
    streetAddress2: 200,
    city: 150,
    stateProvince: 150,
    zipPostalCode: 150,
    country: 150,
    mainPhone: 150,
    capacity: 100,
    capacityUsed: 150,
    latitude: 150,
    longitude: 150,
    locationId: 150
  });

  const [visibleColumns, setVisibleColumns] = useState({
    locationName: true,
    locationType: true,
    streetAddress1: true,
    streetAddress2: true,
    city: true,
    stateProvince: true,
    zipPostalCode: true,
    country: true,
    mainPhone: true,
    capacity: true,
    capacityUsed: true,
    latitude: true,
    longitude: true,
    locationId: true
  });

  const [draggedColumn, setDraggedColumn] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoading(true);
      setIsLoadingCoordinates(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/locations/all`, {
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        const data = await response.json();
        console.log(data);
        
        if (data.success && data.data) {
          const formattedLocations = data.data.map((location) => ({
            _id: location._id,
            id: location.locationId,
            locationName: location.locationName || '',
            locationType: location.locationType || '',
            streetAddress1: location.streetAddress1 || '',
            streetAddress2: location.streetAddress2 || '',
            city: location.city || '',
            stateProvince: location.stateProvince || '',
            zipPostalCode: location.zipPostalCode || '',
            country: location.country || '',
            mainPhone: location.mainPhone || '',
            capacity: location.capacity || 0,
            capacityUsed: location.capacityUsed || 0,
            latitude: location.latitude || '-',
            longitude: location.longitude || '-'
          }));
          
          console.log('Formatted Locations:', formattedLocations);
          setRows(formattedLocations);
        } else {
          setRows([]); // Set empty array if no data
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
        setRows([]); // Set empty array on error
      } finally {
        setIsLoading(false);
        setIsLoadingCoordinates(false);
      }
    };

    fetchLocations();
  }, []);

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
    setSelectedLocations((prev) => 
      prev.includes(id) ? prev.filter((locId) => locId !== id) : [...prev, id]
    );
  };

  const handleDelete = async (locationId) => {
    if (window.confirm(`Are you sure you want to delete this location?`)) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/v1/locations/${locationId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        // if (response.data) {
        //   // Remove the deleted location from the state
        //   setRows(prevRows => 
        //     prevRows.filter(loc => loc._id !== locationId)
        //   );
        //   // Also remove from selected locations if it was selected
        //   setSelectedLocations(prev => 
        //     prev.filter(id => id !== locationId)
        //   );
          // Show success message
          alert("Location deleted successfully");
        // }
      } catch (error) {
        console.error("Error deleting location:", error);
        alert(error.response?.data?.message || "Failed to delete location. Please try again.");
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedLocations.length === 0) return;

    if (window.confirm(`Are you sure you want to delete ${selectedLocations.length} selected item(s)?`)) {
      try {
        const deletePromises = selectedLocations.map(id =>
          axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/locations/${id}`, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          })
        );

        const results = await Promise.allSettled(deletePromises);
        
        // Filter out the successfully deleted locations
        const successfulDeletes = results
          .map((result, index) => 
            result.status === 'fulfilled' ? selectedLocations[index] : null
          )
          .filter(id => id !== null);

        if (successfulDeletes.length > 0) {
          // Update locations list
          setRows(prevRows => 
            prevRows.filter(loc => !successfulDeletes.includes(loc._id))
          );
          // Clear selected locations
          setSelectedLocations([]);
          // Show success message
          alert(`Successfully deleted ${successfulDeletes.length} location(s)`);
        }

        // Check if any deletions failed
        const failedCount = results.filter(r => r.status === 'rejected').length;
        if (failedCount > 0) {
          alert(`Failed to delete ${failedCount} location(s). Please try again.`);
        }
      } catch (error) {
        console.error("Error in bulk delete:", error);
        alert(error.response?.data?.message || "Error deleting locations. Please try again.");
      }
    }
  };

  const handlePageInputChange = (e) => {
    if (e.key === 'Enter' || e.type === 'blur') {
      const value = parseInt(e.target.value);
      const maxPage = Math.ceil(rows.length / itemsPerPage);
      
      if (!isNaN(value) && value >= 1 && value <= maxPage) {
        setCurrentPage(value);
      } else {
        setPageInput(currentPage.toString());
      }
    } else {
      setPageInput(e.target.value);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
    setPageInput("1");
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      setPageInput((currentPage - 1).toString());
    }
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(rows.length / itemsPerPage);
    if (currentPage < maxPage) {
      setCurrentPage(prev => prev + 1);
      setPageInput((currentPage + 1).toString());
    }
  };

  const handleLastPage = () => {
    const lastPage = Math.ceil(rows.length / itemsPerPage);
    setCurrentPage(lastPage);
    setPageInput(lastPage.toString());
  };

  const handleEdit = (locationId) => {
    navigate(`/locations/edit/${locationId}`);
  };

  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/locations/all`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        const formattedLocations = response.data.map((location) => ({
          _id: location._id,
          id: location.locationId,
          locationName: location.locationName || '',
          locationType: location.locationType || '',
          streetAddress1: location.streetAddress1 || '',
          streetAddress2: location.streetAddress2 || '',
          city: location.city || '',
          stateProvince: location.stateProvince || '',
          zipPostalCode: location.zipPostalCode || '',
          country: location.country || '',
          mainPhone: location.mainPhone || '',
          capacity: location.capacity || 0,
          capacityUsed: location.capacityUsed || 0,
          latitude: location.latitude || '-',
          longitude: location.longitude || '-'
        }));
        
        setRows(formattedLocations);
        setCurrentPage(1);
        setPageInput("1");
        setSelectedLocations([]);
      } else {
        setRows([]);
      }
    } catch (error) {
      console.error("Error refreshing locations:", error);
      setRows([]);
    } finally {
      setIsLoading(false);
    }
  };

  const viewOnMap = (latitude, longitude) => {
    if (!latitude || !longitude) return;
    
    // Open in Google Maps in a new tab
    const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(mapsUrl, '_blank');
  };

  // Add handlers for drag and resize
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

  const handleColumnToggle = (columnName) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnName]: !prev[columnName]
    }));
  };

  const resetColumns = () => {
    setVisibleColumns({
      locationName: true,
      locationType: true,
      streetAddress1: true,
      streetAddress2: true,
      city: true,
      stateProvince: true,
      zipPostalCode: true,
      country: true,
      mainPhone: true,
      capacity: true,
      capacityUsed: true,
      latitude: true,
      longitude: true,
      locationId: true
    });
  };

  const getVisibleColumnCount = () => {
    // Count checkbox and actions columns
    let count = 2;
    // Add count of visible columns
    Object.values(visibleColumns).forEach(isVisible => {
      if (isVisible) count++;
    });
    return count;
  };

  return (
    <div className="page-content" data-bs-theme={layoutMode}>
      <Helmet>
        <title>Location Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="maincontent">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Locations</div>
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
              <span className="header-title">Locations </span>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-2"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded={isOpen}
                  onClick={toggleDropdown}
                >
                  All Locations <IoMdArrowDropdown className="hw-20" />
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
                      All Locations <BiSolidEdit className="hw-15 ml-20px" />
                      <FaTableColumns className="hw-15 ml-5px" />
                      <ImCopy className="hw-15 ml-5px" />
                    </a>
                  </li>
                  <span className="ms-1">Select Another View...</span>
                  <li>
                    <a className="dropdown-item" href="#">
                      Locations with Addresses
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      All Locations (Longitude/Latitude)
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      For Export Only
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
                title="Refresh"
              >
                <LuRefreshCw className="hw-15" />
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
                    <a className="blue" onClick={resetColumns} style={{ cursor: 'pointer' }}>Reset</a>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input 
                        type="checkbox" 
                        className="ms-2 me-1"
                        checked={visibleColumns.locationName}
                        onChange={() => handleColumnToggle('locationName')}
                      />
                      Location Name
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input 
                        type="checkbox" 
                        className="ms-2 me-1"
                        checked={visibleColumns.locationType}
                        onChange={() => handleColumnToggle('locationType')}
                      />
                      Location Type
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input 
                        type="checkbox" 
                        className="ms-2 me-1"
                        checked={visibleColumns.streetAddress1}
                        onChange={() => handleColumnToggle('streetAddress1')}
                      />
                      Street Address 1
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input 
                        type="checkbox" 
                        className="ms-2 me-1"
                        checked={visibleColumns.streetAddress2}
                        onChange={() => handleColumnToggle('streetAddress2')}
                      />
                      Street Address 2
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input 
                        type="checkbox" 
                        className="ms-2 me-1"
                        checked={visibleColumns.city}
                        onChange={() => handleColumnToggle('city')}
                      />
                      City
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input 
                        type="checkbox" 
                        className="ms-2 me-1"
                        checked={visibleColumns.stateProvince}
                        onChange={() => handleColumnToggle('stateProvince')}
                      />
                      State/Province
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input 
                        type="checkbox" 
                        className="ms-2 me-1"
                        checked={visibleColumns.zipPostalCode}
                        onChange={() => handleColumnToggle('zipPostalCode')}
                      />
                      Zip/Postal Code
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input 
                        type="checkbox" 
                        className="ms-2 me-1"
                        checked={visibleColumns.country}
                        onChange={() => handleColumnToggle('country')}
                      />
                      Country
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input 
                        type="checkbox" 
                        className="ms-2 me-1"
                        checked={visibleColumns.mainPhone}
                        onChange={() => handleColumnToggle('mainPhone')}
                      />
                      Main Phone
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input 
                        type="checkbox" 
                        className="ms-2 me-1"
                        checked={visibleColumns.capacity}
                        onChange={() => handleColumnToggle('capacity')}
                      />
                      Capacity
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input 
                        type="checkbox" 
                        className="ms-2 me-1"
                        checked={visibleColumns.capacityUsed}
                        onChange={() => handleColumnToggle('capacityUsed')}
                      />
                      Capacity Used(%)
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input 
                        type="checkbox" 
                        className="ms-2 me-1"
                        checked={visibleColumns.latitude}
                        onChange={() => handleColumnToggle('latitude')}
                      />
                      Latitude
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input 
                        type="checkbox" 
                        className="ms-2 me-1"
                        checked={visibleColumns.longitude}
                        onChange={() => handleColumnToggle('longitude')}
                      />
                      Longitude
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input 
                        type="checkbox" 
                        className="ms-2 me-1"
                        checked={visibleColumns.locationId}
                        onChange={() => handleColumnToggle('locationId')}
                      />
                      ID
                    </label>
                  </li>
                </ul>
              </span>
              <button className="button border-1 ms-1">
                <FaFilter className="hw-15" />
              </button>
            </div>
            <div  className="d-flex align-items-center">
              <NavLink className="button1 border-1" to="/new-location">
                <TiPlus className="hw-20" />
                Location
              </NavLink>
              <button 
                className="button border-1 ms-1"
                style={{
                  opacity: selectedLocations.length > 0 ? 1 : 0.5,
                  cursor: selectedLocations.length > 0 ? "pointer" : "default",
                }}
                onClick={handleBulkDelete}
                disabled={selectedLocations.length === 0}
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
      </div>
      <div className="border-1 mb-2 mt-2"></div>
      <div className="table-container">
        {rows.length > itemsPerPage && (
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
                <span className="mx-2">of {Math.ceil(rows.length / itemsPerPage)}</span>
                <button 
                  className="btn btn-sm btn-outline-secondary" 
                  onClick={handleNextPage}
                  disabled={currentPage === Math.ceil(rows.length / itemsPerPage)}
                >{">"}</button>
                <button 
                  className="btn btn-sm btn-outline-secondary" 
                  onClick={handleLastPage}
                  disabled={currentPage === Math.ceil(rows.length / itemsPerPage)}
                >{">>"}</button>
              </div>
              <span className="ms-2 fw-bold">
                {indexOfFirstRow + 1} - {Math.min(indexOfLastRow, rows.length)} of {rows.length} items
              </span>
            </div>
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th style={{ 
                  width: '50px',
                  minWidth: '50px',
                  padding: '0.75rem 0.5rem'
                }}>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedLocations(rows.map(loc => loc._id));
                      } else {
                        setSelectedLocations([]);
                      }
                    }}
                    checked={selectedLocations.length === rows.length}
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
              {isLoading ? (
                <tr>
                  <td colSpan={getVisibleColumnCount()} className="text-center py-4">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={getVisibleColumnCount()} className="text-center py-3 text-muted">
                    No locations available
                  </td>
                </tr>
              ) : (
                currentRows.map(location => (
                  <tr 
                    key={location._id}
                    className={selectedLocations.includes(location._id) ? 'selected-row' : ''}
                  >
                    <td style={{ 
                      width: '50px',
                      minWidth: '50px',
                      padding: '0.75rem 0.5rem',
                      textAlign: 'center'
                    }}>
                      <input
                        type="checkbox"
                        checked={selectedLocations.includes(location._id)}
                        onChange={() => handleCheckboxChange(location._id)}
                        className="form-check-input"
                      />
                    </td>
                    <td className="text-center">
                      <div className="d-flex align-items-center gap-2 justify-content-center">
                        <button
                          className="btn btn-sm btn-link p-0"
                          onClick={() => handleEdit(location._id)}
                          title="Edit"
                        >
                          <CiEdit style={{ cursor: "pointer", fontSize: "1.2em", color:'green' }} size={18} />
                        </button>
                        <button
                          className="btn btn-sm btn-link p-0"
                          onClick={() => handleDelete(location._id)}
                          title="Delete"
                        >
                          <RiDeleteBin6Line className="text-danger" size={18} />
                        </button>
                      </div>
                    </td>
                    {columns.filter(col => col.draggable && visibleColumns[col.id]).map(column => (
                      <td key={`${location._id}-${column.id}`}>
                        {column.id === 'id' && location._id}
                                        <NavLink to={`/locations/view/${location._id}`}>
                  {column.id === 'locationName' && location.locationName}
                </NavLink>

                        
                        {column.id === 'locationType' && location.locationType}
                        {column.id === 'streetAddress1' && location.streetAddress1}
                        {column.id === 'streetAddress2' && location.streetAddress2}
                        {column.id === 'city' && location.city}
                        {column.id === 'stateProvince' && location.stateProvince}
                        {column.id === 'zipPostalCode' && location.zipPostalCode}
                        {column.id === 'country' && location.country}
                        {column.id === 'mainPhone' && location.mainPhone}
                        {column.id === 'capacity' && location.capacity}
                        {column.id === 'capacityUsed' && location.capacityUsed}
                        {column.id === 'latitude' && (location.latitude || "-")}
                        {column.id === 'longitude' && (location.longitude || "-")}
                        {column.id === 'locationId' && (location.locationId || "-")}
                        {column.id === 'parentLocation' && (location.parentLocation?.locationName || "-")}
                        {column.id === 'siteManager' && (location.siteManager || "-")}
                        {column.id === 'updatedAt' && (
                          location.updatedAt ? 
                          new Date(location.updatedAt).toLocaleString() : 
                          "-"
                        )}
                        {column.id === 'updatedBy' && (location.updatedBy || "-")}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {rows.length > itemsPerPage && (
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
                <span className="mx-2">of {Math.ceil(rows.length / itemsPerPage)}</span>
                <button 
                  className="btn btn-sm btn-outline-secondary" 
                  onClick={handleNextPage}
                  disabled={currentPage === Math.ceil(rows.length / itemsPerPage)}
                >{">"}</button>
                <button 
                  className="btn btn-sm btn-outline-secondary" 
                  onClick={handleLastPage}
                  disabled={currentPage === Math.ceil(rows.length / itemsPerPage)}
                >{">>"}</button>
              </div>
              <span className="ms-2 fw-bold">
                {indexOfFirstRow + 1} - {Math.min(indexOfLastRow, rows.length)} of {rows.length} items
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Locations;
