import express from "express";
import { addPatientHandler } from "../handlers/addPatient";
import { getPatientHandler } from "../handlers/getPatient";
import { editPatientHandler } from "../handlers/editPatient";

const PatientRoutes = express.Router();

// POST patients
PatientRoutes.post("/", addPatientHandler);
PatientRoutes.put("/:id", editPatientHandler);
PatientRoutes.get("/:id", getPatientHandler);

export default PatientRoutes;
