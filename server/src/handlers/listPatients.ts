import { Request, Response } from "express";
import Logger from "../common/logger";
import PatientModel, { AddressType } from "../models/patientModel";

const logger = Logger.getInstance({ name: "ListPatients" });

export const listPatientsHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const query = req.query;
  logger.info(query, "Listing patients");

  try {
    let searchFilter = {};

    if (query.search) {
      // '^' ensures it starts with the searchTerm, 'i' for case-insensitivity
      const regex = new RegExp(`^${query.search}`, "i");

      searchFilter = {
        $or: [
          { firstName: { $regex: regex } },
          { middleName: { $regex: regex } },
          { lastName: { $regex: regex } },
          {
            addresses: {
              $elemMatch: {
                type: AddressType.Primary,
                city: { $regex: regex },
              },
            },
          },
        ],
      };
    }

    const patientsQuery = PatientModel.find({
      ...searchFilter,
      // TODO: check status is valid enum
      ...(query.status ? { status: query.status } : {}),
    }).sort({ status: -1 });

    res.status(200).send(await patientsQuery.exec());
  } catch (error: any) {
    res.status(500).send(`Failed to list patients: ${error.message}`);
  }
};
