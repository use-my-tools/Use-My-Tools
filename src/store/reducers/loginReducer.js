import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOADING,
  HANDLE_CHANGE,
  HANDLE_CLOSE,
  HANDLE_ERRORS
} from "../types/index";

const initialState = {
  user: {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  },
  isLoading: false,
  error: null,
  loggedInUser: null,
  registeredUser: null,
  isRegistered: false,
  open: false,
  message: "",
  variant: "success"
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_CHANGE:
      return {
        ...state,
        user: {
          ...state.user,
          [action.e.target.name]: action.e.target.value
        }
      };

    case HANDLE_ERRORS:
      return {
        ...state,
        open: true,
        message: action.payload,
        variant: "error"
      };
    case LOADING:
      return {
        ...state,
        isLoading: true
      };

    case HANDLE_CLOSE:
      return {
        ...state,
        open: false
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        registerUser: action.payload,
        user: {
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: ""
        },
        isRegistered: true
      };
    case REGISTER_FAILED:
      return {
        ...state,
        isLoading: false,
        open: true,
        message: "Failed to register user",
        variant: "error",
        user: {
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: ""
        }
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loggedInUser: action.payload
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        open: true,
        message: action.payload,
        variant: "error",
        user: {
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: ""
        }
      };
    default:
      return state;
  }
};

export default login;
