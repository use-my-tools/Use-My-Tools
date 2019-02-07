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
  HANDLE_UPLOAD_ID,
  GET_ONE_TOOL_FAILED,
  GET_ONE_TOOL_SUCCESS,
  GET_MY_TOOLS_SUCCESS,
  DELETE_TOOL_SUCCESS,
  POPULATE_FORM,
  GET_USER_PROFILE_SUCCESS,
  GET_ALL_PROFILES_SUCCESS,
  HANDLE_SEARCH_CHANGE,
  GET_RENTED_TOOLS_SUCCESS
} from "../types/index";

export const returnTool = id => dispatch => {
  dispatch({ type: LOADING });
  const config = {
    headers: {
      Authorization: window.localStorage.token
    }
  };

  axios
    .post(
      `https://tools-backend.herokuapp.com/api/tools/${id}/return`,
      null,
      config
    )
    .then(res => {
      console.log(res.data);
      dispatch({ type: GET_RENTED_TOOLS_SUCCESS, payload: res.data });
    })
    .catch(error => {
      dispatch({ type: GET_ONE_TOOL_FAILED, payload: error });
    });
};
export const getRentedTools = () => dispatch => {
  dispatch({ type: LOADING });
  const config = {
    headers: {
      Authorization: window.localStorage.token
    }
  };

  axios
    .get(`https://tools-backend.herokuapp.com/api/tools/rented`, config)
    .then(res => {
      console.log(res.data);
      dispatch({ type: GET_RENTED_TOOLS_SUCCESS, payload: res.data });
    })
    .catch(error => {
      dispatch({ type: GET_ONE_TOOL_FAILED, payload: error });
    });
};
export const rentTool = id => dispatch => {
  dispatch({ type: LOADING });
  const config = {
    headers: {
      Authorization: window.localStorage.token
    }
  };

  axios
    .post(
      `https://tools-backend.herokuapp.com/api/tools/${id}/rent`,
      null,
      config
    )
    .then(res => {
      dispatch({ type: GET_ONE_TOOL_SUCCESS, payload: res.data });
    })
    .catch(error => {
      dispatch({ type: GET_ONE_TOOL_FAILED, payload: error });
    });
};
export const handleSearchChange = e => {
  return {
    type: HANDLE_SEARCH_CHANGE,
    e
  };
};

export const handleSearch = search => dispatch => {
  dispatch({ type: LOADING });

  axios
    .get(`http://tools-backend.herokuapp.com/api/tools/?name=${search}`)
    .then(res => dispatch({ type: GET_TOOLS_SUCCESS, payload: res.data }))
    .catch(error =>
      dispatch({
        type: GET_ONE_TOOL_FAILED,
        payload: error.response.data.message
      })
    );
};
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
      dispatch({ type: GET_MY_TOOLS_SUCCESS, payload: res.data });
    })
    .catch(error => {
      dispatch({ type: NEW_TOOL_FAILED, payload: error });
    });
};

export const reviewUser = (stars, review, for_user) => dispatch => {
  dispatch({ type: LOADING });
  const config = {
    headers: {
      Authorization: window.localStorage.token
    }
  };
  axios
    .post(
      `https://tools-backend.herokuapp.com/api/reviews`,
      { stars, review, for_user },
      config
    )
    .then(res => {
      dispatch({ type: GET_ALL_PROFILES_SUCCESS, payload: res.data });
    })
    .catch(error => {
      dispatch({ type: GET_TOOLS_ERROR, payload: error.response.data.message });
    });
};

export const getUserProfile = () => dispatch => {
  dispatch({ type: LOADING });
  const config = {
    headers: {
      Authorization: window.localStorage.token
    }
  };
  axios
    .get(
      `https://tools-backend.herokuapp.com/api/users/${
        window.localStorage.user_id
      }`,
      config
    )
    .then(res => {
      dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: res.data });
    })
    .catch(error =>
      dispatch({ type: GET_TOOLS_ERROR, payload: error.response.data.message })
    );
};

