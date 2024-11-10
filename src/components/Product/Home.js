import { useState, useEffect, useContext } from "react"
import api from "../api"
import { Link } from "react-router-dom"
import { qtyWishList } from "../../actions/wishList"
import { qtyCart } from "../../actions/cart"
import { useDispatch, useSelector } from "react-redux";

function Home () {

    let url = "/product/list"

    const dispatch = useDispatch();

    const [getData, setData] = useState([])

    let userData = localStorage.getItem("appState")
    userData = JSON.parse(userData)
    useEffect(()=>{
        api.get(url)
        .then(response => {
            console.log(response.data.data.data)
            setData(response.data.data.data)
        })
    },[])

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
        let sum = 0
        if (Object.keys(cart).length > 0) {
            Object.keys(cart).forEach((productId) => {
                sum += cart[productId]
            })
        }
        dispatch(qtyCart(sum))
        cart = JSON.stringify(cart)
        localStorage.setItem("Cart", cart)
    }

    const clickAddtoWishList = (valueId) => {
        let arrWishList = [valueId]
        let wishList = []
        if (localStorage.getItem("Wish List")) {
            let wishListLocal = JSON.parse(localStorage.getItem("Wish List"))
            console.log(wishList)
            console.log(wishList[valueId])
            if(!wishListLocal.includes(valueId)){
                wishList = wishListLocal.concat(arrWishList)
            } else {
                wishList = wishListLocal
            }
        } else {
            wishList = arrWishList
        }
        dispatch(qtyWishList(wishList.length))
        wishList = JSON.stringify(wishList)
        localStorage.setItem("Wish List", wishList)
    }

    const showFeaTureItems = () => {
        let arr = getData
        console.log(arr)
        return arr.map((value, key) => {
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
                                <Link to="" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</Link>
                            </div>
                            <div className="product-overlay">
                                <div className="overlay-content">
                                    <h2>${value.price}</h2>
                                    <p>{value.name}</p>
                                    <Link to="" className="btn btn-default add-to-cart" onClick={() => clickAddtoCart(value.id)}><i className="fa fa-shopping-cart"></i>Add to cart</Link>
                                </div>
                            </div>
                        </div>
                        <div className="choose">
                            <ul className="nav nav-pills nav-justified">
                                <li><Link to="" onClick={() => clickAddtoWishList(value.id)}><i className="fa fa-plus-square"></i>Add to wishlist</Link></li>
                                <li><Link to={"/product/detail/" + value.id}><i className="fa fa-plus-square"></i>More</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                </>
            )
        })
    }

    const showCategoryTab = () => {
        let arr = getData
        if (getData.length > 4) {
            arr = getData.slice(0, 4)
        }
        return arr.map((value, key) => {
            let x = JSON.parse(value.image)
            return (
                <>
                    <div className="col-sm-3">
                        <div className="product-image-wrapper">
                            <div className="single-products">
                                <div className="productinfo text-center">
                                    <img src={"http://localhost:8000/laravel8/public/upload/product/" + value.id_user + "/" + x[0]} alt="" />
                                    <h2>${value.price}</h2>
                                    <p>{value.name}</p>
                                    <Link to="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        })
    }

    const showRemcommendItems = () => {
        let arr = getData
        if (getData.length > 3) {
            arr = getData.slice(0, 3)
        }
        return arr.map((value, key) => {
            let x = JSON.parse(value.image)
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
                                
                            </div>
                        </div>
                    </div>
                </>
            )
        })
    }

    return (
        <>
            <div className="col-sm-9 padding-right">
                <div className="features_items">
                    <h2 className="title text-center">Feature Items</h2>
                    {showFeaTureItems()}
                </div>
                
                <div className="category-tab">
                    <div className="col-sm-12">
                        <ul className="nav nav-tabs">
                            <li className="active"><Link to="#tshirt" data-toggle="tab">T-Shirt</Link></li>
                            <li><Link to="#blazers" data-toggle="tab">Blazers</Link></li>
                            <li><Link to="#sunglass" data-toggle="tab">Sunglass</Link></li>
                            <li><Link to="#kids" data-toggle="tab">Kids</Link></li>
                            <li><Link to="#poloshirt" data-toggle="tab">Polo shirt</Link></li>
                        </ul>
                    </div>
                    <div className="tab-content">
                        <div className="tab-pane fade active in" id="tshirt" >
                            {showCategoryTab()}
                        </div>
                        
                        <div className="tab-pane fade" id="blazers" >
                            {showCategoryTab()}
                        </div>
                        
                        <div className="tab-pane fade" id="sunglass" >
                            {showCategoryTab()}
                        </div>
                        
                        <div className="tab-pane fade" id="kids" >
                            {showCategoryTab()}
                        </div>
                        
                        <div className="tab-pane fade" id="poloshirt" >
                        </div>
                    </div>
                </div>
                <div className="recommended_items">
                    <h2 className="title text-center">recommended items</h2>
                    
                    <div id="recommended-item-carousel" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="item active">
                                {showRemcommendItems()}
                            </div>
                            <div className="item">	
                                {showRemcommendItems()}
                            </div>
                        </div>
                            <Link className="left recommended-item-control" to="#recommended-item-carousel" data-slide="prev">
                            <i className="fa fa-angle-left"></i>
                            </Link>
                            <Link className="right recommended-item-control" to="#recommended-item-carousel" data-slide="next">
                            <i className="fa fa-angle-right"></i>
                            </Link>			
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home