import { useState } from "react"
import api from "../api";

function RegisterForm() {

    const [inputs,setInputs] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
    })

    const [inputAvatar, setFileInputAvatar] = useState({
    })

    const [avatarAPI, setAvatar] = useState("")

    const typeImage = ["png", "jpg", "jpeg", "PNG", "JPG"]

    const [errors, setErrors] = useState({})

    const handleInput = (e) => {
        let nameInput = e.target.name
        let valueInput = e.target.value
        setInputs(state =>({...state, [nameInput]: valueInput}))
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
        // console.log(inputs)
        // console.log(inputAvatar)
        // console.log(avatarAPI)
        e.preventDefault()
        let errorsSubmit = {}
        let flag = true

        if (inputs.name ==""){
            errorsSubmit.name = "Vui long nhap name"
            flag = false
        }
        if(inputs.email =="") {
            errorsSubmit.email = "Vui long nhap dia chi Email"
            flag = false
        } else {
            let regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if(!regex.test(inputs.email)) {
                errorsSubmit.email = "Vui long nhap dung dinh dang Email"
                flag = false
            }
        }
        if (inputs.password ==""){
            errorsSubmit.password = "Vui long nhap password"
            flag = false
        }
        if (inputs.phone ==""){
            errorsSubmit.phone = "Vui long nhap phone"
            flag = false
        }
        if (inputs.address ==""){
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
            const data = {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
                phone: inputs.phone,
                address: inputs.address,
                avatar: avatarAPI,
                level: 0
            }
            api.post("register", data)
            .then(response => {
                // console.log(data)
                // console.log(response.data)
                if (response.data.errors) {
                    setErrors(response.data.errors)
                } else {
                    alert("Done")
                    console.log(response)
                }
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
            alert("Done")
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
            {renderError()}
            <div className="col-sm-4">
					<div className="signup-form">
						<h2>New User Signup!</h2>
						<form onSubmit={handleSubmit} enctype="multipart/form-data">
                            <input type="text" name="name" placeholder="Name" onChange={handleInput}/>
                            <input type="text" name="email" placeholder="Email" onChange={handleInput}/>
                            <input type="text" name="password" placeholder="Password" onChange={handleInput}/>
                            <input type="text" name="phone" placeholder="Phone" onChange={handleInput}/>
                            <input type="text" name="address" placeholder="Address" onChange={handleInput}/>
                            <input type="file" name="avatar" placeholder="Avatar" onChange={handleUserInputFile}/>
							<button type="submit" className="btn btn-default">Signup</button>
						</form>
					</div>
			</div>
        </>
    )
}
export default RegisterForm