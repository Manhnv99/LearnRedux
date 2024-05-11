import {combineReducers} from "redux";
import {StudentReducer} from "./StudentReducer";

export const rootReducer = combineReducers({
    student:StudentReducer
})