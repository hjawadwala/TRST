import React, { useState } from "react";
import {
  IoMdArrowDropdown, IoMdAttach, IoMdArrowDropright,
} from "react-icons/io";
import { TiPlus } from "react-icons/ti";
import { BiSolidEdit } from "react-icons/bi";
import { FaTableColumns, FaRegTrashCan, FaFilter } from "react-icons/fa6";
import { ImCopy } from "react-icons/im";
import { LuRefreshCw } from "react-icons/lu";
import { GrDetach } from "react-icons/gr";
import { HiDotsHorizontal } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { Table, Input } from "reactstrap";
import { TbBrandTorchain } from "react-icons/tb";
import ApplicationModal from "./ApplicationModal";

const ApplicationHeader = ({
  businessEntityId, // ✅ Receive from parent
  isIncidentOpen,
  isExerciseOpen,
  toggleIncidentDropdown,
  toggleExerciseColumnDropDown,
}) => {
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [selectedApplicationIds, setSelectedApplicationIds] = useState([]);
  const [selectedApplicationIdsLocal, setSelectedApplicationIdsLocal] = useState([]);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleCheckboxChange = (e, application) => {
    const isChecked = e.target.checked;

    setSelectedApplicationIdsLocal((prev) => {
      const updatedIds = isChecked
        ? [...prev, application._id]
        : prev.filter((id) => id !== application._id);

      setSelectedApplicationIds(updatedIds);
      return updatedIds;
    });

    setSelectedApplications((prev) => {
      return isChecked
        ? [...prev, application]
        : prev.filter((item) => item._id !== application._id);
    });
  };

  const handleSaveApplications = async () => {
    try {
      setIsSaving(true);
      const response = await fetch(
        // `${process.env.REACT_APP_API_URL}/api/v1/organizational-entities/${id}`,
        `${process.env.REACT_APP_API_URL}/api/v1/organizational-entities/${businessEntityId}/applications`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ applicationIds: selectedApplicationIds }),
        }
      );

      if (!response.ok) throw new Error("Failed to update applications");

      const data = await response.json();
      console.log("Applications updated successfully:", data);
      alert("Applications saved successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save applications.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="main-content2 pt-3">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <span className="header-title">Applications</span>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle border-radius-2"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded={isIncidentOpen}
              onClick={toggleIncidentDropdown}
            >
              All Applications <IoMdArrowDropdown className="hw-20" />
            </button>
            <ul className={`dropdown-menu ${isIncidentOpen ? "show" : ""}`}>
              <li><a className="dropdown-item" href="#"><TiPlus /> Create New View</a></li>
              <li><a className="dropdown-item" href="#"><IoMdArrowDropright /> All Applications <BiSolidEdit /> <FaTableColumns /> <ImCopy /></a></li>
              <li><a className="dropdown-item" href="#">Dependency Map View</a></li>
              <li><a className="dropdown-item" href="#">Impact View</a></li>
              <li><a className="dropdown-item" href="#">My Applications</a></li>
              <li><a className="dropdown-item" href="#">Application Requiring Updates</a></li>
              <li><a className="dropdown-item" href="#">All Applications (Export)</a></li>
            </ul>
          </div>

          <button className="button border-1 ms-1"><LuRefreshCw /></button>

          <div className="dropdown ms-1">
            <button
              className="btn btn-secondary dropdown-toggle border-radius-2"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded={isExerciseOpen}
              onClick={toggleExerciseColumnDropDown}
            >
              <FaTableColumns />
            </button>
            <ul className={`dropdown-menu ${isExerciseOpen ? "show" : ""}`}>
              <li className="d-flex justify-content-between px-2">
                <span className="fw-bold">Columns</span><a className="blue">Reset</a>
              </li>
              {["Application Name", "Application Owner", "RTO", "RPO Value", "Aggregate Risk", "Updated At", "Updated By", "RTO Text"]
                .map((item) => (
                  <li className="dropdown-checkbox" key={item}>
                    <label><input type="checkbox" className="ms-2 me-1" />{item}</label>
                  </li>
                ))}
            </ul>
          </div>

          <button className="button border-1 ms-1"><FaFilter /></button>
        </div>

        <div>
          <button
            type="button"
            className="button1 flex items-center gap-2 me-2"
            onClick={() => setShowApplicationModal(true)}
          >
            <TbBrandTorchain size={20} />
          </button>

          <button className="button border-1 ms-1"><IoMdAttach /></button>
          <button className="button border-1 ms-1"><GrDetach /></button>
          <NavLink className="button1 border-1" to="/application">
            <TiPlus /> Application
          </NavLink>
          <button
          className="btn btn-primary mt-2"
          onClick={handleSaveApplications}
          disabled={selectedApplicationIds.length === 0 || isSaving}
        >
          {isSaving ? "Saving..." : "Save Applications"}
        </button>
          <button className="button border-1 ms-1"><FaRegTrashCan /></button>
          <button className="button border-1 ms-1"><HiDotsHorizontal /></button>
        </div>
      </div>

      <div className="border-1 mt-2 mb-2"></div>

      <ApplicationModal
        isOpen={showApplicationModal}
        toggle={() => setShowApplicationModal(false)}
        onSelect={(apps) => {
          setSelectedApplications(apps || []);
          const ids = apps.map((a) => a._id);
          setSelectedApplicationIdsLocal(ids);
          setSelectedApplicationIds(ids);
        }}
      />

      <div className="mt-3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Select</th>
              <th>Application Name</th>
              <th>Application ID</th>
              <th>Application Type</th>
              <th>Application Alias</th>
              <th>Application URL</th>
              <th>Description</th>
              <th>HostedType</th>
              <th>DrStrategy</th>
              <th>Rto</th>
              <th>Rpo</th>
            </tr>
          </thead>
          <tbody>
            {selectedApplications.length > 0 ? (
              selectedApplications.map((app) => (
                <tr key={app._id}>
                  <td>
                    <Input
                      type="checkbox"
                      checked={selectedApplicationIdsLocal.includes(app._id)}
                      onChange={(e) => handleCheckboxChange(e, app)}
                    />
                  </td>
                  <td>{app.applicationName || "N/A"}</td>
                  <td>{app.applicationID || "N/A"}</td>
                  <td>{app.applicationType || "N/A"}</td>
                  <td>{app.applicationAlias || "N/A"}</td>
                  <td>{app.applicationURL || "N/A"}</td>
                  <td>{app.description || "N/A"}</td>
                  <td>{app.hostedType || "N/A"}</td>
                  <td>{app.drStrategy || "N/A"}</td>
                  <td>{app.rto || "N/A"}</td>
                  <td>{app.rpo || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center">No applications selected.</td>
              </tr>
            )}
          </tbody>
        </table>

       
      </div>
    </div>
  );
};

export default ApplicationHeader;
