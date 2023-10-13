const STATUS_CODES = {
  NOT_FOUND: 404,
  OK: 200,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
  CONFLICT: 409,
  UNAUTHORIZED: 401,
};
const GENDERS = ["Male", "Female", "Others"];

const GENDERSKEY = {
  Male: "Male",
  Female: "Female",
  Others: "Others",
};

const BYPASS_TOKEN_ROUTE = ["/login", "/register"];
const SECRET = "openTalk_secretToken";
module.exports = {
  // ROLES,
  // PRIORITY,
  STATUS_CODES,
  BYPASS_TOKEN_ROUTE,
  SECRET,
  GENDERS,
  GENDERSKEY,
};
