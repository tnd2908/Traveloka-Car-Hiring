import {combineReducers} from 'redux'
import carReducer from './car'
import partnerReducer from './partner'
import scheduleReducer from './schedule';
import userReducer from './user';
const rootReducer = combineReducers({
    car: carReducer,
    partner: partnerReducer,
    schedule: scheduleReducer,
    user: userReducer,
})
export default rootReducer;