import axios from "axios";
import { API_URL } from "../apiurl";

const userOnLogin = [];
export const onRegister = user => {
  return dispatch => {
    axios.post(API_URL + "/users", user).then(res =>
      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: {
          email: res.data.email,
          password: res.data.password,
          username: res.data.username,
          movie: "",
          jadwal: "",
          seat: ""
        }
      })
    );
  };
};

export const onLogin = user => {
  return dispatch => {
    axios
      .get(API_URL + "/users", {
        params: { email: user.email, password: user.password }
      })
      .then(res => {
        dispatch({
          type: "USER_LOGIN_SUCCESS",
          payload: {
            email: res.data[0].email,
            password: res.data[0].password,
            username: res.data[0].username,
            movie: res.data[0].movie,
            jadwal: res.data[0].jadwal,
            seat: res.data[0].seat,
            id: res.data[0].id
          }
        });
        userOnLogin.push(res.data[0]);
      });
  };
};

export const onLogout = () => {
  return dispatch => {
    dispatch({ type: "USER_LOGOUT" });
    userOnLogin.pop();
  };
};

export const onMovieClicked = movieid => {
  return dispatch => {
    axios
      .get(API_URL + "/movielist", {
        id: movieid
      })
      .then(res => {
        dispatch({
          type: "MOVIE_CLICKED",
          payload: {
            id: res.data[movieid].id,
            title: res.data[movieid].title,
            studio: res.data[movieid].studio,
            description: res.data[movieid].description,
            image: res.data[movieid].image,
            shift1SeatBookedIndex: res.data[movieid].shift1SeatBookedIndex,
            shift2SeatBookedIndexS: res.data[movieid].shift2SeatBookedIndex
          }
        });
      });
  };
};
