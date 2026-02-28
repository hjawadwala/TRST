import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaTableColumns, FaFilter, FaRegTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuRefreshCw } from "react-icons/lu";

import { IoMdAttach, IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { TiExport, TiPlus } from "react-icons/ti";
import { BiSolidEdit } from "react-icons/bi";
import { ImCopy } from "react-icons/im";
import { FaHome, FaRegFilePdf } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const BusinessEntitiesTab = ({ applicationId }) => {
 const [rows, setRows] = useState([]);
  const handleRefresh = () => {
    fetchApplication();
  };
// Add column toggle handler
const handleColumnToggle = (columnName) => {
  setVisibleColumns((prev) => ({
    ...prev,
    [columnName]: !prev[columnName],
  }));
};
  const ColumnDropDown = () => {
    setIsColumnOpen(!isColumnOpen);
  };
    // Add reset columns function
    const resetColumns = () => {
      setVisibleColumns({
        businessEntity: true,
        businessEntityType: true,
        businessEntityId: true,
        parentEntity: true,
        childEntities: true,
        locations: true,
      });
    };
     // Update the handleBulkDelete function
     const handleBulkDelete = async () => {
      if (checkedItems.length === 0) return;
  
      if (
        window.confirm(
          `Are you sure you want to delete ${checkedItems.length} selected item(s)?`
        )
      ) {
        setIsLoading(true);
        try {
          await Promise.all(
            checkedItems.map((id) =>
              axios.delete(
                `${process.env.REACT_APP_API_URL}/api/v1/organizational-entities/${id}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                  withCredentials: true,
                }
              )
            )
          );
  
          const newTotalItems = rows.length - checkedItems.length;
          adjustPageAfterDeletion(newTotalItems);
  
          setCheckedItems([]);
          await fetchOrganizationalEntities();
        } catch (error) {
          console.error("Error deleting entities:", error);
          if (error.response?.status === 401) {
            navigate("/login");
          }
        } finally {
          setIsLoading(false);
        }
      }
    };
  const [isColumnOpen, setIsColumnOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedEntities, setRelatedEntities] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState(1);
  const itemsPerPage = 10;

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [columns, setColumns] = useState([
  
    { id: "businessEntity", label: "Business Entity", draggable: true },
    { id: "businessEntityId", label: "Business Entity ID", draggable: true },
    { id: "businessEntityType", label: "Type", draggable: true },
    { id: "description", label: "Description", draggable: true },
    { id: "updatedAt", label: "Updated At", draggable: true },
  ]);
  const [visibleColumns, setVisibleColumns] = useState({
    businessEntity: true,
    businessEntityId: true,
    businessEntityType: true,
    description: true,
    updatedAt: true,
  });
  const [filters, setFilters] = useState({});
  const [draggedColumn, setDraggedColumn] = useState(null);
  const [filterVisible, setFilterVisible] = useState({});

  //resize start
  const handleResizeStart = (e, columnId) => {
    e.preventDefault();
  
    const startX = e.pageX; // Starting X position of the mouse
    const startWidth = columnWidths[columnId]; // Initial width of the column being resized
  
    const handleMouseMove = (moveEvent) => {
      const newWidth = Math.max(50, startWidth + (moveEvent.pageX - startX)); // Calculate new width
      setColumnWidths((prev) => ({
        ...prev,
        [columnId]: newWidth, // Update the width of the specific column
      }));
    };
  
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove); // Remove mousemove listener
      document.removeEventListener("mouseup", handleMouseUp); // Remove mouseup listener
    };
  
    document.addEventListener("mousemove", handleMouseMove); // Attach mousemove listener
    document.addEventListener("mouseup", handleMouseUp); // Attach mouseup listener
  };


  const [columnWidths, setColumnWidths] = useState({
    checkbox: 10,
    actions: 100,
    businessEntity: 200,
    businessEntityType: 180,
    businessEntityId: 150,
    parentBusinessEntity: 200,
    childBusinessEntities: 250,
    locations: 200,
    
    updatedAt: 180,
  });

  //resize end

  // Fetch application and related entities
  // const fetchApplication = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/applications/${id}`);
  //     const appData = response.data?.data || response.data;

  //     if (appData) {
  //       setApplication(appData.application);
  //       setRelatedEntities(appData.relatedBusinessEntities || []);
  //     }
      
  //   } catch (error) {
  //     console.error("Error fetching application:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // Fetch application and related entities
  const fetchApplication = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/applications/${id}`);
      const appData = response.data?.data || response.data;

      if (appData) {
        setApplication(appData.application);
        setRelatedEntities(appData.relatedBusinessEntities || []);
        toast.success("Data refreshed successfully!"); // Show success message
      }
    } catch (error) {
      console.error("Error fetching application:", error);
      toast.error("Failed to refresh data."); // Show error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, [id]);

  // useEffect(() => {
  //   fetchApplication();
  // }, [id]);

  // Filter rows based on filters
  const filteredRows = relatedEntities.filter((row) =>
    Object.entries(filters).every(([key, value]) =>
      value ? String(row[key] || "").toLowerCase().includes(value.toLowerCase()) : true
    )
  );

  // Pagination calculations
  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

  // Pagination handlers
  const handlePageInputChange = (e) => {
    const value = e.target.value;
    setPageInput(value);

    if (e.key === "Enter" || e.type === "blur") {
      const numValue = parseInt(value);
      const maxPage = Math.ceil(filteredRows.length / itemsPerPage);

      if (value === "" || isNaN(numValue) || numValue < 1) {
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
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      setPageInput((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    const maxPage = Math.ceil(filteredRows.length / itemsPerPage);
    if (currentPage < maxPage) {
      setCurrentPage((prev) => prev + 1);
      setPageInput((prev) => prev + 1);
    }
  };

  const handleLastPage = () => {
    const lastPage = Math.ceil(filteredRows.length / itemsPerPage);
    setCurrentPage(lastPage);
    setPageInput(lastPage);
  };

  // Checkbox handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setCheckedItems(currentRows.map((row) => row._id));
    } else {
      setCheckedItems([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Drag-and-drop handlers
  const handleDragStart = (e, column) => {
    if (!column.draggable) return;
    setDraggedColumn(column);
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
    setDraggedColumn(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    if (!draggedColumn || !targetColumn.draggable) return;

    const newColumns = [...columns];
    const draggedIdx = columns.findIndex((col) => col.id === draggedColumn.id);
    const targetIdx = columns.findIndex((col) => col.id === targetColumn.id);

    newColumns.splice(draggedIdx, 1);
    newColumns.splice(targetIdx, 0, draggedColumn);

    setColumns(newColumns);
  };

  // Filter handlers
  const handleFilterChange = (columnId, value) => {
    setFilters((prev) => ({
      ...prev,
      [columnId]: value,
    }));
  };

  const handleFilterIconClick = (columnId) => {
    setFilterVisible((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  if (loading) {
    return <p>Loading related business entities...</p>;
  }

  if (relatedEntities.length === 0) {
    return <p>No related business entities found.</p>;
  }
  const handleEdit = (id) => {
    // Find the entity by id
    const entityToEdit = relatedEntities.find((entity) => entity._id === id);

    if (!entityToEdit) {
      console.error(`Entity with id ${id} not found for editing`);
      toast.error("Entity not found for editing");
      return;
    }

    // Proceed with the edit logic (e.g., navigate to an edit page or open a modal)
    console.log("Editing entity:", entityToEdit);
    // Example: Navigate to an edit page
    navigate(`/organizational-entities/edit/:id`);
  };
  return (
    <div >
      <div >
           <div className="main-content2 pt-3">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                              <span className="header-title">
                                Organizational Entity List{" "}
                              </span>
                              <div className="dropdown">
                                <button
                                  className="btn btn-secondary dropdown-toggle border-radius-2"
                                  type="button"
                                  id="dropdownMenuButton"
                                  data-bs-toggle="dropdown"
                                  aria-expanded={isOpen}
                                  onClick={toggleDropdown}
                                >
                                  All Organizational Entities{" "}
                                  <IoMdArrowDropdown
                                    style={{ width: "20px", height: "20px" }}
                                  />
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
                                    <NavLink className="dropdown-item">
                                      <TiPlus
                                        style={{
                                          width: "15px",
                                          height: "15px",
                                          marginBottom: "2px",
                                        }}
                                      />
                                      Create New View
                                    </NavLink>
                                  </li>
                                  <li>
                                    <NavLink className="dropdown-item">
                                      <IoMdArrowDropright
                                        style={{ width: "20px", height: "20px" }}
                                      />
                                      All Organizational Entities{" "}
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
                                    </NavLink>
                                  </li>
                                  <span className="ms-1">Select Another View...</span>
                                  <li>
                                    <NavLink className="dropdown-item">
                                      Organizational Entity Scorecard
                                    </NavLink>
                                  </li>
                                  <li>
                                    <NavLink className="dropdown-item">
                                      Department List
                                    </NavLink>
                                  </li>
                                  <li>
                                    <NavLink className="dropdown-item">
                                      Organizational Units
                                    </NavLink>
                                  </li>
                                  <li>
                                    <NavLink className="dropdown-item">
                                      Orphaned Organizational Entities
                                    </NavLink>
                                  </li>
                                </ul>
                              </div>
              
                              <button className="button border-1 ms-1">
                                <FaHome style={{ width: "15px", height: "15px" }} />
                              </button>
                              
                              <button
                                className="button border-1 ms-1"
                                onClick={handleRefresh}
                              >
                                <LuRefreshCw style={{ width: "18px", height: "18px" }} />
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
                                <ul
                                  style={{ "--vz-dropdown-min-width": "13rem" }}
                                  className={`dropdown-menu ${isColumnOpen ? "show" : ""}`}
                                >
                                  <li className="align-items-center justify-content-between d-flex me-1 ms-1">
                                    <span className="fw-bold">Columns</span>
                                    <a
                                      className="blue"
                                      onClick={resetColumns}
                                      style={{ cursor: "pointer" }}
                                    >
                                      Reset
                                    </a>
                                  </li>
                                  {columns.map((column) => (
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
                                <FaFilter style={{ width: "15px", height: "15px" }} />
                              </button>
                            </div>
                            <div className="d-flex align-items-center">
                              <NavLink
                                className="button1 border-1"
                                to="/new-organizational-entity"
                              >
                                <TiPlus className="hw-20" />
                                Organizational Entity
                              </NavLink>
                              <button
                                className="button border-1 ms-1"
                                style={{
                                  opacity: checkedItems.length > 0 ? 1 : 0.5,
                                  cursor: checkedItems.length > 0 ? "pointer" : "default",
                                }}
                                onClick={handleBulkDelete}
                                disabled={checkedItems.length === 0}
                              >
                                <FaRegTrashCan style={{ width: "18px", height: "18px" }} />
                              </button>
                              <button className="button border-1 ms-1">
                                <TiExport style={{ width: "20px", height: "20px" }} />
                              </button>
                              <button className="button border-1 ms-1">
                                <HiDotsHorizontal style={{ width: "20px", height: "20px" }} />
                              </button>
                            </div>
                          </div>
                        </div>
        <div className="d-flex align-items-center justify-content-between mb-3">
          
        </div>
        <div className="pagination-wrapper">
        <div className="d-flex align-items-center gap-3 p-2 justify-content-between">
        <div className="d-flex align-items-center">
            <button className="btn btn-sm btn-outline-secondary" onClick={handleFirstPage}>
              {"<<"}
            </button>
            <button className="btn btn-sm btn-outline-secondary" onClick={handlePrevPage}>
              {"<"}
            </button>
            <span>
              Page {currentPage} of {Math.ceil(filteredRows.length / itemsPerPage)}
            </span>
            <button className="btn btn-sm btn-outline-secondary" onClick={handleNextPage}>
              {">"}
            </button>
            <button className="btn btn-sm btn-outline-secondary" onClick={handleLastPage}>
              {">>"}
            </button>
          </div>
          </div>
          </div>
        <div className="table-container" style={{ overflowX: "auto", maxHeight: "500px" }}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={checkedItems.length === currentRows.length && currentRows.length > 0}
                    onChange={handleSelectAll}
                    className="form-check-input"
                  />
                </th>
                <th style={{ width: "100px", textAlign: "center" }}>Actions</th>
                {columns
                  .filter((column) => visibleColumns[column.id]) // Only render visible columns
                  .map((column) => (
                    <th
                      key={column.id}
                      draggable={column.draggable}
                      onDragStart={(e) => handleDragStart(e, column)}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, column)}
                      style={{
                        width: `${columnWidths[column.id]}px`,
                        position: "relative",
                      }}
                    >
                      <div className="d-flex align-items-center justify-content-between">
                        {column.label}
                        <div
                          className="resize-handle"
                          onMouseDown={(e) => handleResizeStart(e, column.id)}
                          style={{
                            cursor: "col-resize",
                            width: "5px",
                            height: "100%",
                            position: "absolute",
                            right: "0",
                            top: "0",
                            backgroundColor: "transparent",
                          }}
                        />
                      </div>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((entity) => (
                <tr key={entity._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkedItems.includes(entity._id)}
                      onChange={() => handleCheckboxChange(entity._id)}
                      className="form-check-input"
                    />
                  </td>
                  <td className="text-center">
                    <div className="d-flex align-items-center gap-2 justify-content-center">
                      <button
                        className="btn btn-sm btn-link p-0"
                        onClick={() => handleEdit(entity._id)}
                        title="Edit"
                      >
                        <CiEdit
                          style={{
                            cursor: "pointer",
                            fontSize: "1.2em",
                            color: "green",
                          }}
                          size={18}
                        />
                      </button>
                      <button
                        className="btn btn-sm btn-link p-0"
                        onClick={() => handleDelete(entity._id)}
                        title="Delete"
                      >
                        <RiDeleteBin6Line className="text-danger" size={18} />
                      </button>
                    </div>
                  </td>
                  {columns
                    .filter((column) => visibleColumns[column.id]) // Only render visible columns
                    .map((column) => (
                      <td key={`${entity._id}-${column.id}`}>{entity[column.id] || "N/A"}</td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       
      </div>
    </div>
  );
};

export default BusinessEntitiesTab;