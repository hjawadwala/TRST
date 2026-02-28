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
import axios from "axios"; // Import axios for API calls
import "./Applications.css";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import { CiEdit } from "react-icons/ci";

function Applications() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [applications, setApplications] = useState([]); // State to hold applications data
    const [isColumnOpen, setIsColumnOpen] = useState(false);
    
    
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleToolDropDown = () => {
    setIsToolOpen(!isToolOpen);
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const navigate = useNavigate(); // Initialize navigate function
  const handleEdit = (id) => {
    navigate(`/applications/edit/${id}`); // Redirect to edit page with `_id`
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;
  
    try {
      console.log("🗑 Deleting application with ID:", id);
  
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/applications/${id}`);
      
      console.log("✅ Delete Success:", response.data);
      alert("Application deleted successfully!");
  
      // ✅ Refresh the application list after deletion
      fetchApplications(); // Call function to refetch updated data
  
    } catch (error) {
      console.error("❌ Delete Error:", error);
      alert("Failed to delete application. Please try again.");
    }
  };

  // Fetch applications data from the API
  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/applications/getall`);
      setApplications(response.data); // Assuming the response data is an array of applications
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  useEffect(() => {
    fetchApplications(); // Call the fetch function when the component mounts
  }, []);



   //coloum table
     // Column dropdown state
     const defaultSelectedFields = {
      actions: true,
      applicationID: true,
      applicationName: true,
      applicationType: true,
      applicationAlias: true,
      applicationURL: true,
      description: true,
      hostedType: true,
      applicationOwner: true,
      applicationVendor: true,
      businessOwner: true,
      businessEntity: true,
      primaryDataCenter: true,
      alternateDataCenter: true,
      drStrategy: true,
      rto: true,
      rpo: true,
     
    };

    
    const [selectedFields, setSelectedFields] = useState(defaultSelectedFields);
  
    const toggleColumnDropdown = () => {
      setIsColumnOpen(!isColumnOpen);
    };
  
    const handleFieldToggle = (field) => {
      setSelectedFields((prev) => ({
        ...prev,
        [field]: !prev[field],
      }));
    };
    // Close dropdown when clicking outside for table columns
    useEffect(() => {
      const handleClickOutside = (event) => {
        const dropdown = document.getElementById("columnDropdown");
        const button = document.getElementById("columnDropdownButton");
        if (dropdown && !dropdown.contains(event.target) && !button.contains(event.target)) {
          setIsColumnOpen(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    //for table columns reset button
    const handleResetFields = () => {
      setSelectedFields(defaultSelectedFields);
    };
  return (
    <React.Fragment>
      <Helmet>
        <title>Applications Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Applications</div>
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
              <span className="header-title">Applications</span>
              <button className="button border-1 ms-1">
                <FaHome className="hw-15" />
              </button>
              <button className="button border-1 ms-1">
                <LuRefreshCw className="hw-18" />
              </button>
              {/* TableColumns dropdown */}
                           <div>
                            <button
                              id="columnDropdownButton"
                              className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                              type="button"
                              onClick={toggleColumnDropdown}
                            >
                              <FaTableColumns className="hw-16" />
                            </button>
                            {isColumnOpen && (
                              <div id="columnDropdown" className="dropdown-menu show" style={{ position: 'absolute', zIndex: 1000 }}>
                                 <button
                                    className="btn btn-danger btn-sm"
                                    style={{
                                      position: 'absolute',
                                      top: '5px',
                                      right: '5px',
                                      zIndex: 1001,
                                    }}
                                    onClick={handleResetFields}
                                  >
                                    Reset
                                  </button>
                                {Object.keys(selectedFields).map((field) => (
                                  <div key={field} className="dropdown-item">
                                    <input
                                      type="checkbox"
                                      checked={selectedFields[field]}
                                      onChange={() => handleFieldToggle(field)}
                                    />
                                    <span className="ms-2">{field}</span>
                                  </div>
                                ))}
                                <div className="dropdown-divider"></div>
                               
                              </div>
                            )}
                          </div>
                           {/* end TableColumns dropdown */}
              <button className="button border-1 ms-1">
                <FaFilter className="hw-15" />
              </button>
            </div>
            <div>
              <NavLink className="button1 border-1" to="/new-application">
                <TiPlus className="hw-20" />
                Application
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
          <h3>Application Records</h3>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>
                {selectedFields.actions && (
                  <th>
                    <input type="checkbox" />
                  </th>
                )}
                </th>
                {selectedFields.actions &&<th>Actions</th>}
                {selectedFields.applicationName &&<th>Application Name</th>}
                {selectedFields.applicationType &&<th>Application Type</th>}
                {selectedFields.hostedType &&<th>Hosted Type</th>}
                {selectedFields.applicationID &&<th>Application ID*</th>}
                {selectedFields.applicationAlias &&<th>Application Alias</th>}
                {selectedFields.applicationURL &&<th>Application URL</th>}
                {selectedFields.description &&<th>Description</th>}
                {selectedFields.rto &&<th>RTO</th>}
                {selectedFields.rpo &&<th>RPO</th>}
                {selectedFields.drStrategy &&<th>DR Strategy</th>}
                {selectedFields.applicationOwner &&<th>Application Owner</th>}
                {selectedFields.applicationVendor &&<th>Application Vendor</th>}
                {selectedFields.businessEntity &&<th>Business Entity</th>}
                {selectedFields.primaryDataCenter &&<th>Primary Data Center</th>}
                {selectedFields.businessOwner &&<th>Business Owner</th>}
                
              </tr>
            </thead>
              <tbody>
                {applications.map((record) => (
                  <tr key={record._id}>
                    {selectedFields.actions && (
                      <td>
                        <input
                          type="checkbox"
                          checked={checkedItems.includes(record.id)}
                          onChange={() => handleCheckboxChange(record.id)}
                        />
                      </td>
                    )}
                    {selectedFields.actions && (
                    <td>
                      <div style={{ gap: "10px" }} className="d-flex align-items-center">
                        <button onClick={() => handleEdit(record._id)} className="btn btn-sm btn-link">
                        <CiEdit style={{ cursor: "pointer", fontSize: "1.2em", color:'green' }} size={18} />
                        </button>
                        <button onClick={() => handleDelete(record._id)} className="btn btn-sm btn-link text-danger">
                          <FaRegTrashCan className="hw-15" />
                        </button>
                      </div>
                    </td>
                    )}

                    <td>
                      {selectedFields.applicationName && (
                     <NavLink to={`/applications/viewdata/${record._id}`}>
                     {record.applicationName}
                   </NavLink>
                      )}
                    </td>

                    {selectedFields.applicationType &&<td>{record.applicationType}</td>}
                    {selectedFields.hostedType &&<td>{record.hostedType}</td>}
                    {selectedFields.applicationID &&<td>{record.applicationID}</td>}
                    {selectedFields.applicationAlias &&<td>{record.applicationAlias}</td>}
                    {selectedFields.applicationURL &&<td>{record.applicationURL}</td>}
                    {selectedFields.description &&<td>{record.description}</td>}
                    {selectedFields.rto &&<td>{record.rto}</td>}
                    {selectedFields.rpo &&<td>{record.rpo}</td>}
                    {selectedFields.drStrategy &&<td>{record.drStrategy}</td>}
                    
                {selectedFields.applicationOwner &&
                    <td>
                  {record.applicationOwner.map(owner => 
                    <div key={owner._id}>{owner.fullName} ({owner.email})</div>
                  )}
                </td>
                }

                {selectedFields.applicationVendor &&
                <td>
                  {record.applicationVendor.map(vendor => 
                    <div key={vendor._id}>{vendor.vendor} - {vendor.mainPhone}</div>
                  )}
                </td>
                }

                {selectedFields.businessEntity &&
                <td>
                  {record.businessEntity.map(entity => 
                    <div key={entity._id}>{entity.businessEntity} ({entity.businessEntityType})</div>
                  )}
                </td>
                }
                {selectedFields.primaryDataCenter &&
                <td>
                  {record.primaryDataCenter.map(dc => 
                    <div key={dc._id}>{dc.locationName}</div>
                  )}
                  {record.alternateDataCenter.map(dc => 
                    <div key={dc._id} className="text-muted">{dc.locationName} (Alt)</div>
                  )}
                </td>
                  }


                {selectedFields.businessOwner &&
                <td>
        {record.businessOwner && record.businessOwner.length > 0 ? (
          record.businessOwner.map(owner => (
            <div key={owner._id}>{owner.firstName} {owner.lastName}</div>
          ))
        ) : (
          <span className="text-muted">No Business Owner</span>
        )}
      </td>
  }
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Applications;