import { Request, Response } from "express";
import Logger from "../common/logger";
import PatientModel from "../models/patientModel";
import { Types } from "mongoose";

const logger = Logger.getInstance({ name: "GetPatient" });

export const getPatientHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const params = req.params;
  logger.info(params, "Geting patient");

  try {
    const patient = Types.ObjectId.isValid(params.id)
      ? await PatientModel.findById(params.id)
      : undefined;

    if (patient) {
      res.status(201).send(patient);
    } else {
      res.status(404).send(`Patient not found`);
    }
  } catch (error: any) {
    res.status(500).send(`Failed to get patient: ${error.message}`);
  }
};
