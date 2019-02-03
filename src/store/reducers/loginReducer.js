import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOADING,
  HANDLE_CHANGE,
  HANDLE_CLOSE
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
        isRegistered: true
      };
    case REGISTER_FAILED:
      return {
        ...state,
        isLoading: false,
        open: true,
        message: action.payload,
        variant: "error"
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
        variant: "error"
      };
    default:
      return state;
  }
};

export default login;
