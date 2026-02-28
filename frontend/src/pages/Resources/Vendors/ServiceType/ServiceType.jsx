import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
import "./ServiceType.css";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import LoadingSpinner from "../../../../Components/Common/LoadingSpinner/LoadingSpinner";

function ServiceType() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [pageInput, setPageInput] = useState(1);

  useEffect(() => {
    const fetchServiceTypes = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/service-types/all`
      );
      setServiceTypes(response.data);
    };
    fetchServiceTypes();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleToolDropDown = () => {
    setIsToolOpen(!isToolOpen);
  };
  const ColumnDropDown = () => {
    setIsColumnOpen(!isColumnOpen);
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handlePageInputChange = (e) => {
    const value = e.target.value;
    setPageInput(value);
    if (e.key === 'Enter' || e.type === 'blur') {
      const numValue = parseInt(value);
      const maxPage = Math.ceil(serviceTypes.length / itemsPerPage);
      setCurrentPage(Math.min(Math.max(1, numValue), maxPage));
    }
  };

  const handleEdit = (id) => {
    navigate(`/service-types/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service type?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/service-types/${id}`);
        setServiceTypes(prev => prev.filter(st => st._id !== id));
      } catch (error) {
        console.error("Error deleting service type:", error);
      }
    }
  };

  const currentRows = serviceTypes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <React.Fragment>
      <Helmet>
        <title>Service Type Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Service Type</div>
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
              <span className="header-title">Service Type</span>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-2"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded={isOpen}
                  onClick={toggleDropdown}
                >
                  All Service Type
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
                      All Service Type <BiSolidEdit className="hw-15 ml-20px" />
                      <FaTableColumns className="hw-15 ml-5px" />
                      <ImCopy className="hw-15 ml-5px" />
                    </a>
                  </li>
                  <span className="ms-1">Select Another View...</span>
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
                      Service Type{" "}
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Update At{" "}
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
              <NavLink className="button1 border-1" to="/new-service-type">
                <TiPlus className="hw-20" />
                Service Type
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
        <div className="table-container">
          {loading && <LoadingSpinner />}
          
          {serviceTypes.length > itemsPerPage && (
            <div className="pagination-wrapper">
              <div className="d-flex align-items-center gap-3 p-2 justify-content-between">
                <div className="d-flex align-items-center">
                  <button className="btn btn-sm btn-outline-secondary" 
                    onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                    {"<<"}
                  </button>
                  <button className="btn btn-sm btn-outline-secondary" 
                    onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
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
                  <span className="mx-2">of {Math.ceil(serviceTypes.length / itemsPerPage)}</span>
                  <button className="btn btn-sm btn-outline-secondary" 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === Math.ceil(serviceTypes.length / itemsPerPage)}>
                    {">"}
                  </button>
                  <button className="btn btn-sm btn-outline-secondary" 
                    onClick={() => handlePageChange(Math.ceil(serviceTypes.length / itemsPerPage))} 
                    disabled={currentPage === Math.ceil(serviceTypes.length / itemsPerPage)}>
                    {">>"}
                  </button>
                </div>
                <span className="ms-2 fw-bold">
                  {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, serviceTypes.length)} of {serviceTypes.length} items
                </span>
              </div>
            </div>
          )}

          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: '100px' }} className="text-center">Actions</th>
                  <th>Service Type</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                 
                </tr>
              </thead>
              <tbody>
                {currentRows.map((serviceType) => (
                  <tr key={serviceType._id}>
                    <td className="text-center">
                      {/* <div className="d-flex align-items-center gap-2 justify-content-center">
                        <button
                          className="btn btn-sm btn-link p-0"
                          onClick={() => handleEdit(serviceType._id)}
                          title="Edit"
                        >
                          <CiEdit style={{ cursor: "pointer", fontSize: "1.2em", color: "green" }} size={18} />
                        </button>
                        <button
                          className="btn btn-sm btn-link p-0"
                          onClick={() => handleDelete(serviceType._id)}
                          title="Delete"
                        >
                          <RiDeleteBin6Line className="text-danger" size={18} />
                        </button>
                      </div> */}
                       <div style={{ gap: "10px" }} className="d-flex align-items-center">
                      <button onClick={() => handleEdit(record.id)} className="btn btn-sm btn-link">
                        <BiSolidEdit className="hw-15" />
                      </button>
                      <button onClick={() => handleDelete(record.id)} className="btn btn-sm btn-link text-danger">
                        <FaRegTrashCan className="hw-15" />
                      </button>
                    </div>
                    </td>
                    <td>{serviceType.serviceType}</td>
                    <td>{new Date(serviceType.createdAt).toLocaleString()}</td>
                    <td>{new Date(serviceType.updatedAt).toLocaleString()}</td>
                    
                  </tr>
                ))}
              </tbody>
              <tfoot>
                
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ServiceType;
