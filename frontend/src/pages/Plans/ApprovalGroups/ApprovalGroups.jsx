import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { LuRefreshCw } from "react-icons/lu";
import { TiPlus } from "react-icons/ti";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import Toastify from "toastify-js";

function PlanApprovalGroups() {
  // State Management
  const [planApprovalGroups, setPlanApprovalGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Field selection names
  const [columns, setColumns] = useState([
    { id: "select", label: "", width: 50, draggable: false },
    { id: "actions", label: "Actions", width: 100, draggable: false },
    { id: "planApprovalGroup", label: "Plan Approval Group", width: 200, draggable: true },
    { id: "groupDescription", label: "Group Description", width: 250, draggable: true },
    { id: "createdAt", label: "Created At", width: 200, draggable: true },
    { id: "updatedAt", label: "Updated At", width: 200, draggable: true },
  ]);
  const [visibleColumns, setVisibleColumns] = useState({
    planApprovalGroup: true,
    groupDescription: true,
    createdAt: true,
    updatedAt: true,
  });

  // Fetch Data from API
  const fetchPlanApprovalGroups = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/plan-approval-groups`);
      if (response.data && Array.isArray(response.data.data)) {
        setPlanApprovalGroups(response.data.data);
      } else if (response.data && Array.isArray(response.data)) {
        setPlanApprovalGroups(response.data);
      } else {
        console.warn("⚠️ Unexpected response format:", response.data);
        setPlanApprovalGroups([]);
      }
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setError("Failed to fetch approval groups. Check the API.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlanApprovalGroups();
  }, []);

  // Handle select all checkbox change
  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setPlanApprovalGroups(planApprovalGroups.map((group) => ({ ...group, isSelected: !selectAll })));
  };

  // Handle individual checkbox change
  const handleCheckboxChange = (id) => {
    setPlanApprovalGroups(
      planApprovalGroups.map((group) =>
        group._id === id ? { ...group, isSelected: !group.isSelected } : group
      )
    );
  };

  const handleRefresh = async () => {
    try {
      await fetchPlanApprovalGroups();
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan approval group?")) {
      return;
    }

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/plan-approval-groups/${id}`);
      Toastify({
        text: "Plan approval group deleted successfully!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "#28a745",
        },
      }).showToast();

      // Update the state to remove the deleted group
      setPlanApprovalGroups(planApprovalGroups.filter((group) => group._id !== id));
    } catch (error) {
      console.error("Error deleting plan approval group:", error);
      Toastify({
        text: "Failed to delete plan approval group.",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "#dc3545",
        },
      }).showToast();
    }
  };

  // Pagination
  const indexOfLastRow = currentPage * itemsPerPage;
  const indexOfFirstRow = indexOfLastRow - itemsPerPage;
  const filteredPlanApprovalGroups = planApprovalGroups.filter(
    (group) =>
      group.planApprovalGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.groupDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentPlanApprovalGroups = filteredPlanApprovalGroups.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <Helmet>
        <title>Plan Approval Groups | TRST</title>
        <meta name="description" content="Plan Approval Groups management page." />
        <meta name="keywords" content="plan, approval groups, management, react" />
      </Helmet>

      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Plan Approval Groups</div>
          </div>
        </div>

        <div className="main-content2 pt-3">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <span className="header-title">Plan Approval Groups</span>
              <button className="button border-1 ms-1" onClick={handleRefresh}>
                <LuRefreshCw className="hw-18" />
              </button>
            </div>
            <div>
              <NavLink className="button1 border-1" to="/plan_new-approval-group">
                <TiPlus className="hw-20" /> Plan Approval Group
              </NavLink>
            </div>
          </div>

          <div className="border-1 mt-2 mb-2"></div>

          <div style={{ width: "100%", overflowX: "auto" }}>
            <div style={{ maxHeight: "590px", overflowY: "auto", border: "1px solid #ccc" }}>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <table className="table table-hover" style={{ minWidth: "100px" }}>
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAllChange}
                        />
                      </th>
                      <th>Actions</th>
                      {columns
                        .filter((col) => visibleColumns[col.id])
                        .map((column) => (
                          <th key={column.id}>{column.label}</th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentPlanApprovalGroups.length > 0 ? (
                      currentPlanApprovalGroups.map((group) => (
                        <tr key={group._id}>
                          <td>
                            <input
                              type="checkbox"
                              className="form-check-input"
                              checked={group.isSelected || false}
                              onChange={() => handleCheckboxChange(group._id)}
                            />
                          </td>
                          <td>
                            <NavLink to={`/edit-plan-approval-group/${group._id}`} title="Edit">
                              <CiEdit
                                style={{
                                  cursor: "pointer",
                                  fontSize: "1.2em",
                                  color: "green",
                                }}
                                size={18}
                              />
                            </NavLink>
                            <button
                              className="btn btn-sm btn-link p-0"
                              title="Delete"
                              onClick={() => handleDelete(group._id)}
                            >
                              <FaRegTrashCan className="text-danger" />
                            </button>
                          </td>
                          <td>{group.planApprovalGroup || "N/A"}</td>
                          <td>{group.groupDescription || "N/A"}</td>
                          <td>{new Date(group.createdAt).toLocaleString()}</td>
                          <td>{new Date(group.updatedAt).toLocaleString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">No plan approval groups available.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PlanApprovalGroups;