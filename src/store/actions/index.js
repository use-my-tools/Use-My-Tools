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
  GET_TOOLS_ERROR,
  SET_PAGINATION,
  HANDLE_TOOL_CHANGE,
  CLEAR_TOOL,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAILED,
  HANDLE_FILE_CHANGE,
  HANDLE_MODAL_OPEN,
  HANDLE_MODAL_CLOSE,
  HANDLE_MODAL_UPLOAD_OPEN,
  HANDLE_MODAL_UPLOAD_CLOSE,
  HANDLE_UPLOAD_ID
} from "../types/index";

export const registerUser = user => dispatch => {
  dispatch({ type: LOADING });

  axios
    .post(`https://tools-backend.herokuapp.com/api/registration/register`, user)
    .then(res => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      window.location.href = "/login";
    })
    .catch(error => {
      dispatch({ type: REGISTER_FAILED, payload: error.response.data.message });
    });
};

export const loginUser = user => dispatch => {
  dispatch({ type: LOADING });

  axios
    .post(`https://tools-backend.herokuapp.com/api/registration/login`, user)
    .then(res => {
      window.localStorage.setItem("token", res.data.token);
      window.localStorage.setItem("username", res.data.username);
      window.localStorage.setItem("image_url", res.data.image_url);
      window.localStorage.setItem("firstname", res.data.firstname);
      window.localStorage.setItem("lastname", res.data.lastname);
      window.localStorage.setItem("user_id", res.data.user_id);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })
    .catch(error => {
      dispatch({ type: LOGIN_FAILED, payload: error.response.data.message });
    });
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
      console.log(res.data);
      dispatch({ type: NEW_TOOL_ADDED, payload: res.data });
    })
    .catch(error => {
      dispatch({ type: NEW_TOOL_FAILED, payload: error });
    });
};

export const getTools = () => dispatch => {
  dispatch({ type: LOADING });

  axios
    .get("https://tools-backend.herokuapp.com/api/tools?count=12")
    .then(res => {
      dispatch({ type: SET_PAGINATION, payload: res.data });
      dispatch({ type: GET_TOOLS_SUCCESS, payload: res.data });
    })
    .catch(error => dispatch({ type: GET_TOOLS_ERROR, payload: error }));
};

export const uploadImages = (tool_id, image) => dispatch => {
  dispatch({ type: LOADING });
  let formData = new FormData();
  formData.append("image", image);
  formData.append("tool_id", tool_id);
  axios
    .post("https://tools-backend.herokuapp.com/api/upload/image", formData)
    .then(res => {
      dispatch({ type: IMAGE_UPLOAD_SUCCESS, payload: res.data });
      window.location.href = "/dashboard";
    })
    .catch(error =>
      dispatch({
        type: IMAGE_UPLOAD_FAILED,
        payload: error.response.data.message
      })
    );
};

export const pagination = page => dispatch => {
  dispatch({ type: LOADING });

  axios
    .get(`https://tools-backend.herokuapp.com/api/tools?count=12&page=${page}`)
    .then(res => dispatch({ type: GET_TOOLS_SUCCESS, payload: res.data }))
    .catch(error => dispatch({ type: GET_TOOLS_ERROR, payload: error }));
};

export const handleToolChange = e => {
  return {
    type: HANDLE_TOOL_CHANGE,
    e
  };
};

export const handleFileChange = e => {
  return {
    type: HANDLE_FILE_CHANGE,
    e
  };
};

export const clearTool = () => {
  return {
    type: CLEAR_TOOL
  };
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

export const handleModalOpen = () => {
  return {
    type: HANDLE_MODAL_OPEN
  };
};

export const handleModalClose = () => {
  return {
    type: HANDLE_MODAL_CLOSE
  };
};

export const handleModalUploadOpen = () => {
  return {
    type: HANDLE_MODAL_UPLOAD_OPEN
  };
};

export const handleModalUploadClose = () => {
  return {
    type: HANDLE_MODAL_UPLOAD_CLOSE
  };
};

export const handleUploadId = id => {
  return {
    type: HANDLE_UPLOAD_ID,
    payload: id
  };
};
