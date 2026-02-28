import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table, Input } from "reactstrap";

function EmployeeModal({ isOpen, toggle, onSelect }) {
  const [employees, setEmployees] = useState([]); // Stores employee data
  const [loading, setLoading] = useState(true);
  const [selectedEmployees, setSelectedEmployees] = useState([]); // Stores selected employees

  useEffect(() => {
    if (isOpen) {
      fetchEmployees();
    }
  }, [isOpen]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/employees/all`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data && data.data && Array.isArray(data.data.employees)) {
        setEmployees(data.data.employees);
      } else {
        setEmployees([]);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (employee) => {
    setSelectedEmployees((prev) => {
      const isSelected = prev.some((item) => item._id === employee._id);
      return isSelected
        ? prev.filter((item) => item._id !== employee._id) // Remove if already selected
        : [...prev, employee]; // Add if not selected
    });
  };

  const handleConfirmSelection = () => {
    console.log("Selected Employees:", selectedEmployees); // Debugging
    onSelect(selectedEmployees); // Pass all selected employee data to the parent
    toggle(); // Close the modal
  };

  const fieldsToShow = [
    { key: "name", label: "Employee Name" },
    { key: "timeZone", label: "Time Zone" },
    { key: "streetAddress1", label: "Street Address 1" },
    { key: "city", label: "City" },
    { key: "country", label: "Country" },
  ];

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Select Employees</ModalHeader>
      <ModalBody style={{ maxHeight: "400px", overflowY: "auto", overflowX: "auto" }}>
        {loading ? (
          <p>Loading...</p>
        ) : employees.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <Table hover bordered style={{ minWidth: "1000px", wordWrap: "break-word" }}>
              <thead>
                <tr>
                  <th style={{ width: "50px" }}>
                    <Input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEmployees(employees); // Select all
                        } else {
                          setSelectedEmployees([]); // Deselect all
                        }
                      }}
                      checked={selectedEmployees.length === employees.length && employees.length > 0}
                    />
                  </th>
                  {fieldsToShow.map((field) => (
                    <th key={field.key} style={{ minWidth: "150px" }}>{field.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>
                      <Input
                        type="checkbox"
                        checked={selectedEmployees.some((item) => item._id === employee._id)}
                        onChange={() => handleCheckboxChange(employee)}
                      />
                    </td>
                    {fieldsToShow.map((field) => (
                      <td key={field.key}>
                        {typeof employee[field.key] === "object" && employee[field.key] !== null
                          ? JSON.stringify(employee[field.key], null, 2)
                          : employee[field.key] || "N/A"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <p className="text-center text-danger">⚠ No employees available</p>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleConfirmSelection} disabled={selectedEmployees.length === 0}>
          Confirm Selection ({selectedEmployees.length})
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default EmployeeModal;