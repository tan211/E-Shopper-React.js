import { useEffect, useState } from "react"
import api from "../api"
import { Link } from "react-router-dom"
import EditProduct from "./EditProduct"

function MyProduct() {

    let url = "/user/my-product"

    let xx = JSON.parse(localStorage.getItem("appState"))
    xx = xx.Auth.id

    let url2 = "http://localhost:8000/laravel8/public/upload/product/" + xx + "/"
    console.log(url2)

    let url3 = "/user/product/delete/"

    const [getProduct,setProduct] = useState([])

    let userData = localStorage.getItem("appState")
    userData = JSON.parse(userData)
    let accessToken = userData.token
    let config = { 
            headers: { 
            'Authorization': 'Bearer '+ accessToken,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
            } 
    }

    useEffect(()=>{
        api.get(url, config)
        .then(response => {
            console.log(response.data.data)
            setProduct(response.data.data)
        })
    }, [])

    console.log(typeof getProduct)

    const deleteProduct = (value) => {
        url3 = url3+value
        api.get(url3,config)
        .then(response => {
            console.log(response)
        })
    }

    const showProduct = () => {
        if (getProduct && Object.keys(getProduct).length > 0) {
            return Object.keys(getProduct).map((value,key)=>{
                console.log(getProduct[value]['name'])
                let img = JSON.parse(getProduct[value]['image'])
                console.log(url2 + img[0])
                return (
                    <>
                        <tr>
                            <td className="cart_product">
                                <Link><img src={url2 + img[0]} alt="" style={{width: '100px'}}/></Link>
                            </td>
                            <td className="cart_description">
                                <h4><Link>{getProduct[value]['name']}</Link></h4>
                            </td>
                            <td className="cart_price">
                                <p>${getProduct[value]['price']}</p>
                            </td>
                            <td className="cart_total">
                                <Link to={"/account/product/edit/" + getProduct[value]['id']}>edit</Link>
                                <Link onClick={()=>deleteProduct(getProduct[value]['id'])}>delete</Link>
                            </td>
                        </tr>
                    </>
                )
            })
        }
    }

    return (
    <>
    <div className="col-sm-9">
        <div className="table-responsive cart_info">
            <table className="table table-condensed">
                <thead>
                    <tr className="cart_menu">
                        <td className="image">image</td>
                        <td className="description">name</td>
                        <td className="price">price</td>
                        <td className="total">action</td>
                    </tr>
                </thead>
                <tbody>
                    {showProduct()}
                </tbody>
            </table>
        </div>
    </div>
    </>
    )
}
export default MyProduct