const initialState ={
    name: '',
    id: '',
    phoneNum: '',
    gmail: '',
    user: {}
}
const userReducer = (state = initialState, action ) =>{
    switch (action.type){
        case 'SET_USER_INFOR' :{
            const infor = action.payload
            return{...state, name: infor.fullname, id: infor.id, phoneNum: infor.phoneNum, gmail: infor.gmail, user: infor}
        }
        default:
            return state
    }
}
export default userReducer
