import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, NavLink } from "react-router-dom";
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
import "./Equipment.css";
import { Spinner } from 'reactstrap'; // Import Spinner from reactstrap
import axios from 'axios'; // Import Axios

function Equipment() {
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
  const [equipmentRecords, setEquipmentRecords] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true); // State for loading

    // Fetch equipment records from the API
    const fetchEquipmentRecords = async () => {
        setLoading(true); // Set loading to true before fetching
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/equipment`); // Adjust the URL as needed
            console.log("Fetched data:", response.data); // Log the fetched data
            setEquipmentRecords(response.data); // Directly set the equipment records from the response
        } catch (error) {
            console.error("Error fetching equipment records:", error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };
    //delete equipment
    const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this equipment?")) return;
    
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/equipment/${id}`);
        alert("Equipment deleted successfully!");
        fetchEquipmentRecords(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting equipment:", error);
        alert("Failed to delete equipment.");
      }
    };
    

    useEffect(() => {
        fetchEquipmentRecords(); // Call the function to fetch records when the component mounts
    }, []);
  return (
    <React.Fragment>
      <Helmet>
        <title>Equipment Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Equipment</div>
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
              <span className="header-title"> Equipment</span>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-2"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded={isOpen}
                  onClick={toggleDropdown}
                >
                All Equipment<IoMdArrowDropdown className="hw-20" />
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
                      All Equipment{" "}
                      <BiSolidEdit className="hw-15 ml-20px" />
                      <FaTableColumns className="hw-15 ml-5px" />
                      <ImCopy className="hw-15 ml-5px" />
                    </a>
                  </li>
                  <span className="ms-1">Select Another View...</span>
                  <li>
                    <a className="dropdown-item" href="#">
                     NEW DEFAULT VIEW
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
                      Equipment{" "}
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Equipment Type{" "}
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                     Model Name{" "}
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                     Description{" "}
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                     Vendor(s){" "}
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                     Updated At{" "}
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                     Updated By{" "}
                    </label>
                  </li>
                </ul>
              </span>
              <button className="button border-1 ms-1">
                <FaFilter className="hw-15" />
              </button>
            </div>
            <div>
              <NavLink
                className="button1 border-1"
                to="/new-equipment"
              >
                <TiPlus className="hw-20" />
                Equipment
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
          <div className="page-content">
                <h3>Equipment Records</h3>
                {loading ? (
                    <Spinner color="primary" /> // Show loading spinner while fetching data
                ) : (
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" /> {/* Checkbox in the header */}
                                </th>
                                <th>Actions</th>
                                <th>Equipment</th>
                                <th>Equipment Type</th>
                                <th>Model Name</th>
                                <th>Vendor(s)</th>
                                <th>Description</th>
                                <th>BIA Equipment Dependency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {equipmentRecords.length > 0 ? (
                                equipmentRecords.map((record) => (
                                    <tr key={record._id}> {/* Use _id as the key */}
                                        <td>
                                            <input type="checkbox" /> {/* Checkbox for each row */}
                                        </td>
                                        <td>
                                            <Link to={`/equipment/edit/${record._id}`}  className="btn btn-sm btn-link" onClick={() => console.log(`Edit ${record._id}`)}>Edit</Link>
                                            <button className="btn btn-sm btn-link text-danger" onClick={() => handleDelete(record._id)}>Delete</button>
                                        </td>
                                        <td>{record.equipment}</td>
                                        <td>{record.equipmentType}</td>
                                        <td>{record.modelName}</td>
                                        <td>
                                      {record.vendors.length > 0 ? (
                                  record.vendors.map((vendor) => vendor.vendor).join(", ")
                                        ) : (
                                      "No Vendor"
                                    )}
                                      </td>

                                        <td>{record.description}</td>
                                        <td>{record.biaEquipmentDependency}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">No equipment records found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Equipment;