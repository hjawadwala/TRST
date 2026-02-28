import React, { useState, useEffect } from "react";

import { IoMdAttach, IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { GrDetach } from "react-icons/gr";
import { FaTableColumns, FaRegTrashCan, FaFilter } from "react-icons/fa6";
import { BiSolidEdit } from "react-icons/bi";
import { ImCopy } from "react-icons/im";
import { LuRefreshCw } from "react-icons/lu";
import { HiDotsHorizontal } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { HiMiniWrench } from "react-icons/hi2";
import { FcSettings } from "react-icons/fc";
import {LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaPrint } from "react-icons/fa6";
import { FaHome, FaRegFilePdf } from "react-icons/fa";
import { TiExport, TiPlus } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const LocationsTab = ({ entity, loading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
const navigate = useNavigate();

  const [isLoadingCoordinates, setIsLoadingCoordinates] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  
    const [rows, setRows] = useState([]);

  const [locations, setLocations] = useState([]);
  const [draggedColumn, setDraggedColumn] = useState(null);

    const [selectAll, setSelectAll] = useState(false);
     const [selectedEmployees, setSelectedEmployees] = useState([]);
     useEffect(() => {
        if (entity?.locations?.length > 0) {
          setLocations(entity.locations);
        } else {
          setLocations([]);
        }
      }, [entity]);
       

 //pagination start
  
 const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState(1);
  const itemsPerPage = 10;

 const [isToolOpen, setIsToolOpen] = useState(false);
 const toggleDropdown = () => {
  setIsOpen(!isOpen);
};

const toggleToolDropDown = () => {
  setIsToolOpen(!isToolOpen);
};
const ColumnDropDown = () => {
  setIsColumnOpen(!isColumnOpen);
};

  const handlePageInputChange = (e) => {
    const value = e.target.value;
    setPageInput(value);
    
    if (e.key === 'Enter' || e.type === 'blur') {
      const numValue = parseInt(value);
      const maxPage = Math.ceil(locations.length / itemsPerPage);
      
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
    const lastPage = Math.ceil(locations.length / itemsPerPage);
    setCurrentPage(lastPage);
    setPageInput(lastPage);
  };

  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;
  const currentRows = locations?.slice(indexOfFirstRow, indexOfLastRow) || [];

  const handleColumnToggle = (columnName) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnName]: !prev[columnName]
    }));
  };

  //pagination end

//dragstart
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
  
//drag end
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
//check start
const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedEmployees(locations.map(locations => locations._id));
    } else {
      setSelectedEmployees([]);
    }
  };
  
  const handleSelect = (locationId) => {
    setSelectedEmployees(prev => {
      if (prev.includes(locationId)) {
        return prev.filter(id => id !== locationId);
      } else {
        return [...prev, locationId];
      }
    });
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
const [selectedLocations, setSelectedLocations] = useState([]);
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

  const handleEdit = (locationId) => {
    navigate(`/locations/edit/${locationId}`);
  };
  return (
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

      <div className="border-1 mt-2 mb-2"></div>

      <div className="container-fluid">
        <div className="form-content">
          {!loading && entity?.locations?.length > 0 ? (
              <div className="table-responsive">
                  {locations?.length > itemsPerPage && (
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
                  <span className="mx-2">of {Math.ceil(locations.length / itemsPerPage)}</span>
                  <button 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(locations.length / itemsPerPage)}
                  >{">"}</button>
                  <button 
                    className="btn btn-sm btn-outline-secondary" 
                    onClick={handleLastPage}
                    disabled={currentPage === Math.ceil(locations.length / itemsPerPage)}
                  >{">>"}</button>
                </div>
                <span className="ms-2 fw-bold">
                  {indexOfFirstRow + 1} - {Math.min(indexOfLastRow, locations.length)} of {locations.length} items
                </span>
              </div>
            </div>
          )}
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
                {/* {currentRows.map((locations, index) => (
                // {entity.locations.map((locations, index) => (
                  <tr key={index}>
                     <td>
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(locations._id)}
                        onChange={() => handleSelect(locations._id)}
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
                    <td>
                      <NavLink to={`/locations/view/${locations._id}`}>
                        {locations.locationName || "N/A"}
                      </NavLink>
                    </td>
                    <td>{locations.locationType || "N/A"}</td>
                    <td>{locations.locationId || "N/A"}</td>
                    <td>{locations.mainPhone || "N/A"}</td>
                    <td>{locations.capacity || "N/A"}</td>
                    <td>{locations.capacityUsed || "N/A"}</td>
                    <td>{locations.streetAddress1 || "N/A"}</td>
                    <td>{locations.streetAddress2 || "N/A"}</td>
                    <td>{locations.latitude || "N/A"}</td>
                    <td>{locations.longitude || "N/A"}</td>
                    <td>{locations.siteOwnership || "N/A"}</td>
                    <td>{locations.accessSafetySecurityEquipment || "N/A"}</td>
                  </tr>
                ))} */}
                {locations.map((locations, index) => (
              <tr key={index}>
                
                     <td>
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(locations._id)}
                        onChange={() => handleSelect(locations._id)}
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
                {columns
                  .filter((col) => visibleColumns[col.id])
                  .map((column) => (
                    <td key={`${locations._id}-${column.id}`}>
                      {column.id === "locationName" && (
                        <NavLink to={`/locations/view/${locations._id}`}>
                          {locations.locationName || "N/A"}
                        </NavLink>
                      )}
                      {column.id === "locationType" && locations.locationType}
                      {column.id === "locationId" && locations.locationId}
                      {column.id === "mainPhone" && locations.mainPhone}
                      {column.id === "city" && locations.city}
                      {column.id === "country" && locations.country}
                      {column.id === "capacity" && locations.capacity}
                      {column.id === "stateProvince" && locations.stateProvince}
                      {column.id === "capacityUsed" && locations.capacityUsed}
                      {column.id === "zipPostalCode" && locations.zipPostalCode}
                      {column.id === "streetAddress1" && locations.streetAddress1}
                      {column.id === "streetAddress2" && locations.streetAddress2}
                      {column.id === "latitude" && locations.latitude}
                      {column.id === "longitude" && locations.longitude}
                      {column.id === "siteOwnership" && locations.siteOwnership}
                      {column.id === "accessSafetySecurityEquipment" &&
                        locations.accessSafetySecurityEquipment}
                    </td>
                  ))}
              </tr>
            ))}
              </tbody>
            </table>
            </div>
          ) : (
            <div>No locations available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationsTab;
