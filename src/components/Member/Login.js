import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../api"

function LoginForm() {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    let check = false

    const navigate = useNavigate()

    const [getItem, setItem] = useState({})

    const [errors, setErrors] = useState({})
    const handleInput = (e) => {
        // console.log(e.target.files)
        // console.log(e.target.files["0"]["name"])
        // console.log(e.target.files["0"]["size"])
            let nameInput = e.target.name
            let valueInput = e.target.value
            setInputs(state => ({...state, [nameInput]:valueInput}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let errorsSubmit = {}
        let flag = true

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
            errorsSubmit.pass = "Vui long nhap password"
            flag = false
        }
        if(!flag){
            setErrors(errorsSubmit)
        } else {
            const data = {
                email: inputs.email,
                password: inputs.password,
                level: 0
            }
            api.post("login", data)
            .then(response => {
                // console.log(data)
                // console.log(response.data)
                if (response.data.errors) {
                    setErrors(response.data.errors)
                } else {
                    console.log(response.data.Auth)
                    // check = true
                    let xx = JSON.stringify(response.data)
                    localStorage.setItem("appState", xx)
                    navigate('/')
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
        {renderError()}
            <div className="col-sm-4 col-sm-offset-1">
				<div className="login-form">
					<h2>Login to your account</h2>
					<form onSubmit={handleSubmit}>
						<input type="email" placeholder="Email Address" name="email" onChange={handleInput}/>
                        <input type="text" placeholder="Password" name="password" onChange={handleInput}/>
						<span>
							<input type="checkbox" className="checkbox"/> 
							Keep me signed in
						</span>
						<button type="submit" className="btn btn-default">Login</button>
					</form>
				</div>
			</div>
        </>
    )
}
export default LoginForm