import { model, Schema } from "mongoose";

export enum AddressType {
  Primary = "Primary",
  Secondary = "Secondary",
}

const addressSchema = new Schema({
  type: {
    type: String,
    enum: [AddressType.Primary, AddressType.Secondary],
    required: true,
  },
  line1: { type: String, required: true, trim: true },
  line2: { type: String, default: "" },
  city: { type: String, required: true, trim: true },
  area: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  postalCode: { type: String, required: true, trim: true },
});

export enum InquiryStatus {
  Inquiry = "Inquiry",
  Onboarding = "Onboarding",
  Active = "Active",
  Churned = "Churned",
}

const patientSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    middleName: { type: String, default: "" },
    dateOfBirth: { type: Date, required: true },
    status: {
      type: String,
      enum: [
        InquiryStatus.Inquiry,
        InquiryStatus.Onboarding,
        InquiryStatus.Active,
        InquiryStatus.Churned,
      ],
      required: true,
    },
    addresses: [addressSchema], // Array of addresses
    metadata: { type: Map, of: String }, // Arbitrary fields
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

// Ensure only one primary address per patient
patientSchema.pre("save", function (next) {
  const primaryAddresses = this.addresses.filter(
    (address) => address.type === AddressType.Primary
  );

  if (primaryAddresses.length > 1) {
    return next(new Error("Only one primary address is allowed."));
  }

  const secondaryAddresses = this.addresses.filter(
    (address) => address.type === AddressType.Secondary
  );
  if (primaryAddresses.length === 0 && secondaryAddresses.length > 1) {
    return next(
      new Error("Cannot create secondary address without primary address.")
    );
  }

  next();
});

patientSchema.pre("findOneAndUpdate", function (next) {
  const newValues = (this as any)._update;

  const primaryAddresses = newValues.addresses.filter(
    (address: any) => address.type === AddressType.Primary
  );

  if (primaryAddresses.length > 1) {
    return next(new Error("Only one primary address is allowed."));
  }

  const secondaryAddresses = newValues.addresses.filter(
    (address: any) => address.type === AddressType.Secondary
  );
  if (primaryAddresses.length === 0 && secondaryAddresses.length > 1) {
    return next(
      new Error("Cannot create secondary address without primary address.")
    );
  }

  next();
});

// Filter out soft-deleted
patientSchema.pre("find", function () {
  this.where({ deletedAt: null });
});
patientSchema.pre("findOne", function () {
  this.where({ deletedAt: null });
});

const PatientModel = model("Patient", patientSchema);

export default PatientModel;
