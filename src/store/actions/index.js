import axios from "axios";
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
  GET_TOOLS_ERROR
} from "../types/index";

export const registerUser = user => dispatch => {
  dispatch({ type: LOADING });

  axios
    .post(`https://tools-backend.herokuapp.com/api/registration/register`, user)
    .then(res => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      window.location.href = "/login";
    })
    .catch(error =>
      dispatch({ type: REGISTER_FAILED, payload: error.response.data.message })
    );
};

export const loginUser = user => dispatch => {
  dispatch({ type: LOADING });

  axios
    .post(`https://tools-backend.herokuapp.com/api/registration/login`, user)
    .then(res => {
      window.localStorage.setItem("token", res.data.token);
      window.localStorage.setItem("username", res.data.username);
      window.localStorage.setItem("image_url", res.data.image_url);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch(error =>
      dispatch({ type: LOGIN_FAILED, payload: error.response.data.message })
    );
};
export const addNewTool = tool => dispatch => {
  dispatch({ type: LOADING });
  const config = {
    headers: {
      Authorization: window.localStorage.token
    }
  };

  axios
    .post("https://tools-backend.herokuapp.com/api/tools", tool, config)
    .then(res => {
      dispatch({ type: NEW_TOOL_ADDED, payload: res.data });
    })
    .catch(error => {
      dispatch({ type: NEW_TOOL_FAILED, payload: error });
    });
};

export const getTools = () => dispatch => {
  dispatch({ type: LOADING });

  axios
    .get("https://tools-backend.herokuapp.com/api/tools")
    .then(res => dispatch({ type: GET_TOOLS_SUCCESS, payload: res.data }))
    .catch(error => dispatch({ type: GET_TOOLS_ERROR, payload: error }));
};

export const handleChange = e => {
  return {
    type: HANDLE_CHANGE,
    e
  };
};

export const handleClose = () => {
  return {
    type: HANDLE_CLOSE
  };
};

export const handleErrors = message => {
  return {
    type: HANDLE_ERRORS,
    payload: message
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER
  };
};
