export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const sriLankanPhonePattern = /^(?:0|\+94)[0-9]{9}$/;
export function validateRegister(values, users) {
  const errors = {}; const fullName = values.fullName.trim(); const email = values.email.trim().toLowerCase();
  if (!fullName) errors.fullName = 'Please enter your full name.'; else if (fullName.length < 3) errors.fullName = 'Full name must contain at least 3 characters.';
  if (!email) errors.email = 'Please enter your email address.'; else if (!emailPattern.test(email)) errors.email = 'Please enter a valid email address (e.g., name@example.com).'; else if (users.some((user) => user.email?.toLowerCase() === email)) errors.email = 'An account with this email address already exists.';
  if (!values.role) errors.role = 'Please select whether you are a Resident or Health Officer.';
  if (values.role === 'phi' && !values.mohDivision) errors.mohDivision = 'Please select your MOH division.';
  if (!values.password) errors.password = 'Please enter a password.'; else if (values.password.length < 6) errors.password = 'Password must contain at least 6 characters.';
  if (!values.confirmPassword) errors.confirmPassword = 'Please confirm your password.'; else if (values.confirmPassword !== values.password) errors.confirmPassword = 'Passwords do not match.';
  return errors;
}
export function validateLogin(values) { const errors = {}; const email = values.email.trim(); if (!email) errors.email = 'Please enter your email address.'; else if (!emailPattern.test(email)) errors.email = 'Please enter a valid email address (e.g., name@example.com).'; if (!values.password) errors.password = 'Please enter a password.'; else if (values.password.length < 6) errors.password = 'Password must contain at least 6 characters.'; return errors; }
