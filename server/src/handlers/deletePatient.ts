import { Request, Response } from "express";
import Logger from "../common/logger";
import PatientModel from "../models/patientModel";
import { Types } from "mongoose";
import { assertValue } from "../common/assert";

const logger = Logger.getInstance({ name: "RemovePatient" });

export const removePatientHandler = async (
  req: Request & { user?: { providerId: string } },
  res: Response
): Promise<void> => {
  const params = req.params;
  logger.info(params, "Removing patient");

  try {
    const providerId = assertValue(
      req.user?.providerId,
      "Missing logged providerId"
    );
    const patient = Types.ObjectId.isValid(params.id)
      ? await PatientModel.findOne({
          _id: params.id,
          providerId,
        })
      : undefined;

    if (patient && !patient.deletedAt) {
      patient.deletedAt = new Date();
      await patient.save();

      res.status(200).send(patient);
    } else {
      res.status(404).send(`Patient not found`);
    }
  } catch (error: any) {
    res.status(500).send(`Failed to remove patient: ${error.message}`);
  }
};
