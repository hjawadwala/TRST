import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import path from "path"; // ✅ Import path module

const app = express();

//Middlewares
app.use(cors({
    origin: '*',
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({
    limit: '16kb'
}));
app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}))
app.use(express.static('public'));
app.use(cookieParser());


//Routes import
import userRouter from './routes/user.routes.js';
import organizationalEntitiesRouter from './routes/organizationalEntities.routes.js';
import employeesRouter from './routes/employees.routes.js';
import locationsRoutes from './routes/locations.routes.js';
import clientsRoutes from './routes/clients.routes.js';
import clientContactsRoutes from './routes/clientContacts.routes.js';
import bcmSeatsRequirementsRoutes from './routes/bcmSeatsRequirements.routes.js';
import serviceTypeRoutes from './routes/serviceType.routes.js';
import equipmentRoutes from './routes/equipment.routes.js';
import applicationRoutes from './routes/application.routes.js';
import databaseRoutes from './routes/database.routes.js'; // Import the database routes
import hardwareRoutes from './routes/hardware.routes.js';
import supplyRoutes from './routes/supply.routes.js'; // Add this line
import vendorContactRoutes from './routes/vendorContact.routes.js';
import vitalRecordRoutes from './routes/vitalRecord.routes.js'; // Import the vital record routes
import approvalGroupRoutes from './routes/approvalGroup.routes.js';
import biaDashboardRoutes from './routes/biaDashboard.routes.js';
import activityRoutes from './routes/activity.routes.js';
import riskAssessmentRoutes from './routes/riskAssessment.routes.js';
import riskRegisterRoutes from './routes/riskRegister.routes.js';
import threatRoutes from './routes/threat.routes.js';
import exerciseRoutes from './routes/exercise.routes.js';
import exerciseIssueRoutes from './routes/exerciseIssue.routes.js';
import vendorRoutes from './routes/vendor.routes.js';

import PlanRoutes from './routes/plan.routes.js';
import teamRoutes from './routes/team.routes.js';
import planApprovalGroupRoutes from './routes/planApprovalGroup.routes.js';
import attachmentRoutes from './routes/attachment.routes.js';
import callTreeRoutes from './routes/callTree.routes.js';
import ActiveIncident from './routes/activeIncident.routes.js';

//Routes declaration
app.use('/api/v1/users', userRouter);
app.use('/api/v1/organizational-entities', organizationalEntitiesRouter);
app.use('/api/v1/employees', employeesRouter);
app.use('/api/v1/locations', locationsRoutes);
app.use('/api/v1/clients', clientsRoutes);
app.use('/api/v1/client-contacts', clientContactsRoutes);
app.use('/api/v1/bcm-seats-requirements', bcmSeatsRequirementsRoutes);
app.use('/api/v1/service-types', serviceTypeRoutes);
app.use('/api/v1/equipment', equipmentRoutes);
app.use('/api/v1/applications', applicationRoutes);
app.use('/api/v1/databases', databaseRoutes); // Use the database routes
app.use('/api/v1/hardware', hardwareRoutes);
app.use("/api/v1/supplies", supplyRoutes); // Add this line
app.use('/api/v1/vendor-contacts', vendorContactRoutes);
app.use('/api/v1/vital', vitalRecordRoutes); // Use the vital record routes
app.use('/api/v1/approval-groups', approvalGroupRoutes);
app.use('/api/v1/bia-dashboards', biaDashboardRoutes);
app.use('/api/v1/activities', activityRoutes);
app.use('/api/v1/risk-assessments', riskAssessmentRoutes);
app.use('/api/v1/risk-registers', riskRegisterRoutes);
app.use('/api/v1/threats', threatRoutes);
app.use('/api/v1/exercises', exerciseRoutes);
app.use('/api/v1/exercise-issues', exerciseIssueRoutes);
// Use vendor routes
app.use('/api/v1/vendors', vendorRoutes);


app.use('/api/v1/plans', PlanRoutes);
app.use('/api/v1/teams', teamRoutes);
// Plan Approval Group Routes
app.use('/api/v1/plan-approval-groups', planApprovalGroupRoutes);
app.use('/api/v1/attachments', attachmentRoutes);
app.use('/api/v1/call-trees', callTreeRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use('/api/v1/activeincident', ActiveIncident);

export { app };