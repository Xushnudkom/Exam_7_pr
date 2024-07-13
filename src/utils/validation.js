import * as Yup from "yup";

export const signUpValidationSchema = Yup.object().shape({
  full_name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      "Password must be at least 6 characters"
    )
    .required("Password is required"),
  phone_number: Yup.string()
    .min(19, "Invalid phone number")
    .required("Phone number is required"),
});

export const signInValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      "Password must be at least 6 characters"
    )
    .required("Password is required"),
});

export const verifyPassValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const updatePassValidationSchema = Yup.object().shape({
  new_password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      "Password must be at least 6 characters"
    )
    .required("Password is required"),
  code: Yup.string().required().trim(),
});

// /////////////// Service =======================

export const serviceValidationSchema = Yup.object().shape({
  category_name: Yup.string().required("Name is required"),
});


export const orderValidationWorked = Yup.object().shape({
  age: Yup.number().required("Enter your age"),
  email: Yup.string().required("Email is required"),
  first_name: Yup.string().required("Firs name is required"),
  gender: Yup.string().required("Enter you gender id is required"),
  last_name: Yup.string().required("Lase name is required"),
  password: Yup.string().required("Enter you password id is required"),
  phone_number: Yup.string().required("Enter you phone number"),
});

export const validationPraduct = Yup.object().shape({
  age_max: Yup.number()
      .required("Age Maximum is required")
      .min(0, "Age Maximum must be a positive number"),
  age_min: Yup.number()
      .required("Age Minimum is required")
      .min(0, "Age Minimum must be a positive number"),
  category_id: Yup.string().required("Category is required"),
  color: Yup.array()
      .of(Yup.string().required("Color is required"))
      .min(1, "At least one color is required"),
  cost: Yup.number()
      .required("Cost is required")
      .min(0, "Cost must be a positive number"),
  count: Yup.number()
      .required("Count is required")
      .min(0, "Count must be a positive number"),
  description: Yup.string().required("Description is required"),
  discount: Yup.number()
      .required("Discount is required")
      .min(0, "Discount must be a positive number"),
  for_gender: Yup.string().required("Gender is required"),
  made_in: Yup.string().required("Made In is required"),
  product_name: Yup.string().required("Product Name is required"),
  size: Yup.array()
      .of(Yup.string().required("Size is required"))
      .min(1, "At least one size is required"),
});