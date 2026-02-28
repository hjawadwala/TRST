import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaTableColumns, FaFilter, FaRegTrashCan } from "react-icons/fa6";
import { LuRefreshCw } from "react-icons/lu";
import { TiPlus } from "react-icons/ti";

const RelatedBusinessEntity = ({ locationId, data }) => {
  const [businessEntities, setBusinessEntities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState(1);
  const [checkedItems, setCheckedItems] = useState([]);
  const [filters, setFilters] = useState({});
  const [filterVisible, setFilterVisible] = useState({});
  const [draggedColumn, setDraggedColumn] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState({
    businessEntityId: true,
    businessEntity: true,
    businessEntityType: true,
    description: true,
  });
  const [isColumnOpen, setIsColumnOpen] = useState(false);

  const itemsPerPage = 10;

  const [columns, setColumns] = useState([
    { id: "businessEntityId", label: "Business Entity ID", draggable: true },
    { id: "businessEntity", label: "Business Entity", draggable: true },
    { id: "businessEntityType", label: "Type", draggable: true },
    { id: "description", label: "Description", draggable: true },
  ]);

  const [columnWidths, setColumnWidths] = useState({
    businessEntityId: 150,
    businessEntity: 200,
    businessEntityType: 180,
    description: 250,
  });

  // Fetch data
  useEffect(() => {
    if (data?.businessEntitiesRelationships) {
      setBusinessEntities(data.businessEntitiesRelationships);
    } else if (locationId) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/v1/locations/${locationId}`)
        .then((res) => {
          setBusinessEntities(res.data.data.businessEntitiesRelationships || []);
        })
        .catch((err) => console.error("Error fetching data:", err));
    }
  }, [locationId, data]);

  // Initialize filter visibility
  useEffect(() => {
    const initial = {};
    columns.forEach((col) => (initial[col.id] = false));
    setFilterVisible(initial);
  }, [columns]);

  // Filtering logic
  const filteredRows = businessEntities.filter((row) =>
    Object.entries(filters).every(([key, value]) =>
      value ? String(row[key] || "").toLowerCase().includes(value.toLowerCase()) : true
    )
  );

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentRows = filteredRows.slice(indexOfFirst, indexOfLast);

  const handlePageInputChange = (e) => {
    const value = e.target.value;
    setPageInput(value);
    if (e.key === "Enter" || e.type === "blur") {
      const num = parseInt(value);
      const max = Math.ceil(filteredRows.length / itemsPerPage);
      if (!num || num < 1) setCurrentPage(1);
      else if (num > max) setCurrentPage(max);
      else setCurrentPage(num);
      setPageInput(num);
    }
  };

  // Pagination Controls
  const handleFirstPage = () => {
    setCurrentPage(1);
    setPageInput(1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageInput(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    const maxPage = Math.ceil(filteredRows.length / itemsPerPage);
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
      setPageInput(currentPage + 1);
    }
  };
  const handleLastPage = () => {
    const maxPage = Math.ceil(filteredRows.length / itemsPerPage);
    setCurrentPage(maxPage);
    setPageInput(maxPage);
  };

  // Checkboxes
  const handleSelectAll = (e) => {
    setCheckedItems(e.target.checked ? currentRows.map((r) => r._id) : []);
  };
  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Drag-drop columns
  const handleDragStart = (e, col) => {
    setDraggedColumn(col);
    e.target.style.opacity = "0.5";
  };
  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
    setDraggedColumn(null);
  };
  const handleDrop = (e, targetCol) => {
    e.preventDefault();
    if (!draggedColumn || !targetCol.draggable) return;

    const newCols = [...columns];
    const fromIdx = newCols.findIndex((c) => c.id === draggedColumn.id);
    const toIdx = newCols.findIndex((c) => c.id === targetCol.id);

    newCols.splice(fromIdx, 1);
    newCols.splice(toIdx, 0, draggedColumn);
    setColumns(newCols);
  };

  const handleFilterIconClick = (id) => {
    setFilterVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleFilterChange = (id, val) => {
    setFilters((prev) => ({
      ...prev,
      [id]: val,
    }));
  };

  const handleResizeStart = (e, id) => {
    const startX = e.pageX;
    const startW = columnWidths[id];

    const move = (me) => {
      const newW = Math.max(50, startW + (me.pageX - startX));
      setColumnWidths((prev) => ({ ...prev, [id]: newW }));
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  const handleColumnToggle = (columnId) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  return (
    <div className="main-content2 pt-3">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <span className="header-title">Related Business Entities</span>
          <button className="button border-1 ms-1"><LuRefreshCw /></button>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle border-radius-2"
              type="button"
              id="columnDropdown"
              data-bs-toggle="dropdown"
              aria-expanded={isColumnOpen}
              onClick={() => setIsColumnOpen(!isColumnOpen)}
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
                  onClick={() =>
                    setVisibleColumns({
                      businessEntityId: true,
                      businessEntity: true,
                      businessEntityType: true,
                      description: true,
                    })
                  }
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
          </div>
          <button className="button border-1 ms-1"><FaFilter /></button>
        </div>
        <div>
          <NavLink className="button1 border-1" to="/new-organizational-entity">
            <TiPlus /> Add Business Entity
          </NavLink>
          <button className="button border-1 ms-1"><FaRegTrashCan /></button>
        </div>
      </div>

      <div className="border-1 mt-2 mb-2"></div>

      {/* Table + Pagination */}
      <div className="table-container">
        <div className="pagination-wrapper p-2 d-flex justify-content-between align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <button className="btn btn-sm btn-outline-secondary" onClick={handleFirstPage}>{"<<"}</button>
            <button className="btn btn-sm btn-outline-secondary" onClick={handlePrevPage}>{"<"}</button>
            <span>
              Page {currentPage} of {Math.ceil(filteredRows.length / itemsPerPage)}
            </span>
            <button className="btn btn-sm btn-outline-secondary" onClick={handleNextPage}>{">"}</button>
            <button className="btn btn-sm btn-outline-secondary" onClick={handleLastPage}>{">>"}</button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={checkedItems.length === currentRows.length && currentRows.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th style={{ width: "80px", textAlign: "center" }}>Actions</th>

                {columns
                  .filter((col) => visibleColumns[col.id]) // Only render visible columns
                  .map((col) => (
                    <th
                      key={col.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, col)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, col)}
                      style={{ width: `${columnWidths[col.id]}px` }}
                    >
                      <div style={{ position: "relative" }}>
                        <div className="d-flex align-items-center justify-content-between">
                          <span>{col.label}</span>
                          <FaFilter
                            onClick={() => handleFilterIconClick(col.id)}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                        {filterVisible[col.id] && (
                          <input
                            type="text"
                            placeholder={`Filter ${col.label}`}
                            className="form-control mt-1"
                            style={{
                              position: "absolute",
                              top: "calc(100% + -34px)",
                              left: 0,
                              zIndex: 1000,
                              width: "100%",
                              backgroundColor: "white",
                              border: "1px solid #ccc",
                            }}
                            onChange={(e) => handleFilterChange(col.id, e.target.value)}
                          />
                        )}
                        <div
                          className="resize-handle"
                          onMouseDown={(e) => handleResizeStart(e, col.id)}
                          style={{
                            cursor: "col-resize",
                            width: "5px",
                            height: "100%",
                            position: "absolute",
                            right: 0,
                            top: 0,
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
                    />
                  </td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-sm btn-link p-0">
                        <CiEdit className="text-success" size={18} />
                      </button>
                      <button className="btn btn-sm btn-link p-0">
                        <RiDeleteBin6Line className="text-danger" size={18} />
                      </button>
                    </div>
                  </td>
                  {columns
                    .filter((col) => visibleColumns[col.id]) // Only render visible columns
                    .map((col) => (
                      <td key={`${entity._id}-${col.id}`}>{entity[col.id] || "N/A"}</td>
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

export default RelatedBusinessEntity;
