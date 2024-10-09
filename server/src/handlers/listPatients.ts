import { Request, Response } from "express";
import Logger from "../common/logger";
import PatientModel, {
  AddressType,
  IntakeStatus,
} from "../models/patientModel";
import { isArray } from "lodash";
import { assertValue } from "../common/assert";

const logger = Logger.getInstance({ name: "ListPatients" });

export const listPatientsHandler = async (
  req: Request & { user?: { providerId: string } },
  res: Response
): Promise<void> => {
  const query = req.query;
  logger.info({ query }, "Listing patients");

  try {
    const providerId = assertValue(
      req.user?.providerId,
      "Missing logged providerId"
    );

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

    let statusFilter = {};
    if (query.status) {
      if (isArray(query.status)) {
        statusFilter = {
          status: { $in: query.status },
        };
      } else {
        statusFilter = {
          status: query.status,
        };
      }
    }

    const patients = await PatientModel.aggregate([
      {
        $match: {
          providerId,
          deletedAt: null,
          ...searchFilter,
          ...statusFilter,
        },
      },
      {
        $addFields: {
          id: "$_id",
          statusSort: {
            $switch: {
              branches: [
                {
                  case: { $eq: ["$status", IntakeStatus.Inquiry] },
                  then: 1,
                },
                {
                  case: { $eq: ["$status", IntakeStatus.Onboarding] },
                  then: 2,
                },
                {
                  case: { $eq: ["$status", IntakeStatus.Active] },
                  then: 3,
                },
                {
                  case: { $eq: ["$status", IntakeStatus.Churned] },
                  then: 4,
                },
              ],
              default: 5, // For any unknown status
            },
          },
        },
      },
      {
        $sort: { statusSort: 1 }, // Sort by the custom order
      },
      {
        $project: { statusSort: 0, _id: 0, __v: 0, deletedAt: 0 }, // remove unwanted fields
      },
    ]);

    res.status(200).send(patients);
  } catch (error: any) {
    res.status(500).send(`Failed to list patients: ${error.message}`);
  }
};
