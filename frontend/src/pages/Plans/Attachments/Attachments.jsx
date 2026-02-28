// import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { useNavigate } from "react-router-dom";
import {  FaTrash } from "react-icons/fa"; // Import icons
import { CiEdit } from "react-icons/ci";
// import { FaTableColumns } from "react-icons/fa6";

function Attachments() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const navigate = useNavigate();
  const [attachments, setAttachments] = useState([]); // State to store fetched data
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const [selectedColumns, setSelectedColumns] = useState([]);

  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };

  const toggleToolDropDown = () => {
    setIsToolOpen(!isToolOpen);
  };
  const ColumnDropDown = () => {
    setIsColumnOpen(!isColumnOpen);
  };

  
  // Fetch attachments from the API
  const fieldMapping = {
    "Order": "order",
    "Attachment Name": "attachmentName",
    "Include in Plan": "includeInPlan",
    "Is From Template": "isFromTemplate",
    "Document File": "documentFile",
    "Description": "description",
   
  };
  const modelFields = Object.keys(fieldMapping);  
  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/attachments/getall`);
        
        console.log("🔍 Full API Response:", response);
       
        setAttachments(response || []); 
        setIsLoading(false);
      } catch (error) {
        console.error("❌ Error fetching attachments:", error);
        setAttachments([]);
        setIsLoading(false);
      }
    };
  
    fetchAttachments();
  }, []);

  // Delete attachment function
  const deleteAttachment = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this attachment?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/attachments/delete/${id}`);
      alert("Attachment deleted successfully!");

      // Update the state to remove the deleted attachment
      setAttachments((prevAttachments) =>
        prevAttachments.filter((attachment) => attachment._id !== id)
      );
    } catch (error) {
      console.error("Error deleting attachment:", error.message);
      alert("Failed to delete the attachment. Please try again.");
    }
  };
  useEffect(() => {
    const savedColumns = JSON.parse(localStorage.getItem("selectedColumns")) || modelFields;
    setSelectedColumns(savedColumns);
  }, []);

  const toggleColumn = (field) => {
    const updatedColumns = selectedColumns.includes(field)
      ? selectedColumns.filter((col) => col !== field)
      : [...selectedColumns, field];
    setSelectedColumns(updatedColumns);
    localStorage.setItem("selectedColumns", JSON.stringify(updatedColumns));
  };

  const resetColumns = () => {
    setSelectedColumns(modelFields);
    localStorage.setItem("selectedColumns", JSON.stringify(modelFields));
  };
const toggleDropdown = () => {
  setIsColumnOpen(!isColumnOpen);
};
  return (
    <React.Fragment>
      <Helmet>
        <title>Attachments Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Attachments</div>
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
              <span className="header-title">Attachments</span>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-2"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded={isOpen}
                  onClick={toggleDropdown}
                >
                  All Attachments
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
                      All Approval Groups{" "}
                      <BiSolidEdit className="hw-15 ml-20px" />
                      <FaTableColumns className="hw-15 ml-5px" />
                      <ImCopy className="hw-15 ml-5px" />
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Attachments in Plans
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      All Attachments (with Plans)
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
              <span className="dropdown position-relative">
  <button
    className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
    type="button"
    id="TollDropdown"
    aria-expanded={isColumnOpen}
    onClick={() => setIsColumnOpen(!isColumnOpen)}
  >
    <FaTableColumns className="hw-14" />
  </button>

  {isColumnOpen && (
    <div 
      className="dropdown-menu show position-absolute shadow-lg bg-white p-2" 
      style={{ top: "100%", left: "0", zIndex: 1050, minWidth: "250px" }}
    >
      <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
        <span className="fw-bold">Columns</span>
        <button onClick={resetColumns} className="btn btn-sm btn-link text-decoration-none">
          Reset
        </button>
      </div>
      <div className="pt-2">
        {modelFields.map((field, index) => (
          <div key={index} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={selectedColumns.includes(field)}
              onChange={() => toggleColumn(field)}
            />
            <label className="form-check-label ms-2">{field}</label>
          </div>
        ))}
      </div>
    </div>
  )}
</span>

              <button className="button border-1 ms-1">
                <FaFilter className="hw-15" />
              </button>
            </div>
            <div>
              <NavLink className="button1 border-1" to="/new-attachments">
                <TiPlus className="hw-20" />
                Attachments
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


        {/*  table responsive*/}
        <div className="table-responsive mt-3">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Action</th>
                  {selectedColumns.map((col, index) => (
                    <th key={index}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
  {attachments.length > 0 ? (
    attachments.map((attachment) => (
      <tr key={attachment._id}>
        <td>
          <button className="btn btn-sm" onClick={() => navigate(`/edit-attachments/${attachment._id}`)}>
            <CiEdit
                                            style={{
                                              cursor: "pointer",
                                              fontSize: "1.2em",
                                              color: "green",
                                            }}
                                            size={18}
                                          />
          </button>
          <button className="btn btn-sm text-danger" onClick={() => deleteAttachment(attachment._id)}>
           <FaRegTrashCan className="text-danger" />
          </button>
        </td>
        {selectedColumns.map((col, index) => {
          const fieldKey = fieldMapping[col] || col; // Ensure correct field mapping
          let fieldValue = attachment[fieldKey];

          // Convert boolean values to Yes/No
          if (typeof fieldValue === "boolean") {
            fieldValue = fieldValue ? "Yes" : "No";
          }

          return <td key={index}>{fieldValue ?? "-"}</td>;
        })}
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={selectedColumns.length + 1}>No attachments found.</td>
    </tr>
  )}
</tbody>



            </table>
          )}
        </div>
          {/* end responsive  */}
      </div>
    </React.Fragment>
  );
}

export default Attachments;
