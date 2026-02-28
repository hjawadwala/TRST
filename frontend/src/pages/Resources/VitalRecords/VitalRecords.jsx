import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { LuTableOfContents } from "react-icons/lu";
import { FaPrint, FaFilter, FaRegTrashCan } from "react-icons/fa6";
import "./VitalRecords.css";

function VitalRecords() {
  const [checkedItems, setCheckedItems] = useState([]);
  const [vitalRecords, setVitalRecords] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/vital`)
      .then((response) => response.json())
      .then((data) => setVitalRecords(data))
      .catch((error) => console.error("Error fetching vital records:", error));
  }, []);

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleEdit = (id) => {
    console.log("Edit item with ID:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete item with ID:", id);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Vital Records Page | TRST</title>
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Vital Records</div>
            <div className="d-flex align-items-center">
              <NavLink className="button1 border-1" to="/new-vital-record">
                <TiPlus className="hw-20" /> Vital Record
              </NavLink>
              <div className="map-action k-widget k-button-group order-1 ms-2">
                <span className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle border-radius-2 ms-1">
                    <HiMiniWrench className="wh-16" />
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#"><BiSolidEdit className="hw-15 mr-5px" /> Design this page</a></li>
                    <li><a className="dropdown-item" href="#"><FcSettings className="hw-15 mr-5px" /> Object Definition</a></li>
                    <li><a className="dropdown-item" href="#"><LuTableOfContents className="hw-15 mr-5px" /> Tab Definition</a></li>
                    <li><a className="dropdown-item" href="#"><FaPrint className="hw-15 mr-5px" /> Print</a></li>
                  </ul>
                </span>
                <button className="button border-1 ms-1">
                  <FaFilter className="hw-15" />
                </button>
              </div>
            </div>
          </div>
          <div className="border-1 mt-2 mb-2"></div>
        </div>
        <div className="table-responsive">
          <h3>Vital Record Records</h3>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setCheckedItems(isChecked ? vitalRecords.map((r) => r.id) : []);
                    }}
                    checked={checkedItems.length === vitalRecords.length}
                  />
                </th>
                <th>Actions</th>
                <th>Vital Record Name</th>
                <th>Vital Record Type</th>
                <th>Description</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {vitalRecords.map((record) => (
                <tr key={record.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkedItems.includes(record.id)}
                      onChange={() => handleCheckboxChange(record.id)}
                    />
                  </td>
                  <td>
                    <div style={{ gap: "10px" }} className="d-flex align-items-center">
                      <button onClick={() => handleEdit(record.id)} className="btn btn-sm btn-link">
                        <BiSolidEdit className="hw-15" />
                      </button>
                      <button onClick={() => handleDelete(record.id)} className="btn btn-sm btn-link text-danger">
                        <FaRegTrashCan className="hw-15" />
                      </button>
                    </div>
                  </td>
                  <td>{record.vitalRecordName}</td>
                  <td>{record.vitalRecordType}</td>
                  <td>{record.description}</td>
                  <td>
                    {record.owners && record.owners.length > 0 ? (
                      record.owners.map((owner) => (
                        <span key={owner._id} className="badge bg-primary me-1">
                          {owner.firstName} {owner.lastName}
                        </span>
                      ))
                    ) : (
                      <span>No owners</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default VitalRecords;