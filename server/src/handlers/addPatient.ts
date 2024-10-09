import { Request, Response } from "express";
import Joi from "joi";
import Logger from "../common/logger";
import PatientModel, {
  IntakeStatus,
  AddressType,
} from "../models/patientModel";
import { assertSchema, assertValue } from "../common/assert";
import { merge } from "lodash";

const logger = Logger.getInstance({ name: "AddPatient" });

const AddPatientRequestSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  middleName: Joi.string().optional().allow(null, ""),
  dateOfBirth: Joi.date().required(),
  status: Joi.string()
    .valid(...Object.values(IntakeStatus))
    .required(),
  addresses: Joi.array()
    .items(
      Joi.object({
        type: Joi.string()
          .valid(...Object.values(AddressType))
          .required(),
        line1: Joi.string().required(),
        line2: Joi.string().optional().allow(null, ""),
        city: Joi.string().required(),
        area: Joi.string().required(),
        country: Joi.string().required(),
        postalCode: Joi.string().required(),
      })
    )
    .required(),
  metadata: Joi.array()
    .items(
      Joi.object({
        key: Joi.string().required(),
        value: Joi.string().required(),
      })
    )
    .optional(),
}).required();

export const addPatientHandler = async (
  req: Request & { user?: { providerId: string } },
  res: Response
): Promise<void> => {
  const body = req.body;
  logger.info("Adding patient");

  try {
    const providerId = assertValue(
      req.user?.providerId,
      "Missing logged providerId"
    );
    assertSchema(AddPatientRequestSchema, body);

    const newPatient = await PatientModel.create(merge(body, { providerId }));

    res.status(201).send(newPatient);
  } catch (error: any) {
    res.status(500).send(`Failed to add patient: ${error.message}`);
  }
};
