import { Link } from "react-router-dom";
import Provider from "../store/Provider";
import Context from "../store/Context";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
function Head() {

    // Kiểm tra tình trạng login và cập nhật getLogin


    const sumWishListRedux = useSelector(state => state.wishList.totalWishList);
    const sumCartRedux = useSelector(state => state.wishList.totalCart);
    // const { sumCart } = useContext(Context);

    function fetchData(){
                console.log(sumWishListRedux)
                console.log(sumCartRedux)
                if (localStorage.getItem("appState")){
                    let id = JSON.parse(localStorage.getItem("appState"))
                    return (
                        <>
                            <li><Link to={"/account/user/update/" + id.Auth.id}><i className="fa fa-user"></i> Account</Link></li>
                            <li><Link to="/wishlist"><i className="fa fa-star"></i><sup>{sumWishListRedux}</sup>Wishlist</Link></li>
                            <li><Link to="/checkout"><i className="fa fa-crosshairs"></i> Checkout</Link></li>
                            <li><Link to="/cart"><i className="fa fa-shopping-cart"></i><sup>{sumCartRedux}</sup><span>Cart</span></Link></li>
                            <li><Link to="/login" onClick={()=>checkLogin()}><i className="fa fa-lock"></i> Logout</Link></li>
                        </>
                    )
                } else {
                    return (
                        <>
                            <li><Link to="/login"><i className="fa fa-user"></i> Account</Link></li>
                            <li><Link to=""><i className="fa fa-star"></i> Wishlist</Link></li>
                            <li><Link to="/checkout"><i className="fa fa-crosshairs"></i> Checkout</Link></li>
                            <li><Link to="/cart"><i className="fa fa-shopping-cart"></i><span>Cart</span></Link></li>
                            <li><Link to="/login"><i className="fa fa-lock"></i> Login</Link></li>
                        </>
                    )
                }
    }

    function checkLogin() {
        localStorage.removeItem("appState")
    }

    return(
        <header id="header">
            <div className="header_top">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="contactinfo">
                                <ul className="nav nav-pills">
                                    <li><Link to=""><i className="fa fa-phone"></i> +2 95 01 88 821</Link></li>
                                    <li><Link to=""><i className="fa fa-envelope"></i> info@domain.com</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="social-icons pull-right">
                                <ul className="nav navbar-nav">
                                    <li><Link to=""><i className="fa fa-facebook"></i></Link></li>
                                    <li><Link to=""><i className="fa fa-twitter"></i></Link></li>
                                    <li><Link to=""><i className="fa fa-linkedin"></i></Link></li>
                                    <li><Link to=""><i className="fa fa-dribbble"></i></Link></li>
                                    <li><Link to=""><i className="fa fa-google-plus"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="header-middle">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 clearfix">
                            <div className="logo pull-left">
                                <Link to="index.html"><img src="frontend/images/home/logo.png" alt="" /></Link>
                            </div>
                            <div className="btn-group pull-right clearfix">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                        USA
                                        <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Link to="">Canada</Link></li>
                                        <li><Link to="">UK</Link></li>
                                    </ul>
                                </div>
                                
                                <div className="btn-group">
                                    <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                                        DOLLAR
                                        <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Link to="">Canadian Dollar</Link></li>
                                        <li><Link to="">Pound</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 clearfix">
                            <div className="shop-menu clearfix pull-right">
                                <ul className="nav navbar-nav">
                                    {fetchData()}                                
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <div className="header-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                            </div>
                            <div className="mainmenu pull-left">
                                <ul className="nav navbar-nav collapse navbar-collapse">
                                    <li><Link to="/">Home</Link></li>
                                    <li className="dropdown"><Link to="#">Shop<i className="fa fa-angle-down"></i></Link>
                                        <ul role="menu" className="sub-menu">
                                            <li><Link to="shop.html">Products</Link></li>
                                            <li><Link to="product-details.html">Product Details</Link></li> 
                                            <li><Link to="checkout.html">Checkout</Link></li> 
                                            <li><Link to="cart.html" className="active">Cart</Link></li> 
                                            <li><Link to="login.html">Login</Link></li> 
                                        </ul>
                                    </li> 
                                    <li className="dropdown"><Link to="#">Blog<i className="fa fa-angle-down"></i></Link>
                                        <ul role="menu" className="sub-menu">
                                            <li><Link to="blog.html">Blog List</Link></li>
                                            <li><Link to="blog-single.html">Blog Single</Link></li>
                                        </ul>
                                    </li> 
                                    <li><Link to="404.html">404</Link></li>
                                    <li><Link to="contact-us.html">Contact</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="search_box pull-right">
                                <input type="text" placeholder="Search"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Head