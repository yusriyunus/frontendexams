import { combineReducers } from "redux";
import AuthReducers from "./authReducer";
import MovieReducers from "./moviereducer";

export default combineReducers({
  auth: AuthReducers,
  movie: MovieReducers
});
