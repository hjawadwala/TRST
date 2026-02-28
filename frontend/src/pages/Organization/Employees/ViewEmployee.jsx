import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Helmet } from "react-helmet";
import { FaPhoneAlt } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdArrowDropdown, IoMdArrowDropright, IoMdAttach } from "react-icons/io";
import { TiPlus } from "react-icons/ti";
import { BiSolidEdit } from "react-icons/bi";
import { FaTableColumns, FaFilter, FaRegTrashCan } from "react-icons/fa6";
import { ImCopy } from "react-icons/im";
import { LuRefreshCw } from "react-icons/lu";
import { GrDetach } from "react-icons/gr";
import { HiDotsHorizontal } from "react-icons/hi";
import { Table } from "reactstrap";
import  BusinessEntityTab from "./BusinessEntitiesTab"; // Import the BusinessEntityTab component
function ViewEmployee() {
  const { id } = useParams(); // Get the employee ID from the URL
  const [employee, setEmployee] = useState(null); // State to store employee data
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch employee data from API
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/employees/${id}`);
        setEmployee(response.data); // Set employee data
      } catch (error) {
        console.error("Error fetching employee data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!employee) {
    return <div>No employee data found.</div>;
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Employee Page | TRST</title>
        <meta name="description" content="Employee details page" />
      </Helmet>
      <div className="page-content">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex mb-3">
            <div className="header-text pe-2">Employee:</div>
            <div className="header-text">{employee.firstName} {employee.lastName}</div>
          </div>
        </div>

        <Tabs
          id="Employee Info"
          defaultActiveKey="Employee Info"
          className="mb-3"
        >
          <Tab eventKey="Employee Info" title="Employee Info">
            <div className="container-fluid">
              <div className="form-content">
                <div className="form-heading">Work Contact Information</div>
                <div className="border-1 mb-3"></div>
                <div className="row">
                  <div className="col-6">
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Employee ID</div>
                      <div className="tab-title">{employee.employeeID}</div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">First Name</div>
                      <div className="tab-title">{employee.firstName}</div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Last Name</div>
                      <div className="tab-title">{employee.lastName}</div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Title</div>
                      <div className="tab-title">{employee.title}</div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Work Email Address</div>
                      <div className="tab-title">
                        <a href={`mailto:${employee.workEmailAddress}`} className="text-blue">
                          {employee.workEmailAddress}
                        </a>
                      </div>
                    </div>
                    <div className="d-flex pb-3">
                      <div className="tab-heading">Work Phone</div>
                      <div className="tab-title">
                        <FaPhoneAlt className="text-primary" />
                        <a href={`tel:${employee.workPhone}`} className="text-blue">
                          {employee.workPhone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
              <Tab eventKey="Business Entity Info" title="Business Entity Info">
                 <BusinessEntityTab employee={employee} loading={loading} />
             </Tab>
        </Tabs>
      </div>
    </React.Fragment>
  );
}

export default ViewEmployee;