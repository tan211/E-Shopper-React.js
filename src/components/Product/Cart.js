import { useState, useEffect } from "react"
import api from "../api"
import { Link } from "react-router-dom"

function Cart() {


    const [getData, setData] = useState([])

    useEffect(()=>{
        let url = "/product/cart"
        let cart = JSON.parse(localStorage.getItem("Cart"))
        api.post(url, cart)
        .then(response => {
            console.log(response.data.data)
            setData(response.data.data)
        })
    },[])

    // const cartQtyUp = (valueId) => {
    //     getData.map((value, key) => {
    //         if (value.id === valueId){
    //             let cart = JSON.parse(localStorage.getItem("Cart"))
    //             console.log(cart)
    //             if(cart[valueId]){
    //                 cart[valueId] += 1
    //                 value.qty +=1
    //                 console.log(getData[key].qty)
    //                 setData(state =>({...value,["qty"]: cart[valueId]}))
    //             }
    //             cart = JSON.stringify(cart)
    //             localStorage.setItem("Cart", cart)
    //         }
    //     })
    // }

    const cartQtyUp = (valueId) => {
        const updatedData = getData.map((value) => {
            if (value.id === valueId) {
                let cart = JSON.parse(localStorage.getItem("Cart")) || {};
                
                // Tăng số lượng trong localStorage
                if (cart[valueId]) {
                    cart[valueId] += 1;
                } else {
                    cart[valueId] = 1;
                }
    
                // Lưu lại giỏ hàng vào localStorage
                localStorage.setItem("Cart", JSON.stringify(cart));
    
                // Cập nhật số lượng trong state
                return { ...value, qty: cart[valueId] };
            }
            return value;
        });
    
        // Cập nhật state với giá trị mới
        setData(updatedData);
    };

    const cartQtyDown = (valueId) => {
        const updatedData = getData.map((value) => {
            if (value.qty > 1){
                if (value.id === valueId) {
                    let cart = JSON.parse(localStorage.getItem("Cart")) || {};
                    if (cart[valueId]) {
                        cart[valueId] -= 1;
                    }
                    localStorage.setItem("Cart", JSON.stringify(cart));
        
                    // Cập nhật số lượng trong state
                    return { ...value, qty: cart[valueId] };
                }
            } else {
                alert("Done")
            }
            return value;
        });
    
        // Cập nhật state với giá trị mới
        setData(updatedData);
    };

    const cartDelete = (valueId) => {
        const updatedData = getData.filter((value, key) => {
                if (value.id === valueId) {
                    let cart = JSON.parse(localStorage.getItem("Cart")) || {};
                    
                    if (cart[valueId]) {
                        delete cart[valueId]
                    }
                    localStorage.setItem("Cart", JSON.stringify(cart));
                    return false;
                }
            return true;
        });
        setData(updatedData);
    };
    

    const showProductCart = () => {
        if (getData && getData.length > 0) {
            return getData.map((value,key) => {
                let x = JSON.parse(value.image)
                console.log(value.id)
                return (
                    <>
                        <tr>
                            <td className="cart_product">
                                <Link to=""><img src={"http://localhost:8000/laravel8/public/upload/product/" + value.id_user + "/" + x[0]} alt="" style={{width: '100px'}}/></Link>
                            </td>
                            <td className="cart_description">
                                <h4><Link to="">{value.name}</Link></h4>
                                <p>Web ID: {value.id}</p>
                            </td>
                            <td className="cart_price">
                                <p>${value.price}</p>
                            </td>
                            <td className="cart_quantity">
                                <div className="cart_quantity_button">
                                    <Link className="cart_quantity_up" to="" onClick={() => cartQtyUp(value.id)}> + </Link>
                                    <input className="cart_quantity_input" type="text" name="quantity" value={value.qty} autocomplete="off" size="2"/>
                                    <Link className="cart_quantity_down" to="" onClick={() => cartQtyDown(value.id)}> - </Link>
                                </div>
                            </td>
                            <td className="cart_total">
                                <p className="cart_total_price">${value.qty * value.price}</p>
                            </td>
                            <td className="cart_delete">
                                <Link className="cart_quantity_delete" to=""onClick={() => cartDelete(value.id)}><i className="fa fa-times"></i></Link>
                            </td>
                        </tr>
                    </>
                )
            }) 
        }
    }

    return (
        <>
            <section id="cart_items">
                <div className="container">
                    <div className="breadcrumbs">
                        <ol className="breadcrumb">
                        <li><Link to="#">Home</Link></li>
                        <li className="active">Shopping Cart</li>
                        </ol>
                    </div>
                    <div className="table-responsive cart_info">
                        <table className="table table-condensed">
                            <thead>
                                <tr className="cart_menu">
                                    <td className="image">Item</td>
                                    <td className="description"></td>
                                    <td className="price">Price</td>
                                    <td className="quantity">Quantity</td>
                                    <td className="total">Total</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {showProductCart()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section id="do_action">
                <div className="container">
                    <div className="heading">
                        <h3>What would you like to do next?</h3>
                        <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="chose_area">
                                <ul className="user_option">
                                    <li>
                                        <input type="checkbox"/>
                                        <label>Use Coupon Code</label>
                                    </li>
                                    <li>
                                        <input type="checkbox"/>
                                        <label>Use Gift Voucher</label>
                                    </li>
                                    <li>
                                        <input type="checkbox"/>
                                        <label>Estimate Shipping & Taxes</label>
                                    </li>
                                </ul>
                                <ul className="user_info">
                                    <li className="single_field">
                                        <label>Country:</label>
                                        <select>
                                            <option>United States</option>
                                            <option>Bangladesh</option>
                                            <option>UK</option>
                                            <option>India</option>
                                            <option>Pakistan</option>
                                            <option>Ucrane</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                        
                                    </li>
                                    <li className="single_field">
                                        <label>Region / State:</label>
                                        <select>
                                            <option>Select</option>
                                            <option>Dhaka</option>
                                            <option>London</option>
                                            <option>Dillih</option>
                                            <option>Lahore</option>
                                            <option>Alaska</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                    
                                    </li>
                                    <li className="single_field zip-field">
                                        <label>Zip Code:</label>
                                        <input type="text"/>
                                    </li>
                                </ul>
                                <Link className="btn btn-default update" to="">Get Quotes</Link>
                                <Link className="btn btn-default check_out" to="">Continue</Link>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="total_area">
                                <ul>
                                    <li>Cart Sub Total <span>$59</span></li>
                                    <li>Eco Tax <span>$2</span></li>
                                    <li>Shipping Cost <span>Free</span></li>
                                    <li>Total <span>$61</span></li>
                                </ul>
                                    <Link className="btn btn-default update" to="">Update</Link>
                                    <Link className="btn btn-default check_out" to="">Check Out</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Cart