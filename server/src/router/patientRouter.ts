import express from "express";
import { addPatientHandler } from "../handlers/addPatient";
import { getPatientHandler } from "../handlers/getPatient";
import { editPatientHandler } from "../handlers/editPatient";
import { listPatientsHandler } from "../handlers/listPatients";
import { removePatientHandler } from "../handlers/deletePatient";

const router = express.Router();

// POST patients
router.post("/", addPatientHandler);
router.get("/", listPatientsHandler);
router.put("/:id", editPatientHandler);
router.get("/:id", getPatientHandler);
router.delete("/:id", removePatientHandler);

export default router;
