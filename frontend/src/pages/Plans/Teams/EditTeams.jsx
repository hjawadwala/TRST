import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import { Input, Label, Form, Button, Spinner } from "reactstrap";
import { BiSearchAlt2 } from "react-icons/bi";
import ApplicationModal from "./ApplicationModal";
import UserSearchModal from "./UserSearchModal";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditTeams() {
  const { id } = useParams(); // Get team ID from URL
  const navigate = useNavigate(); // For navigation after successful update
  const [plan, setPlan] = useState("");
  const [applications, setApplications] = useState([]);
  const [team, setTeam] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [teamType, setTeamType] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);

  // Fetch existing team data
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/teams/${id}`);
        const teamData = response.data.data;
        setPlan(teamData.plan || "");
        setApplications(teamData.applications || []);
        setTeam(teamData.team || "");
        setTeamDescription(teamData.teamDescription || "");
        setTeamType(teamData.teamType || "");
        setTeamMembers(teamData.teamMembers || []);
      } catch (error) {
        console.error("Error fetching team data:", error);
        toast.error("Failed to load team data.");
      }
    };

    fetchTeam();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.info("Submitting team update request...");
    const data = {
      plan,
      applications: applications.map((app) => app._id),
      team,
      teamDescription,
      teamType,
      teamMembers: teamMembers.map((member) => member._id),
    };

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/teams/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Team updated successfully!");
      navigate("/teams"); // Redirect to the teams list
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while updating the team.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Edit Team | TRST</title>
      </Helmet>
      <div className="page-content">
        <div className="main-content1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="header-text">Edit Team</div>
            <div className="d-flex align-items-center justify-content-end">
              <NavLink className="button3 border-1 button3-changes me-1" to="/teams" title="Cancel">
                <RxCross2 className="me-1" style={{ width: "15px", height: "15px" }} />
                Cancel
              </NavLink>
              <Button className="button3 border-1 me-3" onClick={handleSubmit} title="Save">
                <FaCheck className="me-1" style={{ width: "15px", height: "15px" }} />
                Save
              </Button>
            </div>
          </div>
        </div>
        <div className="form-content">
          <div className="form-heading">Team Information</div>
          <Form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Label>Plan</Label>
              <Input
                type="text"
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                placeholder="Enter Plan Name"
              />
            </div>
            <div className="mb-3">
              <Label>Applications</Label>
              <div className="d-flex">
                <Input
                  type="text"
                  value={applications.map((app) => app.applicationName).join(", ")}
                  readOnly
                />
                <Button color="secondary" onClick={() => setShowApplicationModal(true)}>
                  <BiSearchAlt2 className="fs-15" />
                </Button>
              </div>
            </div>
            <div className="mb-3">
              <Label>Team</Label>
              <Input
                type="text"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                placeholder="Enter Team Name"
                required
              />
            </div>
            <div className="mb-3">
              <Label>Team Description</Label>
              <Input
                type="textarea"
                value={teamDescription}
                onChange={(e) => setTeamDescription(e.target.value)}
                placeholder="Enter Team Description"
                required
              />
            </div>
            <div className="mb-3">
              <Label>Team Type</Label>
              <Input
                type="select"
                value={teamType}
                onChange={(e) => setTeamType(e.target.value)}
                required
              >
                <option value="">-- Please select --</option>
                <option value="Facility Managers">Facility Managers</option>
                <option value="First Responder">First Responder</option>
                <option value="Recovery">Recovery</option>
                <option value="Restoration">Restoration</option>
              </Input>
            </div>
            <div className="mb-3">
              <Label>Team Members</Label>
              <div className="d-flex">
                <Input
                  type="text"
                  value={teamMembers.map((member) => `${member.firstName} ${member.lastName}`).join(", ")}
                  readOnly
                />
                <Button color="secondary" onClick={() => setShowEmployeeModal(true)}>
                  <BiSearchAlt2 className="fs-15" />
                </Button>
              </div>
            </div>
            <Button color="primary" type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" /> : "Update"}
            </Button>
          </Form>
        </div>
      </div>
      <ApplicationModal
        isOpen={showApplicationModal}
        toggle={() => setShowApplicationModal(false)}
        onSelect={(selectedApplications) => setApplications(selectedApplications)}
      />
      <UserSearchModal
        isOpen={showEmployeeModal}
        toggle={() => setShowEmployeeModal(false)}
        onSelectUsers={(selectedUsers) => setTeamMembers(selectedUsers)}
      />
      <ToastContainer />
    </React.Fragment>
  );
}

export default EditTeams;