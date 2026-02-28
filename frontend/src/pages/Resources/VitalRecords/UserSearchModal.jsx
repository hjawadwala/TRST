import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Table } from "reactstrap";
import axios from "axios";

const UserSearchModal = ({ isOpen, toggle, onSelectUsers }) => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchEmployees();
    }
  }, [isOpen]);

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/employees/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log("Fetched employees:", response.data);
      setEmployees(Array.isArray(response.data.employees) ? response.data.employees : []);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectEmployee = (employee) => {
    setSelectedEmployees((prevSelected) => {
      if (prevSelected.some((e) => e._id === employee._id)) {
        return prevSelected.filter((e) => e._id !== employee._id);
      } else {
        return [...prevSelected, employee];
      }
    });
  };

  const handleDone = () => {
    onSelectUsers(selectedEmployees);
    toggle();
  };

  const filteredEmployees = employees.filter((employee) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (employee.firstName?.toLowerCase() || "").includes(searchTermLower) ||
      (employee.lastName?.toLowerCase() || "").includes(searchTermLower) ||
      (employee.employeeID?.toString() || "").toLowerCase().includes(searchTermLower) ||
      (employee.preferredName?.toLowerCase() || "").includes(searchTermLower) ||
      (employee.title?.toLowerCase() || "").includes(searchTermLower) ||
      (employee.workEmailAddress?.toLowerCase() || "").includes(searchTermLower)
    );
  });

  console.log("Filtered employees:", filteredEmployees);

  return (
    <Modal isOpen={isOpen} toggle={toggle} style={{ maxWidth: "90%" }}>
      <ModalHeader toggle={toggle}>Select Employee</ModalHeader>
      <ModalBody>
        <Input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="table-responsive" style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Actions</th>
                <th>ID</th>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Preferred Name</th>
                <th>Title</th>
                <th>Work Email</th>
                <th>Work Phone</th>
                <th>Fax</th>
                <th>Manager</th>
                <th>Department</th>
                <th>Street</th>
                <th>City</th>
                <th>Zip/Postal Code</th>
                <th>State</th>
                <th>Country</th>
                <th>Home Phone</th>
                <th>Personal Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee._id} onClick={() => handleSelectEmployee(employee)}>
                    <td>
                      <Button color="primary">
                        {selectedEmployees.some((e) => e._id === employee._id) ? "Deselect" : "Select"}
                      </Button>
                    </td>
                    <td>{employee._id}</td>
                    <td>{employee.employeeID}</td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.preferredName || "-"}</td>
                    <td>{employee.title || "-"}</td>
                    <td>{employee.workEmailAddress || "-"}</td>
                    <td>{employee.workPhone || "-"}</td>
                    <td>{employee.fax || "-"}</td>
                    <td>{employee.manager ? employee.manager.name : "-"}</td>
                    <td>{employee.department ? employee.department.name : "-"}</td>
                    <td>{employee.street || "-"}</td>
                    <td>{employee.city || "-"}</td>
                    <td>{employee.zipPostalCode || "-"}</td>
                    <td>{employee.state || "-"}</td>
                    <td>{employee.country || "-"}</td>
                    <td>{employee.homePhone || "-"}</td>
                    <td>{employee.personalEmail || "-"}</td>
                    <td>{employee.status || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="20" className="text-center">No employees found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleDone}>
          Done
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UserSearchModal;