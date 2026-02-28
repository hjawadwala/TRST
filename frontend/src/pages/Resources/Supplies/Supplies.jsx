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
import "./Supplies.css";

function Supplies() {
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [supplies, setSupplies] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/v1/supplies/getall`)
      .then((response) => response.json())
      .then((data) => setSupplies(data))
      .catch((error) => console.error("Error fetching supplies:", error));
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleToolDropDown = () => {
    setIsToolOpen(!isToolOpen);
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
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
        <title>Supplies Page | TRST</title>
        <meta name="description" content="This is the home page description" />
        <meta name="keywords" content="home, react, meta tags" />
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Supplies</div>
            <NavLink className="button1 border-1" to="/new-supply">
              <TiPlus className="hw-20" /> supplies
            </NavLink>
          </div>
          <div className="border-1 mt-2 mb-2"></div>
        </div>
        <div className="table-responsive">
          <h3>Supply Records</h3>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setCheckedItems(isChecked ? supplies.map((s) => s.id) : []);
                    }}
                    checked={checkedItems.length === supplies.length}
                  />
                </th>
                <th>Actions</th>
                <th>Supply Name</th>
                <th>Description</th>
                <th>Vendor(s)</th>
              </tr>
            </thead>
            <tbody>
              {supplies.map((record) => (
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
                  <td>{record.supplyName}</td>
                  <td>{record.description}</td>
                  <td>{record.vendors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Supplies;
