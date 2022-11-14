import axios from "axios";

const LoginRequest = () => {
  return {
    type: "LOGIN_REQUEST",
  };
};

const LoginSuccess = (data) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: data,
  };
};

const LoginError = (err) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: err,
  };
};

export const AuthLogin = (formData) => {
  return (dispatch) => {
    dispatch(LoginRequest());
    axios({
      method: "POST",
      url: "https://nusatechapi.404official.com/api/login",
      data: {
        email: formData.email,
        password: formData.password,
      },
    })
      .then((res) => {
        dispatch(LoginSuccess(res.data));
      })
      .catch((err) => {
        dispatch(LoginError(err.response.data));
      });
  };
};

export const AuthLogout = () => {
  return {
    type: "LOGOUT_SUCCESS",
  };
};
