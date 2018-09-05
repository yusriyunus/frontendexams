const INITIAL_STATE = {
  id: "",
  title: "",
  studio: "",
  description: "",
  image: "",
  shift1SeatBookedIndex: "",
  shift2SeatBookedIndexS: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "MOVIE_CLICKED":
      return action.payload;
    default:
      return state;
  }
};
