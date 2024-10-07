import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export enum InquiryStatus {
  Inquiry = "Inquiry",
  Onboarding = "Onboarding",
  Active = "Active",
  Churned = "Churned",
}

export enum AddressType {
  Primary = "Primary",
  Secondary = "Secondary",
}

interface Patient {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: Date;
  status: InquiryStatus;
  addresses: [
    {
      type: AddressType;
      line1: string;
      line2?: string;
      city: string;
      area: string;
      country: string;
      postalCode: string;
      _id: string;
    }
  ];
  metadata: {
    website: string;
    newField: string;
  };
  deletedAt: null;
  createdAt: string;
  updatedAt: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api" }),
  tagTypes: ["Patient"],
  endpoints: (builder) => ({
    // Query
    getPatientById: builder.query<Patient, number>({
      query: (id) => `patients/${id}`,
      providesTags: ["Patient"],
    }),
    listPatients: builder.query<
      Patient[],
      { search?: string; status?: InquiryStatus }
    >({
      query: ({ search, status }) =>
        `patients?search=${search}&status=${status}`,
      providesTags: ["Patient"],
    }),
    // Mutation
    addPatient: builder.mutation<Patient, Partial<Patient>>({
      query: (newPatient) => ({
        url: "/patients",
        method: "POST",
        body: newPatient,
      }),
      invalidatesTags: ["Patient"],
    }),
    editPatient: builder.mutation<Patient, Partial<Patient>>({
      query: (patient) => ({
        url: `/patients/${patient._id}`,
        method: "PUT",
        body: patient,
      }),
      invalidatesTags: ["Patient"],
    }),
    removePatient: builder.mutation<Patient, Partial<Patient>>({
      query: (patient) => ({
        url: `/patients/${patient._id}`,
        method: "DELETE",
        body: patient,
      }),
      invalidatesTags: ["Patient"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetPatientByIdQuery,
  useListPatientsQuery,
  useAddPatientMutation,
  useEditPatientMutation,
  useRemovePatientMutation,
} = apiSlice;
