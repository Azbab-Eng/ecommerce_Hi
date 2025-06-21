import axios from "axios";
import {
  USER_DETAILS_FAIL,USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,USER_LIST_RESET,USER_LOGIN_FAIL,USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,
  USER_LOGOUT,USER_REGISTER_FAIL,USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_UPDATE_PROFILE_FAIL,USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,USER_DETAILS_RESET,USER_LIST_REQUEST,USER_LIST_FAIL,USER_LIST_SUCCESS,USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,USER_DELETE_FAIL,USER_UPDATE_REQUEST,USER_UPDATE_SUCCESS,USER_UPDATE_FAIL} from "../constants/userConstants";

import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";
import { data,useNavigate } from "react-router-dom";

const PORT ="http://localhost:8000"
// Helper to create config with Authorization header and Content-Type
const authConfig = (token, contentType = "application/json") => ({
  headers: {
    "Content-Type": contentType,
    Authorization: `Bearer ${token}`,
  },
});

// LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(email,password)
    const { data } = await axios.post(`${PORT}/users/login`, { email, password }, config);
    console.log(`${PORT}/users/login`)
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: USER_LIST_RESET });
};

// REGISTER
export const register = (name, email,no, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`${PORT}/users`, { name, email,no, password }, config);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    // Auto login after register
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));

  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const verify = (email,otp)=> async(dispatch)=>{
  try{
    dispatch({
      type:"USER_VERIFICATION_REQUEST"
    })
    const data = await axios.post(`${PORT}/users/verify`,{email,otp},config)
    dispatch({
      type:"USER_VERIFICATION_SUCCESSFUL",payload:data
    })
  }
  catch(error){
    dispatch({
      type: "USER_VERIFICATION_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

  }
}
// GET USER DETAILS
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = authConfig(userInfo.token);

    const { data } = await axios.get(`/users/${id}`, config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// UPDATE USER PROFILE
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = authConfig(userInfo.token);

    const { data } = await axios.put("/users/profile", user, config);

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// LIST USERS (ADMIN)
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = authConfig(userInfo.token);

    const { data } = await axios.get("/users", config);

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// DELETE USER (ADMIN)
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = authConfig(userInfo.token);

    await axios.delete(`/users/${id}`, config);

    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// UPDATE USER (ADMIN)
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = authConfig(userInfo.token);

    const { data } = await axios.put(`/users/${user._id}`, user, config);

    dispatch({ type: USER_UPDATE_SUCCESS });

    // Update user details in state
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
