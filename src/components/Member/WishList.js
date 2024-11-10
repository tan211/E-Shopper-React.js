import { useState, useEffect, useContext } from "react"
import api from "../api"
import { Link } from "react-router-dom"
function WishList () {

    const [getData, setData] = useState([])

    useEffect(()=>{
        let url = "/product/wishlist"
        api.get(url)
        .then(response => {
            console.log(response.data.data)
            setData(response.data.data)
        })
    },[])


    let wishList = JSON.parse(localStorage.getItem("Wish List")) || []

    const removetoWishList = (valueId) => {
        const updatedData = getData.filter((value) => value.id !== valueId)
    
        let wishListLocal = JSON.parse(localStorage.getItem("Wish List")) || []
    
        wishListLocal = wishListLocal.filter((id) => id !== valueId)
    
        localStorage.setItem("Wish List", JSON.stringify(wishListLocal))
    
        setData(updatedData)
    };
    

    const showFeaTureItems = () => {
        const filtered = getData.filter(product => wishList.includes(product.id)) 
        console.log(filtered)
        if(getData && getData.length >0) {
            return filtered.map((value, key) => {
                let x = JSON.parse(value.image)
                console.log(value.id)
                console.log(value)
                return (
                    <>
                    <div className="col-sm-4">
                        <div className="product-image-wrapper">
                            <div className="single-products">
                                <div className="productinfo text-center">
                                    <img src={"http://localhost:8000/laravel8/public/upload/product/" + value.id_user + "/" + x[0]} alt="" />
                                    <h2>${value.price}</h2>
                                    <p>{value.name}</p>
                                    <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</Link>
                                </div>
                                <div className="product-overlay">
                                    <div className="overlay-content">
                                        <h2>${value.price}</h2>
                                        <p>{value.name}</p>
                                        <Link to="#" className="btn btn-default add-to-cart" onClick={() => clickAddtoCart(value.id)}><i className="fa fa-shopping-cart"></i>Add to cart</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="choose">
                                <ul className="nav nav-pills nav-justified">
                                    <li><Link to="#" onClick={() => removetoWishList(value.id)}><i className="fa fa-plus-square"></i>Remove to wishlist</Link></li>
                                    <li><Link to={"/product/detail/" + value.id}><i className="fa fa-plus-square"></i>More</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    </>
                )
            })
        }

    }

    const clickAddtoCart = (valueId) => {
        let objCart = {
            [valueId] : 1
        }
        let cart = {}
        if (localStorage.getItem("Cart")) {
            cart = JSON.parse(localStorage.getItem("Cart"))
            console.log(cart)
            if(cart[valueId]){
                cart[valueId] += 1
            } else {
                cart = {...cart,...objCart}
            }
        } else {
            cart = objCart
        }
        cart = JSON.stringify(cart)
        localStorage.setItem("Cart", cart)
    }

    return (
        <>
            <div className="col-sm-9 padding-right">
                <div className="features_items">
                    <h2 className="title text-center">Feature Items</h2>
                    {showFeaTureItems()}
                </div>
            </div>
        </>
    )
}
export default WishList