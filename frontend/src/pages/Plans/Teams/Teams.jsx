import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { CiEdit } from "react-icons/ci"; 
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { BiSolidEdit } from "react-icons/bi";
import { TiPlus, TiExport } from "react-icons/ti";
import { FaColumns, FaHome, FaFilter, FaTrashAlt } from "react-icons/fa"; // Replace FaTableColumns with FaColumns
import { HiDotsHorizontal } from "react-icons/hi"; // Import HiDotsHorizontal
import { LuRefreshCw } from "react-icons/lu"; // Import LuRefreshCw
import { ImCopy } from "react-icons/im"; // Import ImCopy

// Replace all occurrences of FaTableColumns with FaColumns in the JSX
function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page
  const [isOpen, setIsOpen] = useState(false); // State for dropdown toggle

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // State for column dropdown toggle
  const [isColumnOpen, setIsColumnOpen] = useState(false);

  const ColumnDropDown = () => {
    setIsColumnOpen((prev) => !prev);
  };


// Pagination logic
const totalPages = Math.ceil(teams.length / itemsPerPage);
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentTeams = teams.slice(indexOfFirstItem, indexOfLastItem);

const handlePageChange = (pageNumber) => {
  if (pageNumber > 0 && pageNumber <= totalPages) {
    setCurrentPage(pageNumber);
  }
};

const handleNextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage((prev) => prev + 1);
  }
};

const handlePrevPage = () => {
  if (currentPage > 1) {
    setCurrentPage((prev) => prev - 1);
  }
};

const handleFirstPage = () => {
  setCurrentPage(1);
};

const handleLastPage = () => {
  setCurrentPage(totalPages);
};



  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/teams/all`);
  
        console.log("Full API Response:", response);
        console.log("Teams Data:", response.data);
  
        // Fix: Ensure we correctly access the data array
        const teamsData = Array.isArray(response.data) ? response.data : response.data?.data;
  
        if (!Array.isArray(teamsData)) {
          console.error("API returned invalid data format:", response.data);
          setTeams([]); // Prevent undefined state
          return;
        }
  
        console.log("Teams Array (Fixed):", teamsData);
  
        // Ensure React detects state update
        setTeams([...teamsData]);
      } catch (error) {
        console.error("Error fetching teams:", error.response?.data || error);
        setTeams([]); // Prevent undefined state
      } finally {
        setLoading(false);
      }
    };
  
    fetchTeams();
  }, []);
  
  // Debugging log to check if teams state updates properly
  useEffect(() => {
    console.log("Updated Teams State:", teams);
  }, [teams]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/teams/${id}`);
        setTeams((prevTeams) => prevTeams.filter((team) => team._id !== id));
        alert("Team deleted successfully!");
      } catch (error) {
        console.error("Error deleting team:", error);
      }
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Teams Page | TRST</title>
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Teams</div>
            <div className="dropdown">
              
              <ul
                className={`dropdown-menu ${isOpen ? "show" : ""}`}
                aria-labelledby="dropdownMenuButton"
                style={{
                  "--vz-dropdown-min-width": "15rem",
                  "--vz-dropdown-font-size": "14px",
                }}
              >
                <li>
                  <a className="dropdown-item" href="#">
                    <TiPlus className="mb-2px hw-15" />
                    Create New View
                  </a>
                </li>
               
              </ul>
            </div>
           
           
          
            <div>
              <NavLink className="button1 border-1" to="/new-teams">
                <TiPlus className="hw-20" />
                Team
              </NavLink>
              <button className="button border-1 ms-1">
                <FaTrashAlt className="hw-18" />
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
        <div className="main-content2 pt-3">
         
          {/* Pagination start */}
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
                  type="number"
                  className="form-control page-input"
                  value={currentPage}
                  onChange={(e) => {
                    const page = Number(e.target.value);
                    if (page > 0 && page <= totalPages) {
                      setCurrentPage(page);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const page = Number(e.target.value);
                      if (page > 0 && page <= totalPages) {
                        setCurrentPage(page);
                      }
                    }
                  }}
                  onBlur={(e) => {
                    const page = Number(e.target.value);
                    if (page > 0 && page <= totalPages) {
                      setCurrentPage(page);
                    }
                  }}
                />
                <span className="mx-2">of {totalPages}</span>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  {">"}
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={handleLastPage}
                  disabled={currentPage === totalPages}
                >
                  {">>"}
                </button>
              </div>
              <div>
                <span>Items per page:</span>
                <select
                  className="form-select"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1); // Reset to first page when items per page changes
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>
          {/* Pagination end */}
          <div style={{ width: "100%", overflowX: "auto" }}>
            <div
              style={{
                maxHeight: "590px",
                overflowY: "auto",
                border: "1px solid #ccc",
              }}
            >
              {loading ? (
                <p>Loading teams...</p>
              ) : (
                <>
                  <table className="table">
                    <thead>
                      <tr>
                      <th>Actions</th>
                        <th>Team Name</th>
                        <th>Team Type</th>
                        <th>Description</th>
                        <th>Application</th>
                        <th>Team Members</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(currentTeams) && currentTeams.length > 0 ? (
                        currentTeams.map((team, index) => (

                          <tr key={team._id}>
                            <td>
                              <NavLink to={`/edit-teams/${team._id}`}>
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
                                onClick={() => handleDelete(team._id)}
                                className="btn btn-sm btn-link p-0"
                                title="Delete"
                              >
                                <RiDeleteBin6Line
                                  className="text-danger"
                                  size={18}
                                />
                              </button>
                            </td>
                            <td>{team.team || "N/A"}</td>
                            <td>{team.teamType || "N/A"}</td>
                            <td>{team.teamDescription || "N/A"}</td>
                            <td>
                              {team.applications &&
                              team.applications.length > 0 ? (
                                team.applications.map((application) => (
                                  <span
                                    key={application._id}
                                    className="badge bg-secondary me-1"
                                  >
                                    {application.applicationName}
                                  </span>
                                ))
                              ) : (
                                <span>No applications</span>
                              )}
                            </td>
                            <td>
                              {team.teamMembers &&
                              team.teamMembers.length > 0 ? (
                                team.teamMembers.map((member) => (
                                  <span
                                    key={member._id}
                                    className="badge bg-secondary me-1"
                                  >
                                    {member.firstName} {member.lastName}
                                  </span>
                                ))
                              ) : (
                                <span>No team members</span>
                              )}
                            </td>
                            
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6">No teams available.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Teams;