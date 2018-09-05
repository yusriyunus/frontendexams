const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  movie: "",
  studio: "",
  jadwal: "",
  seat: "",
  id: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER_LOGIN_SUCCESS":
      return action.payload;
    case "USER_LOGOUT":
      return INITIAL_STATE;
    default:
      return state;
  }
};
