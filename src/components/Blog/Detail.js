import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";
import Comment from "./Comment";
import ListComment from "./ListComment";
import Rate from "./Rate";

function Blog_Detail(props) {

	let params = useParams();

	const [data,setData] = useState("");
	const [getComment,setComment] = useState([]);
	const [getid_Comment,set_idComment] = useState(0);

	useEffect(()=>{
		api.get('blog/detail/' + params.id)
		.then(response => {
			setData(response.data.data)
			console.log(response.data.data.comment)
			setComment(response.data.data.comment)
		})
		.catch(function(error){
			console.log(error)
		})
	},[])

	function RenderHTML({ htmlString }) {
		return (
			<div dangerouslySetInnerHTML={{ __html: htmlString }} />
		);
	}
	function fetchData(){
		if (Object.keys(data).length > 0 ) {
				return (
					<>
						<div className="single-blog-post">
							<h3>Girls Pink T Shirt arrived in store</h3>
							<div className="post-meta">
								<ul>
									<li><i className="fa fa-user"></i> Mac Doe</li>
									<li><i className="fa fa-clock-o"></i> 1:33 pm</li>
									<li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
								</ul>
								{/* <!-- <span>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star"></i>
									<i className="fa fa-star-half-o"></i>
								</span> --> */}
							</div>
							<Link to="">
								<img src={"http://localhost:8000/laravel8/laravel8/public/upload/Blog/image/" + data.image} alt=""/>
							</Link>
							<RenderHTML htmlString={data.content} />
							<div className="pager-area">
								<ul className="pager pull-right">
									<li><Link to="#">Pre</Link></li>
									<li><Link to="#">Next</Link></li>
								</ul>
							</div>
						</div>
					</>
				)
		}
	}

	function getCmt(comment) {
		let x = getComment.concat(comment)
		setComment(x)
	}

	const clickReply = (id_comment) => {
		console.log(id_comment)
		set_idComment(id_comment)
        const textarea = document.getElementById("commentTextArea");
        if (textarea) {
          	textarea.scrollIntoView({ behavior: 'smooth' });
        }
    }

	// const getCmtChild = () => {
	// 	getComment[]
	// }
    return (
        <>
				<div className="col-sm-9">
					<div className="blog-post-area">
						<h2 className="title text-center">Latest From our Blog</h2>
						{fetchData()}

					</div>

					<Rate/>

					<div className="socials-share">
						<Link to=""><img src="frontend/images/blog/socials.png" alt=""/></Link>
					</div>

					{/* <!-- <div className="media commnets">
						<Link className="pull-left" to="#">
							<img className="media-object" src="frontend/images/blog/man-one.jpg" alt="">
						</Link>
						<div className="media-body">
							<h4 className="media-heading">Annie Davis</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							<div className="blog-socials">
								<ul>
									<li><Link to=""><i className="fa fa-facebook"></i></Link></li>
									<li><Link to=""><i className="fa fa-twitter"></i></Link></li>
									<li><Link to=""><i className="fa fa-dribbble"></i></Link></li>
									<li><Link to=""><i className="fa fa-google-plus"></i></Link></li>
								</ul>
								<Link className="btn btn-primary" to="">Other Posts</Link>
							</div>
						</div>
					</div> --> */}

					<ListComment data = {getComment} clickReply = {clickReply}/>

					<div className="replay-box">
						<div className="row">
							<div className="col-sm-12">
								<h2>Leave a replay</h2>
								<Comment  getCmt={getCmt} getid_Comment={getid_Comment}/>
							</div>
						</div>
					</div>
				</div>	
        </>
    )
}
export default Blog_Detail