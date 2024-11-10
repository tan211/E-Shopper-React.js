import { useState, useEffect } from "react"
import api from "../api"
import { useParams } from "react-router-dom"

function EditProduct () {

    const [getData, setData] = useState({
    })

    const [getProduct, setProduct] = useState([])

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
    let params = useParams()

    let url = "/user/my-product"

    let url2 = "user/product/update/" + params.id

    const [file, setFileInput] = useState([])

    const typeImage = ["png", "jpg", "jpeg", "PNG", "JPG"]

    const [errors, setErrors] = useState({})

    const [getBrand, setBrand] = useState([])

    const [getCategory, setCategory] = useState([])

    const [mainCategory, setMainCategory] = useState("")

    const [mainBrand, setMainBrand] = useState("")
    
    const [avatarCheckBox, setAvatarCheckBox] = useState([])

    useEffect(()=>{
        api.get(url, config)
        .then(response => {
            console.log(response.data.data)
            let xx = Object.values(response.data.data)
            console.log(xx)
            console.log(xx[0])
            setData(xx)
        })
        api.get("/category-brand")
        .then(response => {
            setCategory(response.data.category)
            setBrand(response.data.brand)
        })
    },[])

    useEffect(() => {

        if (getData && Object.keys(getData).length>0) {
            let x = ''
            Object.keys(getData).map((value, key) => {
                console.log(getData[key].id)
                if (getData[key].id == params.id) {
                    x = getData[key]
                    console.log(x)
                }
            })
            setProduct(x)
        }
    }, [getData]);


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

    const handleImage = (value, checked) => {
        if (checked) {
            setAvatarCheckBox((prev) => [...prev, value]) // Thêm hình ảnh vào mảng nếu checkbox được chọn
        } else {
            setAvatarCheckBox((prev) => prev.filter((img) => img !== value)) // Xóa hình ảnh khỏi mảng nếu checkbox bị bỏ chọn
        }
    }
    
    const showImageProduct = (e) => {
        if (getProduct && Object.keys(getProduct).length>0) {
                let aa = JSON.parse(getProduct.image)
                return aa.map((value, key) => {
                    return (
                            <div style={{width: '100px',display:"inline-block"}}>
                                <img src={"http://localhost:8000/laravel8/public/upload/product/" + userData.Auth.id + "/" + value} style={{width: '100px',height:'100px'}} alt=""/>
                                <input type="checkbox" style={{width: '100px'}} name="checkbox" value={value} onChange={(e) => handleImage(value, e.target.checked)}/>
                            </div>
                    )
                })
        }
    }

    console.log(avatarCheckBox)
    console.log(file)

    const handleInput = (e) => {
        let nameInput = e.target.name
        let valueInput = e.target.value
        setProduct(state =>({...state, [nameInput]: valueInput}))
        console.log(getProduct)
    }

    const handleUserInputFile = (e) => {
        setFileInput(e.target.files)
    }

    function renderSale(){
        if(getProduct.status==0) {
            return (
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <input type="text" placeholder="0" name="sale" onChange={handleInput} style={{width: '100px'}} defaultValue={getProduct.sale}/><span>%</span>
                </div>
            )
        }
    }

    const handleSubmit = (e) => {
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
            formData.append('category', getProduct.id_category)
            formData.append('brand', getProduct.id_brand)
            formData.append('company', getProduct.company)
            formData.append('detail', getProduct.detail)
            formData.append('status', getProduct.status)
            formData.append('sale', getProduct.sale)
            Object.keys(file).map((value,key)=> {
                formData.append('file[]', file[value])
            })
            avatarCheckBox.map((value,index)=> {
                formData.append('avatarCheckBox[]', value)
            })
            api.post(url2, formData, config)
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
        <div className="col-sm-9">
					<div className="blog-post-area">
						<h2 className="title text-center">Edit Product</h2>
					    <div className="signup-form">
						<h2>Edit Product</h2>
                        {renderError()}
                            <form onSubmit={handleSubmit} enctype="multipart/form-data">
                                <input type="text" placeholder="Name" name="name" onChange={handleInput} value={getProduct.name}/>
                                <input type="text" placeholder="Price" name="price" onChange={handleInput} value={getProduct.price}/>
                                <select name="category" onChange={handleInput} value={getProduct.id_category}>
                                    {showCategory()}
                                </select>
                                <select name="brand" onChange={handleInput} value={getProduct.id_brand}>
                                    {showBrand()}
                                </select>
                                <select name="status" onChange={handleInput} value={getProduct.status} >
                                    <option value={0}>sale</option>
                                    <option value={1}>new</option>
                                </select>
                                {renderSale()}
                                <input type="text" placeholder="Company profile" name="company" onChange={handleInput} value={getProduct.company_profile}/>
                                <input type="file" placeholder="Avatar" onChange={handleUserInputFile} multiple/>
                                {showImageProduct()}
                                <textarea name="detail" rows="11" placeholder="Detail" onChange={handleInput} value={getProduct.detail}></textarea>
                                <button type="submit" className="btn btn-default">Change</button>
                            </form>
					    </div>
					</div>
				</div>
    )
}
export default EditProduct