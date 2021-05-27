import {combineReducers} from 'redux'
import carReducer from './car'
import partnerReducer from './partner'
import scheduleReducer from './schedule';
const rootReducer = combineReducers({
    car: carReducer,
    partner: partnerReducer,
    schedule: scheduleReducer
})
export default rootReducer;