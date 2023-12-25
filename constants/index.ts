//LOCAL_STORAGE_KEYS
export const LOCAL_STORAGE_KEYS = {
  rememberMe: "REMEMBER_ME",
};

//ROUTER
export const ROUTERS = {
  login: "/login",
  signup: "/signup",
  home: "/home",
  newLead: "new-lead",
  chapter: "/chapter",
  resetPassword: "/reset-password",
};

//FORMAT
export const FORMAT_DATE = {
  formatDate: "DD/MM/YYYY",
  formatFullDate: "MMM DD, YYYY h:mm A",
};

//ERROR_MESSAGES
export const ERROR_CODE_FIREBASE = {
  "auth/user-not-found": "Not found user",
  "auth/wrong-password": "Invalid password",
  "auth/invalid-login-credentials": "Email or Password is incorrect",
  "auth/email-already-in-use": "Email already in use. Please use another email",
};

export const ERROR_SOMTHING_WENT_WRONG = 'Something went wrong please try again!'

export const MESSAGE = {
  addedNewLead: 'Added new lead successfully!'
}

export const FIELD_REQUIRED = 'This field is required'