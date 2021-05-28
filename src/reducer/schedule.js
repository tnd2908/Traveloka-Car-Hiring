const initialState ={
    startDate: '',
    endDate: '',
}
const scheduleReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'SET_SCHEDULE':{
            const start = action.payload.startDate
            const end = action.payload.endDate
            return {...state, startDate: start, endDate: end }
        }
        default:
             return {...state}
    }
}
export default scheduleReducer