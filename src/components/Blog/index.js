import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import API from "../api";

function Blog() {

        const [getItem, setItem] = useState([]);
        useEffect(() => {
            API.get("blog")
            .then(response=>{
                setItem(response.data.blog.data)
            })
            .catch(error=>console.log(error))
        }, [])
        function fetchData(){
            if (Object.keys(getItem).length > 0 ) {
                return getItem.map((value, key) => {
                    return (
                        <div key={key} index={key} className="single-blog-post">
                            <h3>{value.title}</h3>
                            <div className="post-meta">
                                <ul>
                                    <li><i className="fa fa-user"></i> Mac Doe</li>
                                    <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                    <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                </ul>
                                <span>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star-half-o"></i>
                                </span>
                            </div>
                            <Link to="">
                                <img src={"http://localhost:8000/laravel8/public/upload/Blog/image/" + value.image} alt=""/>
                            </Link>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            <Link  className="btn btn-primary" to={"/blog/detail/" + value.id}>Read More</Link>
                        </div>
                    )
                })
            }
        }
    return (
        <>
                        <div className="col-sm-9">
                            <div className="blog-post-area">
                                <h2 className="title text-center">Latest From our Blog</h2>
                                {fetchData()}
                                {/* <div class="single-blog-post">
                                    <h3>Girls Pink T Shirt arrived in store</h3>
                                    <div class="post-meta">
                                        <ul>
                                            <li><i class="fa fa-user"></i> Mac Doe</li>
                                            <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                                            <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                                        </ul>
                                        <span>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star-half-o"></i>
                                        </span>
                                    </div>
                                    <Link to="">
                                        <img src="frontend/images/blog/blog-one.jpg" alt=""/>
                                    </Link>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                    <Link  class="btn btn-primary" to="">Read More</Link>
                                </div>
                                <div class="single-blog-post">
                                    <h3>Girls Pink T Shirt arrived in store</h3>
                                    <div class="post-meta">
                                        <ul>
                                            <li><i class="fa fa-user"></i> Mac Doe</li>
                                            <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                                            <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                                        </ul>
                                        <span>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star-half-o"></i>
                                        </span>
                                    </div>
                                    <Link to="">
                                        <img src="frontend/images/blog/blog-two.jpg" alt=""/>
                                    </Link>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                    <Link  class="btn btn-primary" to="">Read More</Link>
                                </div>
                                <div class="single-blog-post">
                                    <h3>Girls Pink T Shirt arrived in store</h3>
                                    <div class="post-meta">
                                        <ul>
                                            <li><i class="fa fa-user"></i> Mac Doe</li>
                                            <li><i class="fa fa-clock-o"></i> 1:33 pm</li>
                                            <li><i class="fa fa-calendar"></i> DEC 5, 2013</li>
                                        </ul>
                                        <span>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star-half-o"></i>
                                        </span>
                                    </div>
                                    <Link to="">
                                        <img src="frontend/images/blog/blog-three.jpg" alt=""/>
                                    </Link>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                    <Link  class="btn btn-primary" to="">Read More</Link>
                                </div> */}
                                <div className="pagination-area">
                                    <ul className="pagination">
                                        <li><Link to="" className="active">1</Link></li>
                                        <li><Link to="">2</Link></li>
                                        <li><Link to="">3</Link></li>
                                        <li><Link to=""><i className="fa fa-angle-double-right"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
	
        </>
    )
}
export default Blog