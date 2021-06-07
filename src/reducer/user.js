const initialState = {
    userInfo: {},
    isPartner: false,
    isAdmin: false,
    isCustomer: false 
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case "GET_USER_INFO": {
            return {...state, userInfo: action.info};
        }
        default: {
            return {...state};
        }
    }
}

export default userReducer;