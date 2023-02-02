export function addDriverValidator(values) {
  const errors = {};

  if (!values.firstname) {
    errors.firstname = "Required";
  }
  if (!values.lastname) {
    errors.lastname = "Required";
  }

  if (!values.phone) {
    errors.phone = "Required";
  }
  if (!values.carModelName) {
    errors.carModelName = "Required";
  }
 
  if (!values.carCapacity) {
    errors.carCapacity = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid Email Address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6 || values.password.length > 20) {
    errors.password = "Must be greater than 6 and less than 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (
    values.confirmPassword.length < 6 ||
    values.confirmPassword.length > 20
  ) {
    errors.confirmPassword =
      "Must be greater than 6 and less than 20 characters";
  } else if (values.confirmPassword.includes(" ")) {
    errors.confirmPassword = "Invalid Password";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passswords do not Match";
  }

  return errors;
}
