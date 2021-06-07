import {combineReducers} from 'redux'
import carReducer from './car'
import partnerReducer from './partner'
import scheduleReducer from './schedule';
import billReducer from "./bill";
import userReducer from "./user";

const rootReducer = combineReducers({
    car: carReducer,
    partner: partnerReducer,
    schedule: scheduleReducer,
    bill: billReducer,
    user: userReducer
})

export default rootReducer;