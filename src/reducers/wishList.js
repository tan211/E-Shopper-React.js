

const initialState = {
    wishListData: JSON.parse(localStorage.getItem("Wish List")) || [],
    cartData: JSON.parse(localStorage.getItem("Cart")) || {},
    totalWishList: 0,
    totalCart: 0
}

const wishlistReducer = (state = initialState, action) => {

    switch(action.type) {
        case 'QTY_WISHLIST': {
            const newCart = {...state.cartData}
            let totalWishList = 0
            if (Object.keys(newCart).length > 0) {
                Object.keys(newCart).forEach((productId) => {
                    totalWishList += newCart[productId]
                })
            }
            return {
                ...state,
                totalWishList: action.payload,
                totalCart: totalWishList
            }
        }
        case 'CART': {
            return {
                ...state,
                totalWishList: JSON.parse(localStorage.getItem("Wish List")).length,
                totalCart: action.payload
            }
        }
        default:
            let sum = 0
            const newCart = {...state.cartData}
            const newWishList = [...state.wishListData]
            if (Object.keys(newCart).length > 0) {
                Object.keys(newCart).forEach((productId) => {
                    sum += newCart[productId]
                })
                if(newWishList.length > 0) {
                    return {
                        ...state,
                        totalCart: sum,
                        totalWishList: newWishList.length
                    }
                } else {
                    return {
                        ...state,
                        totalCart: sum,
                        totalWishList: 0
                    }
                }
            } else {
                if(newWishList.length > 0) {
                    return {
                        ...state,
                        totalCart: 0,
                        totalWishList: newWishList.length
                    }
                } else {
                    return {
                        ...state,
                        totalCart: 0,
                        totalWishList: 0
                    }
                }
            }
    }

}
export default wishlistReducer 