// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Link, NavLink } from "react-router-dom";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { FcSettings } from "react-icons/fc";
import { LuRefreshCw, LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaPrint } from "react-icons/fa6";
import { FaHome, FaFilter, FaRegFilePdf } from "react-icons/fa";
import { TiExport, TiPlus } from "react-icons/ti";
import { FaRegTrashCan, FaTableColumns } from "react-icons/fa6";
import { ImCopy } from "react-icons/im";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
function CallTrees() {
  const [callTrees, setCallTrees] = useState([]); // State to store CallTrees data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
    const [isOpen, setIsOpen] = useState(false);
    const [isToolOpen, setIsToolOpen] = useState(false);
    const [isColumnOpen, setIsColumnOpen] = useState(false);
    const navigate = useNavigate();
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const toggleToolDropDown = () => {
      setIsToolOpen(!isToolOpen);
    };

    const handleCheckboxChange = (id) => {
      setCallTrees((prevCallTrees) =>
        prevCallTrees.map((callTree) =>
          callTree._id === id
        ? { ...callTree, isChecked: !callTree.isChecked }
        : callTree
        )
      );
    };
    const ColumnDropDown = () => {
      setIsColumnOpen(!isColumnOpen);
    };

    useEffect(() => {
      const fetchCallTrees = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/call-trees/getall`);
    
          console.log("✅ Full API Response:", response);
          console.log("✅ API Data:", response.data || response);
    
          // Fix: Use response directly if response.data is undefined
          const data = response.data || response;
    
          if (!Array.isArray(data)) {
            throw new Error("API did not return an array");
          }
    
          setCallTrees(data);
          setError(null);
        } catch (err) {
          console.error("❌ API Fetch Error:", err.message);
          setError("Failed to fetch Call Trees. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
    
      fetchCallTrees();
    }, []);
    
  // Handle Edit Button Click
  const handleEdit = (id) => {
    navigate(`/edit-call-trees/${id}`); // Navigate to the EditCallTree page with the ID
  };
   // Handle Delete Button Click
   const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Call Tree?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/call-trees/${id}`);
      alert("Call Tree deleted successfully!");
      setCallTrees(callTrees.filter((callTree) => callTree._id !== id)); // Remove the deleted CallTree from the state
    } catch (error) {
      console.error("Error deleting Call Tree:", error.message);
      alert("Failed to delete Call Tree.");
    }
  };

    
  return (
    <React.Fragment>
    <Helmet>
      <title>Call Trees Page | TRST</title>
      <meta name="description" content="This is the home page description" />
      <meta name="keywords" content="home, react, meta tags" />
    </Helmet>
    <div className="page-content">
      <div className="main-content1">
        <div className="d-flex align-items-center justify-content-between">
          <div className="header-text">Call Trees</div>
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
            <span className="header-title">Call Trees</span>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle border-radius-2"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded={isOpen}
                onClick={toggleDropdown}
              >
                All Call Trees
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
                    All Call Trees
                    <BiSolidEdit className="hw-15 ml-20px" />
                    <FaTableColumns className="hw-15 ml-5px" />
                    <ImCopy className="hw-15 ml-5px" />
                  </a>
                </li>
              </ul>
            </div>
            <button className="button border-1 ms-1">
              <FaHome className="hw-15" />
            </button>
            <button className="button border-1 ms-1">
              <LuRefreshCw className="hw-18" />
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
                  <a className="blue">Reset</a>
                </li>
                <li class="dropdown-checkbox">
                  <label>
                    <input type="checkbox" className="ms-2 me-1" />
                    Call Tree
                  </label>
                </li>
                <li class="dropdown-checkbox">
                  <label>
                    <input type="checkbox" className="ms-2 me-1" />
                   People in Call Tree
                  </label>
                </li>
                <li class="dropdown-checkbox">
                  <label>
                    <input type="checkbox" className="ms-2 me-1" />
                   Updated At
                  </label>
                </li>
                <li class="dropdown-checkbox">
                  <label>
                    <input type="checkbox" className="ms-2 me-1" />
                   Updated By
                  </label>
                </li>
              </ul>
            </span>
            <button className="button border-1 ms-1">
              <FaFilter className="hw-15" />
            </button>
          </div>
          <div>
            <NavLink className="button1 border-1" to="/new-call-trees">
              <TiPlus className="hw-20" />
              Call Tree
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
        <div className="border-1 mt-2 mb-2"></div>
      </div>
      <div className="table-responsive">
          <h3>Call Trees Records</h3>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <table className="table table-hover">
              <thead>
                <tr>
                <th>Actions</th>
                  <th>Call Tree Name</th>
                  <th>Description</th>
                  <th>Employees</th>
                  <th>Client Contacts</th>
            
                </tr>
              </thead>
              <tbody>
                {callTrees.length > 0 ? (
                  callTrees.map((callTree, index) => (
                    <tr key={callTree._id}>
                      <td>
                        <div style={{ gap: "10px" }} className="d-flex align-items-center">
                          <Link className="btn btn-sm btn-link"
                          to={`/edit-call-trees/${callTree._id}`} // Navigate to the EditCallTree page with the ID

                            >
                             <CiEdit
                                                                        style={{
                                                                          cursor: "pointer",
                                                                          fontSize: "1.2em",
                                                                          color: "green",
                                                                        }}
                                                                        size={18}
                                                                      />
                          </Link>
                          <Button className="btn btn-sm btn-link text-danger"
                            onClick={() => handleDelete(callTree._id)} >
                           <FaRegTrashCan className="text-danger" />
                          </Button>
                        </div>
                      </td>
                      <td>{callTree.callTreeName || "No Name"}</td>
                      <td>{callTree.description || "No Description"}</td>
                      <td>
                        {Array.isArray(callTree.employees) && callTree.employees.length > 0 ? (
                          callTree.employees.map((employee) => (
                            <div key={employee._id}>
                              {employee.firstName} {employee.lastName}
                            </div>
                          ))
                        ) : (
                          <span>No Employees</span>
                        )}
                      </td>
                      <td>
                        {Array.isArray(callTree.clientContacts) && callTree.clientContacts.length > 0 ? (
                          callTree.clientContacts.map((contact) => (
                            <div key={contact._id}>
                              {contact.firstName} {contact.lastName}
                            </div>
                          ))
                        ) : (
                          <span>No Client Contacts</span>
                        )}
                      </td>
                      
                    </tr>
                  ))  
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No Call Trees Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

      </div>


     
  </React.Fragment>
  )
}

export default CallTrees
				