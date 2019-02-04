import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOADING,
  HANDLE_CHANGE,
  HANDLE_CLOSE,
  HANDLE_ERRORS,
  CLEAR_USER,
  NEW_TOOL_ADDED,
  NEW_TOOL_FAILED,
  GET_TOOLS_SUCCESS,
  GET_TOOLS_ERROR,
  SET_PAGINATION
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
  variant: "success",
  tools: [],
  currentPage: 0,
  lastPage: 0
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

    case CLEAR_USER:
      return {
        ...state,
        user: {
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: ""
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

    case SET_PAGINATION:
      return {
        ...state,
        isLoading: false,
        currentPage: action.payload.current_page,
        lastPage: action.payload.last_page
      };
    case GET_TOOLS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tools: action.payload
      };

    case GET_TOOLS_ERROR:
      return {
        ...state,
        isLoading: false,
        open: true,
        variant: "error",
        message: "Failed to get tools"
      };
    case NEW_TOOL_ADDED:
      return {
        ...state,
        isLoading: false,
        open: true,
        message: action.payload,
        variant: "success"
      };

    case NEW_TOOL_FAILED:
      return {
        ...state,
        isLoading: false,
        open: true,
        message: action.payload,
        variant: "error"
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        error: false,
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
        error: true,
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
