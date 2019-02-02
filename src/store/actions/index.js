import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOADING,
  HANDLE_CHANGE
} from "../types/index";

export const registerUser = user => dispatch => {
  dispatch({ type: LOADING });

  axios
    .post(`https://tools-backend.herokuapp.com/api/registration/register`, {
      user
    })
    .then(res => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
    .catch(error => dispatch({ type: REGISTER_FAILED, payload: error }));
};

export const loginUser = user => dispatch => {
  dispatch({ type: LOADING });

  axios
    .post(`https://tools-backend.herokuapp.com/api/registration/login`, user)
    .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
    .catch(error => dispatch({ type: LOGIN_FAILED, payload: error }));
};

export const handleChange = e => {
  return {
    type: HANDLE_CHANGE,
    e
  };
};
