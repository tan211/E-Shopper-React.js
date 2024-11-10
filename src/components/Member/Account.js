import { useEffect, useState } from "react"
import api from "../api"
import { useParams } from "react-router-dom"
function Account() {
    let params = useParams()

    let url = '/user/update/' + params.id

    const [user,setUser] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        country: '',
    })

    const [inputAvatar, setFileInputAvatar] = useState({
    })

    const [avatarAPI, setAvatar] = useState("")

    const typeImage = ["png", "jpg", "jpeg", "PNG", "JPG"]

    const [errors, setErrors] = useState({})

    useEffect(()=> {
        let userData = localStorage.getItem("appState")
        if (userData) {
            userData = JSON.parse(userData)
            console.log(userData)
            setUser({
                name : userData.Auth.name,
                email : userData.Auth.email,
                address : userData.Auth.address,
                phone: userData.Auth.phone,
                country: userData.Auth.country,
            })
        }
    },[])
    const handleInput = (e) => {
        let nameInput = e.target.name
        let valueInput = e.target.value
        setUser(state =>({...state, [nameInput]: valueInput}))
        console.log(user)
    }

    const handleUserInputFile = (e) => {
        const file = e.target.files

        let reader = new FileReader()
        reader.onload = (e) => {
            setAvatar(e.target.result)
            setFileInputAvatar(file)
        }
        reader.readAsDataURL(file[0])
    }

    const handleSubmit = (e) => {
        console.log(user)
        console.log(inputAvatar)
        console.log(typeof avatarAPI)

        e.preventDefault()
        let errorsSubmit = {}
        let flag = true

        if (user.name ==""){
            errorsSubmit.name = "Vui long nhap name"
            flag = false
        }
        if(user.email =="") {
            errorsSubmit.email = "Vui long nhap dia chi Email"
            flag = false
        } else {
            let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if(!regex.test(user.email)) {
                errorsSubmit.email = "Vui long nhap dung dinh dang Email"
                flag = false
            }
        }
        if (user.phone ==""){
            errorsSubmit.phone = "Vui long nhap phone"
            flag = false
        }
        if (user.address ==""){
            errorsSubmit.address = "Vui long nhap address"
            flag = false
        }
        if (Object.keys(inputAvatar).length === 0){
            errorsSubmit.avatar = "Vui long tai avatar"
            flag = false
        }
        if (Object.keys(inputAvatar).length > 0) {
            let getName = inputAvatar["0"]["name"]
            getName = getName.split(".")
            // console.log(getName[getName.length-1])
            let getSize = inputAvatar["0"]["size"]
            // console.log(getSize)
            if (getSize > 1024*1024) {
                errorsSubmit.avatar = "Anh qua lon"
                flag = false
            }
            if (typeImage.includes(getName[getName.length-1])==false) {
                errorsSubmit.avatar = "Anh khong dung dinh dang"
                flag = false
            }
        }
        if(!flag){
            setErrors(errorsSubmit)
        } else {
            let userData = localStorage.getItem("appState")
            userData = JSON.parse(userData)
            let accessToken = userData.token
            console.log(accessToken)
            let config = { 
                    headers: { 
                    'Authorization': 'Bearer '+ accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                    } 
            }
            const formData = new FormData()
            formData.append('name', user.name)
            formData.append('email', user.email)
            formData.append('password', user.password)
            formData.append('address', user.address)
            formData.append('phone', user.phone)
            formData.append('country', user.country)
            formData.append('avatar', avatarAPI)
            api.post(url, formData, config)
            .then(response => {
                console.log(response.data)
                let xx = JSON.stringify(response.data)
                localStorage.setItem("appState", xx)
            })
            .catch(error => {
                if (error.response) {
                    console.log('Data:', error.response.data);
                    console.log('Status:', error.response.status);
                    console.log('Headers:', error.response.headers);
                } else if (error.request) {
                    console.log('Request:', error.request);
                } else {
                    console.log('Error:', error.message);
                }
            })
        }
    }

    const renderError = (e) => {
        if (Object.keys(errors).length >0){
            return Object.keys(errors).map((key, index) => {
                return (
                    <li key={index}>{errors[key]}</li>
                )
            })
        }
    }

    return (
        <>
				<div className="col-sm-9">
					<div className="blog-post-area">
						<h2 className="title text-center">Update user</h2>
					    <div className="signup-form">
						<h2>New User Signup!</h2>
                        {renderError()}
                            <form onSubmit={handleSubmit} enctype="multipart/form-data">
                                <input type="text" placeholder="Name" name="name" onChange={handleInput} defaultValue={user.name}/>
                                <input type="email" placeholder="Email Address" value={user.email} readOnly/>
                                <input type="password" placeholder="Password" name="password" onChange={handleInput}/>
                                <input type="text" placeholder="Address" name="address" onChange={handleInput} defaultValue={user.address}/>
                                <input type="text" placeholder="Country" name="country" onChange={handleInput}/>
                                <input type="text" placeholder="Phone Number" name="phone" onChange={handleInput} defaultValue={user.phone}/>
                                <input type="file" placeholder="Avatar" name="avatar" onChange={handleUserInputFile}/>
                                <button type="submit" className="btn btn-default">Signup</button>
                            </form>
					    </div>
					</div>
				</div>
        </>
    )
}
export default Account