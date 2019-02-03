import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOADING,
  HANDLE_CHANGE
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
  isRegistered: false
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
        error: action.payload
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
        error: action.payload
      };
    default:
      return state;
  }
};

export default login;
