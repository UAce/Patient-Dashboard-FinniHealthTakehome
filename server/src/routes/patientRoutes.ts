import express from "express";
import { addPatientHandler } from "../handlers/addPatient";
import { getPatientHandler } from "../handlers/getPatient";

const PatientRoutes = express.Router();

// POST patients
PatientRoutes.post("/", addPatientHandler);
PatientRoutes.get("/:id", getPatientHandler);

export default PatientRoutes;
