export const setSchedule= (startDate, endDate) =>{
    return{
        type: 'SET_SCHEDULE',
        payload: {startDate, endDate}
    }
}