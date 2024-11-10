import { useState } from "react";
import Context from "./Context";

function Provider({ children }) {
    
    let cartData = JSON.parse(localStorage.getItem("Cart")) || {}

    let wishListData = JSON.parse(localStorage.getItem("Wish List")) || []


    const sumValueCart = () => {
        let sum = 0

        if (Object.keys(cartData).length > 0) {
            Object.keys(cartData).forEach((productId) => {
                sum += cartData[productId]
            })
        }
        return sum
    }

    const sumValueWishList = () => {
        return wishListData.length
    }

    return (
        <Context.Provider value={{ sumCart: sumValueCart(), sumWishList: sumValueWishList() }}>
            {children}
        </Context.Provider>
    )
}

export default Provider