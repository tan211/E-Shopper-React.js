import { combineReducers } from "redux";
import wishlistReducer from "./wishList";

const rootReducer = combineReducers({
    wishList: wishlistReducer,
})
export default rootReducer