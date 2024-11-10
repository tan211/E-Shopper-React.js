import { useState, useEffect } from "react"
import api from "../api"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import Modal from 'react-bootstrap/Modal'

function ProductDetail () {

    let params = useParams()

    const [getData, setData] = useState([])
    const [getImageData, setImageData] = useState()
    const [getBrand, setBrand] = useState([])
    const [show, setShow] = useState(false)

    useEffect(()=>{
        api.get("/product/detail/" + params.id)
        .then(response => {
            console.log(response.data.data)
            setData(response.data.data)
            setImageData(JSON.parse(response.data.data.image))
        })
        api.get("/category-brand")
        .then(response => {
            setBrand(response.data.brand)
        })
    },[])



    const showBrand = () => {
        if (getBrand.length > 0){
            return getBrand.map((value,key) => {
                    if (value.id === getData.id_brand)
                    return (
                        value.brand
                    )
            })
        }
    }
    
    const [getQty, setQty] = useState([]) 

    const handleInput = (e) => {
        setQty(e.target.value)
        console.log(getQty)
    }

    const clickAddtoCart = () => {
        console.log(getData)
        console.log(getQty)
        let objCart = {
            [params.id] : getQty
        }
        let cart = {}
        if (localStorage.getItem("Cart")) {
            cart = JSON.parse(localStorage.getItem("Cart"))
            console.log(cart)
            if(cart[params.id]){
                cart[params.id] += 1
            } else {
                cart = {...cart,...objCart}
            }
        } else {
            cart = objCart
        }
        cart = JSON.stringify(cart)
        localStorage.setItem("Cart", cart)
    }

    const showProductDetail = () => {
        const urlImage = "http://localhost:8000/laravel8/public/upload/product/" + getData.id_user + "/"
        let imageFirst = ""
        let imageChild = []
        if (getImageData && getImageData.length > 0) {
            getImageData.map((value, key) => {
                if (key == 0) {
                    imageFirst = value
                } else {
                    imageChild.push(value)
                }
            })
        }
        console.log(imageChild)
        console.log(imageFirst)
            return (
                <>
                    <div className="col-sm-5">
                        <div className="view-product">
                            <img src={urlImage + imageFirst} alt="" />
                            <Link to="#" rel="prettyPhoto" onClick={() => setShow(true)}><h3>ZOOM</h3></Link>
                            <Modal
                                show={show}
                                onHide={() => setShow(false)}
                                dialogClassName="modal-90w"
                                aria-labelledby="example-custom-modal-styling-title"
                            >
                                <Modal.Header closeButton>
                                <Modal.Title id="example-custom-modal-styling-title">
                                    Custom Modal Styling
                                </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <p>
                                    Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
                                    commodi aspernatur enim, consectetur. Cumque deleniti temporibus
                                    ipsam atque a dolores quisquam quisquam adipisci possimus
                                    laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
                                    accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
                                    reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
                                    deleniti rem!
                                </p>
                                </Modal.Body>
                            </Modal>
                        </div>
                        <div id="similar-product" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="item active">
                                        <Link to=""><img src={urlImage + imageChild[0]} alt="" style={{width: '70px',height:'100px'}}/></Link>
                                        <Link to=""><img src={urlImage + imageChild[0]} alt="" style={{width: '70px',height:'100px'}}/></Link>
                                        <Link to=""><img src={urlImage + imageChild[0]} alt="" style={{width: '70px',height:'100px'}}/></Link>
                                    </div>
                                    <div className="item">
                                        <Link to=""><img src={urlImage + imageChild[0]} alt=""/></Link>
                                        <Link to=""><img src={urlImage + imageChild[0]} alt=""/></Link>
                                        <Link to=""><img src={urlImage + imageChild[0]} alt=""/></Link>
                                    </div>
                                    <div className="item">
                                        <Link to=""><img src={urlImage + imageChild[0]} alt=""/></Link>
                                        <Link to=""><img src={urlImage + imageChild[0]} alt=""/></Link>
                                        <Link to=""><img src={urlImage + imageChild[0]} alt=""/></Link>
                                    </div>
                                    
                                </div>
    
                                <Link className="left item-control" to="#similar-product" data-slide="prev">
                                <i className="fa fa-angle-left"></i>
                                </Link>
                                <Link className="right item-control" to="#similar-product" data-slide="next">
                                <i className="fa fa-angle-right"></i>
                                </Link>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="product-information">
                            <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                            <h2>{getData.name}</h2>
                            <p>Web ID: {getData.id_user}</p>
                            <img src="images/product-details/rating.png" alt="" />
                            <span>
                                <span>US ${getData.price}</span>
                                <label>Quantity:</label>
                                <input type="text" defaultValue={1} onChange={handleInput} />
                                <button type="button" className="btn btn-fefault cart" onClick={() => clickAddtoCart()}>
                                    <i className="fa fa-shopping-cart"></i>
                                    Add to cart
                                </button>
                            </span>
                            <p><b>Availability:</b> In Stock</p>
                            <p><b>Condition:</b> {getData.status === 0 ? "Sale" : "New"}</p>
                            <p><b>Brand:</b> {showBrand()}</p>
                            <Link to=""><img src="images/product-details/share.png" className="share img-responsive"  alt="" /></Link>
                        </div>
                    </div>
                </>
            )
    }

    const showCategoryTab = () => {
        return (
            <>
                <div className="col-sm-12">
                    <ul className="nav nav-tabs">
                        <li><Link to="#details" data-toggle="tab">Details</Link></li>
                        <li><Link to="#companyprofile" data-toggle="tab">Company Profile</Link></li>
                        <li><Link to="#tag" data-toggle="tab">Tag</Link></li>
                        <li className="active"><Link to="#reviews" data-toggle="tab">Reviews (5)</Link></li>
                    </ul>
                </div>
                <div className="tab-content">
                    <div className="tab-pane fade" id="details" >
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="tab-pane fade" id="companyprofile" >
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="tab-pane fade" id="tag" >
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery1.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery2.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery3.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img src="images/home/gallery4.jpg" alt="" />
                                        <h2>$56</h2>
                                        <p>Easy Polo Black Edition</p>
                                        <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="tab-pane fade active in" id="reviews" >
                        <div className="col-sm-12">
                            <ul>
                                <li><Link to=""><i className="fa fa-user"></i>EUGEN</Link></li>
                                <li><Link to=""><i className="fa fa-clock-o"></i>12:41 PM</Link></li>
                                <li><Link to=""><i className="fa fa-calendar-o"></i>31 DEC 2014</Link></li>
                            </ul>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            <p><b>Write Your Review</b></p>
                            
                            <form action="#">
                                <span>
                                    <input type="text" placeholder="Your Name"/>
                                    <input type="email" placeholder="Email Address"/>
                                </span>
                                <textarea name="" ></textarea>
                                <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                                <button type="button" className="btn btn-default pull-right">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                    
                </div>
            </>
        )
    }

    const showRemcommendItems = () => {
        return (
            <>
                <div className="col-sm-4">
                    <div className="product-image-wrapper">
                        <div className="single-products">
                            <div className="productinfo text-center">
                                <img src="images/home/recommend1.jpg" alt="" />
                                <h2>$56</h2>
                                <p>Easy Polo Black Edition</p>
                                <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="col-sm-9 padding-right">
                <div className="product-details">
                    {showProductDetail()}
                </div>
                
                <div className="category-tab shop-details-tab">
                    {showCategoryTab()}
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
export default ProductDetail