import {combineReducers} from 'redux'
import carReducer from './car'
import partnerReducer from './partner'
import scheduleReducer from './schedule';
import userReducer from './user';
import billReducer from "./bill"
const rootReducer = combineReducers({
    car: carReducer,
    partner: partnerReducer,
    schedule: scheduleReducer,
    user: userReducer,
    bill: billReducer
})

export default rootReducer;