import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";
import { type } from "@testing-library/user-event/dist/type";
import ListComment from "./ListComment";
function Comment(props) {

    const params = useParams()

    let comment = ""
    const handleInput = (e) => {
        comment = e.target.value
    }
    let url = '/blog/comment/' + params.id
   

    console.log(props.getid_Comment)

    const checkLogin = () => {
        if (localStorage.getItem("appState")) {
            const userData = JSON.parse(localStorage.getItem("appState"))
            let accessToken = userData.token
            let config = { 
                    headers: { 
                    'Authorization': 'Bearer '+ accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                    } 
            }

            if (comment) {
                const formData = new FormData()
                if (props.getid_Comment == 0) {
                    formData.append('id_comment', 0)
                } else {
                    formData.append('id_comment', props.getid_Comment)
                }
                    formData.append('id_blog', params.id)
                    formData.append('id_user', userData.Auth.id)
                    formData.append('comment', comment)
                    formData.append('image_user', userData.Auth.avatar)
                    formData.append('name_user', userData.Auth.name)
                    api.post(url, formData, config)
                    .then(response => {
                        console.log(response)
                        props.getCmt(response.data.data)
                    })
                    console.log(formData)
            } else {
                alert("Please enter comment")
            }
        
        } else {
            alert("Please Login")
        }
    }

    // const clickReply = () => {
    //     console.log("taaan")
    // }


    return(
        <>
            <div className="text-area">
                <div className="blank-arrow">
                    <label>Your Name</label>
                </div>
                <span>*</span>
                <textarea id="commentTextArea" name="comment" rows="11" onChange={handleInput}></textarea>
                <Link className="btn btn-primary" to="" onClick={checkLogin}>post comment</Link>
            </div>
        </>
    )
}
export default Comment