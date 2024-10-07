import { Request, Response } from "express";
import Joi from "joi";
import Logger from "../common/logger";
import PatientModel, {
  InquiryStatus,
  AddressType,
} from "../models/patientModel";
import { assertSchema } from "../common/assert";

const logger = Logger.getInstance({ name: "AddPatient" });

const AddPatientRequestSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  middleName: Joi.string().optional().allow(null, ""),
  dateOfBirth: Joi.date().required(),
  status: Joi.string()
    .valid(...Object.values(InquiryStatus))
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
  req: Request,
  res: Response
): Promise<void> => {
  const body = req.body;
  logger.info(body, "Adding patient");

  try {
    assertSchema(AddPatientRequestSchema, body);

    const newPatient = await PatientModel.create(body);

    res.status(201).send(newPatient);
  } catch (error: any) {
    res.status(500).send(`Failed to add patient: ${error.message}`);
  }
};
