import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table, Input } from "reactstrap"; // ✅ Fixed import

function AlternateStaffModal({ isOpen, toggle, onSelect }) {
  const [employees, setEmployees] = useState([]); // Stores employee data
  const [selectedEmployees, setSelectedEmployees] = useState([]); // Stores selected employees
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchEmployees();
    }
  }, [isOpen]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      console.log("🔍 Fetching employees...");
  
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
      console.log("✅ Raw API Response:", data);
  
      // Extracting employees properly
      if (data && data.data && Array.isArray(data.data.employees)) {
        console.log("✅ Employees found:", data.data.employees);
        setEmployees(data.data.employees);
      } else {
        console.error("❌ Unexpected API format. Expected 'data.data.employees' but got:", data);
        setEmployees([]); // Reset to empty array
      }
    } catch (error) {
      console.error("❌ Error fetching employees:", error);
      setEmployees([]); // Reset on error
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle checkbox selection for multiple employees
  const handleCheckboxChange = (employee) => {
    setSelectedEmployees((prev) => {
      const isSelected = prev.some((item) => item._id === employee._id);
      return isSelected ? prev.filter((item) => item._id !== employee._id) : [...prev, employee];
    });
  };

  // ✅ Confirm selection and pass selected employees to parent
  const handleConfirmSelection = () => {
    onSelect(selectedEmployees); // Pass selected employees to parent component
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Select Alternate Critical Staff</ModalHeader>
      <ModalBody>
        {loading ? (
          <p>Loading...</p>
        ) : employees.length > 0 ? (
          <Table hover bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Employee Name</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee._id}>
                  <td>{index + 1}</td>
                  <td>{`${employee.firstName} ${employee.lastName}`}</td>
                  <td>
                    <Input
                      type="checkbox"
                      checked={selectedEmployees.some((item) => item._id === employee._id)}
                      onChange={() => handleCheckboxChange(employee)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-center text-danger">⚠ No employees available</p>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleConfirmSelection} disabled={selectedEmployees.length === 0}>
          Select {selectedEmployees.length > 0 && `(${selectedEmployees.length})`}
        </Button>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}

export default AlternateStaffModal;
