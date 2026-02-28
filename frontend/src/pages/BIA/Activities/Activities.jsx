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
import "./Activities.css"; // Import CSS file
import Toastify from "toastify-js";
function Activities() {
  const [activities, setActivities] = useState([]);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false); // State for select all checkbox
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerms, setSearchTerms] = useState({
    
    bia: "",
    plan: "",
    activity: "",
    outlineSteps: "",
    businessEntity: "",
    processEditor: "",
    rto: "",
    activityMtpd: "",
    activityRto: ""
  });
  const [columns, setColumns] = useState([
    { id: 'select', label: '', width: 50, draggable: false },
    { id: 'actions', label: 'Actions', width: 100, draggable: false },
    { id: 'bia', label: 'BIA', width: 200, draggable: true },
    { id: 'plan', label: 'Plan', width: 250, draggable: true },
    { id: 'activity', label: 'Activity', width: 200, draggable: true },
    { id: 'outlineSteps', label: 'Outline Steps', width: 200, draggable: true },
    { id: 'businessEntity', label: 'Business Entity', width: 200, draggable: true },
    { id: 'processEditor', label: 'Process Editor', width: 200, draggable: true },
    { id: 'rto', label: 'RTO', width: 200, draggable: true },
    { id: 'activityMtpd', label: 'Activity MTPD', width: 200, draggable: true },
    { id: 'activityRto', label: 'Activity RTO', width: 200, draggable: true }
  ]);
  const [visibleColumns, setVisibleColumns] = useState({
    bia: true,
    plan: true,
    activity: true,
    outlineSteps: true,
    businessEntity: true,
    processEditor: true,
    rto: true,
    activityMtpd: true,
    activityRto: true,
  });
  const [draggedColumn, setDraggedColumn] = useState(null);

  // Fetch Data from API
  const fetchActivities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/activities`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("API Response:", data);
      if (Array.isArray(data)) {
        setActivities(data);
      } else {
        console.error("Unexpected API response format:", data);
        setActivities([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching activities:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // Handle select all checkbox change
  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setActivities(activities.map(activity => ({ ...activity, isSelected: !selectAll })));
  };

  // Handle individual checkbox change
  const handleCheckboxChange = (id) => {
    setActivities(activities.map(activity => activity._id === id ? { ...activity, isSelected: !activity.isSelected } : activity));
  };

  // Column handlers
  const handleColumnToggle = (columnId) => {
    setVisibleColumns(prev => ({ ...prev, [columnId]: !prev[columnId] }));
  };

  const resetColumns = () => {
    setVisibleColumns({
      bia: true,
      plan: true,
      activity: true,
      outlineSteps: true,
      businessEntity: true,
      processEditor: true,
      rto: true,
      activityMtpd: true,
      activityRto: true,
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
  const filteredActivities = activities.filter(activity =>
    activity.bia.toLowerCase().includes(searchTerms.bia.toLowerCase()) &&
    activity.plan.toLowerCase().includes(searchTerms.plan.toLowerCase()) &&
    activity.activity.toLowerCase().includes(searchTerms.activity.toLowerCase()) &&
    activity.outlineSteps.toLowerCase().includes(searchTerms.outlineSteps.toLowerCase()) &&
    activity.businessEntity.toLowerCase().includes(searchTerms.businessEntity.toLowerCase()) &&
    activity.processEditor.toLowerCase().includes(searchTerms.processEditor.toLowerCase()) &&
    activity.rto.toLowerCase().includes(searchTerms.rto.toLowerCase()) &&
    activity.activityMtpd.toLowerCase().includes(searchTerms.activityMtpd.toLowerCase()) &&
    activity.activityRto.toLowerCase().includes(searchTerms.activityRto.toLowerCase())
  );
  const currentActivities = filteredActivities.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleNextPage = () => setCurrentPage(prev => prev + 1);
  const handlePrevPage = () => setCurrentPage(prev => prev - 1);
  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(Math.ceil(filteredActivities.length / itemsPerPage));

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p>Error: {error}</p>;
 const handleRefresh = async () => {
    try {
      const button = document.querySelector('.refresh-button');
      if (button) {
        button.style.transform = 'rotate(360deg)';
      }
      await fetchActivities();
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
        <title>Activity Page | TRST</title>
        <meta name="description" content="Approval Groups management page." />
        <meta name="keywords" content="approval, groups, management, react" />
      </Helmet>

      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Activity Groups</div>
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
              <button className="button border-1 ms-1"><FaHouse className="hw-15" /></button>
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
              <button className="button border-1 ms-1"><FaFilter className="hw-15" /></button>
            </div>
            <div>
              <NavLink className="button1 border-1" to="/new-activities">
                <TiPlus className="hw-20" /> Activity
              </NavLink>
              <button className="button border-1 ms-1"><FaRegTrashCan className="hw-18" /></button>
              <button className="button border-1 ms-1"><TiExport className="hw-20" /></button>
              <button className="button border-1 ms-1"><HiDotsHorizontal className="hw-20" /></button>
            </div>
          </div>
          <div className="border-1 mt-2 mb-2"></div>

          <div style={{ width: "100%", overflowX: "auto" }}>
            <div style={{ maxHeight: "590px", overflowY: "auto", border: "1px solid #ccc" }}>
            {filteredActivities.length > itemsPerPage && (
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
                          if (page > 0 && page <= Math.ceil(filteredActivities.length / itemsPerPage)) {
                            handlePageChange(page);
                          }
                        }}
                      />
                      <span className="mx-2">of {Math.ceil(filteredActivities.length / itemsPerPage)}</span>
                      <button 
                        className="btn btn-sm btn-outline-secondary" 
                        onClick={handleNextPage}
                        disabled={currentPage === Math.ceil(filteredActivities.length / itemsPerPage)}
                      >{">"}</button>
                      <button 
                        className="btn btn-sm btn-outline-secondary" 
                        onClick={handleLastPage}
                        disabled={currentPage === Math.ceil(filteredActivities.length / itemsPerPage)}
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
              <table className="table " style={{ minWidth: "100px" }}>
                
                <thead>
                  <tr>
                    <th className="sticky-col" style={{ width: "50px" }}>
                      <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} />
                    </th>
                    <th style={{ width: "100px" }} className="text-center">Actions</th>
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
                  {currentActivities.map((activity) => (
                    <tr key={activity._id}>
                      <td>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={activity.isSelected || false}
                          onChange={() => handleCheckboxChange(activity._id)}
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
                      {visibleColumns.bia && <td>{activity.bia}</td>}
                      {visibleColumns.plan && <td>{activity.plan}</td>}
                      {visibleColumns.activity && <td>{activity.activity}</td>}
                      {visibleColumns.outlineSteps && <td>{activity.outlineSteps}</td>}
                      {visibleColumns.businessEntity && <td>{activity.businessEntity}</td>}
                      {visibleColumns.processEditor && <td>{activity.processEditor}</td>}
                      {visibleColumns.rto && <td>{activity.rto}</td>}
                      {visibleColumns.activityMtpd && <td>{activity.activityMtpd}</td>}
                      {visibleColumns.activityRto && <td>{activity.activityRto}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
             
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Activities;