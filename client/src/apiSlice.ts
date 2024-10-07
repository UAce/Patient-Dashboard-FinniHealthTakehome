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

export interface Patient {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string; // ISO date string
  status: InquiryStatus;
  addresses: [
    {
      id: string;
      type: AddressType;
      line1: string;
      line2?: string;
      city: string;
      area: string;
      country: string;
      postalCode: string;
    }
  ];
  metadata: Record<string, string>;
  deletedAt: null;
  createdAt: string;
  updatedAt: string;
}

export const updatableFields = [
  "firstName",
  "middleName",
  "lastName",
  "dateOfBirth",
  "addresses",
  "metadata",
];

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api" }),
  tagTypes: ["Patient"],
  endpoints: (builder) => ({
    // Query
    getPatientById: builder.query<Patient, string>({
      query: (id) => `patients/${id}`,
      providesTags: ["Patient"],
    }),
    listPatients: builder.query<
      Patient[],
      { search?: string; status?: InquiryStatus } | undefined
    >({
      query: (filters = {}) => {
        const params = new URLSearchParams(filters);
        return `patients?${params.toString()}`;
      },
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
        url: `/patients/${patient.id}`,
        method: "PUT",
        body: patient,
      }),
      invalidatesTags: ["Patient"],
    }),
    removePatient: builder.mutation<Patient, string>({
      query: (id) => ({
        url: `/patients/${id}`,
        method: "DELETE",
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
