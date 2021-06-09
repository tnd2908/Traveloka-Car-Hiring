const initialState ={
    user: {}
}
const userReducer = (state = initialState, action ) =>{
    switch (action.type){
        case 'SET_USER_INFOR' :{
            const infor = action.payload
            return{...state, user: infor}
        }
        default:
            return state
    }
}
export default userReducer
