import React, { useState, useEffect, useRef } from "react";
import { Dropdown, DropdownToggle } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet"; //head Customization
import axios from "axios";

import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";

//icons
import { HiMiniWrench } from "react-icons/hi2";
import { FaHome, FaFilter, FaRegFilePdf } from "react-icons/fa";
import { FaPrint } from "react-icons/fa6";
import { LuRefreshCw, LuTableOfContents, LuClock9 } from "react-icons/lu";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { BiExport, BiSolidEdit } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan, FaTableColumns, FaKey, FaEye } from "react-icons/fa6";
import { TiExport, TiPlus } from "react-icons/ti";
import { HiDotsHorizontal } from "react-icons/hi";
import { ImCopy } from "react-icons/im";
import { SlSizeFullscreen } from "react-icons/sl";

//style
import "./OrganizationalEntitiesPage.css";
import LoadingSpinner from "../../../../Components/Common/LoadingSpinner/LoadingSpinner";

const OrganizationalEntitiesPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [viewMode, setViewMode] = useState("map");
  const [selectedValue, setSelectedValue] = useState("50%");
  const [rows, setRows] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Set the number of items per page
  const [pageInput, setPageInput] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const options = ["Fit", "50%", "75%", "100%", "125%", "150%", "200%"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleToolDropDown = () => {
    setIsToolOpen(!isToolOpen);
  };
  const ColumnDropDown = () => {
    setIsColumnOpen(!isColumnOpen);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => {
      if (id === "all") {
        return prev.length === rows.length ? [] : rows.map((row) => row.id);
      }
      return prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setCheckedItems(rows.map((row) => row.id));
    } else {
      setCheckedItems([]);
    }
  };

  useEffect(() => {
    fetchOrganizationalEntities();
  }, []);

  const fetchOrganizationalEntities = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/organizational-entities/all`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data) {
        const formattedRows = response.data.map((entity) => ({
          id: entity._id,
          businessEntity: entity.businessEntity || "",
          businessEntityType: entity.businessEntityType || "",
          businessEntityId: entity.businessEntityId || "",
          description: entity.description || "",
          locations:
            entity.relatedLocations
              ?.map((loc) => (typeof loc === "object" ? loc.locationName : loc))
              .join(", ") || "",
          parentEntity: entity.parentBusinessEntity
            ? entity.parentBusinessEntity.businessEntity
            : "",
          childEntities:
            entity.childBusinessEntities
              ?.map((child) =>
                typeof child === "object" ? child.businessEntity : child
              )
              .join(" | ") || "",
          updatedAt: entity.updatedAt
            ? new Date(entity.updatedAt).toLocaleString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })
            : "",
        }));

        setRows(formattedRows);
      } else {
        console.error("No data received");
        setRows([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
      setRows([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id) => {
    const entityToEdit = rows.find((row) => row.id === id);
    if (entityToEdit) {
      navigate(`/organizational-entities/edit/${id}`, {
        state: {
          businessEntityType: entityToEdit.businessEntityType,
          businessEntity: entityToEdit.businessEntity,
          businessEntityId: entityToEdit.businessEntityId,
          description: entityToEdit.description,
          parentBusinessEntity: entityToEdit.parentEntity,
          childBusinessEntities:
            entityToEdit.childEntities.match(/[^|]+/g) || [],
          relatedLocations: entityToEdit.locations,
          editors: [],
        },
      });
    } else {
      console.error("Entity not found for editing");
    }
  };

  // Add this function to handle page adjustment after deletion
  const adjustPageAfterDeletion = (totalItems) => {
    const maxPage = Math.ceil(totalItems / itemsPerPage);
    if (currentPage > maxPage) {
      // If current page is now empty, go to the last available page
      setCurrentPage(Math.max(1, maxPage));
      setPageInput(Math.max(1, maxPage));
    }
  };

  // Update the handleDelete function
  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete this entity?`)) {
      setIsLoading(true);
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/v1/organizational-entities/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        const newTotalItems = rows.length - 1;
        adjustPageAfterDeletion(newTotalItems);

        await fetchOrganizationalEntities();
      } catch (error) {
        console.error("Error deleting entity:", error);
        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    }
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

  const handleView = (id) => {
    // Implement the logic to handle view action
    console.log(`Viewing entity with ID: ${id}`);
  };

  const handleRefresh = () => {
    fetchOrganizationalEntities();
  };

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePageInputChange = (e) => {
    const value = e.target.value;
    setPageInput(value); // Allow any input temporarily

    // If enter is pressed or input loses focus
    if (e.key === "Enter" || e.type === "blur") {
      const numValue = parseInt(value);
      const maxPage = Math.ceil(rows.length / itemsPerPage);

      // Handle empty input or invalid numbers
      if (value === "" || isNaN(numValue) || numValue < 1) {
        setCurrentPage(1);
        setPageInput(1);
      }
      // Handle numbers greater than max page
      else if (numValue > maxPage) {
        setCurrentPage(maxPage);
        setPageInput(maxPage);
      }
      // Handle valid page numbers
      else {
        setCurrentPage(numValue);
        setPageInput(numValue);
      }
    }
  };

  // Add function to handle first, prev, next, last page
  const handleFirstPage = () => {
    setCurrentPage(1);
    setPageInput(1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => {
      const newPage = prev - 1;
      setPageInput(newPage);
      return newPage;
    });
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => {
      const newPage = prev + 1;
      setPageInput(newPage);
      return newPage;
    });
  };

  const handleLastPage = () => {
    const lastPage = Math.ceil(rows.length / itemsPerPage);
    setCurrentPage(lastPage);
    setPageInput(lastPage);
  };

  // Add column visibility state
  const [columns, setColumns] = useState([
    { id: "checkbox", label: "", draggable: false },
    { id: "actions", label: "Actions", draggable: false },
    { id: "businessEntity", label: "Business Entity", draggable: true },
    {
      id: "businessEntityType",
      label: "Business Entity Type",
      draggable: true,
    },
    { id: "businessEntityId", label: "Business Entity ID", draggable: true },
    { id: "parentEntity", label: "Parent Business Entity", draggable: true },
    { id: "childEntities", label: "Child Business Entities", draggable: true },
    { id: "locations", label: "Related Locations", draggable: true },
    { id: "updatedAt", label: "Updated At", draggable: true },
  ]);

  const [columnWidths, setColumnWidths] = useState({
    checkbox: 40,
    actions: 100,
    businessEntity: 200,
    businessEntityType: 180,
    businessEntityId: 150,
    parentEntity: 200,
    childEntities: 250,
    locations: 200,
    updatedAt: 180,
  });

  const [visibleColumns, setVisibleColumns] = useState({
    businessEntity: true,
    businessEntityType: true,
    businessEntityId: true,
    parentEntity: true,
    childEntities: true,
    locations: true,
    updatedAt: true,
  });

  // Add drag and resize handlers (same as Employees.jsx)
  const [draggedColumn, setDraggedColumn] = useState(null);

  // Add column toggle handler
  const handleColumnToggle = (columnName) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnName]: !prev[columnName],
    }));
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
      updatedAt: true,
    });
  };

  // Add these handlers after the state declarations
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

  // Add resize handlers
  const handleResizeStart = (e, columnId) => {
    e.preventDefault();

    const startX = e.pageX;
    const startWidth = columnWidths[columnId];

    const handleMouseMove = (moveEvent) => {
      const newWidth = Math.max(50, startWidth + (moveEvent.pageX - startX));
      setColumnWidths((prev) => ({
        ...prev,
        [columnId]: newWidth,
      }));
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Add filter state
  const [filters, setFilters] = useState({
    businessEntity: "",
    businessEntityType: "",
    businessEntityId: "",
    parentEntity: "",
    childEntities: "",
    locations: "",
    updatedAt: "",
  });

  // Add filter handler
  const handleFilterChange = (columnId, value) => {
    setFilters((prev) => ({
      ...prev,
      [columnId]: value,
    }));
  };

  // Add filtered rows calculation
  const filteredRows = rows.filter((row) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return String(row[key]).toLowerCase().includes(value.toLowerCase());
    });
  });

  // Update currentRows to use filteredRows instead of rows
  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);

  // Update the FilterDropdown component
  const FilterDropdown = ({ columnId, onFilterChange }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterValue, setFilterValue] = useState("");
    const dropdownRef = useRef(null);

    const handleApplyFilter = () => {
      onFilterChange(columnId, filterValue);
      setIsFilterOpen(false);
    };

    // Close filter when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsFilterOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    return (
      <div className="filter-dropdown" ref={dropdownRef}>
        <button
          className="btn btn-sm btn-link p-0"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          title="Filter"
        >
          <FaFilter style={{ fontSize: "0.8em" }} />
        </button>
        {isFilterOpen && (
          <div className="filter-popup">
            <div className="filter-header">
              <h6>
                Filter by {columns.find((col) => col.id === columnId)?.label}
              </h6>
            </div>
            <div className="filter-body">
              <input
                type="text"
                className="form-control form-control-sm"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                placeholder="Enter filter value..."
                autoFocus
              />
            </div>
            <div className="filter-footer">
              <button
                className="btn btn-sm btn-primary me-1"
                onClick={handleApplyFilter}
              >
                Apply
              </button>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => {
                  setFilterValue("");
                  onFilterChange(columnId, "");
                  setIsFilterOpen(false);
                }}
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Organizational Entities Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Organizational Entities</div>
            <div
              className="map-action k-widget k-button-group order-1"
              id="map-action-toggle"
              data-role="buttongroup"
              role="group"
            >
              <span
                aria-pressed={viewMode === "map"}
                role="button"
                className={`k-button ${
                  viewMode === "map" ? "k-state-active" : ""
                }`}
                onClick={() => handleViewModeChange("map")}
              >
                Map
              </span>
              <span
                aria-pressed={viewMode === "list"}
                role="button"
                className={`k-button ${
                  viewMode === "list" ? "k-state-active" : ""
                }`}
                onClick={() => handleViewModeChange("list")}
              >
                List
              </span>

              <span className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                  type="button"
                  id="TollFropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded={isToolOpen}
                  onClick={toggleToolDropDown}
                >
                  <HiMiniWrench style={{ width: "16px", height: "16px" }} />
                </button>
                <ul
                  className={`dropdown-menu right-auto ${
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
        {viewMode === "map" ? (
          <div className="main-content2 pt-3">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <span className="header-title">Hierarchy</span>
              </div>
              <div className="d-flex">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle border-radius-2"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded={isOpen}
                    onClick={toggleDropdown}
                  >
                    <span>{selectedValue}</span>
                    <span>
                      <IoMdArrowDropdown
                        style={{ width: "20px", height: "20px" }}
                      />
                    </span>
                  </button>
                  <ul
                    className={`dropdown-menu size-dropdown ${
                      isOpen ? "show" : ""
                    }`}
                    aria-labelledby="dropdownMenuButton"
                    style={{
                      "--vz-dropdown-min-width": "15rem",
                      "--vz-dropdown-font-size": "14px;",
                    }}
                  >
                    {options.map((option) => (
                      <li
                        key={option}
                        className="px-3 py-1 text-sm hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSelect(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="button border-1 ms-1" title="Key values">
                  <FaKey style={{ width: "18px", height: "18px" }} />
                </button>
                <button className="button border-1 ms-1" title="Export">
                  <BiExport style={{ width: "20px", height: "20px" }} />
                </button>
                <button className="button border-1 ms-1" title="Open All Nodes">
                  <SlSizeFullscreen style={{ width: "20px", height: "20px" }} />
                </button>
              </div>
            </div>
          </div>
        ) : (
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
                    <li className="dropdown-checkbox">
                      <label>
                        <input
                          type="checkbox"
                          className="ms-2 me-1"
                          checked={visibleColumns.businessEntity}
                          onChange={() => handleColumnToggle("businessEntity")}
                        />
                        Business Entity
                      </label>
                    </li>
                    <li className="dropdown-checkbox">
                      <label>
                        <input
                          type="checkbox"
                          className="ms-2 me-1"
                          checked={visibleColumns.businessEntityType}
                          onChange={() =>
                            handleColumnToggle("businessEntityType")
                          }
                        />
                        Business Entity Type
                      </label>
                    </li>
                    <li className="dropdown-checkbox">
                      <label>
                        <input
                          type="checkbox"
                          className="ms-2 me-1"
                          checked={visibleColumns.businessEntityId}
                          onChange={() =>
                            handleColumnToggle("businessEntityId")
                          }
                        />
                        Business Entity ID
                      </label>
                    </li>
                    <li className="dropdown-checkbox">
                      <label>
                        <input
                          type="checkbox"
                          className="ms-2 me-1"
                          checked={visibleColumns.parentEntity}
                          onChange={() => handleColumnToggle("parentEntity")}
                        />
                        Parent Business Entity
                      </label>
                    </li>
                    <li className="dropdown-checkbox">
                      <label>
                        <input
                          type="checkbox"
                          className="ms-2 me-1"
                          checked={visibleColumns.childEntities}
                          onChange={() => handleColumnToggle("childEntities")}
                        />
                        Child Business Entities
                      </label>
                    </li>
                    <li className="dropdown-checkbox">
                      <label>
                        <input
                          type="checkbox"
                          className="ms-2 me-1"
                          checked={visibleColumns.locations}
                          onChange={() => handleColumnToggle("locations")}
                        />
                        Related Locations
                      </label>
                    </li>
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
        )}
        <div className="border-1 mt-2 mb-2"></div>
        {viewMode === "list" && (
          <div className="table-container">
            {isLoading && <LoadingSpinner />}

            {/* Only show pagination if there are more items than itemsPerPage */}
            {rows.length > itemsPerPage && (
              <div className="pagination-wrapper">
                <div className="d-flex align-items-center gap-3 p-2 justify-content-between">
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={handleFirstPage}
                      disabled={currentPage === 1}
                    >
                      {"<<"}
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      {"<"}
                    </button>
                    <span className="mx-2">Page</span>
                    <input
                      type="text"
                      className="form-control page-input"
                      value={pageInput}
                      onChange={handlePageInputChange}
                      onKeyDown={handlePageInputChange}
                      onBlur={handlePageInputChange}
                    />
                    <span className="mx-2">
                      of {Math.ceil(rows.length / itemsPerPage)}
                    </span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={handleNextPage}
                      disabled={
                        currentPage === Math.ceil(rows.length / itemsPerPage)
                      }
                    >
                      {">"}
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={handleLastPage}
                      disabled={
                        currentPage === Math.ceil(rows.length / itemsPerPage)
                      }
                    >
                      {">>"}
                    </button>
                  </div>
                  <span className="ms-2 fw-bold">
                    {indexOfFirstRow + 1} -{" "}
                    {Math.min(indexOfLastRow, rows.length)} of {rows.length}{" "}
                    items
                  </span>
                </div>
              </div>
            )}

            {/* Table */}
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: "40px" }}>
                      <input
                        type="checkbox"
                        checked={
                          checkedItems.length === filteredRows.length &&
                          filteredRows.length > 0
                        }
                        onChange={handleSelectAll}
                        className="form-check-input"
                      />
                    </th>
                    <th style={{ width: "100px" }} className="text-center">
                      Actions
                    </th>
                    {columns
                      .filter((col) => col.draggable && visibleColumns[col.id])
                      .map((column) => (
                        <th
                          key={column.id}
                          draggable={true}
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
                            <FilterDropdown
                              columnId={column.id}
                              onFilterChange={handleFilterChange}
                            />
                          </div>
                          <div
                            className="resize-handle"
                            onMouseDown={(e) => handleResizeStart(e, column.id)}
                          />
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
  {currentRows.map((row) => (
    <tr key={row.id}>
      <td>
        <input
          type="checkbox"
          className="form-check-input"
          checked={checkedItems.includes(row.id)}
          onChange={() => handleCheckboxChange(row.id)}
        />
      </td>
      <td className="text-center">
        <div className="d-flex align-items-center gap-2 justify-content-center">
          <button
            className="btn btn-sm btn-link p-0"
            onClick={() => handleEdit(row.id)}
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
            onClick={() => handleDelete(row.id)}
            title="Delete"
          >
            <RiDeleteBin6Line className="text-danger" size={18} />
          </button>
        </div>
      </td>
      {visibleColumns.businessEntity && (
        <td>
          <a href={`/organizational-entities/view/${row._id || row.id}`} className="text-primary">
  {row.businessEntity}
</a>

        </td>
      )}
      {columns
        .filter((col) => col.draggable && visibleColumns[col.id])
        .map((column) => (
          <td key={`${row.id}-${column.id}`}>{row[column.id]}</td>
        ))}
    </tr>
  ))}
</tbody>

              </table>
            </div>

            {/* Bottom pagination - only show if there are more items than itemsPerPage */}
            {rows.length > itemsPerPage && (
              <div className="pagination-wrapper">
                <div className="d-flex align-items-center gap-3 p-2 justify-content-between">
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={handleFirstPage}
                      disabled={currentPage === 1}
                    >
                      {"<<"}
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      {"<"}
                    </button>
                    <span className="mx-2">Page</span>
                    <input
                      type="text"
                      className="form-control page-input"
                      value={pageInput}
                      onChange={handlePageInputChange}
                      onKeyDown={handlePageInputChange}
                      onBlur={handlePageInputChange}
                    />
                    <span className="mx-2">
                      of {Math.ceil(rows.length / itemsPerPage)}
                    </span>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={handleNextPage}
                      disabled={
                        currentPage === Math.ceil(rows.length / itemsPerPage)
                      }
                    >
                      {">"}
                    </button>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={handleLastPage}
                      disabled={
                        currentPage === Math.ceil(rows.length / itemsPerPage)
                      }
                    >
                      {">>"}
                    </button>
                  </div>
                  <span className="ms-2 fw-bold">
                    {indexOfFirstRow + 1} -{" "}
                    {Math.min(indexOfLastRow, rows.length)} of {rows.length}{" "}
                    items
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default OrganizationalEntitiesPage;
