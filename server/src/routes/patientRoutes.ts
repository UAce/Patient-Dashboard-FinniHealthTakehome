import express from "express";
import { addPatientHandler } from "../handlers/addPatient";
import { getPatientHandler } from "../handlers/getPatient";
import { editPatientHandler } from "../handlers/editPatient";
import { listPatientsHandler } from "../handlers/listPatients";

const PatientRoutes = express.Router();

// POST patients
PatientRoutes.post("/", addPatientHandler);
PatientRoutes.put("/:id", editPatientHandler);
PatientRoutes.get("/:id", getPatientHandler);
PatientRoutes.get("/", listPatientsHandler);

export default PatientRoutes;
