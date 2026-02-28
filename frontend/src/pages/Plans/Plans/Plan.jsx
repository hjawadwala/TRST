import React, { useEffect,useState } from "react";
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
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function Plan() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [plans, setPlans] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleToolDropDown = () => {
    setIsToolOpen(!isToolOpen);
  };
  const ColumnDropDown = () => {
    setIsColumnOpen(!isColumnOpen);
  };

  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/plans/all`);
        console.log(response.data); // Log the response data
        setPlans(response.data); // Assuming the response data is an array of plans
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  // Handle Edit Button Click
  const handleEdit = (id) => {
    navigate(`/Edit-plans/${_id}`); // Navigate to the EditCallTree page with the ID
  };

   // Function to handle deletion of the plan
     // Function to handle deletion of a plan
  const handleDelete = async (planId) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/plans/delete/${planId}`, {
          method: 'DELETE', // Use DELETE for removing
        });

        if (!response.ok) {
          const errorText = await response.text(); // Get the response text
          console.error('Error response:', errorText); // Log the error response
          throw new Error('Network response was not ok');
        }

        // If successful, remove the deleted plan from the state
        setPlans((prevPlans) => prevPlans.filter(plan => plan._id !== planId));
        setSuccessMessage('Plan deleted successfully!');
        setErrorMessage(null); // Clear any previous error messages
      } catch (error) {
        console.error('Error:', error.message); // Log any errors
        setErrorMessage(error.message); // Set the error message
        setSuccessMessage(null); // Clear any previous success messages
      }
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Plans Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Plans</div>
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
              <span className="header-title">Plans </span>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-2"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded={isOpen}
                  onClick={toggleDropdown}
                >
                  All Plans
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
                      All Plans
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
                      Plan Name
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                     Status
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                      Plan Type
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                     Plan Editor(s)
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                    Plan Leader
                    </label>
                  </li>
                  <li class="dropdown-checkbox">
                    <label>
                      <input type="checkbox" className="ms-2 me-1" />
                    Next Update Date
                    </label>
                  </li>
                </ul>
              </span>
              <button className="button border-1 ms-1">
                <FaFilter className="hw-15" />
              </button>
            </div>
            <div>
              <NavLink className="button1 border-1" to="/new-plans">
                <TiPlus className="hw-20" />
                Plan
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


          <div className="table-responsive">
          <h3>Plan Records</h3>
          <table className="table table-hover">
      <thead>
        <tr>
          <th>
            <input type="checkbox" className="form-check-input" />
          </th>
          <th>Actions</th>
          <th>Plan Name</th>
          <th>Plan Leader</th>
          <th>Plan Editors</th>
          <th>Plan Type</th>
          <th>Business Entity</th>
          <th>Location</th>
          <th>Process</th>
          <th>Application</th>
          <th>Hardware</th>
        </tr>
      </thead>
      <tbody>
        {plans.length > 0 ? (
          plans.map((plan) => (
            <tr key={plan._id}> {/* Use '_id' as the unique identifier */}
              <td>
                <input type="checkbox" className="form-check-input" />
              </td>
              <td>
             <div style={{ gap: "10px" }} className="d-flex align-items-center">
              <Link className="btn btn-sm btn-link"  to={`/Edit-plans/${plan._id}`} >
                <BiSolidEdit className="hw-15" />
              </Link>
              <button className="btn btn-sm btn-link text-danger" onClick={() => handleDelete(plan._id)}>
                    <FaRegTrashCan className="hw-15" />
              </button>
            </div>
              </td>
              <td>{plan.plan_name}</td>
              <td>
                {plan.plan_leader ? plan.plan_leader.map(leader => leader.firstName).join(', ') : 'N/A'}
              </td>
              <td>{plan.plan_editors ? plan.plan_editors.join(', ') : 'N/A'}</td> {/* Assuming editors is an array */}
              <td>{plan.plan_type}</td>
              <td>{plan.business_entity || 'N/A'}</td>
              <td>{plan.location || 'N/A'}</td>
              <td>{plan.process || 'N/A'}</td>
              <td>{plan.application || 'N/A'}</td>
              <td>{plan.hardware || 'N/A'}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="11">No plans available</td> {/* Message when no data is available */}
          </tr>
        )}
      </tbody>
    </table>
        </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Plan;
