    import React, { useState, useEffect } from "react";
    import { Helmet } from "react-helmet";
    import { useNavigate, useParams } from "react-router-dom";
    import { BiSearchAlt2 } from "react-icons/bi";
    import { FaCheck } from "react-icons/fa";
    import { RxCross2 } from "react-icons/rx";
    import { Input, Label, Form, Alert, Button, Spinner } from "reactstrap";
    import axios from "axios";
    import UserSearchModal from "./UserSearchModal";

    function EditEquipment() {
    const { id } = useParams(); // ✅ Get equipment ID from URL
    const navigate = useNavigate();
    
    const [equipment, setEquipment] = useState("");
    const [equipmentType, setEquipmentType] = useState("");
    const [modelName, setModelName] = useState("");
    const [vendors, setVendors] = useState([]);
    const [description, setDescription] = useState("");
    const [biaEquipmentDependency, setBiaEquipmentDependency] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Vendor modal state
    const [isDataLoading, setIsDataLoading] = useState(true); // ✅ Track data loading state

    useEffect(() => {
        fetchEquipmentDetails();
    }, []);

    const fetchEquipmentDetails = async () => {
        try {
          setIsDataLoading(true);
          console.log(`🔍 Fetching equipment with ID: ${id}`); // ✅ Log the ID
      
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/equipment/${id}`);
          console.log("✅ Equipment Data:", response.data); // ✅ Log the API response
      
          const data = response.data.data;
          if (!data) {
            throw new Error("No equipment data found!");
          }
      
          setEquipment(data.equipment || "");
          setEquipmentType(data.equipmentType || "");
          setModelName(data.modelName || "");
          setVendors(data.vendors || []);
          setDescription(data.description || "");
          setBiaEquipmentDependency(data.biaEquipmentDependency || "");
          setIsDataLoading(false);
        } catch (err) {
          console.error("❌ API Error:", err.response); // ✅ Log full error response
          setError(err.response?.data?.message || "Failed to load equipment data.");
          setIsDataLoading(false);
        }
      };
      
    // ✅ Handle form submission for updating equipment
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const updatedData = {
        equipment,
        equipmentType,
        modelName,
        vendors: vendors.map((v) => v._id), // ✅ Send only vendor IDs
        description,
        biaEquipmentDependency,
        };

        try {
        setLoading(true);
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/equipment/update/${id}`, updatedData, {
            headers: { "Content-Type": "application/json" },
        });

        console.log("✅ Equipment Updated:", response.data);
        setSuccessMessage("Equipment updated successfully!");
        setTimeout(() => navigate("/equipment"), 2000); // Redirect after 2 sec
        } catch (err) {
        console.error("❌ Error updating equipment:", err.response?.data);
        setError(err.response?.data?.message || "An error occurred while updating equipment.");
        } finally {
        setLoading(false);
        }
    };

    // ✅ Handle vendor selection
    const handleSelectVendors = (selectedVendors) => {
        setVendors(selectedVendors);
    };

    // ✅ Remove a vendor from the list
    const handleRemoveVendor = (vendorId) => {
        setVendors(vendors.filter((vendor) => vendor._id !== vendorId));
    };

    // ✅ Toggle modal for vendor search
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    return (
        <React.Fragment>
        <Helmet>
            <title>Edit Equipment | TRST</title>
        </Helmet>
        <div className="page-content">
            <div className="main-content1">
            <div className="d-flex align-items-center justify-content-between">
                <div className="header-text">Edit Equipment</div>
                <div>
                <Button className="button3 border-1 me-1" onClick={() => navigate("/equipment")}>
                    <RxCross2 className="me-1" style={{ width: "15px", height: "15px" }} />
                    Cancel
                </Button>
                <Button className="button3 border-1 me-3" onClick={handleSubmit} disabled={loading}>
                    {loading ? <Spinner size="sm" /> : <><FaCheck className="me-1" style={{ width: "15px", height: "15px" }} /> Save</>}
                </Button>
                </div>
            </div>
            </div>

            <div className="form-content">
            <div className="form-heading">Equipment Information</div>
            {isDataLoading ? (
                <Spinner color="primary" />
            ) : (
                <Form onSubmit={handleSubmit}>
                {successMessage && <Alert color="success">{successMessage}</Alert>}
                {error && <Alert color="danger">{error}</Alert>}

                <div className="row pt-4">
                    <div className="col-8">
                    {/* Equipment Name */}
                    <div className="mb-3">
                        <Label>Equipment Name</Label>
                        <Input type="text" value={equipment} onChange={(e) => setEquipment(e.target.value)} required />
                    </div>

                    {/* Equipment Type */}
                    <div className="mb-3">
                        <Label>Equipment Type</Label>
                        <select className="form-control" value={equipmentType} onChange={(e) => setEquipmentType(e.target.value)} required>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        </select>
                    </div>

                    {/* Model Name */}
                    <div className="mb-3">
                        <Label>Model Name</Label>
                        <Input type="text" value={modelName} onChange={(e) => setModelName(e.target.value)} required />
                    </div>

                    {/* Vendors */}
                    <div className="mb-3">
                        <Label>Vendors</Label>
                        <div className="d-flex">
                        <Input type="text" value={vendors.map((v) => v.vendor || "Unknown Vendor").join(", ")} readOnly />
                        <Button color="secondary" onClick={toggleModal}>
                            <BiSearchAlt2 className="fs-15" />
                        </Button>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                        <Label>Description</Label>
                        <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>

                    {/* BIA Equipment Dependency */}
                    <div className="mb-3">
                        <Label>BIA Equipment Dependency</Label>
                        <Input type="text" value={biaEquipmentDependency} onChange={(e) => setBiaEquipmentDependency(e.target.value)} required />
                    </div>

                    {/* Selected Vendors List */}
                    {vendors.length > 0 && (
                        <div className="mb-3">
                        <Label>Selected Vendors</Label>
                        <ul>
                            {vendors.map((vendor) => (
                            <li key={vendor._id}>
                                {vendor.vendor}
                                <button type="button" className="btn btn-danger btn-sm ms-2" onClick={() => handleRemoveVendor(vendor._id)}>
                                Remove
                                </button>
                            </li>
                            ))}
                        </ul>
                        </div>
                    )}
                    </div>
                </div>
                </Form>
            )}
            </div>
        </div>

        {/* Vendor Selection Modal */}
        <UserSearchModal isOpen={isModalOpen} toggle={toggleModal} onSelectVendors={handleSelectVendors} />
        </React.Fragment>
    );
    }

    export default EditEquipment;
