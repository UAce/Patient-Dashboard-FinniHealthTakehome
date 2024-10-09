import { sample } from "lodash";
import PatientModel, {
  AddressType,
  IntakeStatus,
} from "../models/patientModel";
import { faker } from "@faker-js/faker";

export const seedDatabase = async (count: number, providerId: string) => {
  const patients = Array(count)
    .fill(0)
    .map(() => generatePatient(providerId));
  await PatientModel.insertMany(patients);
};

const generatePatient = (providerId: string) => ({
  providerId,
  firstName: faker.person.firstName(),
  middleName: Math.random() > 0.5 ? faker.person.middleName() : "",
  lastName: faker.person.lastName(),
  dateOfBirth: faker.date.birthdate(),
  status: sample(Object.values(IntakeStatus)),
  addresses: [
    {
      type: AddressType.Primary,
      line1: faker.location.streetAddress(),
      line2: Math.random() > 0.5 ? faker.location.secondaryAddress() : "",
      city: faker.location.city(),
      area: faker.location.county(),
      country: faker.location.country(),
      postalCode: faker.location.zipCode(),
    },
    ...(Math.random() > 0.5
      ? [
          {
            type: AddressType.Secondary,
            line1: faker.location.streetAddress(),
            line2: Math.random() > 0.5 ? faker.location.secondaryAddress() : "",
            city: faker.location.city(),
            area: faker.location.county(),
            country: faker.location.country(),
            postalCode: faker.location.zipCode(),
          },
        ]
      : []),
  ],
  metadata:
    Math.random() > 0.5
      ? [
          {
            key: faker.lorem.word(),
            value: faker.lorem.word(),
          },
        ]
      : [],
});
