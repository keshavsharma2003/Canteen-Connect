export const validateUserName = (userName) => {
  return true
};
export const validateUserId = (userId) => {
  return userId.includes("@gmail.com");
};
export const validateUserPassword = (password) => {
  return password.length > 7;
};
