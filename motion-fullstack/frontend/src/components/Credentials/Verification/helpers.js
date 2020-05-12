// must contain lowercase and uppercase letters as well as a digit
// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)
// must contain a special character from this array [#+!]
// (?=.*[#$^+=!*()@%&])
// length should be between 8 and 10 characters
// .{8,10}$/g
const regexValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#+!]).{8,10}$/g;

export const passwordValidation = password => {
  return regexValidation.test(password) ? true : false
};
