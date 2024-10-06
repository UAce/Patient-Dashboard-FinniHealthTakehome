import express from "express";
import { addPatientHandler } from "../handlers/addPatientHandler";

const PatientRoutes = express.Router();

// POST patients
PatientRoutes.post("/", addPatientHandler);

export default PatientRoutes;
