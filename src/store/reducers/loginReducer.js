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
    email: "",
    password: "",
    confirmPassword: ""
  },
  isLoading: false,
  error: {},
  loggedInUser: {}
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
        isLoading: false
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
