export const getListCarFromLowPrice = (list) =>{
    return{
        type: 'GET_LIST_CAR_FROM_LOW_PRICE',
        payload: list,
    }
}

export const getListCarFromHighPrice = (list) =>{
    return{
        type: 'GET_LIST_CAR_FROM_HIGH_PRICE',
        payload: list,
    }
}
export const setList = (list, defaultList) =>{
    return{
        type: 'SET_LIST_CAR',
        payload: {list, defaultList},
    }
}

export const getListCarByPrice = (range) =>{
    return{
        type: 'GET_LIST_CAR_BY_PRICE',
        payload: {range}
    }
}
export const searchCar = (value) =>{
    return{
        type: 'SEARCH_CAR',
        payload: value
    }
}

