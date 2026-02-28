    import React, { useState, useEffect } from "react";
    import { Helmet } from "react-helmet";
    import { useParams, useNavigate } from "react-router-dom";
    import { TiPlus } from "react-icons/ti";
    import { BiSearchAlt2 } from "react-icons/bi";
    import { Input, Label, Form, Button, Alert, Spinner } from "reactstrap";
    import axios from "axios";
    import ActivityModal from "./ActivityModal";
    import BCMSiteModal from "./BCMSiteModal";
    import PrimaryStaffModal from "./PrimaryStaffModal";
    import AlternateStaffModal from "./AlternateStaffModal";

    function EditBCMSeatsRequirements() {
    const { id } = useParams(); // Get ID from URL
    const navigate = useNavigate(); // Navigation Hook

    const [showActivityModal, setShowActivityModal] = useState(false);
    const [showBCMSiteModal, setShowBCMSiteModal] = useState(false);
    const [showPrimaryStaffModal, setShowPrimaryStaffModal] = useState(false);
    const [showAlternateStaffModal, setShowAlternateStaffModal] = useState(false);

    const [selectedActivity, setSelectedActivity] = useState([]);
    const [selectedBCMSite, setSelectedBCMSite] = useState([]);
    const [selectedPrimaryStaff, setSelectedPrimaryStaff] = useState([]);
    const [selectedAlternateStaff, setSelectedAlternateStaff] = useState([]);
    const [bcmSeatsRequirementsRecovery, setBcmSeatsRequirementsRecovery] = useState("");
    const [bcmSeatsRequirements, setBcmSeatsRequirements] = useState("");
    const [timeOfOperation, setTimeOfOperation] = useState("");
    const [bcmSeatNumber, setBcmSeatNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // Fetch existing BCM Seats Requirement data
    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/bcm-seats-requirements/${id}`);
            const data = response.data.data;
            
            setBcmSeatsRequirements(data.bcmSeatsRequirements);
            setBcmSeatsRequirementsRecovery(data.bcmSeatsRequirementsRecovery);
            setTimeOfOperation(data.timeOfOperation);
            setBcmSeatNumber(data.bcmSeatNumber);
            setSelectedActivity(data.activities || []);
            setSelectedBCMSite([data.bcmSite] || []);
            setSelectedPrimaryStaff(data.primaryCriticalStaff || []);
            setSelectedAlternateStaff(data.alternateCriticalStaff || []);
        } catch (err) {
            setError("Failed to load BCM Seats Requirement.");
        } finally {
            setLoading(false);
        }
        };
        
        fetchData();
    }, [id]);

    // Handle Selection from Modals
    const handleSelectActivity = (activities) => {
        setSelectedActivity(activities);
        setShowActivityModal(false);
    };

    const handleSelectBCMSite = (sites) => {
        setSelectedBCMSite(sites);
        setShowBCMSiteModal(false);
    };

    const handleSelectPrimaryStaff = (staffList) => {
        setSelectedPrimaryStaff(staffList);
        setShowPrimaryStaffModal(false);
    };

    const handleSelectAlternateStaff = (staffList) => {
        setSelectedAlternateStaff(staffList);
        setShowAlternateStaffModal(false);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      setSuccessMessage("");
    
      const updatedData = {
        bcmSeatsRequirements,
        bcmSeatsRequirementsRecovery,
        timeOfOperation,
        bcmSeatNumber,
        activities: selectedActivity.map(activity => activity._id),
        bcmSite: selectedBCMSite.length > 0 ? selectedBCMSite[0]._id : null,
        primaryCriticalStaff: selectedPrimaryStaff.map(staff => staff._id),
        alternateCriticalStaff: selectedAlternateStaff.map(staff => staff._id),
      };
    
      console.log("✅ Submitting Update Request:", updatedData);
    
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_URL}/api/v1/bcm-seats-requirements/upadate/${id}`, // ⚠ Ensure correct endpoint
          updatedData,
          { headers: { "Content-Type": "application/json" } }
        );
    
        console.log("✅ Update Success:", response.data);
        setSuccessMessage("BCM Seats Requirement updated successfully!");
        setTimeout(() => navigate("/bcm-seats-requirements"), 2000);
      } catch (error) {
        console.error("❌ Update Error:", error.response?.data || error.message);
        setError(error.response?.data?.message || "An error occurred while updating.");
      } finally {
        setLoading(false);
      }
    };
    
  
  


  
  
      

    return (
        <React.Fragment>
        <Helmet>
            <title>Edit BCM Seats Requirement | TRST</title>
        </Helmet>

        <div className="form-content">
            <div className="form-heading">Edit BCM Seats Requirement</div>

            <Form onSubmit={handleSubmit}>
            <div className="row pt-4">
                <Label className="form-label">BCM Seats Requirements</Label>
                <Input type="text" value={bcmSeatsRequirements} onChange={(e) => setBcmSeatsRequirements(e.target.value)} />

                <Label className="form-label">BCM Seats Requirements Recovery</Label>
                <select className="form-control" value={bcmSeatsRequirementsRecovery} onChange={(e) => setBcmSeatsRequirementsRecovery(e.target.value)}>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                </select>

                <Label className="form-label">Time of Operation</Label>
                <Input type="text" value={timeOfOperation} onChange={(e) => setTimeOfOperation(e.target.value)} />

                <Label className="form-label">BCM Seat Number</Label>
                <Input type="number" value={bcmSeatNumber} onChange={(e) => setBcmSeatNumber(e.target.value)} />

                <div className="col-8">
                {/* Activity Selection */}
                <Button color="secondary" onClick={() => setShowActivityModal(true)}>Select Activities</Button>
                <p>{selectedActivity.map(a => a.activity).join(", ") || "No activity selected"}</p>

                {/* BCM Site Selection */}
                <Button color="secondary" onClick={() => setShowBCMSiteModal(true)}>Select BCM Site</Button>
                <p>{selectedBCMSite.map(site => site.locationName).join(", ") || "No site selected"}</p>

                {/* Staff Selection */}
                <Button color="secondary" onClick={() => setShowPrimaryStaffModal(true)}>Select Primary Staff</Button>
                <p>{selectedPrimaryStaff.map(s => `${s.firstName} ${s.lastName}`).join(", ") || "No staff selected"}</p>

                <Button color="secondary" onClick={() => setShowAlternateStaffModal(true)}>Select Alternate Staff</Button>
                <p>{selectedAlternateStaff.map(s => `${s.firstName} ${s.lastName}`).join(", ") || "No staff selected"}</p>

                {error && <Alert color="danger">{error}</Alert>}
                {successMessage && <Alert color="success">{successMessage}</Alert>}
                
                <Button color="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner size="sm" /> : "Update"}
                </Button>
                <Button color="secondary" onClick={() => navigate("/bcm-seats-requirements")} className="ms-2">
                    Cancel
                </Button>
                </div>
            </div>
            </Form>
        </div>

        {/* Modals */}
        <ActivityModal isOpen={showActivityModal} toggle={() => setShowActivityModal(false)} onSelect={handleSelectActivity} />
<BCMSiteModal isOpen={showBCMSiteModal} toggle={() => setShowBCMSiteModal(false)} onSelect={handleSelectBCMSite} />
<PrimaryStaffModal isOpen={showPrimaryStaffModal} toggle={() => setShowPrimaryStaffModal(false)} onSelect={handleSelectPrimaryStaff} />
<AlternateStaffModal isOpen={showAlternateStaffModal} toggle={() => setShowAlternateStaffModal(false)} onSelect={handleSelectAlternateStaff} />

        </React.Fragment>
    );
    }

    export default EditBCMSeatsRequirements;
