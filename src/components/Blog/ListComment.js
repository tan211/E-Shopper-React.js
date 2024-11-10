import { Link } from "react-router-dom";
function ListComment(props) {

    let {data} = props


    console.log(data)
    console.log(typeof data)

    const ShowComment = () => {
        if (data && data.length > 0) {
            return data.map((value, key)=>{
                let id = value.id
                if (value.id_comment == 0) {
                    return (
                        <>
                        <li className="media">
                            <Link className="pull-left" to="#">
                                <img className="media-object" src="frontend/images/blog/man-three.jpg" alt=""/>
                            </Link>
                            <div className="media-body">
                                <ul className="sinlge-post-meta">
                                    <li><i className="fa fa-user"></i>{data[key].name_user}</li>
                                    <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                    <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                </ul>
                                <p>{data[key].comment}</p>
                                <Link className="btn btn-primary" to="#" onClick={() => props.clickReply(value.id)}><i className="fa fa-reply"></i>Replay</Link>
                            </div>
                        </li>
                        {data.map((value, key)=>{
                            if (value.id_comment == id) {
                                return (
                                    <li className="media second-media">
                                    <Link className="pull-left" to="#">
                                        <img className="media-object" src="frontend/images/blog/man-three.jpg" alt=""/>
                                    </Link>
                                    <div className="media-body">
                                        <ul className="sinlge-post-meta">
                                            <li><i className="fa fa-user"></i>{value.name_user}</li>
                                            <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                            <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                        </ul>
                                        <p>{value.comment}</p>
                                        <Link className="btn btn-primary" to="#" onClick={() => props.clickReply(value.id)}><i className="fa fa-reply"></i>Replay</Link>
                                    </div>
                                    </li>
                                )
                            }
                        })}
                        </>
                )
                }
            })
            
        }
    }

    return (
        
				<div className="response-area">
                    <h2>3 RESPONSES</h2>
                    <ul className="media-list">
                        {/* <li className="media">
                            
                            <Link className="pull-left" to="#">
                                <img className="media-object" src="frontend/images/blog/man-two.jpg" alt=""/>
                            </Link>
                            <div className="media-body">
                                <ul className="sinlge-post-meta">
                                    <li><i className="fa fa-user"></i>Janis Gallagher</li>
                                    <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                    <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                </ul>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <Link className="btn btn-primary" to=""><i className="fa fa-reply"></i>Replay</Link>
                            </div>
                        </li>
                        <li className="media second-media">
                            <Link className="pull-left" to="#">
                                <img className="media-object" src="frontend/images/blog/man-three.jpg" alt=""/>
                            </Link>
                            <div className="media-body">
                                <ul className="sinlge-post-meta">
                                    <li><i className="fa fa-user"></i>Janis Gallagher</li>
                                    <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                    <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                </ul>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <Link className="btn btn-primary" to=""><i className="fa fa-reply"></i>Replay</Link>
                            </div>
                        </li>
                        <li className="media second-media">
                            <Link className="pull-left" to="#">
                                <img className="media-object" src="frontend/images/blog/man-three.jpg" alt=""/>
                            </Link>
                            <div className="media-body">
                                <ul className="sinlge-post-meta">
                                    <li><i className="fa fa-user"></i>Janis Gallagher</li>
                                    <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                    <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                </ul>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <Link className="btn btn-primary" to=""><i className="fa fa-reply"></i>Replay</Link>
                            </div>
                        </li>
                        <li className="media second-media">
                            <Link className="pull-left" to="#">
                                <img className="media-object" src="frontend/images/blog/man-three.jpg" alt=""/>
                            </Link>
                            <div className="media-body">
                                <ul className="sinlge-post-meta">
                                    <li><i className="fa fa-user"></i>Janis Gallagher</li>
                                    <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                    <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                </ul>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <Link className="btn btn-primary" to=""><i className="fa fa-reply"></i>Replay</Link>
                            </div>
                        </li>
                        <li className="media">
                            <Link className="pull-left" to="#">
                                <img className="media-object" src="frontend/images/blog/man-four.jpg" alt=""/>
                            </Link>
                            <div className="media-body">
                                <ul className="sinlge-post-meta">
                                    <li><i className="fa fa-user"></i>Janis Gallagher</li>
                                    <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                    <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                </ul>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <Link className="btn btn-primary" to=""><i className="fa fa-reply"></i>Replay</Link>
                            </div>
                        </li>
                        <li className="media second-media">
                            <Link className="pull-left" to="#">
                                <img className="media-object" src="frontend/images/blog/man-three.jpg" alt=""/>
                            </Link>
                            <div className="media-body">
                                <ul className="sinlge-post-meta">
                                    <li><i className="fa fa-user"></i>Janis Gallagher</li>
                                    <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                    <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                </ul>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <Link className="btn btn-primary" to=""><i className="fa fa-reply"></i>Replay</Link>
                            </div>
                        </li>
                        <li className="media second-media">
                            <Link className="pull-left" to="#">
                                <img className="media-object" src="frontend/images/blog/man-three.jpg" alt=""/>
                            </Link>
                            <div className="media-body">
                                <ul className="sinlge-post-meta">
                                    <li><i className="fa fa-user"></i>Janis Gallagher</li>
                                    <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                    <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                </ul>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <Link className="btn btn-primary" to=""><i className="fa fa-reply"></i>Replay</Link>
                            </div>
                        </li>
                        <li className="media second-media">
                            <Link className="pull-left" to="#">
                                <img className="media-object" src="frontend/images/blog/man-three.jpg" alt=""/>
                            </Link>
                            <div className="media-body">
                                <ul className="sinlge-post-meta">
                                    <li><i className="fa fa-user"></i>Janis Gallagher</li>
                                    <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                    <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                </ul>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <Link className="btn btn-primary" to=""><i className="fa fa-reply"></i>Replay</Link>
                            </div>
                        </li> */}
                        {ShowComment()}
                    </ul>					
                </div>
    )
}
export default ListComment