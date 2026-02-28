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
import { CiEdit } from "react-icons/ci"; 
import { RiDeleteBin6Line } from "react-icons/ri";

function Threat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectAll, setSelectAll] = useState(false); // State for select all checkbox

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleToolDropDown = () => {
    setIsToolOpen(!isToolOpen);
  };

  const ColumnDropDown = () => {
    setIsColumnOpen(!isColumnOpen);
  };

  // Fetch Threats Data from API
  useEffect(() => {
    const fetchThreats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/threats`);
        const result = await response.json();

        if (response.ok) {
          setThreats(result);
        } else {
          setError(result.message || "Error fetching threats");
        }
      } catch (error) {
        setError("Network error! Please try again.");
      }
      setLoading(false);
    };

    fetchThreats();
  }, []);

  // Handle select all checkbox change
  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setThreats(threats.map(threat => ({ ...threat, isSelected: !selectAll })));
  };

  // Handle individual checkbox change
  const handleCheckboxChange = (id) => {
    setThreats(threats.map(threat => threat._id === id ? { ...threat, isSelected: !threat.isSelected } : threat));
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Threat | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Threat</div>
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
                  className={`right-auto dropdown-menu ${isToolOpen ? "show" : ""}`}
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
                      Tab Definition
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
              <span className="header-title">Threat</span>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-2"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded={isOpen}
                  onClick={toggleDropdown}
                >
                  All Threats
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
                      All Threats
                      <BiSolidEdit className="hw-15 ml-20px" />
                      <FaTableColumns className="hw-15 ml-5px" />
                      <ImCopy className="hw-15 ml-5px" />
                    </a>
                  </li>
                  <span className="ms-1">Select Another View...</span>
                  <li>
                    <a className="dropdown-item" href="#">
                      All Threats (by Score)
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      All Critical Threats (Score &gt;9)
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      All Natural Threats
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      All Man-Made Threats
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      All Technology Threats
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      All Political Threats
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
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Threat
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Likelihood
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Impact
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Mitigating Controls
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Control Description
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Threat Risk Score
                    </label>
                  </li>
                  <li className="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Risk Rating
                    </label>
                  </li>
                </ul>
              </span>
              <button className="button border-1 ms-1">
                <FaFilter className="hw-15" />
              </button>
            </div>
            <div>
              <NavLink className="button1 border-1" to="/new-threat">
                <TiPlus className="hw-20" />
                Threat
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

          {/* Show loading and error messages */}
          {loading && <p>Loading data...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Display data in a table */}
          <div style={{ width: "100%", overflowX: "auto" }}>
            <div style={{ maxHeight: "300px", overflowY: "auto", border: "1px solid #ccc" }}>
              <table className="table table-bordered mt-3" style={{ minWidth: "2800px" }}>
                <thead>
                  <tr>
                    <th className="sticky-col">
                      <input type="checkbox" checked={selectAll} onChange={handleSelectAllChange} />
                    </th>
                    <th className="sticky-col" style={{ width: "10%", overflowX: "auto" }}>Action</th>
                    <th>Threat</th>
                    <th>Threat Type</th>
                    <th>Weight</th>
                    <th>Likelihood</th>
                    <th>Impact</th>
                    <th>Mitigating Controls</th>
                    <th>Control Description</th>
                  </tr>
                </thead>
                <tbody>
                  {threats.length > 0 ? (
                    threats.map((threat) => (
                      <tr key={threat._id}>
                        <td className="sticky-col">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={threat.isSelected || false}
                            onChange={() => handleCheckboxChange(threat._id)}
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
                        <td>{threat.threat}</td>
                        <td>{threat.threatType}</td>
                        <td>{threat.weight}</td>
                        <td>{threat.likelihood}</td>
                        <td>{threat.impact}</td>
                        <td>{threat.mitigatingControls}</td>
                        <td>{threat.controlDescription}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Threat;