import { useEffect, useState } from "react"
import api from "../api"
function AddProduct() {

    let url = '/user/product/add'

    const [getProduct,setProduct] = useState({
        name: "",
        price: "",
        category: "",
        brand: "",
        company: "",
        detail: "",
        status: 0,
        sale: "",

    })

    const [file, setFileInput] = useState([])

    const typeImage = ["png", "jpg", "jpeg", "PNG", "JPG"]

    const [errors, setErrors] = useState({})

    const [getCategory, setCategory] = useState([])

    const [getBrand, setBrand] = useState([])


    const [showElement, setShowElement] = useState(true);

    const handleSelectChange = (e) => {
        if (e.target.value == 0) {
            setShowElement(true);
            setProduct(state =>({...state, status: 0}))
        } else {
            setShowElement(false);
            setProduct(state =>({...state, status: 1}))
        }
    }

    useEffect(()=> {
        api.get("/category-brand")
        .then(response => {
            setCategory(response.data.category)
            setBrand(response.data.brand)
        })
    },[])

    const showCategory = () => {
        if (getCategory.length > 0){
            return getCategory.map((value,key) => {
                return (
                    <option value={value.id}>{value.category}</option>
                )
            })
        }
    }

    const showBrand = () => {
        if (getBrand.length > 0){
            return getBrand.map((value,key) => {
                return (
                    <option value={value.id}>{value.brand}</option>
                )
            })
        }
    }

    const handleInput = (e) => {
        let nameInput = e.target.name
        let valueInput = e.target.value
        setProduct(state =>({...state, [nameInput]: valueInput}))
        console.log(getProduct)
    }

    const handleUserInputFile = (e) => {
        setFileInput(e.target.files)
    }

    const handleSubmit = (e) => {
        console.log(getProduct)
        console.log(file)
        console.log(typeof file)
        console.log(file[0]['name'])


        e.preventDefault()
        let errorsSubmit = {}
        let flag = true

        if (getProduct.name == ""){
            errorsSubmit.name = "Vui long nhap name"
            flag = false
        }
        if(getProduct.price == "") {
            errorsSubmit.price = "Vui long nhap Price"
            flag = false
        }
        if (getProduct.category == ""){
            errorsSubmit.phone = "Vui long chon category"
            flag = false
        }
        if (getProduct.brand == ""){
            errorsSubmit.brand = "Vui long chon brand"
            flag = false
        }
        if (getProduct.status == 0 && getProduct.sale <= 0){
            errorsSubmit.sale = "Vui long nhap sale"
            flag = false
        }
        if (getProduct.company == ""){
            errorsSubmit.company = "Vui long nhap company"
            flag = false
        }
        if (Object.keys(file).length === 0){
            errorsSubmit.avatar = "Vui long tai anh"
            flag = false
        }
        if (Object.keys(file).length > 0 && Object.keys(file).length < 4) {
            Object.keys(file).map((key,value)=>{
                let getName = file[key]["name"]
                getName = getName.split(".")
                // console.log(getName[getName.length-1])
                let getSize = file[key]["size"]
                // console.log(getSize)
                if (getSize > 1024*1024) {
                    errorsSubmit.avatar = "Anh qua lon"
                    flag = false
                }
                if (typeImage.includes(getName[getName.length-1])==false) {
                    errorsSubmit.avatar = "Anh khong dung dinh dang"
                    flag = false
                }
            })
        } else {
            errorsSubmit.avatar = "Vui long chi chon toi da 3 anh"
        }
        if (getProduct.detail == ""){
            errorsSubmit.detail = "Vui long nhap detail"
            flag = false
        }
        if(!flag){
            setErrors(errorsSubmit)
        } else {
            let userData = localStorage.getItem("appState")
            userData = JSON.parse(userData)
            let accessToken = userData.token
            let config = { 
                    headers: { 
                    'Authorization': 'Bearer '+ accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                    } 
            }
            const formData = new FormData()
            formData.append('name', getProduct.name)
            formData.append('price', getProduct.price)
            formData.append('category', getProduct.category)
            formData.append('brand', getProduct.brand)
            formData.append('company', getProduct.company)
            formData.append('detail', getProduct.detail)
            formData.append('status', getProduct.status)
            formData.append('sale', getProduct.sale)
            Object.keys(file).map((value,key)=> {
                formData.append('file[]', file[value])
            })
            api.post(url, formData, config)
            .then(response => {
                console.log(response)
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
				<div className="col-sm-9">
					<div className="blog-post-area">
						<h2 className="title text-center">Add Product</h2>
					    <div className="signup-form">
						<h2>Create Product</h2>
                        {renderError()}
                            <form onSubmit={handleSubmit} enctype="multipart/form-data">
                                <input type="text" placeholder="Name" name="name" onChange={handleInput}/>
                                <input type="text" placeholder="Price" name="price" onChange={handleInput}/>
                                <select name="category" onChange={handleInput}>
                                    <option value={""}>Please choose category</option>
                                    {showCategory()}
                                </select>
                                <select name="brand" onChange={handleInput}>
                                    <option value={""}>Please choose brand</option>
                                    {showBrand()}
                                </select>
                                <select name="status" onChange={handleSelectChange}>
                                    <option value={0}>sale</option>
                                    <option value={1}>new</option>
                                </select>
                                {showElement && (
                                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                        <input type="text" placeholder="0" name="sale" onChange={handleInput} style={{width: '100px'}}/><span>%</span>
                                    </div>
                                )}
                                <input type="text" placeholder="Company profile" name="company" onChange={handleInput}/>
                                <input type="file" placeholder="Avatar" onChange={handleUserInputFile} multiple/>
                                <textarea name="detail" rows="11" placeholder="Detail" onChange={handleInput}></textarea>
                                <button type="submit" className="btn btn-default">Add Product</button>
                            </form>
					    </div>
					</div>
				</div>
        </>
    )
}
export default AddProduct