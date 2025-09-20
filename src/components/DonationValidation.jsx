import React from 'react'
import * as yup from "yup";

// Helper for DOB: must be 18+
const is18Plus = (date) => {
  const today = new Date();
  const dob = new Date(date);
  const age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  return age > 18 || (age === 18 && m >= 0);
};

export const DonationValidation = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "Too short"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile")
    .required("Mobile is required"),
  dob: yup
    .string()
    .required("Date of Birth is required")
    .test("is-18+", "You must be at least 18 years old", is18Plus),

  // Identification type selected from dropdown
  idType: yup.string().required("Select an ID type"),

  // ID number must follow the regex of selected idType
  uniqueId: yup
    .string()
    .required("ID number is required")
    .when("idType", {
      is: "PAN Card",
      then: (schema) =>
        schema.matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"),
    })
    .when("idType", {
      is: "Aadhar",
      then: (schema) => schema.matches(/^\d{12}$/, "Invalid Aadhar number"),
    })
    .when("idType", {
      is: "Driving license",
      then: (schema) =>
        schema.matches(
          /^[A-Z]{2}[0-9]{2}\d{11}$/,
          "Invalid Driving License format"
        ),
    })
    .when("idType", {
      is: "VoterID",
      then: (schema) =>
        schema.matches(/^[A-Z]{3}[0-9]{7}$/, "Invalid Voter ID format"),
    }),

  ifsc: yup
    .string()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code")
    .required("IFSC is required"),
  bankName: yup.string().required("Bank name is required"),
  accountNumber: yup
    .string()
    .matches(/^\d{9,18}$/, "Account number must be 9-18 digits")
    .required("Account number is required"),
  address: yup.string().required("Address is required"),
  declaration: yup
    .boolean()
    .oneOf([true], "You must accept the declaration"),
});

