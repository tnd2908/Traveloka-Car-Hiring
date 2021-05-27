const initialState ={
    schedule: {}
}
const scheduleReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'SET_SCHEDULE':{
            const sche = action.payload
            console.log(sche)
            return {...state, chedule: sche }
        }
        default:
             return {...state}
    }
}
export default scheduleReducer