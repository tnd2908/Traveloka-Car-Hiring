const initialState = {
    newBill: ""
}

const billReducer = (state = initialState, payload) => {
    switch(payload.type) {
        case "GET_NEW_BILL" : {
            return {...state, newBill: payload.result}
        }

        default: {
            return {...state}
        }
    }
}

export default billReducer;