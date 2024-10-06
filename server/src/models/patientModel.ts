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
  line2: { type: String },
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
    middleName: { type: String },
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

  next();
});

const PatientModel = model("Patient", patientSchema);

export default PatientModel;