export const getTools = () => dispatch => {
  dispatch({ type: LOADING });

  axios
    .get("https://tools-backend.herokuapp.com/api/tools?count=12")
    .then(res => {
      dispatch({ type: SET_PAGINATION, payload: res.data });
      dispatch({ type: GET_TOOLS_SUCCESS, payload: res.data });
    })
    .catch(error =>
      dispatch({ type: GET_TOOLS_ERROR, payload: error.response.data.message })
    );
};

export const uploadImages = (tool_id, image) => dispatch => {
  dispatch({ type: LOADING });
  console.log(image);

  let formData = new FormData();
  formData.append("image", image);
  formData.append("tool_id", tool_id);
  axios
    .post("https://tools-backend.herokuapp.com/api/upload/image", formData)
    .then(res => {
      dispatch({ type: IMAGE_UPLOAD_SUCCESS, payload: res.data });
      window.location.href = "/dashboard/mytools";
    })
    .catch(error => {
      dispatch({
        type: IMAGE_UPLOAD_FAILED,
        payload: "Image cannot be empty"
      });
    });
};

export const getOneTool = id => dispatch => {
  dispatch({ type: LOADING });

  axios
    .get(`https://tools-backend.herokuapp.com/api/tools/${id}`)
    .then(res => dispatch({ type: GET_ONE_TOOL_SUCCESS, payload: res.data }))
    .catch(error =>
      dispatch({
        type: GET_ONE_TOOL_FAILED,
        payload: "Failed to get one tool"
      })
    );
};

export const getMyTools = () => dispatch => {
  dispatch({ type: LOADING });

  axios
    .get(
      `https://tools-backend.herokuapp.com/api/tools/user/${
        window.localStorage.user_id
      }`
    )
    .then(res => dispatch({ type: GET_MY_TOOLS_SUCCESS, payload: res.data }))
    .catch(error =>
      dispatch({ type: GET_TOOLS_ERROR, payload: error.response.data.message })
    );
};

export const populateForm = tool => {
  return {
    type: POPULATE_FORM,
    tool
  };
};

export const getAllUsers = () => dispatch => {
  dispatch({ type: LOADING });
  const config = {
    headers: {
      Authorization: window.localStorage.token
    }
  };
  axios
    .get(`https://tools-backend.herokuapp.com/api/users`, config)
    .then(res => {
      dispatch({ type: GET_ALL_PROFILES_SUCCESS, payload: res.data });
    })
    .catch(error =>
      dispatch({ type: GET_TOOLS_ERROR, payload: error.response.data.message })
    );
};
export const editTool = tool => dispatch => {
  dispatch({ type: LOADING });
  const config = {
    headers: {
      Authorization: window.localStorage.token
    }
  };

  axios
    .put(
      `https://tools-backend.herokuapp.com/api/tools/${tool.tool_id}`,
      tool,
      config
    )
    .then(res => {
      dispatch({ type: GET_MY_TOOLS_SUCCESS, payload: res.data });
    })
    .catch(error => {
      dispatch({ type: NEW_TOOL_FAILED, payload: error });
    });
};

export const deleteTool = id => dispatch => {
  dispatch({ type: LOADING });
  const config = {
    headers: {
      Authorization: window.localStorage.token
    }
  };
  axios
    .delete(`https://tools-backend.herokuapp.com/api/tools/${id}`, config)
    .then(res => {
      dispatch({ type: DELETE_TOOL_SUCCESS, payload: res.data });
    })
    .catch(error => {
      dispatch({ type: GET_TOOLS_ERROR, payload: error.response.data.message });
    });
};

export const pagination = page => dispatch => {
  dispatch({ type: LOADING });

  axios
    .get(`https://tools-backend.herokuapp.com/api/tools?count=12&page=${page}`)
    .then(res => dispatch({ type: GET_TOOLS_SUCCESS, payload: res.data }))
    .catch(error =>
      dispatch({ type: GET_TOOLS_ERROR, payload: error.response.data.message })
    );
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
